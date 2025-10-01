'use client'
import MenuIcon from '@/components/svgs/MenuIcon';
import { ActionModalRef } from '@/components/ui/Action';
import ActionModal from '@/components/ui/Action';
import React, { useCallback, useEffect, useMemo, useRef } from 'react'

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
export default function CustomTable({
  data, 
  filterTable, 
  searchQuery = '', 
  selectedDateRange, 
  timeFilter = '24 uur',
  itemsPerPage = 10
} :{
  data: Array<Data_Lessons>, 
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
      {/* Table Container with Horizontal Scroll */}
      <div className='mb-4 overflow-x-auto'>
        {/* Table Header */}
        <ul className='flex justify-around *:text-center border-gray-200 w-[95%] mx-3 *:h-[7vh] bg-[#f9fafb] *:capitalize *:font-normal *:text-xs items-center'>
          <li className='w-[4vw] p-2 text-center flex items-center border-gray-200 justify-center'>nr</li>
          <li className='w-[10vw] p-2 text-center flex items-center border-gray-200 justify-center'>instructeur</li>
          <li className='w-[10vw] p-2 text-center flex items-center border-gray-200 justify-center'>student</li>
          <li className='w-[14vw] p-2 text-center flex items-center border-gray-200 justify-center'>Begintijd</li>
          <li className='w-[14vw] p-2 text-center flex items-center border-gray-200 justify-center'>Eindtijd</li>
          <li className='w-[10vw] p-2 text-center flex items-center border-gray-200 justify-center'>Lesduur</li>
          <li className='w-[13vw] p-2 text-center flex items-center border-gray-200 justify-center'>factuur bedrag</li>
           <li className='w-[13vw] p-2 text-center flex items-center border-gray-200 justify-center'>Rijles status</li>
          <li className='w-[13vw] p-2 text-center flex items-center border-gray-200 justify-center'>Betalingsstatus</li>
         
          <li className='w-[13vw] p-2 text-center flex items-center border-gray-200 justify-center'>annuleringstijd</li>
          <li className='w-[14vw] p-2 text-center flex items-center border-gray-200 justify-center'>annuleringsreden</li>
          <li className='w-[6vw] p-2 text-center flex items-center border-gray-200 justify-center'>acties</li>
        </ul>

        {/* Table Rows */}
        {currentData.length > 0 ? (
          currentData.map((ele, index) => (
            <TableElement 
              key={startIndex + index} 
              ele={ele} 
              id={startIndex + index + 1} 
            />
          ))
        ) : (
          <div className='w-[95%] mx-3 py-8 text-center text-gray-500'>
            Geen resultaten gevonden
          </div>
        )}
      </div>
    
      {/* Pagination Controls - Stable Layout */}
      <div className='w-[95%] mx-auto mb-4 flex justify-between items-center'>
        <button 
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className={`text-sm border-2 rounded border-[#EAECF0] px-3 py-2 font-semibold ${
            currentPage === 1 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'cursor-pointer hover:bg-blue-950/10'
          }`}
        >
          Vorige
        </button>
      
        <span className='text-sm'>
          Pagina {currentPage} van {totalPages || 1}
        </span>
      
        <button 
          onClick={goToNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`text-sm border-2 rounded border-[#EAECF0] px-3 py-2 font-semibold ${
            currentPage === totalPages || totalPages === 0
              ? 'text-gray-400 cursor-not-allowed' 
              : 'cursor-pointer hover:bg-blue-950/10'
          }`}
        >
          Volgende
        </button>
      </div>
    
      {/* Results Counter */}
      <div className='w-[95%] mx-auto mb-4 text-center'>
        <span className='text-sm text-gray-600'>
          Weergaven {startIndex + 1}-{Math.min(endIndex, filteredData.length)} van {filteredData.length}
        </span>
      </div>
    </>
  );
}
// Individual table row component
const TableElement = ({ ele, id }: { ele: Data_Lessons, id: number }) => {
  const modalRef = useRef<ActionModalRef>(null);
    
  // Status color mapping
  const ColorToStatus = useMemo(() => {
    const clt: ColorAndStatus[] = [
      {
        status: "in Behandeling",
        colortext: "#6e3fa6",
        colorbg: "#f2d6ff"
      },
      {
        status: "inbehandeling",
        colortext: "#6e3fa6",
        colorbg: "#f2d6ff"
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
        status: "betaald",
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
  return (
    <ul className='*:text-center hover:bg-[#f2f4ff] relative border-1 border-gray-200 flex justify-around w-[95%] mx-3 *:h-[7vh] *:capitalize *:font-normal *:text-xs items-center'>
      <li className='w-[4vw] p-2 text-center flex items-center border-r-1 border-gray-200 justify-center'>{id}</li>
      <li className='w-[10vw] p-2 text-center flex items-center justify-center'>{ele?.instructeur}</li>
      <li className='w-[10vw] p-2 text-center flex items-center justify-center'>{ele?.student}</li>
      <li className='w-[14vw] p-2 text-center flex items-center justify-center'>{ele?.begintijd}</li>
      <li className='w-[14vw] p-2 text-center flex items-center justify-center'>{ele?.eindtijd}</li>
      <li className='w-[10vw] p-2 text-center flex items-center justify-center'>{ele?.lesduur}</li>
      <li className='w-[13vw] p-2 text-center flex items-center justify-center'>{ele?.factuur_bedrag}</li>
      
      {/* Status columns with colored badges */}
      <li className='w-[13vw] p-2 text-center flex items-center justify-center'>
        <span
          style={{
            backgroundColor: mapColorToStatus(ele.rijles_status)?.colorbg,
            color: mapColorToStatus(ele.rijles_status)?.colortext
          }}
          className='whitespace-nowrap text-xs px-2 py-1 rounded-lg'
        >
          {ele.rijles_status}
        </span>
      </li>
      
      <li className='w-[13vw] p-2 text-center flex items-center justify-center'>
        <span
          style={{
            backgroundColor: mapColorToStatus(ele.betalingsstatus)?.colorbg,
            color: mapColorToStatus(ele.betalingsstatus)?.colortext
          }}
          className='whitespace-nowrap text-xs px-2 py-1 rounded-lg'
        >
          {ele.betalingsstatus}
        </span>
      </li>
      
      <li className='w-[13vw] p-2 text-center flex items-center justify-center'>{ele.annuleringstijd}</li>
      <li className='whitespace-normal w-[14vw] flex items-center justify-center text-xs p-2 text-center'>{ele.annuleringsreden}</li>
      
      {/* Actions column */}
      <li className='w-[6vw] h-full p-2 flex items-center justify-center text-center border-l-1 border-gray-200'>
        <button className='outline-none cursor-pointer' onClick={() => { modalRef.current?.Open() }}>
          <MenuIcon s='gray' w='20px' h='20px' f='gray' />
        </button>
      </li>

      <ActionModal CurrentStatus={ele.rijles_status} ref={modalRef} />
    </ul>
  )
}