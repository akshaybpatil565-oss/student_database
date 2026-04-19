import { MongoClient } from 'mongodb';
import cors from 'cors';

const mongoUri = process.env.MONGODB_URI;

const corsHandler = cors({ origin: '*' });

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

async function handler(req, res) {
  await runMiddleware(req, res, corsHandler);

  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const db = client.db('students_db');
    const collection = db.collection('students');

    if (req.method === 'GET') {
      const students = await collection.find({}).toArray();
      return res.status(200).json(students);
    }

    if (req.method === 'POST') {
      const { name, id, grade, aadhar, phone, email } = req.body;

      if (!name || !id || !grade || !aadhar || !phone || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const result = await collection.insertOne({
        name,
        id,
        grade,
        aadhar,
        phone,
        email,
        createdAt: new Date(),
      });

      return res.status(201).json({ _id: result.insertedId, name, id, grade, aadhar, phone, email });
    }

    if (req.method === 'DELETE') {
      const { studentId } = req.query;

      if (!studentId) {
        return res.status(400).json({ error: 'Student ID required' });
      }

      const result = await collection.deleteOne({ _id: studentId });

      return res.status(200).json({ deleted: result.deletedCount });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Database connection failed', details: error.message });
  } finally {
    await client.close();
  }
}

export default handler;
