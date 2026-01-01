// Initialize state from LocalStorage or empty array
let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = null;

// Initial display call
displayStudents();

function handleFormSubmit() {
    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;
    let course = document.getElementById("course").value;

    if (!name || !roll || !course) {
        alert("Please fill all fields!");
        return;
    }

    const studentData = { name, roll, course };

    if (editIndex !== null) {
        // Update existing student
        students[editIndex] = studentData;
        editIndex = null;
        document.getElementById("submitBtn").innerText = "Add Student";
        document.getElementById("submitBtn").style.background = "#27ae60";
    } else {
        // Add new student
        students.push(studentData);
    }

    saveAndRefresh();
    clearInputs();
}

function displayStudents(filterData = null) {
    let table = document.getElementById("studentTable");
    let displayList = filterData || students;
    table.innerHTML = "";

    displayList.forEach((student, index) => {
        table.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.roll}</td>
                <td>${student.course}</td>
                <td>
                    <button class="btn-edit" onclick="editStudent(${index})"><i class="fas fa-edit"></i></button>
                    <button class="btn-delete" onclick="deleteStudent(${index})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });

    document.getElementById("totalCount").innerText = students.length;
}

function deleteStudent(index) {
    if(confirm("Are you sure you want to delete this record?")) {
        students.splice(index, 1);
        saveAndRefresh();
    }
}

function editStudent(index) {
    let s = students[index];
    document.getElementById("name").value = s.name;
    document.getElementById("roll").value = s.roll;
    document.getElementById("course").value = s.course;
    
    editIndex = index;
    document.getElementById("submitBtn").innerText = "Update Student";
    document.getElementById("submitBtn").style.background = "#f39c12";
}

function searchStudents() {
    let term = document.getElementById("searchInput").value.toLowerCase();
    let filtered = students.filter(s => 
        s.name.toLowerCase().includes(term) || 
        s.roll.toLowerCase().includes(term)
    );
    displayStudents(filtered);
}

function saveAndRefresh() {
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}

function clearInputs() {
    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("course").value = "";
}

function exportToCSV() {
    let csvContent = "data:text/csv;charset=utf-8,Name,Roll No,Course\n";
    students.forEach(s => {
        csvContent += `${s.name},${s.roll},${s.course}\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "student_records.csv");
    document.body.appendChild(link);
    link.click();
}