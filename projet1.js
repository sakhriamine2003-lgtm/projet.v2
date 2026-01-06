let students = JSON.parse(localStorage.getItem("students")) || [];
let attendance = JSON.parse(localStorage.getItem("attendance")) || [];
let editId = null;

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");

  if (id === "history") loadHistory();
  if (id === "stats") loadStats();
}

function openModal() {
  editId = null;
  document.getElementById("nom").value = "";
  document.getElementById("prenom").value = "";
  document.getElementById("groupe").value = "";
  document.getElementById("mdp").value = "";
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

function saveStudent() {
  const nom = document.getElementById("nom").value.trim();
  const prenom = document.getElementById("prenom").value.trim();
  const groupe = document.getElementById("groupe").value.trim();
  const motDePasse = document.getElementById("mdp").value.trim();

  if (!nom || !prenom || !groupe || !motDePasse) {
    alert("Veuillez remplir tous les champs");
    return;
  }

  if (editId) {
    students = students.map(s =>
      s.id === editId ? { ...s, nom, prenom, groupe, motDePasse } : s
    );
  } else {
    students.push({
      id: Date.now(),
      nom,
      prenom,
      groupe,
      motDePasse
    });
  }

  localStorage.setItem("students", JSON.stringify(students));
  closeModal();
  renderStudents();
}

function deleteStudent(id) {
  if (!confirm("Êtes-vous sûr de vouloir supprimer cet apprenant ?")) return;

  students = students.filter(s => s.id !== id);
  localStorage.setItem("students", JSON.stringify(students));
  renderStudents();
}

function editStudent(id) {
  const s = students.find(x => x.id === id);
  if (!s) return;

  editId = id;
  document.getElementById("nom").value = s.nom;
  document.getElementById("prenom").value = s.prenom;
  document.getElementById("groupe").value = s.groupe;
  document.getElementById("mdp").value = s.motDePasse;
  document.getElementById("modal").classList.remove("hidden");
}

function renderStudents() {
  const tbody = document.getElementById("studentsTable");
  tbody.innerHTML = "";

  students.forEach(s => {
    tbody.innerHTML += `
      <tr>
        <td class="border p-2">${s.nom}</td>
        <td class="border p-2">${s.prenom}</td>
        <td class="border p-2">${s.groupe}</td>
        <td class="border p-2">${s.motDePasse}</td>
        <td class="border p-2 text-center space-x-2">
          <button onclick="editStudent(${s.id})" class="text-blue-600">✏️</button>
          <button onclick="deleteStudent(${s.id})" class="text-red-600">🗑</button>
        </td>
      </tr>
    `;
  });
}

function loadAttendanceList() {
  const tbody = document.getElementById("attendanceTable");
  tbody.innerHTML = "";

  students.forEach(s => {
    tbody.innerHTML += `
      <tr>
        <td class="border p-2">${s.nom}</td>
        <td class="border p-2">${s.prenom}</td>
        <td class="border p-2">${s.groupe}</td>
        <td class="border p-2">${s.motDePasse}</td>
        <td class="border p-2 text-center space-x-1">
          <button onclick="mark(${s.id}, 'present')" class="bg-green-500 text-white px-2 py-1 rounded">Présent</button>
          <button onclick="mark(${s.id}, 'absent')" class="bg-red-500 text-white px-2 py-1 rounded">Absent</button>
          <button onclick="mark(${s.id}, 'late')" class="bg-yellow-500 text-white px-2 py-1 rounded">En retard</button>
        </td>
      </tr>
    `;
  });
}

function mark(studentId, status) {
  attendance.push({
    id: Date.now(),
    studentId,
    status,
    date: new Date().toISOString().split("T")[0]
  });

  localStorage.setItem("attendance", JSON.stringify(attendance));
  alert("Présence enregistrée avec succès");
}

function loadHistory() {
  const box = document.getElementById("historyList");
  box.innerHTML = "";

  attendance.forEach(a => {
    const s = students.find(st => st.id === a.studentId);
    box.innerHTML += `
      <div class="border p-3 mb-2 rounded">
        <b>${s ? s.nom + " " + s.prenom : "—"}</b><br>
        Date : ${a.date}<br>
        Statut : ${a.status}
      </div>
    `;
  });
}

function loadStats() {
  document.getElementById("stat-present").textContent =
    attendance.filter(a => a.status === "present").length;

  document.getElementById("stat-absent").textContent =
    attendance.filter(a => a.status === "absent").length;

  document.getElementById("stat-late").textContent =
    attendance.filter(a => a.status === "late").length;
}

renderStudents();