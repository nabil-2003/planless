"use client"
import Header from '@/components/admin/Header'
import LeftSide from '@/components/admin/LeftSide';
import React, { use, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CustmButton from '@/components/admin/ui/CustmButton';
import { Button } from '@/components/ui';
import useInstructor from '@/app/hooks/useInstructor';
import { Data_Instructor, parseInsructor } from '@/components/admin/ui/tables/InstructorTable';
import { useRouter } from 'next/navigation';
import CreateModal, { CreateModalRef } from '@/components/admin/ui/CreateModal';
import CusTomDate, { CustomDateRef } from '@/components/admin/ui/CustomDateModal';
import LessonsTable, { netherlandsToEngStatus } from '@/components/admin/ui/tables/TableLessons';
import PlusIcon from '@/components/svgs/Plus';
import CustomSearch from '@/components/admin/ui/CustomSearch';
import CustomSelect from '@/components/admin/ui/CustomSelect';
import { getparsedLesson, ParsedLesson } from '@/store/LessonsSlices';
import useLessons from '@/app/hooks/useLessons';
import HoursRegistrationTable from '@/components/admin/ui/tables/HoursRegistrationTable';
import Breadcrumb from '@/components/admin/Breadcrumb';
import CustomFullCalendar, { CalendarEvent } from '@/components/admin/ui/CustomFullCalendar';
import Spinner from '@/components/ui/Spinner';

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
                    <Breadcrumb items={[
                        {href : '/admin-panel/instructors' , label : "Instructors" },
                        {href : '/admin-panel/instructors/'+details , label : details }
                    ]} />
                <div className='w-full flex flex-col md:flex-row overflow-hidden'>
                    <LeftSide className='hidden md:flex md:w-[20%] border-l-0  rounded-t-none  mt-4 items-center bg-white rounded-r-lg  border-2 border-gray-200 h-auto  ' />
                    <div className='dashboard-container w-full md:w-[80%] px-4 md:px-0'>
                    
                
                        <>
                            <DetailsBar setActive={changePage} active={active} />

                            {
                                active == "details" &&
                                <DetailsPage />  
                                
                            }
                            {
                                active == "schedule" &&
                                <CustomSchedule id={details} /> 
                            }
                            {
                                active == "hours" &&
                                  <HoursRegistration />
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
             <li onClick={() => setActive('hours')} className={`w-32 md:w-[8vw]  text-center p-3 hover:text-[var(--dark-blue)] cursor-pointer hover:bg-blue-700/10 ${active === 'hours' ? 'bg-blue-700/10 text-[var(--dark-blue)]' : ''}`}>
            
                    Urenregistratie
              
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
        email:"",
        Date_birth: "",
        city: "",
        street: "",
        zipCode: "",
        houseNumber: "",
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
                email: parsedInstructor.email || "",
                Date_birth: parsedInstructor.Date_birth || "",
                city: parsedInstructor.city || "",
                street: parsedInstructor.street || "",
                zipCode: parsedInstructor.zipCode || "",
                houseNumber: parsedInstructor.houseNumber || "",
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
                <div className='flex gap-3 items-center '>
                    <h1 className='font-bold text-lg md:text-xl'>Persoonlijke gegevens</h1>
                    <span onClick={() => {
                        router.push("./edit/" + instructorDetails.id)
                    }} className='bg-gray-200 text-sm cursor-pointer rounded-xl '>
                        <div className='flex gap-2 text-[#575757] p-3'>
                            <img src="/edit.svg" />
                            <span>bewerking</span>
                        </div>
                    </span>
                </div>
                <form className='w-full  gap-2 flex  flex-wrap justify-between' action="">
                    <DetailItem title='Naam instructeur' value={instructorDetails.instructor} />
                    <DetailItem title='E-mailadres' value={instructorDetails.email} />
                    <DetailItem title='Geboortedatum' value={instructorDetails.Date_birth} />
                    <DetailItem title='Stad' value={instructorDetails.city } />
                     <DetailItem title='Straat' value={instructorDetails.street } />
                      <DetailItem title='Postcode' value={instructorDetails.zipCode } />
                       <DetailItem title='Huisnummer' value={instructorDetails.houseNumber } />
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

        </>
    )
}


