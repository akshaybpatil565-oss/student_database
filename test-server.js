// Local development server for testing
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// In-memory database for testing
let studentsDB = [
  {
    _id: '1',
    name: 'Rajesh Kumar',
    id: 'STU001',
    grade: '10A',
    aadhar: '123456789012',
    phone: '9876543210',
    email: 'rajesh@school.com',
    createdAt: new Date(),
  },
  {
    _id: '2',
    name: 'Priya Singh',
    id: 'STU002',
    grade: '10B',
    aadhar: '234567890123',
    phone: '9876543211',
    email: 'priya@school.com',
    createdAt: new Date(),
  },
];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // API: Get all students
  if (pathname === '/api/students' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(studentsDB));
    return;
  }

  // API: Add student
  if (pathname === '/api/students' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const student = JSON.parse(body);
        const newStudent = {
          _id: String(Date.now()),
          ...student,
          createdAt: new Date(),
        };
        studentsDB.push(newStudent);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newStudent));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }

  // API: Delete student
  if (pathname === '/api/students' && req.method === 'DELETE') {
    const studentId = query.studentId;
    const index = studentsDB.findIndex((s) => s._id === studentId);
    if (index >= 0) {
      studentsDB.splice(index, 1);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ deleted: 1 }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not found' }));
    }
    return;
  }

  // API: Lookup student
  if (pathname === '/api/lookup' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const { searchId } = JSON.parse(body);
        const student = studentsDB.find((s) =>
          s.id.toLowerCase().includes(searchId.toLowerCase())
        );
        if (student) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(student));
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Not found' }));
        }
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }

  // Serve static files
  let filePath = '.' + pathname;
  if (pathname === '/') filePath = './index.html';

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
  };

  const contentType = mimeTypes[extname] || 'text/html';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404);
      res.end('Not found', 'utf-8');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`\n✅ Test Server Running!`);
  console.log(`\n📍 Open your browser: http://localhost:${PORT}`);
  console.log(`\n📊 Pre-loaded test data:`);
  console.log(`   - Rajesh Kumar (STU001)`);
  console.log(`   - Priya Singh (STU002)`);
  console.log(`\n🧪 Try:`);
  console.log(`   1. Add new students`);
  console.log(`   2. Search by ID`);
  console.log(`   3. Delete records`);
  console.log(`   4. Open in multiple windows for multi-user test`);
  console.log(`\n📝 API Endpoints:`);
  console.log(`   GET  http://localhost:3000/api/students`);
  console.log(`   POST http://localhost:3000/api/students`);
  console.log(`   DELETE http://localhost:3000/api/students?studentId=id`);
  console.log(`   POST http://localhost:3000/api/lookup`);
  console.log(`\n`);
});
