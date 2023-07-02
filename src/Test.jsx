import { ResponsiveTimeRange } from '@nivo/calendar'
import { DateTime } from 'luxon';
import { useState, useEffect } from 'react';
import { db } from "./Firebase.js";
import { getCountFromServer, collection } from 'firebase/firestore';

const data = [
    {
        day: "2023-06-01",
        value: 1,
        notes: "Finish blog post on travelai project, post to linkedin, adplist mentorship session, updates to personal website"
      },
      {
        day: "2023-06-02",
        value: 2,
        notes: "Work with impulse dev tool, styling updates to reactions journal and self empathy app"
      },
      {
        day: "2023-06-03",
        value: 1,
        notes: "Personal site Astro development. Styling updates"
      },
      {
        day: "2023-06-04",
        value: 2,
        notes: "ReactionsJournal refactoring. React router NavLink isActive conditional rendering"
      },
      {
        day: "2023-06-05",
        value: 1,
        notes: "ReactionsJournal navlink style updates. Started fast.ai intro course"
      },
      {
        day: "2023-06-06",
        value: 1,
        notes: "ReactionsJournal bug fixes, style updates. Web dev meetup"
      },
      {
        day: "2023-06-07",
        value: 3,
        notes: "Finished first session of fast.ai course. Completed microgreen classifier project. Implemented routes and controllers for openairfit express project"
      },
      {
        day: "2023-06-08",
        value: 2,
        notes: "Openairfit express views development, fast.ai course"
      },
      {
        day: "2023-06-09",
        value: 2,
        notes: "Fast.ai lesson 2"
      },
      {
        day: "2023-06-10",
        value: 3,
        notes: "Fine-tuned and deployed CloudAtlas ML model"
      },
      {
        day: "2023-06-11",
        value: 2,
        notes: "Review CloudAtlas project and write blog post"
      },
      {
        day: "2023-06-12",
        value: 1,
        notes: "Initialize CloudAtlas gui. Set up react vite tailwind netlify"
      },
      {
        day: "2023-06-13",
        value: 1,
        notes: "Image loader component and styling for CloudAtlas"
      },
      {
        day: "2023-06-14",
        value: 2,
        notes: "Pushed CloudAtlas mvp. Watched fast.ai lesson 3"
      },
      {
        day: "2023-06-15",
        value: 1,
        notes: "CloudAtlas styling, read fast.ai lesson 3 chapter"
      },
      {
        day: "2023-06-16",
        value: 2,
        notes: "Wrote blog post on JSON from GPT. Refactored skiptorecipe"
      },
      {
        day: "2023-06-17",
        value: 1,
        notes: "Updated personal site styling"
      },
      {
        day: "2023-06-18",
        value: 2,
        notes: "Fast.ai lesson 0. Scrimba AI course"
      },
      {
        day: "2023-06-19",
        value: 2,
        notes: "Add createImage feature to skiptorecipe. Deeplearning.ai langchain short course"
      },
      {
        day: "2023-06-20",
        value: 1,
        notes: "Deeplearning.ai short course on langchain"
      },
      {
        day: "2023-06-21",
        value: 2,
        notes: "Langchain development, web dev meetup"
      },
      {
        day: "2023-06-22",
        value: 2,
        notes: "Chatbot dev with scrimba"
      },
      {
        day: "2023-06-23",
        value: 2,
        notes: "Fine-tune chatbot with openai api"
      },
      {
        day: "2023-06-24",
        value: 2,
        notes: "Fast.ai lesson 0. Scrimba AI course"
      },
      {
        day: "2023-06-25",
        value: 2,
        notes: "Add createImage feature to skiptorecipe. Deeplearning.ai langchain short course"
      },
      {
        day: "2023-06-26",
        value: 1,
        notes: "Deeplearning.ai short course on langchain"
      },
      {
        day: "2023-06-27",
        value: 2,
        notes: "Langchain development, web dev meetup"
      },
      {
        day: "2023-06-28",
        value: 2,
        notes: "Chatbot dev with scrimba"
      },
      {
        day: "2023-06-29",
        value: 2,
        notes: "Fine-tune chatbot with openai api"
      },
      {
        day: "2023-06-30",
        value: 2,
        notes: "Fine-tune chatbot with openai api"
      }
    ]

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



    useEffect(() => {
        async function getCount() {
          const logRef = collection(db, "log");
          const snapshot = await getCountFromServer(logRef);
          const totalCount = snapshot.data().count;
          setTotalCount(totalCount);
        }
        getCount();
      }, []);





    function addEntry() {
        setLogData([
          ...logData,
          {
            day: inputDate,
            value: inputHours,
            notes: inputNotes,
          }
        ]);
        //  MOVE THESE VALUES INTO A USEEFFECT
        setInputHours(0)
        setInputNotes("")
      }


    return (
        <div className='h-full w-full flex flex-col items-center'>
            <div>{totalCount} days of code</div>
            <div className='w-80 h-96'>
            <ResponsiveTimeRange
                    data={logData}
                    from={firstDay}
                    to={lastDay}
                    emptyColor="#eeeeee"
                    dayRadius={40}
                    colors={[ '#C6F6D5', '#9AE6B4', '#48BB78', '#2F855A' ]}
                    weekdayTicks={[]}
                    dayBorderWidth={2}
                    align='center'
                    direction='vertical'
                    dayBorderColor="#ffffff"  
                />
            </div>

            <div
            className="btn"
            onClick={() => window.my_modal_1.showModal()}>
            <span className='font-semibold text-green-600 text-3xl'>+</span></div>


            <dialog id="my_modal_1" className="modal">
            <form method="dialog" className="modal-box">
            <div className='flex flex-col items-center'>
            <div className='font-semibold mb-5'>log session</div>
            <div className='flex flex-row '><input
                type="date"
                name="date"
                id="date"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
                className='border p-2' />
            
            <input
                type="number"
                name="hours"
                autoFocus
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


                </div>
        
    )
}