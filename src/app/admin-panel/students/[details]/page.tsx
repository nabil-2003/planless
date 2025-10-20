"use client"
import Header from '@/components/admin/Header'
import LeftSide from '@/components/admin/LeftSide';
import TimeFilter from '@/components/admin/TimeFIlter';
import FIlterByType from '@/components/admin/FIlterByType'
import React, { use, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CusTomDate from '@/components/admin/ui/CustomDateModal'
import { FaRegPlusSquare, FaArrowDown, FaChartLine, FaChartBar } from 'react-icons/fa'
import CustomSearch from "@/components/admin/ui/CustomSearch"
import CustomSelect from "@/components/admin/ui/CustomSelect"
import { Button } from '@/components/ui';
import Image from 'next/image';
import PlusIcon from '@/components/svgs/Plus';
import StudentTable, { Data_Student } from '@/components/admin/ui/tables/StudentTable';
import CreateModal, { CreateModalRef } from '@/components/admin/ui/CreateModal';
import studentsData from "@/data/students.json"
import CustmButton from '@/components/admin/ui/CustmButton';


type CustomDateRef = {
    firstDateMs?: number;
    lastDateMs?: number;
    singleDate?: number;
    open: () => void;
    close: () => void;
    getSelectedRange: () => { firstDateMs: number; lastDateMs: number } | null;
    clearSelection: () => void;
    setDateRange: (startDate: string, endDate: string) => void;
}

export default function page() {


    const parsedStudents = useCallback(() => {
        const students: Data_Student[] = (studentsData as any[]).map(item => ({
            student: item.student,
            bsn_nummer: item.bsn_nummer,
            email: item.email,
            geboortedatum: item.geboortedatum,
            adres: item.adres,
            telefoonnummer: item.telefoonnummer,
            status: item.status,
            rijbewijs_categorie: item.rijbewijs_categorie,
            theorie_examen: item.theorie_examen,
            praktijk_examen: item.praktijk_examen,
            aantal_lessen: item.aantal_lessen,
            laatste_les: item.laatste_les,
            instructeur: item.instructeur,
            opmerkingen: item.opmerkingen,
        }));
        return students;
    }, [])

    const [currentFilterType, setCurrentFilterType] = React.useState('Alle');
    const [currentTimeFilter, setTimeFilter] = React.useState('24 uur');
    const [selectedDateRange, setSelectedDateRange] = useState<{ firstDateMs: number; lastDateMs: number } | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const CreateModalRef = useRef<CreateModalRef>(null);
    const dateModalRef = useRef<CustomDateRef>(null);

    //show the modal that create new student...
    const openCreateModal = () => {
        CreateModalRef.current?.open();
    }

    // Open date selection modal
    const openDateModal = () => {
        dateModalRef.current?.open();
    }

    // Handle date selection from modal (automatically detects single vs range)
    const handleDateSelect = (dates: { firstDateMs: number; lastDateMs: number } | null) => {
        setSelectedDateRange(dates);
    }

    // Format date for display
    const formatDateRange = () => {
        if (!selectedDateRange) return 'mm/dd/yyyy';

        const startDate = new Date(selectedDateRange.firstDateMs);
        const endDate = new Date(selectedDateRange.lastDateMs);

        const formatDate = (date: Date) => {
            return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
        };

        // If same date (single selection) show single date, otherwise show range
        if (selectedDateRange.firstDateMs === selectedDateRange.lastDateMs) {
            return formatDate(startDate);
        } else {
            return `${formatDate(startDate)} - ${formatDate(endDate)}`;
        }
    };

    // this function will change inside FilterByType 
    const chFilterByType = (filter: string) => {
        setCurrentFilterType(t => filter);
    }

    // this function will change inside TimeFilter
    const chTimeFilter = (filter: string) => {
        setTimeFilter(t => filter);
    }

    const activeclass = useMemo(() => " border-b-3 border-[var(--dark-blue)]  text-dark-blue ", [])
    const [active, setActive] = useState('details');
    const changePage = (status: string) => {
        setActive(status);
    }



    return (
        <>
            <div className='content '>
                <Header title="Studenten" />
                <div className='w-full flex   overflow-hidden'>
                    <LeftSide className='w-[20%] border-l-0  rounded-t-none  mt-4 items-center bg-white rounded-r-lg  border-2 border-gray-200 h-auto  ' />
                    <div className='dashboard-container  w-[80%] '>
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


const DetailItem = ({ title, value = "empty" }: { title: string, value: string }) => {
    return (
        <div className='form-field flex flex-col border-2 rounded-lg p-2 border-gray-200 w-[49%] mt-4'>
            <span className=''>{title}</span>
            <span className=' mt-2'>{value}</span>
        </div>
    )
}


const DetailsBar = ({ active = 'details', setActive }: { active: string, setActive: (value: string) => void }) => {
    return (
        <ul className='flex mt-4 ml-4 w-max rounded-lg shadow-sm  overflow-hidden text-gray-500 capitalize font-semibold text-sm'>
            <li onClick={() => setActive('details')} className={`w-[7vw] text-center p-3  hover:text-[var(--dark-blue)] cursor-pointer  hover:bg-blue-700/20 ${active === 'details' ? 'bg-blue-700/10 text-[var(--dark-blue)]' : ''}`}>
                details
            </li>
            <li onClick={() => setActive('schedule')} className={`w-[7vw] text-center p-3  hover:text-[var(--dark-blue)]    cursor-pointer hover:bg-blue-700/10 ${active === 'schedule' ? 'bg-blue-700/10 text-[var(--dark-blue)]' : ''}`}>
                Werkrooster
            </li>
        </ul>
    )
}



const DetailsPage = () => {
    const [studentDetails, setStudentDetails] = useState<Data_Student>({
        student: 'aziza', 
        bsn_nummer: '3456789',
        email: 'f@example.com', 
        geboortedatum: '01/01/2000', 
        adres: 'default address',
        telefoonnummer: '+317877677', 
        status: 'Actief',
        rijbewijs_categorie: 'B',
        theorie_examen: 'Nog niet gedaan',
        praktijk_examen: 'Nog niet gedaan',
        aantal_lessen: 0,
        laatste_les: '',
        instructeur: '',
        opmerkingen: 'lshhshs s shshs shshsd hdghdhsqks '
    });
    return (
        <>

            <div className='form-container mx-4 rounded-lg mt-4 p-4  bg-white shadow-md'>
                <h1 className='font-bold text-xl '>Persoonlijke gegevens</h1>
                <form className='w-full  gap-2 flex  flex-wrap justify-between' action="">

                    <DetailItem title='Naam student ' value={studentDetails.student} />
                    <DetailItem title='BSN-nummer' value={studentDetails.bsn_nummer} />
                    <DetailItem title='E-mailadres' value={studentDetails.email} />
                    <DetailItem title='Geboortedatum' value={studentDetails.geboortedatum} />
                    <DetailItem title='Adres' value={studentDetails.adres} />
                    <DetailItem title='telefoonnummer' value={studentDetails.telefoonnummer} />

                </form>
            </div>
            <div className='mt-4 form-container mx-4 rounded-lg  p-4  bg-white shadow-md'>
                <h1 className='font-bold text-xl '>Aanvullende informatie</h1>
                <form className='w-full  gap-2 flex  flex-wrap justify-between' action="">

                    <DetailItem title='Naam student' value={studentDetails.student} />
                    <DetailItem title='BSN-nummer' value={studentDetails.bsn_nummer} />
                    <DetailItem title='opmerkingen' value={studentDetails.opmerkingen} />

                </form>
            </div>
            <div className='buttons mt-8 mb-4 mx-auto  w-[90%] flex justify-between '>
                <CustmButton className='bg-[#fe911f] py-4 pl-4 pr-4  text-white text-sm '>
                    annlueren
                </CustmButton>
                <CustmButton onClick={() => { console.log(studentDetails) }} className='bg-[#2d46c4] py-4 pl-4 pr-4  text-white text-sm '>
                    Opslaan
                </CustmButton>
            </div>

        </>
    )
}

const CustomSchedule = () => {
    return (
        <div className=' mx-4 rounded-lg mt-4 p-4  bg-white shadow-md'>
            <h1 className='font-bold text-xl '>Studentenrooster</h1>
            <ScheduleDateBar />
            <ScheduleTable />
        </div>

    )
}
const ScheduleDateBar = () => {
    return (<div className='text-sm text-gray-900 rounded-lg mx-auto border-2 border-gray-300 flex items-center bg-white  w-max h-max p-2'>
        <span className='cursor-pointer mr-3 px-3   py-2
           text-gray-500 font-semibold text-sm '>
            &lt;
        </span>
        4 t/m 10 augustus 2025
        <span className='cursor-pointer ml-3 px-3 py-2
           text-gray-500 font-semibold text-sm '>
            &gt;
        </span>

    </div>)

}
type EventDay = {
    time: string
    day: string
    title: string
}
const ScheduleTable = () => {
    const events = [
        { time: "09:00", day: "wed", title: "play games" },
        { time: "14:00", day: "wed", title: "watch football" },
        { time: "17:00", day: "fri", title: "play games" }
    ]
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
       { time: "13:00", day: "thurs", title: "" },
       { time: "13:00", day: "fri", title: "" },
    
   ]

   

    useEffect(() => {
        const divs = Array.from(document.getElementsByClassName("RW-for-table"));
        const divMap = new Map();

        // Preprocess divs (O(m))
        divs.forEach(d => {
            const dd = d.getAttribute("data-date")?.split(",").map(Number);

            if (dd) divMap.set(`${dd[0]}-${dd[1]}`, d);
             
        });

        divs.forEach(d => {
            d.querySelectorAll("span").forEach(s => s.remove());
            const dd = d.getAttribute("data-date")?.split(",").map(Number);
            if (dd) divMap.set(`${dd[0]}-${dd[1]}`, d);
        });

        // Place events (O(n))
          events.forEach(e => {
            const { time, day } = mapEventToDay(e);
            const key = `${day}-${time}`;
            const d = divMap.get(key);
            if (d) {
                // Check if this is a split cell (has flex-col class)
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
                        span1.innerText = "Student A"; // Temp data from backend
                        sections[0].appendChild(span1);
                        
                        // Add same background color to second section and temp data
                        sections[2].classList.add("bg-[#fe911f]"); // Same color as first section
                        const span2 = document.createElement("span");
                        span2.classList.add("text-white", "text-xs", "font-medium");
                        span2.innerText = "Instructor B"; // Temp data from backend
                        sections[2].appendChild(span2);
                    }
                } else {
                    // For non-split cells, use original logic
                    const span = document.createElement("span");
                    span.classList.add("bg-[#fe911f]", "h-full", 'text-white', 'capitalize', "font-semibold", "flex", "justify-center", "items-center");
                    span.innerText = e.title;
                    d.append(span);
                }
            }
        });
           vanance.forEach(e => {
            const { time, day } = mapEventToDay(e);
            const key = `${day}-${time}`;
            const d = divMap.get(key);

            if (d ) {
                
                const span = document.createElement("span");
                d.style.border = "none";
                d.style.borderRight= "1px solid  #f5f5f6";
                span.classList.add("bg-[#f5f5f6]", "vacance", 'z-index-3',  'mx-2', "h-full", 'text-black', "font-semibold", "flex", "justify-center", "items-center");
                 
                span.innerText = e.title;
                 if(time == 4){
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
                span.classList.add( "bg-[#daefff]","lunchpause", "h-full", 'text-white', 'capitalize', "font-semibold", "flex", "justify-center", "items-center");
                span.innerText = e.title;
                if (e.day != 'thurs') {
                    d.append(span);
                    
                }
            
               console.log(document.querySelectorAll('.lunchpause'))

            }
        });
       
    }, [events]);

    const mapEventToDay = (e: EventDay): { time: number, day: number } => {
        const time = times.indexOf(e.time)
        const day = days.indexOf(e.day.toLowerCase())

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

