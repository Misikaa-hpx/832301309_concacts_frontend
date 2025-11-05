// frontend/js/main.js
const BASE_URL = "http://127.0.0.1:5000/api";
function showLogin() {
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('admin-section').style.display = 'none';
}

function showRegister() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'block';
    document.getElementById('admin-section').style.display = 'none';
}

function showAdmin() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('admin-section').style.display = 'block';
    loadStudents();
}

async function register() {
    const res = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: document.getElementById('reg-username').value,
            password: document.getElementById('reg-password').value
        })
    });
    const data = await res.json();
    alert(data.msg);
    if (data.status === 'success') showLogin();
}

async function login() {
    const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: document.getElementById('login-username').value,
            password: document.getElementById('login-password').value
        })
    });
    const data = await res.json();
    alert(data.msg);
    if (data.status === 'success') showAdmin();
}

async function loadStudents() {
    const res = await fetch(`${BASE_URL}/students`);
    const students = await res.json();
    const tbody = document.getElementById('student-list');
    tbody.innerHTML = '';
    students.forEach(s => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${s.name}</td>
            <td>${s.fzu_num}</td>
            <td>${s.miec_num}</td>
            <td>${s.phone_num}</td>
            <td>
                <button class="btn btn-warning btn-sm me-1" onclick="showEditModal('${s.name}', '${s.fzu_num}', '${s.miec_num}', '${s.phone_num}')">edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteStudent('${s.name}')">deleted</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function addStudent() {
    const res = await fetch(`${BASE_URL}/add_student`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: document.getElementById('stu-name').value,
            fzu_num: document.getElementById('stu-fzu_num').value,
            miec_num: document.getElementById('stu-miec_num').value,
            phone_num: document.getElementById('stu-phone_num').value
        })
    });
    const data = await res.json();
    alert(data.msg);
    loadStudents();
}

async function deleteStudent(name) {
    const res = await fetch(`${BASE_URL}/delete_student`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name })
    });
    const data = await res.json();
    alert(data.msg);
    loadStudents();
}

function showEditModal(oldName, fzu_num, miec_num, phone_num) {
    const newName = prompt("New name:", oldName);
    if (!newName) return;

    const newFzu = prompt("New FZU number:", fzu_num);
    const newMiec = prompt("New MIEC number:", miec_num);
    const newPhone = prompt("New phone number:", phone_num);

    editStudent(oldName, newName, newFzu, newMiec, newPhone);
}

async function editStudent(old_name, name, fzu_num, miec_num, phone_num) {
    const res = await fetch(`${BASE_URL}/update_student`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ old_name, name, fzu_num, miec_num, phone_num })
    });
    const data = await res.json();
    alert(data.msg);
    loadStudents();
}

function logout() {
    showLogin();
}
