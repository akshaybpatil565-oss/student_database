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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const db = client.db('students_db');
    const collection = db.collection('students');

    const { searchId } = req.body;

    if (!searchId) {
      return res.status(400).json({ error: 'Search ID required' });
    }

    const normalizedSearchId = searchId.trim().toLowerCase();

    const student = await collection.findOne({
      id: { $regex: normalizedSearchId, $options: 'i' },
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    return res.status(200).json(student);
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Database connection failed', details: error.message });
  } finally {
    await client.close();
  }
}

export default handler;
