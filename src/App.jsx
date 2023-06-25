import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, query, where, orderBy, limit, doc, setDoc, addDoc, collection } from "firebase/firestore";



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

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


// function addCollection() {
//   JSONdata.forEach(element => addDocument(element))
// }


// async function addDocument(element) {
//   await addDoc(collection(db, "log"), {
//     date: new Date(element.date),
//     hours: element.hours,
//     notes: element.notes
// })
// .then(() => {
//     console.log("Document successfully written!");
// })
// .catch((error) => {
//     console.error("Error writing document: ", error);
// });
// }


// const codelog = await getDocs(collection(db, "log"));
// codelog.forEach((doc) => {
//   console.log(doc.data())
// })

// const ten = await getDocs(query(collection(db, "log")
//   .orderBy("date")
//   .limit(10)))



const logRef = collection(db, "log")

const q = query(logRef, orderBy("date", "desc"), limit(10))
const qSnapshot = await getDocs(q)
qSnapshot.forEach((doc) => {
  console.log(doc.data())
})

function click() {
  console.log(q.data())
}

const querySnapshot = await getDocs(collection(db, "log"));
const totalCount = querySnapshot.size;

// async function addEntry() {
//   await setDoc(doc(logRef), {
//     date: xx,
//     hours: xxx,
//     notes: xxxx
//   });
// }

function App() {

  return (
    <>
      <div>You have been coding for {totalCount} days!</div>
      
      <button className='btn ' onClick={click}>click me</button>

      <div className='flex flex-col items-center border border-gray-200'>
        <label htmlFor="date">date</label>
        <input type="date" name="date" id="date" className='border'/>
        <label htmlFor="hours">hours</label>
        <input type="number" name="hours" id="hours" className='border' />
        <label htmlFor="notes">notes</label>
        <input type="text" name="" id="" className='border'/>
        <button className='outline rounded-full py-3 px-5 my-5'>log entry</button>

      </div>
    </>
  )
}

export default App
