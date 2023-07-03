import { ResponsiveTimeRange } from '@nivo/calendar'
import { DateTime } from 'luxon';
import { useState, useEffect } from 'react';
import { db } from "./firebase.js";
import { getCountFromServer, collection, query, getDocs, orderBy, limit, addDoc } from 'firebase/firestore';


// get the first and last day of the month for start and end dates
const dt = DateTime.now()
const currentMonth = DateTime.local().month;
const nextMonth = DateTime.local().set({ month: currentMonth + 1 });


export default function Test() {
    const [logData, setLogData] = useState([])
    const [firstDay, setFirstDay] = useState(dt.startOf('month').toFormat("yyyy'-'LL'-'dd"))
    const [lastDay, setLastDay] = useState(nextMonth.toFormat("yyyy'-'LL'-'dd"))
    const [inputDate, setInputDate] = useState(dt.toFormat("yyyy'-'LL'-'dd"))
    const [inputHours, setInputHours] = useState(0)
    const [inputNotes, setInputNotes] = useState("")
    const [totalCount, setTotalCount] = useState(0)
    const [displayData, setDisplayData] = useState({})

    async function getCount() {
        const logRef = collection(db, "log");
        const snapshot = await getCountFromServer(logRef);
        const totalCount = snapshot.data().count;
        setTotalCount(totalCount);
      }

    async function fetchData() {
        console.log("fetching data")
        const logRef = collection(db, "log");
        const q = query(logRef, orderBy("day", "desc"), limit(dt.day))
        const QuerySnapshot = await getDocs(q);

        const qSnapshotArray = QuerySnapshot.docs.map((doc) => doc.data());
        setLogData(qSnapshotArray);
    }

    useEffect(() => {
        getCount();
    }, []);


    useEffect(() => {    
        fetchData();
    },[]);
        
    async function addEntry() {
        if (hours === 0) {
        return;
        }
        try {
        await addDoc(collection(db, "log"), {
            day: inputDate,
            value: inputHours,
            notes: inputNotes,
        });
        console.log("Firestore database updated successful");
        } catch (error) {
        console.error("Error updating Firestore database:", error);
        } finally {
        setInputHours(0)
        setInputNotes("")
        getCount()
        fetchData()
        }
    }

    return (
        <div className='h-full w-full flex flex-col items-center'>
            <div className='font-bold text-xl mt-12'>{totalCount} days of code</div>
            <div className='w-80 h-80 flex flex-col items-center'>
            <ResponsiveTimeRange
                    data={logData}
                    from={firstDay}
                    to={lastDay}
                    align='center'
                    margin={{top: -40, }}
                    emptyColor="#eeeeee"
                    dayRadius={100}
                    colors={[ '#C6F6D5', '#9AE6B4', '#48BB78', '#2F855A' ]}
                    weekdayTicks={[]}
                    dayBorderWidth={6}
                    direction='vertical'
                    dayBorderColor="#ffffff"
                    tooltip={() => null}
                    onClick={(day, event) => {setDisplayData(day); window.my_modal_2.showModal() }}  
                />
            </div>

            <div
            className="btn btn-ghost text-3xl my-4 text-gray-400"
            onClick={() => window.my_modal_1.showModal()}>
            +</div>


            <dialog id="my_modal_1" className="modal">
            <form method="dialog" className="modal-box">
            <div className='flex flex-col items-center'>
            <div className='font-semibold mb-5'>log session</div>
            <div className='flex flex-row '><input
                type="date"
                name="date"
                id="date"
                autoFocus={false}
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
                className='border p-2' />
            
            <input
                type="number"
                name="hours"
                autoFocus={true}
                placeholder="hours"
                id="hours"
                value={inputHours}
                onChange={(e) => setInputHours(e.target.value)}
                className='border p-2 w-20 ml-2' />
            </div>
            <textarea
                placeholder="notes"
                className='border my-2 w-60 p-2'
                value={inputNotes}
                onChange={(e) => setInputNotes(e.target.value)}/>
            
            </div>
                <div className="modal-action">
                <button className="btn btn-ghost">Close</button>
                <button className="btn btn-outline" onClick={() => addEntry()}>Submit</button>
                </div>
            </form>
            </dialog>

            <dialog id="my_modal_2" className="modal">
            <form method="dialog" className="modal-box">
            <div className='flex flex-col items-center'>
                <div className='font-semibold mb-5'>session</div>
                <div className='flex flex-row justify-between w-60 mb-4'>
                    <div>{DateTime.fromISO(displayData.day).toFormat("ccc, MMMM d")}</div>
                    <div>{displayData.value} hours</div>
                </div>
                <div className='border my-2 w-60 p-2'>{displayData.notes}</div>
            
            </div>
                <div className="modal-action">
                <button className="btn btn-ghost">Close</button>
                </div>
            </form>
            </dialog>

                </div>
        
    )
}