const CustomSchedule = ({id} : {id : string }) => {
     const  parsePlantoEvent = ():Array<CalendarEvent> => {
        // Add safety check for empty or invalid planning data
        if (!planning || !Array.isArray(planning) || planning.length === 0) {
            console.log("No planning data available");
            return [];
        }       
        return planning.map((plan : any) => {
     
            const event : CalendarEvent = {
                end: "", 
                start: "", 
                title: "", 
                id: String(plan.id || id), 
                extendedProps: {
                    instructor: "", 
                    student: ""
                }
            };
            
            // Try different possible field names for dates
            event.end = plan.endDate ;
            event.start = plan.startDate ;
            
            // Try different possible field names for student
            const studentName = plan.student?.name ;
            event.title =   plan.startDate.split("T")[1].substring(0,5) + " - " + plan.endDate.split("T")[1].substring(0,5)  ;
            
            // Try different possible field names for instructor
            const instructorName = instructor?.name || plan.instructor?.name || plan.instructorName || plan.instructor || "Unknown Instructor";
            event.extendedProps.instructor = instructorName;
            event.extendedProps.student = studentName;
            event.textColor = "#024089";
            
            console.log("Created event:", event);
            return event;
        });
     }
     
    const {fetchAllPlanningForInstructor , planning , instructor , loading} = useInstructor()
    
    useEffect(()=>{
           fetchAllPlanningForInstructor(id)
    },[id])
    
   return (
 <>
  {
    loading ? <div className="flex items-center justify-center p-8">
        <Spinner></Spinner>
    </div> : <CustomFullCalendar data={parsePlantoEvent()} />
  }
 </>
    
   )
}


