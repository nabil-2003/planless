'use client'
import MenuIcon from '@/components/svgs/MenuIcon';
import { ActionModalRef } from '@/components/ui/Action';
import ActionModal from '@/components/ui/Action';
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import CustomScrollBar from '../ScrollBar';
import Link from 'next/link';
import LocationIcon from '@/components/svgs/Location';
import { DocumentModal, DocumentModalRef, IdentityModal, IdentityModalRef } from '@/components/ui'

const buildTelHref = (value: string) => value &&   `tel:${value.replace(/[^+\d]/g, '')}`

// Data types
export type Data_Student = {
    id: string;
    student: string;
    bsn_nummer: string;
    email: string;
    date_birth: string;
    adress: string;
    phone_number: string;
    status: string;
    driving_license_category: string;
    theory_exam: string;
    practical_exam: string;
    number_of_lessons: number;
    last_lesson: string;
    instructor: string;
    remarks: string;
}



// Main table component
export default function StudentTable({
  data, 
  filterTable, 
  searchQuery = '', 
  selectedDateRange, 
  timeFilter = '24 uur',
  itemsPerPage = 10, className= ''
} :{
  data: Array<Data_Student>,
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
    
    // Filter by status
  
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(item => 
        item.student.toLowerCase().includes(query) ||
        item.bsn_nummer.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.adress.toLowerCase().includes(query) ||
        item.phone_number.toLowerCase().includes(query) ||
        item.remarks.toLowerCase().includes(query)
      )
    }
    
    // Filter by date range
    if (selectedDateRange) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.date_birth).getTime()
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
        const itemDate = new Date(item.date_birth).getTime()
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

      {/* Table Container - Three Section Layout */}
      <div className={`${className} mb-4 w-full scale-95 `} style={{ position: 'relative' }}>
        <div style={{ display: 'flex', width: '100%' }}>
          {/* Sticky NR Column - Left */}
          <div style={{ position: 'sticky', left: 0, zIndex: 2, background: 'white', flexShrink: 0 }}>
            {/* NR Header */}
            <div className='bg-transparent border-b-1 border-gray-200' style={{ height: '56px' }}>
              <div className='w-[4vw] px-4 flex justify-center items-center bg-gray-50   h-full border-r-1  text-md border-gray-200'>Nr</div>
            </div>
            {/* NR Body */}
            <div>
              {currentData.length > 0 ? (
                currentData.map((student, index) => (
                  <div 
                    key={`nr-${startIndex + index}`} 
                    className='bg-white border-b-1 border-gray-200'
                    style={{ height: '52px' }}
                  >
                    <div className='w-[4vw] bg-gray-50 text-md  px-4 flex justify-center items-center h-full  text-gray-700 border-r-1 border-gray-200'>
                      {startIndex + index + 1}
                    </div>
                  </div>
                ))
              ) : null}
            </div>
          </div>

          {/* Scrollable Content - Middle */}
          <div id='students-table-container' className='flex-1 overflow-x-auto hide-native-scroll'>
            {/* Scrollable Header */}
            <div className='flex w-max bg-transparent border-b-1 border-gray-200' style={{ height: '56px' }}>
              <div className='w-[9vw] min-w-[140px] py-4 flex items-center text-md  px-2 whitespace-nowrap truncate'>Student</div>
              <div className='w-[9vw] min-w-[140px] py-4 flex items-center text-md  px-2 whitespace-nowrap truncate'>BSN nummer</div>
              <div className='w-[15vw] min-w-[220px] py-4 flex items-center text-md  px-2 whitespace-nowrap truncate'>Email</div>
              <div className='w-[9vw] min-w-[140px] py-4 flex items-center text-md  px-2 whitespace-nowrap truncate'>Geboortedatum</div>
              <div className='w-[8vw] min-w-[120px] py-4 flex items-center justify-center text-md  px-2 whitespace-nowrap truncate'>Adres</div>
              <div className='w-[10vw] min-w-[160px] py-4 flex items-center text-md  px-2 whitespace-nowrap truncate'>Telefoonnummer</div>
              <div className='w-[16vw] min-w-[240px] py-4 flex items-center text-md  px-2 pr-6 whitespace-nowrap truncate'>Opmerkingen</div>
            </div>
            {/* Scrollable Body */}
            <div className='w-max'>
              {currentData.length > 0 ? (
                currentData.map((student, index) => (
                  <StudentElementScrollable 
                    key={startIndex + index} 
                    ele={student} 
                  />
                ))
              ) : (
                <div className='w-full py-8 text-center text-gray-500'>
                  Geen studenten gevonden
                </div>
              )}
            </div>
          </div>

          {/* Sticky Actions Column - Right */}
          <div style={{ position: 'sticky', right: 0, zIndex: 2, background: 'white', flexShrink: 0 }}>
            {/* Actions Header */}
            <div className='bg-transparent border-b-1 border-gray-200' style={{ height: '56px' }}>
              <div className='w-[80px] px-3 flex justify-center items-center h-full text-md  border-l-1 bg-gray-50 border-gray-200'>Acties</div>
            </div>
            {/* Actions Body */}
            <div>
              {currentData.length > 0 ? (
                currentData.map((student, index) => (
                  <StudentElementActions 
                    key={`actions-${startIndex + index}`} 
                    ele={student} 
                  />
                ))
              ) : null}
            </div>
          </div>
        </div>
      </div>
    
      {/* Pagination Controls - Stable Layout */}
     <div id='scroll' className='mt-10   w-[95%] mx-auto p-3  shadow-sm  bg-white rounded-lg'>
       <div className='  mb-4 flex justify-between items-center'>
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
      <CustomScrollBar 
        targetId="students-table-container" 
        height={scrollBarWidth} 
        thumbHeight={120}
        orientation='horizontal' 
      />
    
      {/* Results Counter */}
      <div className='w-[95%] mx-auto mb-4 text-center'>
        <span className='text-sm text-gray-600'>
          Weergaven {startIndex + 1}-{Math.min(endIndex, filteredData.length)} van {filteredData.length}
        </span>
      </div>
     </div>
    </>
  );
}
// Individual table row component

