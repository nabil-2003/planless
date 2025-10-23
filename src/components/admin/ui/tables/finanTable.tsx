'use client'
import MenuIcon from '@/components/svgs/MenuIcon';
import { ActionModalRef } from '@/components/ui/Action';
import ActionModal from '@/components/ui/Action';
import React, { useEffect, useMemo, useRef } from 'react'
import CustomScrollBar from '../ScrollBar';

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

// Helper to capitalize the first letter of a string (for display only)
const cap = (s?: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');


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
  const [currentPage, setCurrentPage] = React.useState(1)

  // Filter by date range only; do not slice here (pagination handled below)
  useEffect(() => { 
       if(selectedDateRange){
          setStudentFilteredData(
            studentData.filter(item => { 
              const [y,m,d] = item.factuurdatum.split('-').map(Number);
              const [y1,m1,d1] = item.vervaldatum.split('-').map(Number);
              const  date = new Date(y , m -1 , d);
              const  date1 = new Date(y1 , m1 -1 , d1);
              return  date.getTime() >= selectedDateRange.firstDateMs && date1.getTime() <= selectedDateRange.lastDateMs
            })
          )
          setInstructorFilteredData(
            instructorData.filter(item => { 
              const [y,m,d] = item.rijles_datum.split('-').map(Number);
              const  date = new Date(y , m -1 , d);
              return  date.getTime() >= selectedDateRange.firstDateMs && date.getTime() <= selectedDateRange.lastDateMs
            })
          )
        } else {
          setStudentFilteredData(studentData)
          setInstructorFilteredData(instructorData)
        }
  }, [selectedDateRange, studentData, instructorData])

  // Reset to page 1 when filters or context change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedDateRange, itemsPerPage, selectedTab])


  const filteredStudents = useMemo(() => {
    if (!searchQuery) return studentFilteredData
    const q = searchQuery.toLowerCase()
    return studentFilteredData.filter(item =>
      item.student_naam?.toLowerCase().includes(q) ||
      item.factuurdatum?.toLowerCase().includes(q) ||
      item.factuur_bedrag?.toLowerCase().includes(q) ||
      item.vervaldatum?.toLowerCase().includes(q) ||
      item.betalingsstatus?.toLowerCase().includes(q) ||
      item.rijlesstatus?.toLowerCase().includes(q)
    )
  }, [studentFilteredData, searchQuery])

  const filteredInstructors = useMemo(() => {
    if (!searchQuery) return instructorFilteredData
    const q = searchQuery.toLowerCase()
    return instructorFilteredData.filter(item =>
      item.instructeur?.toLowerCase().includes(q) ||
      item.rijles_datum?.toLowerCase().includes(q) ||
      item.betalingsstatus?.toLowerCase().includes(q) ||
      item.rijlesstatus?.toLowerCase().includes(q) ||
      item.urenregistratie?.toLowerCase().includes(q)
    )
  }, [instructorFilteredData, searchQuery])

  const activeData = selectedTab === 'student' ? filteredStudents : filteredInstructors
  const totalPages = Math.ceil(activeData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const pagedData = activeData.slice(startIndex, endIndex)
 

  return (
    <>
      {selectedTab === 'student' ? (
        studentFinanceTable(pagedData as StudentFinancialData[])
      ) : (
        instructorFinanceTable(pagedData as InstructorFinancialData[])
      )}

      {/* Pagination + Custom Scrollbar (unified like other tables) */}
      <div className='w-[90%] mx-auto bg-white rounded-lg p-4 border border-gray-200'>
        <div className='flex justify-between items-center mb-4 px-4'>
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`btn-text border-2 rounded border-[#EAECF0] px-3 py-2 font-semibold ${
              currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 cursor-pointer hover:bg-blue-950/10'
            }`}
          >
            Vorige
          </button>
          <span className='btn-text text-gray-600'>
            Pagina {currentPage} van {totalPages || 1}
          </span>
          <button
            onClick={() => setCurrentPage(p => (p < totalPages ? p + 1 : p))}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`btn-text border-2 rounded border-[#EAECF0] px-3 py-2 font-semibold ${
              currentPage === totalPages || totalPages === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 cursor-pointer hover:bg-blue-950/10'
            }`}
          >
            Volgende
          </button>
        </div>
        {/* Custom Scroll Bar */}
        <CustomScrollBar 
          targetId={selectedTab === 'student' ? 'finance-student-table-container' : 'finance-instructor-table-container'} 
          orientation='horizontal' 
        />
        <div className='w-full text-center mt-4'>
          <span className='btn-text text-gray-600'>
            Weergaven {activeData.length === 0 ? 0 : startIndex + 1}-{Math.min(endIndex, activeData.length)} van {activeData.length}
          </span>
        </div>
      </div>
    </>
  )
}





