"use client"
import Header from '@/components/admin/Header'
import LeftSide from '@/components/admin/LeftSide';
import React, { use, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CustmButton from '@/components/admin/ui/CustmButton';
import { Button } from '@/components/ui';
import useInstructor from '@/app/hooks/useInstructor';
import { Data_Instructor, parseInsructor } from '@/components/admin/ui/tables/InstructorTable';
import { useRouter } from 'next/navigation';
import useLessons from '@/app/hooks/useLessons';



export default function page({params }: { params: Promise<{ details: string }> }) {
     const details= use(params)?.details
    const [active, setActive] = useState('details');
    const router =  useRouter()
    const changePage = (status: string) => {
        setActive(status);
    }
       const {  fetchInstructorById , fetchAllPlanningForInstructor} = useInstructor()
    useEffect(() => {
fetchInstructorById(details as string )
fetchAllPlanningForInstructor(details)
    },[details])
    return (
        <>
            <div className='content '>
                <Header title="Instructeurs" />
                <div className='w-full flex flex-col md:flex-row overflow-hidden'>
                    <LeftSide className='hidden md:flex md:w-[20%] border-l-0  rounded-t-none  mt-4 items-center bg-white rounded-r-lg  border-2 border-gray-200 h-auto  ' />
                    <div className='dashboard-container w-full md:w-[80%] px-4 md:px-0'>
                        <CustmButton onClick={() => { router.back()}} className="mt-4 bg-[#fe911f] md:ml-4 shadow-sm capitalize text-white  md:mr-4 flex items-center w-full md:w-auto" >
                            <span className='text-sm md:text-base'>terug</span>
                        </CustmButton>
                        <>
                            <DetailsBar setActive={changePage} active={active} />

                            {
                                active == "details" &&
                                <DetailsPage /> ||
                                <CustomSchedule />
                            }
                        </>
                    </div>

                </div>

            </div>

        </>

    )
}


const DetailsBar = ({ active = 'details', setActive }: { active: string, setActive: (value: string) => void }) => {
    return (
        <ul className='flex mt-4 ml-0 md:ml-4 w-max rounded-lg shadow-sm  overflow-hidden text-gray-500 capitalize font-semibold text-sm'>
            <li onClick={() => setActive('details')} className={`w-32 md:w-[7vw] text-center p-3 hover:text-[var(--dark-blue)] cursor-pointer hover:bg-blue-700/20 ${active === 'details' ? 'bg-blue-700/10 text-[var(--dark-blue)]' : ''}`}>
                details
            </li>
            <li onClick={() => setActive('schedule')} className={`w-32 md:w-[7vw] text-center p-3 hover:text-[var(--dark-blue)] cursor-pointer hover:bg-blue-700/10 ${active === 'schedule' ? 'bg-blue-700/10 text-[var(--dark-blue)]' : ''}`}>
                Werkrooster
            </li>
        </ul>
    )
}
const DetailItem = ({ title, value = "empty" }: { title: string, value: string }) => {
    return (
        <div className=' max-h-max form-field flex flex-col border-2 rounded-lg p-2 border-gray-200 w-full md:w-[49%] mt-4'>
            <span className='text-sm md:text-base'>{title}</span>
            <span className=' mt-2 text-sm md:text-base break-words'>{value}</span>
        </div>
    )
}


const DetailsPage = () => {
        const {instructor}=  useInstructor()
        const router = useRouter()
        
    const [instructorDetails, setInstructorDetails] = useState<Data_Instructor>({
        // Personal Information
        id : 2 ,
        instructor:  "",
        bsn_nummer:  "",
        email:"",
        Date_birth: "",
        address: "",
        phone_number: "",

        // License Information
        driving_license: "",
        driving_license_issue_date: "",
        license_expiration_date: "",
        
        // Instructor Information
        instructor_card: "",
        instructor_card_expiration_date: "",
        // Contract Information
        contract_start_date: "",
        contract_expiration_date: "",
        salary: "",
        kvk_extract: "",
        employment_contract: "",
        hours_registration: ""
    });

    // Update instructorDetails when instructor data is fetched
    useEffect(() => {
        if (instructor) {
            const parsedInstructor = parseInsructor([instructor])[0];
            console.log("Parsed instructor:", parsedInstructor);
            setInstructorDetails({
                id: parsedInstructor.id || 2,
                instructor: parsedInstructor.instructor || "",
                bsn_nummer: parsedInstructor.bsn_nummer || "",
                email: parsedInstructor.email || "",
                Date_birth: parsedInstructor.Date_birth || "",
                address: parsedInstructor.address || "",
                phone_number: parsedInstructor.phone_number || "",
                driving_license: parsedInstructor.driving_license || "",
                driving_license_issue_date: parsedInstructor.driving_license_issue_date || "",
                license_expiration_date: parsedInstructor.license_expiration_date || "",
                instructor_card: parsedInstructor.instructor_card || "",
                instructor_card_expiration_date: parsedInstructor.instructor_card_expiration_date || "",
                contract_start_date: parsedInstructor.contract_start_date || "",
                contract_expiration_date: parsedInstructor.contract_expiration_date || "",
                salary: parsedInstructor.salary || "",
                kvk_extract: parsedInstructor.kvk_extract || "",
                employment_contract: parsedInstructor.employment_contract || "",
                hours_registration: parsedInstructor.hours_registration || ""
            });
        }
    }, [instructor]);
 
    return (
        <>
            <div className='form-container mx-0 md:mx-4 rounded-lg mt-4 p-4  bg-white shadow-md'>
                <h1 className='font-bold text-lg md:text-xl'>Persoonlijke gegevens</h1>
                <form className='w-full  gap-2 flex  flex-wrap justify-between' action="">
                    <DetailItem title='Naam instructeur' value={instructorDetails.instructor} />
                    <DetailItem title='BSN-nummer' value={instructorDetails.bsn_nummer} />
                    <DetailItem title='E-mailadres' value={instructorDetails.email} />
                    <DetailItem title='Geboortedatum' value={instructorDetails.Date_birth} />
                    <DetailItem title='Adres' value={instructorDetails.address} />
                    <DetailItem title='Telefoonnummer' value={instructorDetails.phone_number} />
                </form>
            </div>

            <div className='mt-4 form-container mx-0 md:mx-4 rounded-lg  p-4  bg-white shadow-md'>
                <h1 className='font-bold text-lg md:text-xl'>Rijbewijsgegevens</h1>
                <form className='w-full  gap-2 flex  flex-wrap justify-between' onSubmit={(e) => { e.preventDefault() }}>
                    <DetailItem title='Rijbewijsnummer' value={instructorDetails.driving_license} />
                    <DetailItem title='Uitgiftedatum rijbewijs' value={instructorDetails.driving_license_issue_date!} />
                    <DetailItem title='Vervaldatum rijbewijs' value={instructorDetails.license_expiration_date} />
                    <div className='w-full md:w-[49%] *:capitalize border-2 border-gray-200 rounded-lg h-max md:h-[50vh]'>
                        <h1 className='font-bold mt-2 ml-2'>
                            Rijbewijs
                        </h1>
                        <img className=' w-full max-w-[95%] mt-2 h-auto md:h-[56%] mx-auto object-contain' src="/Id.png" alt="" />
                        <h1 className='
                                    text-sm text-gray-500 font-semibold
                                    mt-3 ml-4
                                    
                                    '>Vervaldatum rijbewijs</h1>
                        <h1 className='
                                    text-sm text-gray-500 font-semibold
                                    mt-3 ml-4
                                    
                                    '>

                            10/10/2028
                        </h1>
                        <Button onClick={() => { alert('hello') }} className='w-full md:w-[93%] mx-auto mt-2 mb-2 grid place-content-center'>
                            download
                        </Button>
                    </div>
                </form>

            </div>

            <div className='mt-4 form-container mx-0 md:mx-4 rounded-lg  p-4  bg-white shadow-md'>
                <h1 className='font-bold text-lg md:text-xl'>Instructeursgegevens</h1>
                <form className='w-full  gap-2 flex  flex-wrap justify-between' action="">
                    <DetailItem title='Instructeurskaartnummer' value={instructorDetails.instructor_card} />
                    <DetailItem title='Vervaldatum instructeurskaart' value={instructorDetails.instructor_card_expiration_date!} />
                </form>
            </div>

            <div className='mt-4 form-container mx-0 md:mx-4 rounded-lg  p-4  bg-white shadow-md'>
                <h1 className='font-bold text-lg md:text-xl'>Contractgegevens</h1>
                <form className='w-full  gap-2 flex  flex-wrap justify-between' action="">
                    <DetailItem title='Contractbegindatum' value={instructorDetails.contract_start_date!} />
                    <DetailItem title='Contractvervaldatum' value={instructorDetails.contract_expiration_date!} />
                    <DetailItem title='Salaris per maand' value={instructorDetails.salary!} />
                </form>
            </div>

            <div className='mt-4 form-container mx-0 md:mx-4 rounded-lg  p-4  bg-white shadow-md'>
                <div className='w-full  h-max gap-2 flex  flex-wrap justify-between'>
                    <h1 className='font-bold text-lg md:text-xl'>Documenten</h1>
                    <img className=' w-full max-w-[95%] mt-2 h-auto md:h-[25vh] mx-auto object-contain' src="/bankcart.png" alt="" />
                    <div className='w-full'>
                        <h1 className='
                                    text-sm text-gray-500 font-semibold
                                    mt-3 ml-9
                                    '>Vervaldatum rijbewijs</h1>
                        <h1 className='
                                    text-sm text-gray-500 font-semibold
                                    mt-1 ml-9
                                    '>  10/10/2028</h1>
                        <Button onClick={() => { alert('hello') }} className='w-full md:w-[93%] mx-auto mt-2 mb-2 grid place-content-center'>
                            download
                        </Button>

                    </div>
                </div>
            </div>
             <div className=' form-container mx-0 md:mx-4 rounded-lg  p-4  mt-4 bg-white shadow-md'>
                <div className='w-full  h-max gap-2 flex  flex-wrap justify-between'>
                    <img className=' w-full max-w-[95%] mt-2 h-auto md:h-[30vh] mx-auto object-contain' src="/facteur.png" alt="" />
                    <div className='w-full'>
                        <h1 className='
                                    text-base md:text-md font-bold
                                   ml-9
                                    '>KvK-nummer</h1>
                       
                        <Button onClick={() => { alert('hello') }} className='w-full md:w-[93%] mx-auto mt-2 mb-2 grid place-content-center'>
                            download
                        </Button>

                    </div>
                </div>
            </div>

            <div className='buttons mt-8 mb-4 mx-auto w-full px-0 md:px-4 flex flex-col md:flex-row gap-3 md:justify-between'>
                <CustmButton  onClick={()=>{router.back()}} className='bg-[#fe911f] text-white w-full md:w-auto'>
                    Bewerken
                </CustmButton>
                <CustmButton onClick={() => { console.log(instructorDetails) }} className='bg-[#2d46c4] text-white w-full md:w-auto'>
                    Exporteren
                </CustmButton>
            </div>
        </>
    )
}

type EventSchedule ={
     endDate : string , 
     startDate : string , 
     instructor : string  
     student : string 
     day : string 
     time : string 
}
const CustomSchedule = ({}) => {
        const {planning , instructor} = useInstructor()
        const [currentDate , setCurrentDate] = useState<number>(new Date().getTime())
          console.log("planing ", planning)
           const times = useMemo(() => {
        return ["09:00", "10:00", "11:00", "12:00", , "14:00", "15:00", "16:00", "17:00"]
    }, [])
     const days = ['mon', 'tue', 'wed', 'thurs', 'fri'];
          
        const exractInfo = (): EventSchedule[]=> {
            const dd : EventSchedule[] = []
                   
            Array.from(planning ).filter((p : any) => {
                const eventDate = new Date(p?.startDate?.split(" ")[0]).getTime();
                
                return eventDate >= currentDate && eventDate <= currentDate + 7 * 24 * 60 * 60 * 1000
            } ).forEach((p : any) => {   
             
                console.log("instructor " , instructor  )
                console.log("student " , p.student   )
                const tt =new Date( p?.startDate?.split(" ")[0].split("-")[0],p?.startDate?.split(" ")[0].split("-")[1]-1,p?.startDate?.split(" ")[0].split("-")[2]).toString().split(" ")[0]
                const rand = Math.floor(Math.random() * (times.length-1));
                dd.push( { endDate :  p.endDate , startDate : p.startDate?.split(" ")[0] ,student : p.student.name, instructor : instructor?.name || "none"  , day : tt , time: times[rand]! } )
            })
            return  dd 
        }
      console.log("exractInfo()", exractInfo())
    return (
        <div className=' mx-4 rounded-lg mt-4 p-4  bg-white shadow-md'>
            <h1 className='font-bold text-xl '>Instructeurrooster</h1>
            <ScheduleDateBar  setDate={setCurrentDate}/>
            <ScheduleTable  events={exractInfo()} currentDate={currentDate} />
        </div>
    )
}

const ScheduleDateBar = ({setDate}:{setDate: Function}) => {
    const  [currentDate , setCurrentDate] = useState<number>(new Date().getTime())
       useEffect(()=>{
           const i=    setInterval(()=>{
             setCurrentDate(new Date().getTime())
           },604800000)
       },[])
    const nextWeek =()=>{
      setCurrentDate(  currentDate + 604800000)
      setDate(currentDate  + 604800000)
        console.log(new Date(currentDate + 604800000).toString().split(" ").slice(0,4).join(" "))
    }
    const lastWeek =()=>{
      setCurrentDate(currentDate - 604800000)
      setDate(currentDate  - 604800000)
        console.log(new Date(currentDate - 604800000).toString().split(" ").slice(0,4).join(" "))
    }
    
    return (<div className='text-sm text-gray-900 rounded-lg mx-auto border-2 border-gray-300 flex items-center bg-white  w-max h-max p-2'>
      
        <span onClick={lastWeek} className='cursor-pointer mr-3 px-3 hover:bg-black/10 rounded-full   py-2
           text-gray-500 font-semibold text-sm '>
            &lt;
        </span>
          {new Date(currentDate).toString().split(" ").slice(0,4).join(" ")}
        <span onClick={nextWeek} className=' hover:bg-black/10 rounded-full cursor-pointer ml-3 px-3 py-2
           text-gray-500 font-semibold text-sm '>
            &gt;
        </span>

    </div>)

}

const ScheduleTable = ({events , currentDate} : {events: EventSchedule[], currentDate: number}) => {
 console.log("events" , events , new Date(currentDate).toString().split(" ").slice(0,4).join(" "))
    const vanance = [
        { time: "09:00", day: "thurs", title: "" },
        { time: "10:00", day: "thurs", title: "" },
        { time: "12:00", day: "thurs", title: "" },
        { time: "13:00", day: "thurs", title: "" },
        { time: "14:00", day: "thurs", title: "" },
        { time: "11:00", day: "thurs", title: "" },
        { time: "15:00", day: "thurs", title: "" },
        { time: "16:00", day: "thurs", title: "" },
        { time: "17:00", day: "thurs", title: "" },
    ]
    const lunchpause = [
        { time: "13:00", day: "mon", title: "" },
        { time: "13:00", day: "tue", title: "" },
        { time: "13:00", day: "wed", title: "" },
        { time: "13:00", day: "thurs",title: "" },
        { time: "13:00", day: "fri", title: "" },

    ]

    useEffect(() => {
        const divs = Array.from(document.getElementsByClassName("RW-for-table"));
        const divMap = new Map();

        // Clear all previous content and reset styles
        divs.forEach(d => {
            // Remove all spans
            d.querySelectorAll("span").forEach(s => s.remove());
            
            // Reset inline styles
            if (d instanceof HTMLElement) {
                d.style.border = "";
                d.style.borderRight = "";
            }
            
            // Reset background classes for split cells
            if (d.classList.contains('flex-col')) {
                const sections = d.querySelectorAll('div');
                sections.forEach(section => {
                    section.classList.remove("bg-[#fe911f]", "bg-[#f5f5f6]", "bg-[#daefff]");
                });
            }
            
            const dd = d.getAttribute("data-date")?.split(",").map(Number);
            if (dd) divMap.set(`${dd[0]}-${dd[1]}`, d);
        });


        events.forEach(e => {
            const { time, day } = mapEventToDay(e);
            const key = `${day}-${time}`;
            const d = divMap.get(key);
            if (d) {
                
                if (d.classList.contains('flex-col')) {
                    // For split cells, add content to both sections with same background color
                    const sections = d.querySelectorAll('div');
                    if (sections.length >= 3) { // First section, divider, second section
                        // Clear existing content
                        sections[0].innerHTML = '';
                        sections[2].innerHTML = '';

                        // Add same background color to first section and temp data
                        sections[0].classList.add("bg-[#fe911f]");
                        const span1 = document.createElement("span");
                        span1.classList.add("text-white", "text-xs", "font-semibold");
                        span1.innerText = e.instructor; // Temp data from backend
                        sections[0].appendChild(span1);

                        // Add same background color to second section and temp data
                        sections[2].classList.add("bg-[#fe911f]"); // Same color as first section
                        const span2 = document.createElement("span");
                        span2.classList.add("text-white", "text-xs", "font-medium");
                        span2.innerText = e.student; // Temp data from backend
                        sections[2].appendChild(span2);
                    }
                } else {
                    // For non-split cells, use original logic
                    const span = document.createElement("span");
                    span.classList.add("bg-[#fe911f]", "h-full", 'text-white', 'capitalize', "font-semibold", "flex", "justify-center", "items-center");
                    d.append(span);
                }
            }
        });
        vanance.forEach(e => {
            const { time, day } = mapEventToDay(e);
            const key = `${day}-${time}`;
            const d = divMap.get(key);

            if (d) {

                const span = document.createElement("span");
                d.style.border = "none";
                d.style.borderRight = "1px solid  #f5f5f6";
                span.classList.add("bg-[#f5f5f6]", "vacance", 'z-index-3', 'mx-2', "h-full", 'text-black', "font-semibold", "flex", "justify-center", "items-center");

                span.innerText = e.title;
                if (time == 4) {
                    span.innerText = 'vakantie';
                }
                d.append(span);
            }
            // Add null checks for vacation elements
            const firstVacance = document.querySelectorAll('.vacance:first-child')[0];
            const lastVacance = document.querySelectorAll('.vacance:last-child')[0];

            if (firstVacance) {
                firstVacance.classList.add('mt-2');
            }
            if (lastVacance) {
                lastVacance.classList.add('mb-2');
            }
        });
        lunchpause.forEach(e => {
            const { time, day } = mapEventToDay(e);
            const key = `${day}-${time}`;
            const d = divMap.get(key);
            if (d) {
                const span = document.createElement("span");
                d.style.border = "none";
                span.classList.add("bg-[#daefff]", "lunchpause", "h-full", 'text-white', 'capitalize', "font-semibold", "flex", "justify-center", "items-center");
                span.innerText = e.title;
                if (e.day != 'thurs') {
                    d.append(span);

                }

                console.log(document.querySelectorAll('.lunchpause'))

            }
        });

    }, [events, currentDate]);

    const mapEventToDay = (e: any): { time: number, day: number } => {
        const time = times.indexOf(e.time)
        const day = days.indexOf(e?.day?.toLowerCase())

        return { time, day }
    }
    const times = useMemo(() => {
        return ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]
    }, [])

    const days = ['mon', 'tue', 'wed', 'thurs', 'fri'];

    return (
        <div className='mt-6 overflow-x-auto'>
            <div className=''>
                <div className='indicator flex items-center  scale-80 w-max '>
                    <div className='w-[20px] h-[20px] rounded-full border-1 bg-[#fe911f]'></div>
                    <span className='mr-2 ml-1 capitalize font-bold'>rij</span>
                    <div className='w-[20px] h-[20px] mr-2 border-1 rounded-full bg-[#f5f5f6]'></div>
                    <div className='w-[20px] h-[20px] rounded-full border-1 bg-[#4CB4E7]'></div>
                    <span className='mr-2 ml-1 capitalize font-bold'>lunchpauze</span>

                </div>
                <div className='   w-[70vw] justify-end bg-[#f5f5f6]     flex '>
                    <div className='  border-gray-200 w-[calc(100%/6)]   border-r border-b   text-center  font-semibold  text-gray-700'></div>
                    {
                        days.map((day, index) => (
                            <div id={`day-${index}`} key={index} className=' flex justify-start capitalize  pl-3 border-r border-b border-gray-200 w-[calc(100%/6)]  text-center  font-semibold text-[#606970]'>
                                {day}
                            </div>
                        ))
                    }
                </div>
                <div className='flex w-max '>
                    <div className='    bg-[#f5f5f6]  w-[calc(70vw/6)] h-[90vh]  flex flex-col'>
                        {
                            times.map((time, index) => (
                                <div id={`time-${index}`} key={index} className=' text-[#606970]  border-b-1 border-gray-200 w-[calc(70vw/6)] h-[calc(100%/9)]   bg-gray-100 text-right font-semibold flex flex-col'>
                                    {/* First section */}
                                    <div className='flex-1 flex flex-col justify-center items-end pr-2'>
                                        <span className='text-xs text-gray-600 font-medium'>{time}</span>
                                    </div>

                                    {/* Dashed divider line */}
                                    <div className='border-t border-dashed border-gray-400'></div>

                                    {/* Second section */}
                                    <div className='flex-1 flex flex-col justify-center items-end pr-2'>
                                        {/* Empty - no slot text */}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='days-time grid grid-cols-5 grid-rows-9   w-[calc(70vw/6*5)]  h-[90vh]  '>
                        {
                            [...Array(45)].map((_, i) => {
                                const dayIndex = i % 5;
                                const timeIndex = Math.floor(i / 5);
                                const dayName = days[dayIndex];
                                const timeSlot = times[timeIndex];

                                // Check if this cell is a vacation cell
                                const isVacation = vanance.some(v =>
                                    v.day === dayName && v.time === timeSlot
                                );

                                // Check if this cell is a lunch pause cell
                                const isLunchPause = lunchpause.some(l =>
                                    l.day === dayName && l.time === timeSlot
                                );

                                // If it's vacation or lunch pause, don't split the div
                                if (isVacation || isLunchPause) {
                                    return (
                                        <div key={i} data-date={i % 5 + ',' + Math.floor(i / 5)} className=' RW-for-table col-span-1 row-span-1  w-full h-full  border-b-1 border-r-1 border-gray-200'>
                                            {/* Single div for vacation/lunch - content will be added by useEffect */}
                                        </div>
                                    );
                                }

                                // For regular cells, use split layout
                                return (
                                    <div key={i} data-date={i % 5 + ',' + Math.floor(i / 5)} className=' RW-for-table col-span-1 row-span-1  w-full h-full  border-b-1 border-r-1 border-gray-200 flex flex-col'>
                                        {/* First section */}
                                        <div className='flex-1 flex flex-col justify-center items-center p-1'>
                                            {/* Empty - will be filled by backend data */}
                                        </div>

                                        {/* Dashed divider line */}
                                        <div className='border-t border-dashed border-gray-400'></div>

                                        {/* Second section */}
                                        <div className='flex-1 flex flex-col justify-center items-center p-1'>
                                            {/* Empty - will be filled by backend data */}
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>


            </div>

        </div>
    )
}