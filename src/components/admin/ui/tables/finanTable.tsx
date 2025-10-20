'use client'
import MenuIcon from '@/components/svgs/MenuIcon';
import { ActionModalRef } from '@/components/ui/Action';
import ActionModal from '@/components/ui/Action';
import React, { use, useCallback, useEffect, useMemo, useRef } from 'react'
import CustomScrollBar from '../ScrollBar';
import Link from 'next/link';
import { time } from 'console';
import TimeFilter from '../../TimeFIlter';

// Data types for financial records
export type StudentFinancialData = {
  id: number;
  student_naam?: string;
  factuurdatum: string;
  vervaldatum: string;
  betalingsstatus: string;
  rijlesstatus: string;
  factuur_bedrag: string;
}

export type InstructorFinancialData = {
  id: number;
  instructeur: string;
  rijles_datum: string;
  betalingsstatus: string;
  rijlesstatus: string;
  urenregistratie: string;
}

type ColorAndStatus = {
  colortext: string
  status: string
  colorbg: string
}


const getStatusColor = (status: string): ColorAndStatus => {

  const statusColors = [ 
    {
        status: "In behandeling",
        colortext: "#bc5419",
        colorbg: "#f7d0b9"
      },
     
  {
    status: "Geannuleerd",
    colortext: "#333333",
    colorbg: "#ededed"
  },
  {
    status: "Bevestigd",
    colortext: "#006400",
    colorbg: "#dcffd6"
  },
  {
    status: "Onbetaald",
    colortext: "#8b0000",
    colorbg: "#ffd6d6"
  },
  {
    status: "Voltooid",
    colortext: "#024089",
    colorbg: "#daefff"
  },
  {
    status: "Betaald",
    colortext: "#006400",
    colorbg: "#dcffd6"
  },
  // Additional finance-specific status mappings
  {
    status: "Betaald",
    colortext: "#006400",
    colorbg: "#dcffd6"
  },
  {
    status: "Openstaand",
    colortext: "#8b0000",
    colorbg: "#ffd6d6"
  },
  {
    status: "Verlopen",
    colortext: "#333333",
    colorbg: "#ededed"
  },
  {
    status: "Gepland",
    colortext: "#6e3fa6",
    colorbg: "#f2d6ff"
  },
  {
    status: "Afgelast",
    colortext: "#333333",
    colorbg: "#ededed"
  }]



  return {
    colortext: statusColors.find(s => s.status.toLowerCase()=== status.toLowerCase())?.colortext || "#000000",
    status: statusColors.find(s => s.status.toLowerCase()=== status.toLowerCase())?.status || "Onbekend",
    colorbg: statusColors.find(s => s.status.toLowerCase()=== status.toLowerCase())?.colorbg || "#ffffff"
  }

}


export default function FinanTable({ selectedTab = "student", timeFilter, itemsPerPage, searchQuery, instructorData=[] ,  selectedDateRange, studentData = [] }: { 
  itemsPerPage: number, selectedDateRange: { firstDateMs: number; lastDateMs: number } | null,
   timeFilter: string, searchQuery: string, filterTable: string, 
  selectedTab: 'student' | 'instructor', studentData?: Array<StudentFinancialData> , 
    instructorData?: Array<InstructorFinancialData>
    ,

}) { 
  const [studentFilteredData , setStudentFilteredData] = React.useState<StudentFinancialData[]>(studentData)
  const [instructorFilteredData , setInstructorFilteredData] = React.useState<InstructorFinancialData[]>(instructorData)
  useEffect(() => { 
       if(selectedDateRange){
          
          setStudentFilteredData(t=>   studentData.filter(item => { 
           const [y,m,d] = item.factuurdatum.split('-').map(Number);
           const [y1,m1,d1] = item.vervaldatum.split('-').map(Number);

           const  date = new Date(y , m -1 , d);
           const  date1 = new Date(y1 , m1 -1 , d1);
            return  date.getTime() >= selectedDateRange.firstDateMs && date1.getTime() <= selectedDateRange.lastDateMs
               
        }))
          setInstructorFilteredData(t=>   instructorData.filter(item => { 
           const [y,m,d] = item.rijles_datum.split('-').map(Number);
           const  date = new Date(y , m -1 , d);
            return  date.getTime() >= selectedDateRange.firstDateMs && date.getTime() <= selectedDateRange.lastDateMs
               
        }))
     


        } else {
          setStudentFilteredData(t=> studentData.filter((e,i )=> i< itemsPerPage  ))
          setInstructorFilteredData(t=> instructorData.filter((e,i )=> i< itemsPerPage  ))
        }

      
  }, [searchQuery , selectedDateRange , itemsPerPage])


  const filteringStudent = useMemo(
    () => (item: StudentFinancialData) => {
      if (searchQuery && 
        item.student_naam?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.factuurdatum?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.factuur_bedrag?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.vervaldatum?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.betalingsstatus?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.rijlesstatus?.toLowerCase().includes(searchQuery.toLowerCase())
    ) {   
     
      return true
          
          
      }
     
      return false
  
  }, [searchQuery , selectedDateRange])
   const filteringInstructors = (item: InstructorFinancialData) => {
      if (searchQuery && 
        item.instructeur?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.rijles_datum?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.betalingsstatus?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.rijlesstatus?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.urenregistratie?.toLowerCase().includes(searchQuery.toLowerCase())
    ) {   
          return true 
      }
      return false
  }
 

  if (selectedTab === 'student' ) {
    console.log("data in finan table", studentData)
    return studentFinanceTable(studentFilteredData , filteringStudent)
  } else if (selectedTab === 'instructor') {
    return instructorFinanceTable(instructorFilteredData , filteringInstructors)
  }
}