const studentFinanceTable = (data: StudentFinancialData[]) => {
  if (!data) return null;
  const filtered = data

  const StudentScrollable = ({ item }: { item: StudentFinancialData }) => (
    <div className='flex w-full relative bg-white border-b-1 border-gray-200 hover:bg-blue-100/10' style={{ height: '52px' }}>
      <div className='flex-1 basis-0 min-w-[140px] flex items-center text-md text-gray-700 px-2 truncate overflow-hidden' title={item.student_naam}>{item.student_naam}</div>
      <div className='flex-1 basis-0 min-w-[140px] flex items-center text-md text-gray-700 px-2 truncate overflow-hidden' title={item.factuurdatum}>{item.factuurdatum}</div>
      <div className='flex-1 basis-0 min-w-[140px] flex items-center text-md text-gray-700 px-2 truncate overflow-hidden' title={item.vervaldatum}>{item.vervaldatum}</div>
      <div className='flex-1 basis-0 min-w-[140px] flex items-center text-md px-2'>
        <span className='rounded-lg px-2 py-1 text-sm whitespace-nowrap' style={{ color: getStatusColor(item.betalingsstatus).colortext, backgroundColor: getStatusColor(item.betalingsstatus).colorbg }}>{cap(item.betalingsstatus)}</span>
      </div>
      <div className='flex-1 basis-0 min-w-[140px] flex items-center text-md px-2'>
        <span className='rounded-lg px-2 py-1 text-sm whitespace-nowrap' style={{ color: getStatusColor(item.rijlesstatus).colortext, backgroundColor: getStatusColor(item.rijlesstatus).colorbg }}>{cap(item.rijlesstatus)}</span>
      </div>
      <div className='flex-1 basis-0 min-w-[160px] flex items-center text-md text-gray-700 px-2 truncate overflow-hidden' title={item.factuur_bedrag}>{item.factuur_bedrag}</div>
    </div>
  )

  const StudentActions = ({ item }: { item: StudentFinancialData }) => {
    const actionRef = useRef<ActionModalRef>(null)
    return (
      <div className='bg-gray-50 border-b-1 border-gray-200' style={{ height: '52px' }}>
        <div className='w-[80px] px-3 flex justify-center items-center h-full border-l-1 border-gray-200'>
          <button className='outline-none cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors' onClick={() => { actionRef.current?.Open() }}>
            <MenuIcon s='gray' w='20px' h='20px' f='gray' />
          </button>
          <ActionModal tableName='finance' CurrentStatus={item.rijlesstatus} className='right-1' ref={actionRef} />
        </div>
      </div>
    )
  }

  return (
    <>
      <style jsx global>{`
        .hide-native-scroll::-webkit-scrollbar { display: none; }
        .hide-native-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className='mb-4 w-full' style={{ position: 'relative' }}>
        <div style={{ display: 'flex', width: '100%' }}>
          <div style={{ position: 'sticky', left: 0, zIndex: 2, background: 'white', flexShrink: 0 }}>
            <div className='bg-transparent border-b-1 border-gray-200' style={{ height: '56px' }}>
              <div className='w-[56px] min-w-[56px] md:w-[80px] md:min-w-[80px] px-2 md:px-4 flex justify-center items-center bg-gray-50 h-full text-sm md:text-md border-r-1 border-gray-200'>Nr</div>
            </div>
            <div>
              {filtered.map((_, idx) => (
                <div key={`nr-${idx}`} className='bg-white border-b-1 border-gray-200' style={{ height: '52px' }}>
                  <div className='w-[56px] min-w-[56px] md:w-[80px] md:min-w-[80px] bg-gray-50 px-2 md:px-4 flex justify-center items-center h-full text-sm md:text-md text-gray-700 border-r-1 border-gray-200'>{idx + 1}</div>
                </div>
              ))}
            </div>
          </div>
          <div id='finance-student-table-container' className='flex-1 overflow-x-auto hide-native-scroll'>
            <div className='flex min-w-full w-max border-b-1 border-gray-200' style={{ height: '56px' }}>
              <div className='flex-1 basis-0 min-w-[140px] py-4 flex items-center text-md px-2 whitespace-nowrap truncate'>Student</div>
              <div className='flex-1 basis-0 min-w-[140px] py-4 flex items-center text-md px-2 whitespace-nowrap truncate'>Factuurdatum</div>
              <div className='flex-1 basis-0 min-w-[140px] py-4 flex items-center text-md px-2 whitespace-nowrap truncate'>Vervaldatum</div>
              <div className='flex-1 basis-0 min-w-[140px] py-4 flex items-center text-md px-2 whitespace-nowrap truncate'>Betalingsstatus</div>
              <div className='flex-1 basis-0 min-w-[140px] py-4 flex items-center text-md px-2 whitespace-nowrap truncate'>Rijlesstatus</div>
              <div className='flex-1 basis-0 min-w-[160px] py-4 flex items-center text-md px-2 whitespace-nowrap truncate'>Factuur bedrag</div>
            </div>
            <div className='min-w-full w-max'>
              {filtered.length > 0 ? (
                filtered.map((item, index) => (
                  <StudentScrollable key={`scroll-${index}`} item={item} />
                ))
              ) : (
                <div className='w-full py-8 text-center text-gray-500'>Geen gegevens gevonden</div>
              )}
            </div>
          </div>

          <div style={{ position: 'sticky', right: 0, zIndex: 2, background: 'white', flexShrink: 0 }}>
            <div className='bg-transparent border-b-1 border-gray-200' style={{ height: '56px' }}>
              <div className='w-[56px] md:w-[80px] px-2 md:px-3 flex justify-center items-center h-full text-sm md:text-md bg-gray-50 border-l-1 border-gray-200'>Acties</div>
            </div>
            <div>
              {filtered.map((item, index) => (
                <StudentActions key={`actions-${index}`} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>

      
    </>
  )
}

// New standardized instructor finance table with sticky columns and custom horizontal scrollbar
const instructorFinanceTable = (data: InstructorFinancialData[]) => {
  if (!data) return null;
  const filtered = data

  const InstructeurScrollable = ({ item }: { item: InstructorFinancialData }) => (
    <div className='flex w-full relative bg-white border-b-1 border-gray-200 hover:bg-blue-100/10' style={{ height: '52px' }}>
      <div className='flex-1 basis-0 min-w-[140px] flex items-center text-md text-gray-700 px-2 truncate overflow-hidden' title={item.instructeur}>{item.instructeur}</div>
      <div className='flex-1 basis-0 min-w-[140px] flex items-center text-md text-gray-700 px-2 truncate overflow-hidden' title={item.rijles_datum}>{item.rijles_datum}</div>
      <div className='flex-1 basis-0 min-w-[140px] flex items-center text-md px-2'>
        <span className='rounded-lg px-2 py-1 text-sm whitespace-nowrap' style={{ color: getStatusColor(item.betalingsstatus).colortext, backgroundColor: getStatusColor(item.betalingsstatus).colorbg }}>{cap(item.betalingsstatus)}</span>
      </div>
      <div className='flex-1 basis-0 min-w-[140px] flex items-center text-md px-2'>
        <span className='rounded-lg px-2 py-1 text-sm whitespace-nowrap' style={{ color: getStatusColor(item.rijlesstatus).colortext, backgroundColor: getStatusColor(item.rijlesstatus).colorbg }}>{cap(item.rijlesstatus)}</span>
      </div>
      <div className='flex-1 basis-0 min-w-[160px] flex items-center text-md text-gray-700 px-2 truncate overflow-hidden' title={item.urenregistratie}>{item.urenregistratie}</div>
    </div>
  )

  const InstructeurActions = ({ item }: { item: InstructorFinancialData }) => {
    const actionRef = useRef<ActionModalRef>(null)
    return (
      <div className='bg-gray-50 border-b-1 border-gray-200' style={{ height: '52px' }}>
        <div className='w-[80px] px-3 flex justify-center items-center h-full border-l-1 border-gray-200'>
          <button className='outline-none cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors' onClick={() => { actionRef.current?.Open() }}>
            <MenuIcon s='gray' w='20px' h='20px' f='gray' />
          </button>
          <ActionModal tableName='finance' CurrentStatus={item.rijlesstatus} className='right-1' ref={actionRef} />
        </div>
      </div>
    )
  }

  return (
    <>
      <style jsx global>{`
        .hide-native-scroll::-webkit-scrollbar { display: none; }
        .hide-native-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className='mb-4 w-full' style={{ position: 'relative' }}>
        <div style={{ display: 'flex', width: '100%' }}>
          <div style={{ position: 'sticky', left: 0, zIndex: 2, background: 'white', flexShrink: 0 }}>
            <div className='bg-transparent border-b-1 border-gray-200' style={{ height: '56px' }}>
              <div className='w-[56px] min-w-[56px] md:w-[80px] md:min-w-[80px] px-2 md:px-4 flex justify-center items-center bg-gray-50 h-full text-sm md:text-md border-r-1 border-gray-200'>Nr</div>
            </div>
            <div>
              {filtered.map((_, idx) => (
                <div key={`nr-${idx}`} className='bg-white border-b-1 border-gray-200' style={{ height: '52px' }}>
                  <div className='w-[56px] min-w-[56px] md:w-[80px] md:min-w-[80px] bg-gray-50 px-2 md:px-4 flex justify-center items-center h-full text-sm md:text-md text-gray-700 border-r-1 border-gray-200'>{idx + 1}</div>
                </div>
              ))}
            </div>
          </div>

          <div id='finance-instructor-table-container' className='flex-1 overflow-x-auto hide-native-scroll'>
            <div className='flex min-w-full w-max bg-transparent border-b-1 border-gray-200' style={{ height: '56px' }}>
              <div className='flex-1 basis-0 min-w-[140px] py-4 flex items-center text-md px-2 whitespace-nowrap truncate'>Instructeur</div>
              <div className='flex-1 basis-0 min-w-[140px] py-4 flex items-center text-md px-2 whitespace-nowrap truncate'>Rijles datum</div>
              <div className='flex-1 basis-0 min-w-[140px] py-4 flex items-center text-md px-2 whitespace-nowrap truncate'>Betalingsstatus</div>
              <div className='flex-1 basis-0 min-w-[140px] py-4 flex items-center text-md px-2 whitespace-nowrap truncate'>Rijlesstatus</div>
              <div className='flex-1 basis-0 min-w-[160px] py-4 flex items-center text-md px-2 whitespace-nowrap truncate'>Urenregistratie</div>
            </div>
            <div className='min-w-full w-max'>
              {filtered.length > 0 ? (
                filtered.map((item, index) => (
                  <InstructeurScrollable key={`scroll-${index}`} item={item} />
                ))
              ) : (
                <div className='w-full py-8 text-center text-gray-500'>Geen gegevens gevonden</div>
              )}
            </div>
          </div>

          <div style={{ position: 'sticky', right: 0, zIndex: 2, background: 'white', flexShrink: 0 }}>
            <div className='bg-transparent border-b-1 border-gray-200' style={{ height: '56px' }}>
              <div className='w-[56px] md:w-[80px] px-2 md:px-3 flex justify-center items-center h-full text-sm md:text-md bg-gray-50 border-l-1 border-gray-200'>Acties</div>
            </div>
            <div>
              {filtered.map((item, index) => (
                <InstructeurActions key={`actions-${index}`} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>

      
    </>
  )
}
const instructorFinanceTableLegacy = (data: InstructorFinancialData[] , filteringInstructors : (item: InstructorFinancialData) => boolean) => {
  


    const InstructeurRow = ({ item, index }: { item: InstructorFinancialData; index: number }) => {
    const actionRef = useRef<ActionModalRef>(null)
    return (
      <div key={index} className='flex w-full justify-between  bg-white   hover:bg-blue-100/10 border-gray-200 relative' style={{ height: '52px' }}>
        <div className='w-[4vw] min-w-[80px] px-6 py-4 flex  bg-blue-100/10 justify-center items-center font-semibold text-gray-700'>{item.id}</div>
        <div className='w-[9vw] min-w-[140px] flex items-center text-md text-gray-700 px-2 truncate overflow-hidden' title={item.instructeur}>{item.instructeur}</div>
        <div className='w-[7vw] min-w-[140px] flex items-center text-md text-gray-700 px-2 truncate overflow-hidden' title={item.rijles_datum}>{item.rijles_datum}</div>
      
        <div className='w-[7vw] min-w-[140px] flex items-center text-md text-gray-700 px-2 truncate overflow-hidden' title={cap(item.betalingsstatus)}>
          <span className='rounded-lg p-1 text-sm' style={{
            color: getStatusColor(item.betalingsstatus).colortext,
            backgroundColor: getStatusColor(item.betalingsstatus).colorbg
          }}>
            {cap(item.betalingsstatus)}
          </span>
        </div>
        <div className='w-[7vw] min-w-[140px] flex items-center text-md text-gray-700 px-2 truncate overflow-hidden' title={cap(item.rijlesstatus)}>
          <span className='rounded-lg p-1 text-sm' style={{
            color: getStatusColor(item.rijlesstatus).colortext,
            backgroundColor: getStatusColor(item.rijlesstatus).colorbg
          }}>
            {cap(item.rijlesstatus)}
          </span>
        </div>
        <div className='w-[7vw] min-w-[160px] flex items-center text-md text-gray-700 px-2 truncate overflow-hidden' title={item.urenregistratie}>{item.urenregistratie}</div>
        <div className='w-[5vw] min-w-[90px] flex   justify-center  px-6 py-4 items-center font-semibold text-gray-700 bg-blue-100/10'>
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
  <div className='rounded-lg mx-auto  w-[95%] overflow-x-auto'>


        <header className='header  w-full '>
          <div className='flex  justify-between ' style={{ height: '52px' }}>
            <div className='w-[4vw] min-w-[80px] px-6 py-4 flex  justify-center items-center bg-blue-100/10 font-semibold text-gray-700 whitespace-nowrap truncate'>Nr</div>
            <div className='w-[9vw] min-w-[140px] flex items-center font-semibold text-gray-700 px-2 whitespace-nowrap truncate'>Instructeur</div>
            <div className='w-[7vw] min-w-[140px] flex items-center font-semibold text-gray-700 px-2 whitespace-nowrap truncate'>Rijles datum</div>
            <div className='w-[7vw] min-w-[140px] flex items-center font-semibold text-gray-700 px-2 whitespace-nowrap truncate'>Betalingsstatus</div>
            <div className='w-[7vw] min-w-[140px] flex items-center font-semibold text-gray-700 px-2 whitespace-nowrap truncate'>Rijlesstatus</div>
            <div className='w-[7vw] min-w-[160px] flex items-center font-semibold text-gray-700 px-2 whitespace-nowrap truncate'>Urenregistratie</div>
            <div className='w-[5vw] min-w-[90px] flex  justify-center  px-6 py-4 items-center font-semibold text-gray-700 bg-blue-100/10 whitespace-nowrap truncate'>Acties</div>

          </div>

        </header>
        {
          data.filter(filteringInstructors).map((item, index) => <InstructeurRow key={index} item={item} index={index} />)
        }
        
      </div>
    </>
  )
}
