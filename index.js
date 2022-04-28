import Firebase, { db } from "./firebaseConfig.js";
const listNotes = document.getElementById("list-notes");
const isLoadingElement = document.getElementById("isLoading");

async function getNotes() {
  const notes = await Firebase.getDocs(Firebase.collection(db, "notes"));
  return notes.docs.map((doc) => doc.data());
}

function renderNotes(notes) {
  notes.forEach((note) => {
    let tmp = document.createElement("li");
    tmp.innerHTML = note.title;
    listNotes.appendChild(tmp);
  });
}

async function initApp() {
  isLoadingElement.innerHTML = "Loading...";
  const notes = await getNotes();
  document.body.removeChild(isLoadingElement);
  renderNotes(notes);
}

initApp();
