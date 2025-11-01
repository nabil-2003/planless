'use client'
import MenuIcon from '@/components/svgs/MenuIcon';
import { ActionModalRef } from '@/components/ui/Action';
import ActionModal from '@/components/ui/Action';
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import CustomScrollBar from '../ScrollBar';
import Link from 'next/link';
import { DocumentModal, DocumentModalRef } from '@/components/ui'

// Data types
export type Data_Lessons = {
    instructeur: string,
    student: string,
    begintijd: string,
    eindtijd: string,
    lesduur: string,
    factuur_bedrag: string,
    betalingsstatus: string,
    rijles_status: string,
    annuleringstijd: string,
    annuleringsreden: string,
}

type ColorAndStatus = {
    colortext: string
    status: string
    colorbg: string
}

// Main table component
export default function LessonsTable({
  data, 
  filterTable, 
  searchQuery = '', 
  selectedDateRange, 
  timeFilter = '24 uur',
  itemsPerPage = 10, className= ''
} :{
  data: Array<Data_Lessons>,
  className: string,
  filterTable: string,
  searchQuery?: string,
  selectedDateRange?: { firstDateMs: number; lastDateMs: number } | null,
  timeFilter?: string,
  itemsPerPage?: number
}) {
  const [currentPage, setCurrentPage] = React.useState(1)
  
  // Filter data based on all criteria
  const filteredData = useMemo(() => {
    let filtered = data
    
    // Filter by status
    if (filterTable && filterTable !== 'Alle') {
      filtered = filtered.filter(item => 
        item.rijles_status && item.rijles_status.toLowerCase().includes(filterTable.toLowerCase())
      )
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(item => 
        item.instructeur.toLowerCase().includes(query) ||
        item.student.toLowerCase().includes(query) ||
        item.factuur_bedrag.toLowerCase().includes(query) ||
        item.betalingsstatus.toLowerCase().includes(query) ||
        item.rijles_status.toLowerCase().includes(query) ||
        item.annuleringsreden.toLowerCase().includes(query)
      )
    }
    
    // Filter by date range
    if (selectedDateRange) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.begintijd).getTime()
        return itemDate >= selectedDateRange.firstDateMs && itemDate <= selectedDateRange.lastDateMs
      })
    }
    
    // Filter by time period
    if (timeFilter !== '24 uur') {
      const now = new Date().getTime()
      let timeFilterMs = 24 * 60 * 60 * 1000 // Default 24 hours
      
      switch (timeFilter) {
        case '7 dagen':
          timeFilterMs = 7 * 24 * 60 * 60 * 1000
          break
        case '30 dagen':
          timeFilterMs = 30 * 24 * 60 * 60 * 1000
          break
        case '12 maanden':
          timeFilterMs = 365 * 24 * 60 * 60 * 1000
          break
      }
      
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.begintijd).getTime()
        return now - itemDate <= timeFilterMs
      })
    }
    
    return filtered
  }, [data, filterTable, searchQuery, selectedDateRange, timeFilter])
  
  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  // Navigation functions
  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }, [currentPage, totalPages])

  const goToPrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
  }, [currentPage])

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filterTable, searchQuery, selectedDateRange, timeFilter, itemsPerPage])
  return (
    <>
      {/* Table Container with Sticky NR and Actions Columns */}
      <div className={`${className} mb-4 overflow-hidden p-1 scale-95 `} style={{ position: 'relative' }}>
        <div style={{ display: 'flex', width: '100%', maxWidth: '100vw' }}>
          {/* Sticky NR Column - Left */}
          <div style={{ position: 'sticky', left: 0, zIndex: 2, background: 'white' }}>
            {/* NR Header */}
            <div className='bg-gray-50 border-b-1 border-gray-200' style={{ height: '56px' }}>
              <div className='w-[4vw] px-4 flex justify-center items-center h-full  text-md  border-r-1 border-gray-200'>Nr</div>
            </div>
            {/* NR Body */}
            <div>
              {currentData.length > 0 ? (
                currentData.map((lesson, index) => (
                  <div 
                    key={`nr-${startIndex + index}`} 
                    className='bg-white border-b-1 border-gray-200'
                    style={{ height: '52px' }}
                  >
                    <div className='w-[4vw] bg-gray-50 px-4 flex justify-center items-center h-full  text-md text-gray-700 border-r-1 border-gray-200'>
                      {startIndex + index + 1}
                    </div>
                  </div>
                ))
              ) : null}
            </div>
          </div>

          {/* Scrollable Content - Middle */}
          <div id='rijlessen-table-container' className='flex-1 overflow-x-auto hide-native-scroll'>
            {/* Scrollable Header */}
            <div className='flex w-max bg-transparent border-b-1 border-gray-200' style={{ height: '56px' }}>
              <div className='w-[7vw] min-w-[120px] py-4 flex items-center  text-md  px-2 whitespace-nowrap truncate'>Instructeur</div>
              <div className='w-[7vw] min-w-[120px] py-4 flex items-center  text-md  px-2 whitespace-nowrap truncate'>Student</div>
              <div className='w-[9vw] min-w-[140px] py-4 flex items-center  text-md  px-2 whitespace-nowrap truncate'>Begintijd</div>
              <div className='w-[9vw] min-w-[140px] py-4 flex items-center  text-md  px-2 whitespace-nowrap truncate'>Eindtijd</div>
              <div className='w-[6vw] min-w-[90px] py-4 flex items-center  text-md  px-2 whitespace-nowrap truncate'>Lesduur</div>
              <div className='w-[12vw] min-w-[160px] py-4 flex items-center  text-md  px-2 whitespace-nowrap truncate'>Factuur bedrag</div>
              <div className='w-[9vw] min-w-[140px] py-4 flex items-center  text-md  px-2 whitespace-nowrap truncate'>Rijles status</div>
              <div className='w-[9vw] min-w-[140px] py-4 flex items-center  text-md  px-2 whitespace-nowrap truncate'>Betalingsstatus</div>
              <div className='w-[11vw] min-w-[160px] py-4 flex items-center  text-md  px-2 whitespace-nowrap truncate'>Annuleringstijd</div>
              <div className='w-[9vw] min-w-[140px] py-4 flex items-center  text-md  px-2 whitespace-nowrap truncate'>Leskaarten</div>
              <div className='w-[16vw] min-w-[220px] py-4 flex items-center  text-md  px-2 pr-6 whitespace-nowrap truncate'>Annuleringsreden</div>
            </div>
            {/* Scrollable Body */}
            <div className='w-max'>
              {currentData.length > 0 ? (
                currentData.map((lesson, index) => (
                  <TableElementScrollable 
                    key={startIndex + index} 
                    ele={lesson} 
                  />
                ))
              ) : (
                <div className='w-full py-8 text-center text-gray-500'>
                  Geen lessen gevonden
                </div>
              )}
            </div>
          </div>

          {/* Sticky Actions Column - Right */}
          <div style={{ position: 'sticky', right: 0, zIndex: 2, background: 'white', flexShrink: 0 }}>
            {/* Actions Header */}
            <div className='bg-transparent border-b-1 border-gray-200' style={{ height: '56px' }}>
              <div className='w-[80px] px-3 flex justify-center items-center h-full  text-md bg-gray-50  border-l-1 border-gray-200'>Acties</div>
            </div>
            {/* Actions Body */}
            <div>
              {currentData.length > 0 ? (
                currentData.map((lesson, index) => (
                  <TableElementActions 
                    key={`actions-${startIndex + index}`} 
                    ele={lesson} 
                  />
                ))
              ) : null}
            </div>
          </div>
        </div>
      </div>
    
      {/* Pagination Controls - Stable Layout */}
     <div id='scroll' className='mt-10   w-[90%] mx-auto p-3  border-2 border-gray-200 bg-white rounded-lg'>
       <div className='  mb-4 flex justify-between items-center'>
        <button 
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className={` text-md border-2 rounded border-[#EAECF0] px-3 py-2 font-semibold ${
            currentPage === 1 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'cursor-pointer hover:bg-blue-950/10'
          }`}
        >
          Vorige
        </button>
      
        <span className=' text-md'>
          Pagina {currentPage} van {totalPages || 1}
        </span>
      
        <button 
          onClick={goToNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          className={` text-md border-2 rounded border-[#EAECF0] px-3 py-2 font-semibold ${
            currentPage === totalPages || totalPages === 0
              ? 'text-gray-400 cursor-not-allowed' 
              : 'cursor-pointer hover:bg-blue-950/10'
          }`}
        >
          Volgende
        </button>
      </div>
      <CustomScrollBar targetId="rijlessen-table-container" orientation='horizontal' />
    
      {/* Results Counter */}
      <div className='w-[95%] mx-auto mb-4 text-center'>
        <span className=' text-md text-gray-600'>
          Weergaven {startIndex + 1}-{Math.min(endIndex, filteredData.length)} van {filteredData.length}
        </span>
      </div>
     </div>
    </>
  );
}
// Individual table row component

