window.addEventListener("DOMContentLoaded", getStudents);

const api = "https://crudcrud.com/api/5fac1b2d58204b76a7ee9a3a044386aa/students";

const form = document.getElementById("studentForm");
const stuDiv = document.getElementById("students");
const count = document.getElementById("count");

let editId = null;

form.addEventListener("submit", saveStudent);

async function saveStudent(e) {
  e.preventDefault();

  const student = {
    name: document.getElementById("name").value,
    mobile: document.getElementById("mobile").value,
    address: document.getElementById("address").value
  };

  try {
    if (editId) {
      await axios.put(`${api}/${editId}`, student);
      editId = null;
    }
    else {
      await axios.post(api, student);
    }

    form.reset();
    getStudents();
  } catch (err) {
    console.log(err);
  }
}

async function getStudents() {
  try {
    const res = await axios.get(api);
    const students = res.data;

    stuDiv.innerHTML = "";

    count.innerText = `Total Students : ${students.length <= 9 ? '0' + students.length : students.length}`;

    students.forEach((student) => {
      stuDiv.innerHTML += `<div class="student">
                    <div>
                      <h3>${student.name}</h3>
                      <p>${student.mobile}</p>
                      <p>${student.address}</p>
                    </div>

                    <div class="actions">
                         <button class="edit" onclick="editStudent('${student._id}')">
                           Edit 
                         </button>

                         <button class="delete" onclick="deleteStudent('${student._id}')">
                             Delete 
                         </button>
                    </div>
              </div>`;
    });
  } catch (err) {
    console.log(err);
  }
}


// Delete function 

async function deleteStudent(id) {
  try {
    await axios.delete(`${api}/${id}`);

    getStudents();
  } catch (err) {
    console.log(err);
  }
}

//Edit function

async function editStudent(id) {
  try {
    const res = await axios.get(api);

    const student = res.data.find((s) => s._id === id);

    document.getElementById("name").value = student.name;
    document.getElementById("mobile").value = student.mobile;
    document.getElementById("address").value = student.address;

    editId = id;
  } catch (err) {
    console.log(err);
  }
}
