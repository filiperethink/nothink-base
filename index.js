import Firebase, { db } from "./firebaseConfig.js";
const listNotes = document.getElementById("list-notes");
const isLoadingElement = document.getElementById("isLoading");
const btnCreateElement = document.getElementById("btnCreate");

async function getNotes() {
  const notes = await Firebase.getDocs(Firebase.collection(db, "notes"));

  return notes.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
}

function renderNotes(notes) {
  notes.forEach((note) => {
    listNotes.innerHTML += `
      <li class="card" id="cardItem" tagName="${note.id}">
        <h4 class="card-title">${note.title}</h4>
        <p class="card-description">${note.description}</p>
      </li>
    `;
  });
}

function addEventsToItens() {
  document.querySelectorAll("#cardItem").forEach((note) => {
    note.addEventListener("click", () => {
      document
        .querySelectorAll("#cardItem")
        .forEach((note) => (note.classList = "card"));
      if (note.classList.contains("card-selected")) {
        note.classList = "card";
      } else {
        note.classList += " card-selected";
      }
    });
    note.classList = "card";
  });
}

async function initApp() {
  isLoadingElement.innerHTML = "Loading...";
  const notes = await getNotes();
  document.body.removeChild(isLoadingElement);
  renderNotes(notes);
  addEventsToItens();
}

initApp();
