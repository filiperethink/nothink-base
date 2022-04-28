import Firebase, { db } from "./firebaseConfig.js";

Firebase.getDocs(Firebase.collection(db, "notes")).then((result) => {
  result.forEach((doc) => {
    console.log(doc.data());
  });
});
