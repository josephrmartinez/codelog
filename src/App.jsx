import { useState } from 'react'
import format from 'date-fns/format'
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

// Initialize Cloud Firestore and get a reference to the service and log collection
const db = getFirestore(app);
const logRef = collection(db, "log")

const q = query(logRef, orderBy("date", "desc"), limit(76))
const qSnapshot = await getDocs(q)

let logItems = []


qSnapshot.forEach((doc) => {
  logItems.unshift(doc.data())
})


const log = logItems.map((each, index) => {
  
  let op;
  if (each.hours < 1) {
    op = 50;
  } else if (each.hours >= 1 && each.hours <= 1.5) {
    op = 80;
  } else if (each.hours > 1.5 && each.hours <= 2) {
    op = 90;
  } else {
    op = 100;
  }
  return (
    <div key={index}
      className={`opacity-${op} bg-gradient-to-br from-green-500 to-green-800 rounded-md shadow-lg`}
      onClick={() => console.log(format((new Date(each.date.seconds * 1000)), 'EEEE, MMMM do'))}
      title={format((new Date(each.date.seconds * 1000)), 'EEEE, MMMM do')}>{each.hours}</div>
    )
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
      
      <div className='flex flex-col items-center'>
      <div className='grid grid-cols-7 grid-rows-[repeat(11,_minmax(0,_1fr))] grid-flow-row w-80 h-[32rem] gap-2'>
          {log}
          <div
      className={`opacity-10 cursor-pointer bg-gradient-to-br from-green-500 to-green-800 rounded-md shadow-lg`}
      >+</div>
      

      </div>

      </div>      
      {/* <button className='btn ' onClick={click}>click me</button> */}

      {/* <div className='flex flex-col items-center border border-gray-200'>
        <label htmlFor="date">date</label>
        <input type="date" name="date" id="date" className='border'/>
        <label htmlFor="hours">hours</label>
        <input type="number" name="hours" id="hours" className='border' />
        <label htmlFor="notes">notes</label>
        <input type="text" name="" id="" className='border'/>
        <button className='outline rounded-full py-3 px-5 my-5'>log entry</button>
      </div> */}
    </>
  )
}

export default App
