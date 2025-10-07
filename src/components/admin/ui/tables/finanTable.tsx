'use client'
import MenuIcon from '@/components/svgs/MenuIcon';
import { ActionModalRef } from '@/components/ui/Action';
import ActionModal from '@/components/ui/Action';
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import CustomScrollBar from '../ScrollBar';
import Link from 'next/link';

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



// Main table component
export default function FinanTable({
  data, 
  filterTable, 
  searchQuery = '', 
  selectedDateRange, 
  timeFilter = '24 uur',
  itemsPerPage = 10, 
  className= '', 
  selectedSide = 's'
} :{
  data: Array<StudentFinancialData | InstructorFinancialData>,
  selectedSide : string,
  className: string,
  filterTable: string,
  searchQuery?: string,
  selectedDateRange?: { firstDateMs: number; lastDateMs: number } | null,
  timeFilter?: string,
  itemsPerPage?: number
}) {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [scrollBarWidth, setScrollBarWidth] = React.useState(800)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Filter data based on all criteria
  const filteredData = useMemo(() => {
    let filtered = data
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(item => {
        if (selectedSide === 's') {
          const studentItem = item as StudentFinancialData
          return studentItem.betalingsstatus.toLowerCase().includes(query) ||
                 studentItem.rijlesstatus.toLowerCase().includes(query) ||
                 studentItem.factuur_bedrag.toLowerCase().includes(query)
        } else {
          const instructorItem = item as InstructorFinancialData
          return instructorItem.instructeur.toLowerCase().includes(query) ||
                 instructorItem.betalingsstatus.toLowerCase().includes(query) ||
                 instructorItem.rijlesstatus.toLowerCase().includes(query) ||
                 instructorItem.urenregistratie.toLowerCase().includes(query)
        }
      })
    }
    
    return filtered
  }, [data, filterTable, searchQuery, selectedDateRange, timeFilter, selectedSide])
  
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

  // Calculate scrollbar width based on container
  useEffect(() => {
    const updateScrollBarWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        setScrollBarWidth(containerWidth * 0.9) // 90% of container width
      }
    }
    
    updateScrollBarWidth()
    window.addEventListener('resize', updateScrollBarWidth)
    
    return () => window.removeEventListener('resize', updateScrollBarWidth)
  }, [])
  return (
    <>
      {/* Hide native scrollbar styles */}
      <style jsx global>{`
        .hide-native-scroll::-webkit-scrollbar {
          display: none;
        }
        .hide-native-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Table Container with Horizontal Scroll - Full Width */}
      <div ref={containerRef} id='students-table-container' className={`${className} mb-4 overflow-x-auto overflow-y-hidden hide-native-scroll w-full min-w-full`}>
        {/* Table Header */}
        <div className='flex mx-auto w-full justify-between relative bg-[#F9FAFB] border-b-1 gap-8 border-gray-200 pr-3'>
          <div className='w-[3vw] px-4 border-x-1 border-gray-200 flex justify-center items-center py-4 table-header text-[#475467]'>Nr</div>
          {selectedSide === 's' ? (
            // Student financial columns
            <>
              <div className='w-[10vw] py-4 flex items-center table-header text-[#475467]'>Factuurdatum</div>
              <div className='w-[10vw] py-4 flex items-center table-header text-[#475467]'>Vervaldatum</div>
              <div className='w-[12vw] py-4 flex items-center table-header text-[#475467]'>Betalingsstatus</div>
              <div className='w-[12vw] py-4 flex items-center table-header text-[#475467]'>Rijlesstatus</div>
              <div className='w-[10vw] py-4 flex items-center justify-center table-header text-[#475467]'>Factuur bedrag</div>
            </>
          ) : (
            // Instructor financial columns
            <>
              <div className='w-[12vw] py-4 flex items-center table-header text-[#475467]'>Instructeur</div>
              <div className='w-[10vw] py-4 flex items-center table-header text-[#475467]'>Rijles datum</div>
              <div className='w-[12vw] py-4 flex items-center table-header text-[#475467]'>Betalingsstatus</div>
              <div className='w-[12vw] py-4 flex items-center table-header text-[#475467]'>Rijlesstatus</div>
              <div className='w-[12vw] py-4 flex items-center justify-center table-header text-[#475467]'>Urenregistratie</div>
            </>
          )}
          <div className='w-[5vw] px-3 flex py-4 items-center justify-center table-header text-[#475467]'>Acties</div>
        </div>

        {/* Table Rows */}
        {currentData.length > 0 ? (
          currentData.map((ele, index) => (
            <TableElement 
              key={startIndex + index} 
              ele={ele} 
              id={startIndex + index + 1}
              selectedSide={selectedSide}
            />
          ))
        ) : (
          <div className='w-full mx-auto py-8 text-center text-gray-500'>
            Geen resultaten gevonden
          </div>
        )}
      </div>
    
      {/* Pagination Controls - Full Width Layout */}
      <div id='scroll' className='mt-6 w-full mx-0 p-4 shadow-sm bg-white rounded-xl border border-gray-200'>
        <div className='mb-4 flex justify-between items-center'>
          <button 
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`text-sm border-2 rounded-lg border-[#EAECF0] px-4 py-2 font-semibold transition-colors ${
              currentPage === 1 
                ? 'text-gray-400 cursor-not-allowed bg-gray-50' 
                : 'text-gray-700 cursor-pointer hover:bg-blue-50 hover:border-blue-200'
            }`}
          >
            Vorige
          </button>
        
          <span className='text-sm font-medium text-gray-600'>
            Pagina {currentPage} van {totalPages || 1}
          </span>
        
          <button 
            onClick={goToNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`text-sm border-2 rounded-lg border-[#EAECF0] px-4 py-2 font-semibold transition-colors ${
              currentPage === totalPages || totalPages === 0
                ? 'text-gray-400 cursor-not-allowed bg-gray-50' 
                : 'text-gray-700 cursor-pointer hover:bg-blue-50 hover:border-blue-200'
            }`}
          >
            Volgende
          </button>
        </div>
        
        <CustomScrollBar 
          targetId="students-table-container" 
          height={scrollBarWidth} 
          thumbHeight={120}
          orientation='horizontal' 
        />
      
        {/* Results Counter */}
        <div className='w-full mt-4 text-center'>
          <span className='text-sm text-gray-600 font-medium'>
            Weergaven {startIndex + 1}-{Math.min(endIndex, filteredData.length)} van {filteredData.length} resultaten
          </span>
        </div>
      </div>
    </>
  );
}
// Individual table row component
const TableElement = ({ ele, id, selectedSide }: { 
  ele: StudentFinancialData | InstructorFinancialData, 
  id: number,
  selectedSide: string 
}) => {
  const modalRef = useRef<ActionModalRef>(null);

  // Status color mapping - exact copy from lessons table
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
    <div className='flex   justify-between   w-full relative bg-white border-b-1 gap-8 border-gray-200 pr-3'>
      <div className='w-[3vw] px-4 border-x-1 border-gray-200 flex justify-center items-center py-4 table-cell-text text-[#344054]'>{id}</div>
      
      {selectedSide === 's' ? (
        // Student financial row
        <>
          <div className='w-[10vw] py-4 flex items-center table-cell-text text-[#344054]'>{(ele as StudentFinancialData).factuurdatum}</div>
          <div className='w-[10vw] py-4 flex items-center table-cell-text text-[#344054]'>{(ele as StudentFinancialData).vervaldatum}</div>
          <div className='w-[12vw] flex items-center py-4'>
            <span
              style={{
                backgroundColor: mapColorToStatus((ele as StudentFinancialData).betalingsstatus)?.colorbg,
                color: mapColorToStatus((ele as StudentFinancialData).betalingsstatus)?.colortext
              }}
              className='whitespace-nowrap text-xs px-2 py-1 rounded-lg'
            >
              {(ele as StudentFinancialData).betalingsstatus}
            </span>
          </div>
          <div className='w-[12vw] py-4 flex items-center'>
            <span
              style={{
                backgroundColor: mapColorToStatus((ele as StudentFinancialData).rijlesstatus)?.colorbg,
                color: mapColorToStatus((ele as StudentFinancialData).rijlesstatus)?.colortext
              }}
              className='whitespace-nowrap text-xs px-2 py-1 rounded-lg'
            >
              {(ele as StudentFinancialData).rijlesstatus}
            </span>
          </div>
          <div className='w-[10vw] py-4 flex items-center justify-center table-cell-text font-semibold text-[#027A48]'>
           <Link href={"#"}  className='text-blue-600 underline' >
         <img src="/pdf_icon.png" width={16} height={16} alt="" className='inline mr-2' />
        </Link>
            {(ele as StudentFinancialData).factuur_bedrag}
          </div>
        </>
      ) : (
        // Instructor financial row
        <>
          <div className='w-[12vw] py-4 flex items-center table-cell-text text-[#344054]'>{(ele as InstructorFinancialData).instructeur}</div>
          <div className='w-[10vw] py-4 flex items-center table-cell-text text-[#344054]'>{(ele as InstructorFinancialData).rijles_datum}</div>
          <div className='w-[12vw] flex items-center py-4'>
            <span
              style={{
                backgroundColor: mapColorToStatus((ele as InstructorFinancialData).betalingsstatus)?.colorbg,
                color: mapColorToStatus((ele as InstructorFinancialData).betalingsstatus)?.colortext
              }}
              className='whitespace-nowrap text-xs px-2 py-1 rounded-lg'
            >
              {(ele as InstructorFinancialData).betalingsstatus}
            </span>
          </div>
          <div className='w-[12vw] py-4 flex items-center'>
            <span
              style={{
                backgroundColor: mapColorToStatus((ele as InstructorFinancialData).rijlesstatus)?.colorbg,
                color: mapColorToStatus((ele as InstructorFinancialData).rijlesstatus)?.colortext
              }}
              className='whitespace-nowrap text-xs px-2 py-1 rounded-lg'
            >
              {(ele as InstructorFinancialData).rijlesstatus}
            </span>
          </div>
          <div className='w-[12vw] py-4 flex items-center justify-center table-cell-text font-semibold text-[#175CD3]'>
         <Link href={"#"}  className='text-blue-600 underline' >
         <img src="/pdf_icon.png" width={16} height={16} alt="" className='inline mr-2' />
        </Link>
            {(ele as InstructorFinancialData).urenregistratie}
          </div>
        </>
      )}
      
      <div className='w-[5vw] px-3 flex py-4 items-center justify-center'>
        <button className='outline-none cursor-pointer' onClick={() => { modalRef.current?.Open() }}>
          <MenuIcon s='gray' w='20px' h='20px' f='gray' />
        </button>
      </div>

      <ActionModal className='right-2' CurrentStatus={
        selectedSide === 's' 
          ? (ele as StudentFinancialData).betalingsstatus 
          : (ele as InstructorFinancialData).betalingsstatus
      } ref={modalRef} />
    </div>
  )
}