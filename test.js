#!/bin/node
// Comprehensive Test Suite for Student Database

const http = require('http');

const BASE_URL = 'http://localhost:3000';

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            data: data ? JSON.parse(data) : null,
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: data,
          });
        }
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  log('\n╔══════════════════════════════════════╗', 'cyan');
  log('║  Student Database - Test Suite     ║', 'cyan');
  log('╚══════════════════════════════════════╝\n', 'cyan');

  let passed = 0;
  let failed = 0;

  // Test 1: Get initial students
  log('\n[Test 1] Fetch initial students', 'blue');
  try {
    const res = await request('GET', '/api/students');
    if (res.status === 200 && Array.isArray(res.data)) {
      log(`✓ PASS - Found ${res.data.length} students`, 'green');
      log(`  Students: ${res.data.map((s) => s.name).join(', ')}`);
      passed++;
    } else {
      log('✗ FAIL - Invalid response', 'red');
      failed++;
    }
  } catch (error) {
    log(`✗ FAIL - ${error.message}`, 'red');
    failed++;
  }

  // Test 2: Add a new student
  log('\n[Test 2] Add new student', 'blue');
  const newStudent = {
    name: 'Anil Sharma',
    id: 'STU003',
    grade: '9A',
    aadhar: '345678901234',
    phone: '9876543212',
    email: 'anil@school.com',
  };

  try {
    const res = await request('POST', '/api/students', newStudent);
    if (res.status === 201 && res.data._id) {
      log(`✓ PASS - Student added with ID: ${res.data._id}`, 'green');
      log(`  Name: ${res.data.name}, Roll: ${res.data.id}`);
      passed++;
    } else {
      log('✗ FAIL - Failed to add student', 'red');
      failed++;
    }
  } catch (error) {
    log(`✗ FAIL - ${error.message}`, 'red');
    failed++;
  }

  // Test 3: Verify student was added
  log('\n[Test 3] Verify student was added', 'blue');
  try {
    const res = await request('GET', '/api/students');
    if (res.data.some((s) => s.id === newStudent.id)) {
      log(`✓ PASS - New student appears in database`, 'green');
      passed++;
    } else {
      log('✗ FAIL - Student not found in database', 'red');
      failed++;
    }
  } catch (error) {
    log(`✗ FAIL - ${error.message}`, 'red');
    failed++;
  }

  // Test 4: Lookup by ID
  log('\n[Test 4] Lookup student by ID', 'blue');
  try {
    const res = await request('POST', '/api/lookup', { searchId: 'STU001' });
    if (res.status === 200 && res.data.name === 'Rajesh Kumar') {
      log(`✓ PASS - Found student: ${res.data.name}`, 'green');
      log(`  ID: ${res.data.id}, Grade: ${res.data.grade}`);
      passed++;
    } else {
      log('✗ FAIL - Lookup failed', 'red');
      failed++;
    }
  } catch (error) {
    log(`✗ FAIL - ${error.message}`, 'red');
    failed++;
  }

  // Test 5: Add another student
  log('\n[Test 5] Add second test student', 'blue');
  const student2 = {
    name: 'Meera Patel',
    id: 'STU004',
    grade: '9B',
    aadhar: '456789012345',
    phone: '9876543213',
    email: 'meera@school.com',
  };

  try {
    const res = await request('POST', '/api/students', student2);
    if (res.status === 201) {
      log(`✓ PASS - Second student added`, 'green');
      passed++;
    } else {
      log('✗ FAIL - Failed to add second student', 'red');
      failed++;
    }
  } catch (error) {
    log(`✗ FAIL - ${error.message}`, 'red');
    failed++;
  }

  // Test 6: Total count after adding
  log('\n[Test 6] Verify total student count', 'blue');
  try {
    const res = await request('GET', '/api/students');
    if (res.data.length >= 4) {
      log(`✓ PASS - Total students: ${res.data.length}`, 'green');
      passed++;
    } else {
      log(`✗ FAIL - Expected >= 4 students, got ${res.data.length}`, 'red');
      failed++;
    }
  } catch (error) {
    log(`✗ FAIL - ${error.message}`, 'red');
    failed++;
  }

  // Test 7: Partial ID lookup
  log('\n[Test 7] Search with partial ID', 'blue');
  try {
    const res = await request('POST', '/api/lookup', { searchId: 'STU00' });
    if (res.status === 200 && res.data.id && res.data.id.includes('STU00')) {
      log(`✓ PASS - Partial search works: ${res.data.name}`, 'green');
      passed++;
    } else {
      log('✗ FAIL - Partial search failed', 'red');
      failed++;
    }
  } catch (error) {
    log(`✗ FAIL - ${error.message}`, 'red');
    failed++;
  }

  // Test 8: Multiple concurrent requests (Multi-user simulation)
  log('\n[Test 8] Multi-user stress test (5 concurrent requests)', 'blue');
  try {
    const promises = [];
    for (let i = 0; i < 5; i++) {
      promises.push(request('GET', '/api/students'));
    }
    const results = await Promise.all(promises);
    const allSuccess = results.every((r) => r.status === 200);
    if (allSuccess) {
      log(`✓ PASS - All 5 concurrent requests succeeded`, 'green');
      passed++;
    } else {
      log('✗ FAIL - Some concurrent requests failed', 'red');
      failed++;
    }
  } catch (error) {
    log(`✗ FAIL - ${error.message}`, 'red');
    failed++;
  }

  // Test 9: Delete student
  log('\n[Test 9] Delete a student', 'blue');
  try {
    const res = await request('GET', '/api/students');
    if (res.data.length > 0) {
      const studentToDelete = res.data[0];
      const deleteRes = await request(
        'DELETE',
        `/api/students?studentId=${studentToDelete._id}`
      );
      if (deleteRes.status === 200) {
        log(`✓ PASS - Student deleted successfully`, 'green');
        passed++;
      } else {
        log('✗ FAIL - Delete request failed', 'red');
        failed++;
      }
    }
  } catch (error) {
    log(`✗ FAIL - ${error.message}`, 'red');
    failed++;
  }

  // Summary
  log('\n╔══════════════════════════════════════╗', 'cyan');
  log('║         Test Summary                ║', 'cyan');
  log('╚══════════════════════════════════════╝', 'cyan');
  log(`\n✓ Passed: ${passed}`, 'green');
  log(`✗ Failed: ${failed}`, failed > 0 ? 'red' : 'green');
  log(`📊 Total:  ${passed + failed}\n`);

  if (failed === 0) {
    log('🎉 All tests passed! Database is ready for deployment.\n', 'green');
    log('Next steps:', 'yellow');
    log('1. Set up MongoDB Atlas account (free tier)', 'yellow');
    log('2. Create a cluster and get connection string', 'yellow');
    log('3. Deploy to Vercel with MONGODB_URI environment variable', 'yellow');
    log('4. Share the URL for multi-user access', 'yellow');
  } else {
    log('❌ Some tests failed. Check the errors above.', 'red');
  }

  process.exit(failed > 0 ? 1 : 0);
}

// Wait for server to be ready
setTimeout(runTests, 1000);
