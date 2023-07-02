import { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import './App.css'
import { app, db } from "./Firebase";
import { getDocs, query, orderBy, limit, doc, setDoc, addDoc, collection, getCountFromServer } from "firebase/firestore";
import { DateTime } from 'luxon';



function App() {
  const [studyDate, setStudyDate] = useState(DateTime.now().toFormat("yyyy'-'LL'-'dd"));
  const [hours, setHours] = useState(0);
  const [notes, setNotes] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [log, setLog] = useState([]);

// Initialize Firebase logRef
  const logRef = collection(db, "log")
  

  useEffect(() => {
    const fetchLogData = async () => {
      const q = query(logRef, orderBy("date", "desc"), limit(12))
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
    title={`${format(parseISO(item.data.date), "EEEE, MMMM do")} - ${item.data.hours} hours`}
  >
  </div>
));

async function addEntry() {
  if (hours === 0) {
    return;
  }

  try {
    await addDoc(collection(db, "log"), {
      date: studyDate,
      hours: hours,
      notes: notes,
    });

    console.log("Firestore database updated successful");
    setNotes("");
    setHours(0);
    fetchLogDataAndCount()
  } catch (error) {
    console.error("Error updating Firestore database:", error);
  }
}

  return (
    <>
      <div className='mb-6 font-light text-lg'>{totalCount} days of code</div>
      <div className='flex flex-col items-center'>
      <div className='grid grid-cols-7 grid-rows-[repeat(11,_minmax(0,_1fr))] grid-flow-row w-80 h-[32rem] gap-2'>
          {logItems}
    
          

      </div>
      </div>
    </>
  )
}

export default App