const HoursRegistration= () => {
   
    const [currentFilterType, setCurrentFilterType] = useState('In behandeling')
    const [searchQuery, setSearchQuery] = useState('')
    const [exportMode, setExportMode] = useState(false)

    const {fetchAllLessons , lessons ,loading  , endDateLessons, startDateLessons, size, index , setIndex , setSize }= useLessons()
    // Modal references
    const CreateModalRef = useRef<CreateModalRef>(null)
    const exportDateModalRef = useRef<CustomDateRef>(null)
      
 

     useEffect(()=>{
        fetchAllLessons(index,size ,searchQuery , 0, new Date("01-01-2100").getTime() , netherlandsToEngStatus("Voltooid")?.engStatus)
     },[index,size , searchQuery ,  currentFilterType])
    const parsedLessons = useCallback((lessonss :any[] ) :any => {
            const  parsedLessons : ParsedLesson[]= []          
           lessonss?.forEach(lesson => {
            const parsed = getparsedLesson(lesson)
            if (parsed !== null) {
                parsedLessons.push(parsed)
            }
           })
       
     return parsedLessons;
       
    }, [])

    // ================================
    // EVENT HANDLERS
    // ================================
    
    /**
     * Opens the create new lesson modal
     */
  
    /**
     * Exports lessons data to CSV
     */
    const exportToCSV = () => {
        exportDateModalRef.current?.open()
    }

    const handleExportDateSelect = (dates: { firstDateMs: number; lastDateMs: number } | null) => {
        if (!dates) return
        
        // Filter lessons by date range
        const filtered = parsedLessons(lessons as any[]).filter((lesson: ParsedLesson) => {
            const lessonDate = new Date(lesson.date).getTime()
            return lessonDate >= dates.firstDateMs && lessonDate <= dates.lastDateMs
        })

        // Convert to CSV
        const headers = ['Instructeur', 'Student', 'Begintijd', 'Eindtijd', 'Lesduur', 'Betalingsstatus', 'Rijles status', 'Totale urenregistratie']
        const csvData = filtered.map((lesson: ParsedLesson) => {
            const totalHours = timeToHoursRounded(lesson.lesson_duration)
            return [
                lesson.instructor || '',
                lesson.student || '',
                `${lesson.date}.${lesson.start_time}` || '',
                `${lesson.date}.${lesson.end_time}` || '',
                lesson.lesson_duration || '',
                lesson.payment_status || '',
                lesson.lesson_status || '',
                totalHours.toString()
            ]
        })

        // Create CSV content
        const csvContent = [
            headers.join(','),
            ...csvData.map((row: string[]) => row.map(cell => `"${cell}"`).join(','))
        ].join('\n')

        // Download CSV
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', `urenregistratie_${new Date(dates.firstDateMs).toLocaleDateString('nl-NL')}_${new Date(dates.lastDateMs).toLocaleDateString('nl-NL')}.csv`)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    /**
     * Handles filter type changes
     * @param filter - The selected filter type
     */
 

    /**
     * Handles time filter changes
     * @param filter - The selected time filter
     */
   

    // ================================
    // RENDER
    // ================================
    
    return (
        <div className='content ' id='root'>
            {/* Page Header */}
           
            
            <div className='w-full flex flex-col md:flex-row overflow-hidden'>
                {/* Left Sidebar */}
                
                {/* Main Content Area */}
                <div className='dashboard-container w-full md:w-full px-4 md:px-0'>
                    
                    {/* Filter By Type Component */}
                  
                    
                    {/* Spacing */}
                    <div className='mt-4' />
                    
                    {/* Time Filter Component */}
                   
                    {/* Controls Section */}
                    <div className='flex flex-wrap gap-3  items-center  searchItem mt-4 mb-4 justify-between md:justify-end w-full md:w-[95%] h-max mx-auto'>
                        
                        {/* Items Per Page Selector */}
                        <CustomSelect
                            options={[

                                { value: 10, label: "10" },
                                { value: 20, label: "20" },
                                { value: 30, label: "30" },
                                { value: 40, label: "40" },
                                { value: 50, label: "50" },
                                { value: 60, label: "60" },
                                { value: 70, label: "70" },
                                { value: 80, label: "80" },
                                { value: 90, label: "90" },
                                { value: 100, label: "100" },
                            ]}
                         value={size}
                            className='w-full md:w-32 md:mr-auto bg-white h-full'
                            onChange={(value) => {setSize(Number(value)); setIndex(0)}}
                        />
                        
                        {/* Search Input */}
                      
                        {/* Export CSV Button */}
                        <CustmButton 
                            onClick={exportToCSV} 
                            className='rounded-lg bg-[var(--dark-blue)] hover:bg-blue-800 p-2.5 text-white outline-none w-full md:w-auto flex items-center gap-2'
                        >
                            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                            </svg>
                            <span className='text-sm md:text-base'>Exporteren</span>
                        </CustmButton>
                    </div>
                    
                    {/* Lessons Table */}
                    {
                      loading && <div className='text-center mx-auto  w-[2vw] animate-spin duration-400  h-[2vw] mt-20 text-gray-500 border-2 border-blue-800 border-l-0 rounded-full '></div> || 
                      <HoursRegistrationTable 
                        data={ parsedLessons(lessons as any[]) }
                        className=''
                        currentTap={currentFilterType}
                      />
                    }
                </div>
            </div>
            
            {/* Create Modal */}
            <CreateModal ref={CreateModalRef} name='modal' />

            {/* Export Date Range Modal */}
            <CusTomDate
                className=''
                ref={exportDateModalRef}
                singleUse={false}
                onDateSelect={handleExportDateSelect}
            />
        </div>
    )
        }

        function timeToHoursRounded(time: string, decimals = 2) {
  const total = timeToHours(time);
  return Number(total.toFixed(decimals));
}
function timeToHours(time: string) {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours + minutes / 60 + seconds / 3600;
}