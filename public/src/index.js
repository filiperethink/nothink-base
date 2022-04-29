import Firebase, { db } from "./firebaseConfig.js";
const listNotes = document.getElementById("list-notes");
const isLoadingElement = document.getElementById("isLoading");
const btnCreateElement = document.getElementById("btnCreate");
const contentElement = document.getElementById("content");
const wrapperElement = document.getElementById("main-wrapper");
let notes = [];

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

function renderNote(note) {
  console.log({ note });
  contentElement.innerHTML = `
    <h4 class="note-title">${note.title}</h4>
    <p class="note-description">${note.description}</p>
  `;
}

function addEventsToItens() {
  document.querySelectorAll("#cardItem").forEach((note) => {
    note.addEventListener("click", () => {
      const selectedCardId = note.attributes.tagName.nodeValue;
      renderNote(notes.filter((n) => n.id === selectedCardId)[0]);
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
  isLoadingElement.innerHTML = "Carregando...";
  notes = await getNotes();
  wrapperElement.removeChild(isLoadingElement);

  renderNotes(notes);
  addEventsToItens();
}

initApp();
