import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import './App.css'
import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp, getDocs, query, orderBy, limit, doc, setDoc, addDoc, collection, getCountFromServer } from "firebase/firestore";

function App() {
  const [studyDate, setStudyDate] = useState(new Date().toISOString().split('T')[0]);
  const [hours, setHours] = useState(0);
  const [notes, setNotes] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [log, setLog] = useState([]);



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
  

  useEffect(() => {
    const fetchLogData = async () => {
      const q = query(logRef, orderBy("date", "desc"), limit(76))
      const qSnapshot = await getDocs(q);

      const logData = qSnapshot.docs.reverse().map((doc) => {
        const data = doc.data();
        let op;
        if (data.hours < 1) {
          op = 'border-green-600 opacity-80  from-green-300 to-green-600';
        } else if (data.hours >= 1 && data.hours <= 1.5) {
          op = 'border-green-700 opacity-90 from-green-400 to-green-700';
        } else if (data.hours > 1.5 && data.hours <= 2) {
          op = 'border-green-800 from-green-500 to-green-800';
        } else {
          op = 'border-green-900 from-green-700 to-green-900';
        }
        return {
          id: doc.id,
          data,
          opacity: op,
        };
      });

      return logData;
    };
  

    const fetchLogDataAndCount = async () => {
      const snapshot = await getCountFromServer(logRef);
      const totalCount = snapshot.data().count;
      setTotalCount(totalCount);

      const logData = await fetchLogData();
      setLog(logData);
    };
    fetchLogDataAndCount();
  }, []);
  


const logItems = log.map((item) => (
  <div
    key={item.id}
    className={`${item.opacity} bg-gradient-to-br border rounded-md shadow-lg`}
    onClick={() => console.log(typeof item.data.date)}
    title={`${format(item.data.date.toDate(), "EEEE, MMMM do")} - ${item.data.hours} hours`}
  >
  
  </div>
));



async function addEntry() {
  if (hours === 0) {
    return;
  }

  const date = new Date(studyDate);
  const timestamp = Timestamp.fromDate(date);

  try {
    await setDoc(doc(logRef), {
      date: timestamp,
      hours: hours,
      notes: notes,
    });

    console.log("Firestore database update successful");
    setNotes("");
    setHours(0);
  } catch (error) {
    console.error("Error updating Firestore database:", error);
  }
}

  return (
    <>
      <div>You have been coding for {totalCount} days!</div>
      
      <div className='flex flex-col items-center'>
      <div className='grid grid-cols-7 grid-rows-[repeat(11,_minmax(0,_1fr))] grid-flow-row w-80 h-[32rem] gap-2'>
          {logItems}
    
          <button
            className="opacity-100 cursor-pointer from-gray-200 to-gray-400 bg-gradient-to-br border border-gray-400 rounded-md shadow-lg flex flex-col items-center justify-center"
            onClick={() => window.my_modal_1.showModal()}>
            <span className='font-semibold text-white text-3xl'>+</span></button>

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
