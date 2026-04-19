const studentForm = document.getElementById('student-form');
const studentTableBody = document.getElementById('student-table-body');
const searchInput = document.getElementById('search-input');
const clearButton = document.getElementById('clear-button');
const tabButtons = document.querySelectorAll('.tab-button');
const lookupForm = document.getElementById('lookup-form');
const lookupInput = document.getElementById('lookup-id-input');
const lookupResult = document.getElementById('lookup-result');

// Auto-detect API base URL
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000'
  : '';

let students = [];
let autoRefreshInterval;

async function loadStudents() {
  try {
    const response = await fetch(`${API_BASE}/api/students`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    students = await response.json();
  } catch (error) {
    console.error('Error loading students:', error);
    if (error.message.includes('Failed to fetch')) {
      console.warn('API unavailable - using local storage fallback');
    }
  }
}

async function renderTable(filter = '') {
  const normalizedFilter = filter.trim().toLowerCase();
  studentTableBody.innerHTML = '';

  await loadStudents();

  const filtered = students.filter((student) => {
    const values = [student.name, student.id, student.grade, student.aadhar, student.phone, student.email]
      .join(' ')
      .toLowerCase();
    return values.includes(normalizedFilter);
  });

  const totalStudentsElement = document.getElementById('total-students');
  const lastAddedElement = document.getElementById('last-added');
  const searchStatusElement = document.getElementById('search-status');

  if (totalStudentsElement) {
    totalStudentsElement.textContent = students.length;
  }

  if (lastAddedElement) {
    lastAddedElement.textContent = students.length ? students[students.length - 1].name : '—';
  }

  if (searchStatusElement) {
    searchStatusElement.textContent = normalizedFilter ? `${filtered.length} results` : 'No filter';
  }

  if (filtered.length === 0) {
    const emptyRow = document.createElement('tr');
    emptyRow.innerHTML = '<td colspan="7" class="empty">No student records found.</td>';
    studentTableBody.appendChild(emptyRow);
    return;
  }

  filtered.forEach((student, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.grade}</td>
      <td>${student.aadhar}</td>
      <td>${student.phone}</td>
      <td>${student.email}</td>
      <td>
        <div class="row-actions">
          <button class="delete-btn" data-id="${student._id}">Delete</button>
        </div>
      </td>
    `;
    studentTableBody.appendChild(row);
  });
}

function renderLookupResult(student) {
  if (!student) {
    lookupResult.innerHTML = '<p>No student found with that ID or roll number.</p>';
    lookupResult.classList.remove('empty');
    return;
  }

  lookupResult.classList.remove('empty');
  lookupResult.innerHTML = `
    <strong>Student details</strong>
    <p><strong>Name:</strong> ${student.name}</p>
    <p><strong>ID / Roll Number:</strong> ${student.id}</p>
    <p><strong>Grade:</strong> ${student.grade}</p>
    <p><strong>Aadhar:</strong> ${student.aadhar}</p>
    <p><strong>Phone:</strong> ${student.phone}</p>
    <p><strong>Email:</strong> ${student.email}</p>
  `;
}

async function addStudent(event) {
  event.preventDefault();

  const name = document.getElementById('student-name').value.trim();
  const id = document.getElementById('student-id').value.trim();
  const grade = document.getElementById('student-grade').value.trim();
  const aadhar = document.getElementById('student-aadhar').value.trim();
  const phone = document.getElementById('student-phone').value.trim();
  const email = document.getElementById('student-email').value.trim();

  if (!name || !id || !grade || !aadhar || !phone || !email) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/api/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, id, grade, aadhar, phone, email }),
    });

    if (response.ok) {
      await renderTable(searchInput.value);
      studentForm.reset();
    } else {
      console.error('Error adding student');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function deleteStudent(studentId) {
  try {
    const response = await fetch(`${API_BASE}/api/students?studentId=${studentId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      await renderTable(searchInput.value);
    } else {
      console.error('Error deleting student');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function clearAllStudents() {
  if (!students.length) return;
  const confirmed = confirm('Clear all student records?');
  if (!confirmed) return;

  for (const student of students) {
    try {
      await fetch(`${API_BASE}/api/students?studentId=${student._id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  }

  await renderTable(searchInput.value);
}

function switchTab(tabId) {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === tabId;
    button.classList.toggle('active', isActive);
  });

  document.querySelectorAll('.tab-content').forEach((content) => {
    content.classList.toggle('active', content.id === tabId);
  });
}

async function findStudentById(query) {
  const normalizedQuery = query.trim();
  if (!normalizedQuery) return null;

  try {
    const response = await fetch(`${API_BASE}/api/lookup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ searchId: normalizedQuery }),
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error:', error);
  }

  return null;
}

studentForm.addEventListener('submit', addStudent);
clearButton.addEventListener('click', clearAllStudents);
studentTableBody.addEventListener('click', (event) => {
  const target = event.target;
  if (target.matches('.delete-btn')) {
    const studentId = target.dataset.id;
    deleteStudent(studentId);
  }
});

searchInput.addEventListener('input', () => {
  renderTable(searchInput.value);
});

tabButtons.forEach((button) => {
  button.addEventListener('click', () => switchTab(button.dataset.tab));
});

lookupForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const lookupValue = lookupInput.value.trim();
  const student = await findStudentById(lookupValue);
  renderLookupResult(student);
});

loadStudents();
renderTable();
renderLookupResult(null);

autoRefreshInterval = setInterval(() => {
  renderTable(searchInput.value);
}, 5000);