// Scrollable table row component (middle section)
const StudentElementScrollable = ({ ele }: { ele: Data_Student }) => {
  const addressModal = useRef<IdentityModalRef>(null)
  const emailModal = useRef<DocumentModalRef>(null)
  return (
  <div className='flex hover:bg-blue-100/10 w-max relative bg-white border-b-1 border-gray-200' style={{ height: '52px' }}>
  <div className='w-[9vw] min-w-[140px] py-4 flex items-center text-md text-gray-700 px-2 truncate overflow-hidden' title={ele.student}>{ele.student}</div>
  <div className='w-[9vw] min-w-[140px] py-4 flex items-center text-md text-gray-700 px-2 truncate overflow-hidden' title={ele.bsn_nummer}>{ele.bsn_nummer}</div>
  <div className='w-[15vw] min-w-[220px] py-4 flex items-center text-md text-gray-700 px-2 truncate overflow-hidden' title={ele.email}>
        <button
          type='button'
          onClick={() => emailModal.current?.open()}
          className='flex items-center gap-2 cursor-pointer transition-colors hover:text-blue-800'
        >
          <img src='/pdf_icon.png' width={16} height={16} alt='' />
          <span className='truncate'>{ele.email}</span>
        </button>
        <DocumentModal
          ref={emailModal}
          title='E-mail'
          documentName={ele.email}
          description='Voorbeeld van het e-maildocument voor deze student.'
        />
      </div>
  <div className='w-[9vw] min-w-[140px] py-4 flex items-center text-md text-gray-700 px-2 truncate overflow-hidden' title={ele.date_birth}>{ele.date_birth}</div>
  <div className='w-[8vw] min-w-[120px] py-4 flex items-center justify-center text-md text-gray-700 px-2' title={ele. adress}>
        <span
          onClick={() => addressModal.current?.open()}
          className='cursor-pointer transition-all duration-300 hover:scale-110'
        >
          <LocationIcon w={20} h={20} color="blue" />
        </span>
        <IdentityModal ref={addressModal} description={ele.adress} title='Adres bekijken' />
      </div>
  <Link
    href={buildTelHref(ele.phone_number) || '#'}
    className='w-[10vw] min-w-[160px] py-4 flex items-center text-md text-gray-700 px-2 truncate overflow-hidden transition-colors hover:text-blue-800 cursor-pointer'
    title={ele.phone_number}
  >
    {ele.phone_number}
  </Link>
  <div className='w-[16vw] min-w-[240px] py-4 flex items-center text-md text-gray-700 px-2 pr-6 truncate overflow-hidden' title={ele.remarks}>{ele.remarks}</div>
    </div>
  )
}

// Actions column component for sticky right position
const StudentElementActions = ({ ele }: { ele: Data_Student }) => {
  const modalRef = useRef<ActionModalRef>(null);

  return (
    <div 
      className='border-b-1 bg-gray-50  border-gray-200'
      style={{ height: '52px' }}
    >
      <div className='w-[80px]  px-3 flex justify-center items-center h-full border-l-1 border-gray-200'>
        <button 
          className='outline-none cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors' 
          onClick={() => { modalRef.current?.Open() }}
        >
          <MenuIcon s='gray' w='20px' h='20px' f='gray' />
        </button>
        <ActionModal id={ele.id} tableName='students' CurrentStatus={''} ref={modalRef} />
      </div>
    </div>
  )
}