// Scrollable table row component (without NR and Actions)
const TableElementScrollable = ({ ele }: { ele: Data_Lessons }) => {
  const cap = (s?: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '')
  // Status color mapping
  const ColorToStatus = useMemo(() => {
    const clt: ColorAndStatus[] = [
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
    ]
    return clt
  }, [])

  // Find color for status
  const mapColorToStatus = useCallback(
    (status: string) => {
      const color = ColorToStatus.find(item => item.status.toLowerCase() === status.toLowerCase());
      return color;
    },
    [ColorToStatus]
  )

  const invoiceModalRef = useRef<DocumentModalRef>(null)
  const lessonCardModalRef = useRef<DocumentModalRef>(null)

  return (
    <div className='flex relative w-max border-b-1 hover:bg-blue-100/10 border-gray-200' style={{ height: '52px' }}>
  <div className='w-[7vw] min-w-[120px] flex items-center  text-md text-gray-700 px-2 truncate overflow-hidden' title={ele?.instructeur}>{ele?.instructeur}</div>
  <div className='w-[7vw] min-w-[120px] flex items-center  text-md text-gray-700 px-2 truncate overflow-hidden' title={ele?.student}>{ele?.student}</div>
  <div className='w-[9vw] min-w-[140px] flex items-center  text-md text-gray-700 px-2 truncate overflow-hidden' title={ele?.begintijd}>{ele?.begintijd}</div>
  <div className='w-[9vw] min-w-[140px] flex items-center  text-md text-gray-700 px-2 truncate overflow-hidden' title={ele?.eindtijd}>{ele?.eindtijd}</div>
  <div className='w-[6vw] min-w-[90px] flex items-center  text-md text-gray-700 px-2 truncate overflow-hidden' title={ele?.lesduur}>{ele?.lesduur}</div>
  <div className='w-[12vw] min-w-[160px] flex items-center  text-md text-gray-700 px-2'>
        <button
          type='button'
          onClick={() => invoiceModalRef.current?.open()}
          className='flex items-center gap-2 cursor-pointer transition-colors hover:text-blue-800'
        >
          <img src='/pdf_icon.png' width={16} height={16} alt='' />
          <span className='truncate ' title={ele?.factuur_bedrag}>{ele?.factuur_bedrag}</span>
        </button>
        <DocumentModal
          ref={invoiceModalRef}
          title='Factuur bedrag'
          documentName={ele.factuur_bedrag}
          description='Bekijk factuurdetails voor deze les.'
        />
      </div>

      {/* Status columns with colored badges */}
  <div className='w-[9vw] min-w-[140px] flex items-center  text-md px-2'>
        <span
          style={{
            backgroundColor: mapColorToStatus(ele.rijles_status)?.colorbg,
            color: mapColorToStatus(ele.rijles_status)?.colortext
          }}
          className='whitespace-nowrap  text-sm px-2 py-1 rounded-lg'
        >
          {cap(ele.rijles_status)}
        </span>
      </div>
      
  <div className='w-[9vw] min-w-[140px] flex items-center  text-md px-2'>
        <span
          style={{
            backgroundColor: mapColorToStatus(ele.betalingsstatus)?.colorbg,
            color: mapColorToStatus(ele.betalingsstatus)?.colortext
          }}
          className='whitespace-nowrap  text-sm px-2 py-1 rounded-lg'
        >
          {cap(ele.betalingsstatus)}
        </span>
      </div>
      
  <div className='w-[11vw] min-w-[160px] flex items-center  text-md text-gray-700 px-2 truncate overflow-hidden' title={ele.annuleringstijd}>{ele.annuleringstijd}</div>
  <div className='w-[9vw] min-w-[140px] flex items-center  text-md px-2'>
        <button
          type='button'
          onClick={() => lessonCardModalRef.current?.open()}
          className='flex items-center gap-2 cursor-pointer  transition-colors hover:text-blue-800'
        >
          <img src='/pdf_icon.png' width={16} height={16} alt='' />
          <span className='truncate'>Bekijk leskaart</span>
        </button>
        <DocumentModal
          ref={lessonCardModalRef}
          title='Leskaart'
          documentName={`Leskaart - ${ele.student}`}
          description='Voorbeeld van de leskaart voor deze student.'
        />
      </div>
  <div className='w-[16vw] min-w-[220px] flex items-center  text-md text-gray-700 px-2 pr-6 truncate overflow-hidden' title={ele.annuleringsreden}>{ele.annuleringsreden}</div>
    </div>
  )
}

// Actions column component for sticky right position
const TableElementActions = ({ ele }: { ele: Data_Lessons }) => {
  const modalRef = useRef<ActionModalRef>(null);

  return (
    <div 
      className='bg-gray-50 border-b-1 border-gray-200'
      style={{ height: '52px' }}
    >
      <div className='w-[80px] px-3 flex justify-center items-center h-full border-l-1 border-gray-200'>
        <button 
          className='outline-none cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors' 
          onClick={() => { modalRef.current?.Open() }}
        >
          <MenuIcon s='gray' w='20px' h='20px' f='gray' />
        </button>
        <ActionModal id={ele.student} tableName='lessons' CurrentStatus={ele.rijles_status} ref={modalRef} />
      </div>
    </div>
  )
}
