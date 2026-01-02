window.onload = function() {
  let btnEntrez = document.getElementById("btn");

 
    const users = [
      { id: 1, nom: "Amine", prenom: "Sakhri", group: "IDOSR201", motDePasse: "amine123" },
      { id: 2, nom: "Sara", prenom: "Elalami", group: "IDOSR201", motDePasse: "sara123" },
      { id: 3, nom: "Yassine", prenom: "Benali", group: "IDOSR202", motDePasse: "yassine123" },
      { id: 4, nom: "Khadija", prenom: "Amrani", group: "IDOSR202", motDePasse: "khadija123" },
      { id: 5, nom: "Omar", prenom: "Fassi", group: "IDOSR203", motDePasse: "omar123" },
    ];
    localStorage.setItem("users", JSON.stringify(users));


   const presences = [
  { id: 1, date: "2024-01-10", statut: "present" },
  { id: 1, date: "2024-01-11", statut: "retard", heure: "09:15" },
  { id: 1, date: "2024-01-12", statut: "absent", motif: "Maladie" },

  { id: 2, date: "2024-01-10", statut: "present" },
  { id: 2, date: "2024-01-11", statut: "absent" },

  { id: 3, date: "2024-01-10", statut: "retard", heure: "09:50" },

  { id: 4, date: "2024-01-10", statut: "present" },
  { id: 4, date: "2024-01-11", statut: "retard", heure: "09:40" },
  { id: 4, date: "2024-01-12", statut: "absent", motif: "Maladie" },

  { id: 5, date: "2024-01-10", statut: "present" },
  { id: 5, date: "2024-01-11", statut: "present" },
  { id: 5, date: "2024-01-12", statut: "retard", heure: "09:15" },
  { id: 5, date: "2024-01-13", statut: "absent", motif: "Rendez-vous" }
];

localStorage.setItem("presences", JSON.stringify(presences));


localStorage.setItem("presences", JSON.stringify(presences));





  


  if (btnEntrez) {
    btnEntrez.onclick = function () {
      const id = Number(document.getElementById("idApp").value);
      const motDePasse = document.getElementById("mp").value;

      const users = JSON.parse(localStorage.getItem("users"));
      let ETR = false;

      for (let i = 0; i < users.length; i++) {
        if (id === users[i].id && motDePasse === users[i].motDePasse) {    
          ETR = true;
          localStorage.setItem("user", JSON.stringify(users[i]));
          alert (`BIENVENU ${users[i].nom} ${users[i].prenom} DANS L’ESPACE ÉTUDIANT`);
          window.location.href = "espaceEtudiant.html";
          break;
        }
      }

      if (!ETR) {
        alert("ID ou mot de passe incorrect");

      }
    };
  }

 const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const name = document.getElementById("name");
    const message = document.getElementById("message");

    if (name) name.textContent = `${user.nom} ${user.prenom}`;
    if (message) message.textContent = `BIENVENU ${user.nom} ${user.prenom} DANS L’ESPACE ÉTUDIANT`;

  } else { 
      window.location.href = "espaceEtudiant.html";
    }
}
// ----------------------- partie  profil ----------------------------------
// let nom = document.getElementById("nom");
// let prenom = document.getElementById("prenom");
// let group = document.getElementById("group");
// let statut = document.getElementById("statut");

// let bttn = document.getElementById("bttn");

// if (bttn) {
//   bttn.onclick = function () {
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (user) {
//       if (nom) nom.textContent = user.nom;
//       if (prenom) prenom.textContent = user.prenom;
//       if (group) group.textContent = user.group;
     
//     } else {
//       window.location.href = nterface1.html;
//     }
//   };
// }