const studentFinanceTable = (data: StudentFinancialData[], filtering: (item: StudentFinancialData) => boolean   ) => {
  if (!data) return null;

  // Small component so each row can have its own Action modal and ref
  const StudentRow = ({ item, index }: { item: StudentFinancialData; index: number }) => {
    const actionRef = useRef<ActionModalRef>(null)
    return (
      <div key={index} className='  flex w-full justify-between  bg-white   hover:bg-blue-100/10 border-gray-200 relative' style={{ height: '52px' }}>
        <div className='w-[4vw] px-6 py-4 flex  bg-blue-100/10 justify-center items-center font-semibold text-gray-700'>{item.id}</div>
        <div className='w-[9vw] flex items-center text-md text-gray-700 px-2 truncate overflow-hidden' title={item.student_naam}>{item.student_naam}</div>
        <div className='w-[7vw] flex items-center text-md text-gray-700 px-2 truncate overflow-hidden' title={item.factuurdatum}>{item.factuurdatum}</div>
        <div className='w-[7vw] flex items-center text-md text-gray-700 px-2 truncate overflow-hidden' title={item.vervaldatum}>{item.vervaldatum}</div>
        <div className='w-[7vw] flex items-center text-md text-gray-700 px-2 truncate overflow-hidden' title={item.betalingsstatus}>
          <span className='rounded-lg p-1 text-sm' style={{
            color: getStatusColor(item.betalingsstatus).colortext,
            backgroundColor: getStatusColor(item.betalingsstatus).colorbg
          }}>
            {item.betalingsstatus}
          </span>
        </div>
        <div className='w-[7vw] flex items-center text-md text-gray-700 px-2 truncate overflow-hidden' title={item.rijlesstatus}>
          <span className='rounded-lg p-1 text-sm' style={{
            color: getStatusColor(item.rijlesstatus).colortext,
            backgroundColor: getStatusColor(item.rijlesstatus).colorbg
          }}>
            {item.rijlesstatus}
          </span>
        </div>
        <div className='w-[7vw] flex items-center text-md text-gray-700 px-2 truncate overflow-hidden' title={item.factuur_bedrag}>{item.factuur_bedrag}</div>
        <div className='w-[5vw] flex   justify-center  px-6 py-4 items-center font-semibold text-gray-700 bg-blue-100/10'>
          <span onClick={() => { actionRef.current?.Open() }} className='cursor-pointer '>
            <MenuIcon s='gray' w='20px' h='20px' f='gray' />
          </span>
        </div>
        <ActionModal tableName='finance' CurrentStatus={item.rijlesstatus} className='right-4' ref={actionRef} />
      </div>
    )
  }

  return (

    <div className='mx-auto relative rounded-lg  w-[95%] '>
      <header className='header  w-full '>
        <div className='flex  justify-between ' style={{ height: '52px' }}>
          <div className='w-[4vw] px-6 py-4 flex  justify-center items-center bg-blue-100/10 font-semibold text-gray-700'>Nr</div>
          <div className='w-[9vw] flex items-center font-semibold text-gray-700 px-2'>Student</div>
          <div className='w-[7vw] flex items-center font-semibold text-gray-700 px-2'>Factuurdatum</div>
          <div className='w-[7vw] flex items-center font-semibold text-gray-700 px-2'>Vervaldatum</div>
          <div className='w-[7vw] flex items-center font-semibold text-gray-700 px-2'>Betalingsstatus</div>
          <div className='w-[7vw] flex items-center font-semibold text-gray-700 px-2'>Rijlesstatus</div>
          <div className='w-[7vw] flex items-center font-semibold text-gray-700 px-2'>Factuur bedrag</div>
          <div className='w-max flex px-6 py-4 items-center font-semibold text-gray-700 bg-blue-100/10'>Acties</div>

        </div>

      </header>
      {
        data.filter(filtering).map((item, index) => <StudentRow key={index} item={item} index={index} />)
      }
    </div>

  )

}
const instructorFinanceTable = (data: InstructorFinancialData[] , filteringInstructors : (item: InstructorFinancialData) => boolean) => {
  


    const InstructeurRow = ({ item, index }: { item: InstructorFinancialData; index: number }) => {
    const actionRef = useRef<ActionModalRef>(null)
    return (
      <div key={index} className='flex w-full justify-between  bg-white   hover:bg-blue-100/10 border-gray-200 relative' style={{ height: '52px' }}>
        <div className='w-[4vw] px-6 py-4 flex  bg-blue-100/10 justify-center items-center font-semibold text-gray-700'>{item.id}</div>
        <div className='w-[9vw] flex items-center text-md text-gray-700 px-2 truncate overflow-hidden' title={item.instructeur}>{item.instructeur}</div>
        <div className='w-[7vw] flex items-center text-md text-gray-700 px-2 truncate overflow-hidden' title={item.rijles_datum}>{item.rijles_datum}</div>
      
        <div className='w-[7vw] flex items-center text-md text-gray-700 px-2 truncate overflow-hidden' title={item.betalingsstatus}>
          <span className='rounded-lg p-1 text-sm' style={{
            color: getStatusColor(item.betalingsstatus).colortext,
            backgroundColor: getStatusColor(item.betalingsstatus).colorbg
          }}>
            {item.betalingsstatus}
          </span>
        </div>
        <div className='w-[7vw] flex items-center text-md text-gray-700 px-2 truncate overflow-hidden' title={item.rijlesstatus}>
          <span className='rounded-lg p-1 text-sm' style={{
            color: getStatusColor(item.rijlesstatus).colortext,
            backgroundColor: getStatusColor(item.rijlesstatus).colorbg
          }}>
            {item.rijlesstatus}
          </span>
        </div>
        <div className='w-[7vw] flex items-center text-md text-gray-700 px-2 truncate overflow-hidden' title={item.urenregistratie}>{item.urenregistratie}</div>
        <div className='w-[5vw] flex   justify-center  px-6 py-4 items-center font-semibold text-gray-700 bg-blue-100/10'>
          <span onClick={() => { actionRef.current?.Open() }} className='cursor-pointer '>
            <MenuIcon s='gray' w='20px' h='20px' f='gray' />
          </span>
        </div>
        <ActionModal tableName='finance' CurrentStatus={item.rijlesstatus} className='right-4' ref={actionRef} />
      </div>
    )
  }

  if (!data) return null;
  return (
    <>
      <div className='rounded-lg mx-auto  w-[95%] '>


        <header className='header  w-full '>
          <div className='flex  justify-between ' style={{ height: '52px' }}>
            <div className='w-[4vw] px-6 py-4 flex  justify-center items-center bg-blue-100/10 font-semibold text-gray-700'>Nr</div>
            <div className='w-[9vw] flex items-center font-semibold text-gray-700 px-2'>Instructeur</div>
            <div className='w-[7vw] flex items-center font-semibold text-gray-700 px-2'>Rijles datum</div>
            <div className='w-[7vw] flex items-center font-semibold text-gray-700 px-2'>Betalingsstatus</div>
            <div className='w-[7vw] flex items-center font-semibold text-gray-700 px-2'>Rijlesstatus</div>
            <div className='w-[7vw] flex items-center font-semibold text-gray-700 px-2'>Urenregistratie</div>
            <div className='w-[5vw] flex  justify-center  px-6 py-4 items-center font-semibold text-gray-700 bg-blue-100/10'>Acties</div>

          </div>

        </header>
        {
          data.filter(filteringInstructors).map((item, index) => <InstructeurRow key={index} item={item} index={index} />)
        }
        
      </div>
    </>
  )
}
