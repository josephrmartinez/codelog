const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

const JSONData = require('./logdata.json');
    
const firebaseConfig = {
  apiKey: "AIzaSyAWO2mWmHzTQp7P0htw0pN4NR-K3Ze95xo",
  authDomain: "codelog-3bf8d.firebaseapp.com",
  projectId: "codelog-3bf8d",
  storageBucket: "codelog-3bf8d.appspot.com",
  messagingSenderId: "39429202746",
  appId: "1:39429202746:web:45ae4739c0bc19a4212603"
};

// Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const logRef = collection(db, "log")

  async function buildCollection(json) {
  try {
    for (const element of json) {
      await addDoc(collection(db, "log"), {
        day: element.day,
        value: element.value,
        notes: element.notes
      });
      console.log("Document successfully written!");
    }
  } catch (error) {
    console.error("Error writing document: ", error);
  }
  }


buildCollection(JSONData)

