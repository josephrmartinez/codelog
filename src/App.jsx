import { useState } from 'react'
import { format } from 'date-fns'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp, getDocs, query, where, orderBy, limit, doc, setDoc, addDoc, collection } from "firebase/firestore";

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
      onClick={() => console.log(typeof each.date)}
      title={format((new Date(each.date.seconds * 1000)), 'EEEE, MMMM do')}>{each.hours}</div>
    )
  })

const querySnapshot = await getDocs(collection(db, "log"));
const totalCount = querySnapshot.size;

function App() {
  const [studyDate, setStudyDate] = useState(new Date().toISOString().split('T')[0])
  const [hours, setHours] = useState(0)
  const [notes, setNotes] = useState("")

async function addEntry() {
  if (hours === 0) {
    return; // Return early if hours is 0
  }

  const date = new Date(studyDate);
  const timestamp = Timestamp.fromDate(date);
    
  try {
    await setDoc(doc(logRef), {
      date: timestamp,
      hours: hours,
      notes: notes
    });

    console.log('Firestore database update successful');
    setNotes("")
    setHours(0)
  } catch (error) {
    console.error('Error updating Firestore database:', error);
  }
}

  return (
    <>
      <div>You have been coding for {totalCount} days!</div>
      
      <div className='flex flex-col items-center'>
      <div className='grid grid-cols-7 grid-rows-[repeat(11,_minmax(0,_1fr))] grid-flow-row w-80 h-[32rem] gap-2'>
          {log}
    
<button className="opacity-100 cursor-pointer bg-gray-200 outline rounded-md shadow-lg" onClick={()=>window.my_modal_1.showModal()}>+</button>

<dialog id="my_modal_1" className="modal">
<form method="dialog" className="modal-box">
<div className='flex flex-col items-center'>
  <div className='font-semibold mb-5'>log session</div>
  <div className='flex flex-row '><input
    type="date"
    name="date"
    id="date"
    value={studyDate}
    onChange={(e) => setStudyDate(e.target.value)}
    className='border p-2' />
  
  <input
    type="number"
    name="hours"
    autoFocus
    placeholder="hours"
    id="hours"
    value={hours}
    onChange={(e) => setHours(e.target.value)}
    className='border p-2 w-20 ml-2' />
  </div>
  <textarea
    placeholder="notes"
    className='border my-2 w-60 p-2'
    value={notes}
    onChange={(e) => setNotes(e.target.value)}/>
  
</div>
              

    <div className="modal-action">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-ghost">Close</button>
      <button className="btn btn-outline" onClick={() => addEntry()}>Submit</button>
      
    </div>
  </form>
</dialog>

      </div>
      </div>      
    </>
  )
}

export default App
