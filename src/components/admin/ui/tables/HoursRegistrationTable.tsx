'use client'
import MenuIcon from '@/components/svgs/MenuIcon';
import { ActionModalRef } from '@/components/ui/Action';
import ActionModal from '@/components/ui/Action';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CustomScrollBar from '../ScrollBar';
import { DocumentModal, DocumentModalRef } from '@/components/ui'
import { ParsedLesson } from '@/store/LessonsSlices';
import useLessons from '@/app/hooks/useLessons';
import useInvoice from '@/app/hooks/useInvoice';
import { mapColorToStatus } from './finanTable';
import { timeToHoursRounded } from '@/app/admin-panel/instructors/[details]/page';

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

export type Order  = {
    id : string  ; 
    instructorId : string ;
    studentId : string ;

}

// Main table component
export default function HoursRegistrationTable({
  data, 

currentTap = "pending",
  className= ''
} :{
  data: Array<ParsedLesson>,
  className: string,
currentTap? : string
}) {
  const {index , size  , total, setIndex}= useLessons()
  const prevPage = ()=>{
    if(index >0){
      setIndex(index -1)
    }
  }
  const nextPage = ()=>{
      if ((index +1)*size < total)
      setIndex(index +1)
  }



  return (
    <>
      {/* Table Container with Sticky NR and Actions Columns */}
      <div className={`${className} mb-4 p-1 scale-95 `} style={{ position: 'relative' }}>
        <div style={{ display: 'flex', width: '100%', maxWidth: '100vw' }}>
          {/* Sticky NR Column - Left */}
          <div style={{ position: 'sticky', left: 0, zIndex: 2, background: 'white' }}>
            {/* NR Header */}
            <div className='bg-gray-50 border-b-1 border-gray-200' style={{ height: '56px' }}>
              <div className='w-[4vw] px-4 flex justify-center items-center h-full  text-sm  border-r-1 border-gray-200'>Nr</div>
            </div>
            {/* NR Body */}
            <div>
              {data?.length > 0 ? (
                data?.map((_, i) => (
                  <div 
                    key={(size*index)+i+1}
                    className='bg-white border-b-1 border-gray-200'
                    style={{ height: '52px' }}
                  >
                    <div className='w-[4vw] bg-gray-50 px-4 flex justify-center items-center h-full  text-sm text-gray-700 border-r-1 border-gray-200'>
                   {(size*index)+i+1}
                    </div>
                  </div>
                ))
              ) : null}
            </div>
          </div>

          {/* Scrollable Content - Middle */}
          <div id='rijlessen-table-container' className='flex-1 overflow-x-auto hide-native-scroll'>
            {/* Scrollable Header */}
            <div className='flex w-max bg-transparent border-b-1 border-gray-200 items-center' style={{ height: '56px' }}>
              <div className='w-[7vw] min-w-[120px] py-4 flex items-center justify-center text-md px-2 whitespace-nowrap truncate'>Instructeur</div>
              <div className='w-[7vw] min-w-[120px] py-4 flex items-center justify-center text-md px-2 whitespace-nowrap truncate'>Student</div>
              <div className='w-[9vw] min-w-[140px] py-4 flex items-center justify-center text-md px-2 whitespace-nowrap truncate'>Begintijd</div>
              <div className='w-[9vw] min-w-[140px] py-4 flex items-center justify-center text-md px-2 whitespace-nowrap truncate'>Eindtijd</div>
              <div className='w-[6vw] min-w-[90px] py-4 flex items-center justify-center text-md px-2 whitespace-nowrap truncate'>Lesduur</div>
              <div className='w-[9vw] min-w-[140px] py-4 flex items-center justify-center text-md px-2 whitespace-nowrap truncate'>Betalingsstatus</div>
              <div className='w-[9vw] min-w-[140px] py-4 flex items-center justify-center text-md px-2 whitespace-nowrap truncate'>Rijles status</div>
              <div className='w-[9vw] min-w-[140px] py-4 flex items-center justify-center text-md px-2 whitespace-nowrap truncate'>Totale urenregistratie</div>

              <div></div>

            </div>
            {/* Scrollable Body */}
            <div className='w-max'>
              {data?.length > 0 ? (
                data .map((lesson, index) => (
                  <TableElementScrollable 
                    key={index} 
                    ele={lesson} 
                    currentTap={currentTap}
                  />
                ))
              ) : (
                <div className='w-[100%] py-8 grid ml-[30vw]  place-self-center  text-center text-gray-500'>
                  Geen lessen gevonden
                </div>
              )}
            </div>
          </div>

          {/* Sticky Actions Column - Right */}
          <div style={{ position: 'sticky', right: 0, zIndex: 2, background: 'white', flexShrink: 0 }}>
            {/* Actions Header */}
            <div className='bg-transparent border-b-1 border-gray-200 flex items-center' style={{ height: '56px' }}>
              <div className='w-[80px] px-3 flex justify-center items-center h-full  text-md bg-gray-50  border-l-1 border-gray-200'>Acties</div>
            </div>
            {/* Actions Body */}
            <div>
              {data?.length > 0 ? (
                data.map((lesson, index) => (
                  <TableElementActions 
                    key={`actions-${ index}`} 
                    ele={lesson} 
                  />
                ))
              ) : null}
            </div>
          </div>
        </div>
      </div>
    
      {/* Pagination Controls - Stable Layout */}
     <div id='scroll' className='mt-6 md:mt-10 w-full md:w-[90%] mx-auto p-2 md:p-3 border-2 border-gray-200 bg-white rounded-lg'>
       <div className='mb-4 flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-center'>
        <button 
          onClick={prevPage}
          className={`w-full md:w-auto text-sm md:text-md border-2 rounded border-[#EAECF0] px-4 py-2 font-semibold ${
           index === 0
              ? 'text-gray-400 cursor-not-allowed' 
              : 'cursor-pointer hover:bg-blue-950/10'
          }`}
        >
          Vorige
        </button>
      
        <span className='text-sm md:text-md text-center'>
          Pagina {index + 1} van {Math.ceil(total/size)}
        </span>
      
        <button 
          onClick={nextPage}
          className={`w-full md:w-auto text-sm md:text-md border-2 rounded border-[#EAECF0] px-4 py-2 font-semibold ${
            (index +1)*size >= total 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'cursor-pointer hover:bg-blue-950/10'
          }`}
        >
          Volgende
        </button>
      </div>
      <CustomScrollBar targetId="rijlessen-table-container" orientation='horizontal' />
    
      {/* Results Counter */}
      <div className='w-full md:w-[95%] mx-auto mb-2 md:mb-4 text-center'>
        <span className='text-xs md:text-md text-gray-600'>
          Weergaven {(index) * size + 1}-{Math.min((index + 1) * size, total)} van {total} 
        </span>
      </div>
     </div>
    </>
  );
}
// Individual table row component
 
// Scrollable table row component (without NR and Actions)
const TableElementScrollable = ({ ele, currentTap = "pending" }: { ele: ParsedLesson , currentTap?: string }) => {
  const {loading , invoice , getInvoiceById} = useInvoice()
  const cap = (s?: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '')
  // Status color mapping

  

  // Find color for status
 

  const invoiceModalRef = useRef<DocumentModalRef>(null)

  // Format time display - extract time from datetime string
  const formatTime = (dateTimeStr: string) => {
    if (!dateTimeStr) return '';
    // If it's already just a time (HH:MM format), return as is
    if (/^\d{1,2}:\d{2}$/.test(dateTimeStr)) return dateTimeStr;
    // If it contains a date, extract the time part
    const timePart = dateTimeStr.split(' ').pop();
    return timePart || dateTimeStr;
  }
   const order = ele.order as Order
  return (
    <div className='flex relative w-max border-b-1 hover:bg-blue-100/10 border-gray-200 items-center' style={{ height: '52px' }}>
  <div className='w-[7vw] min-w-[120px] flex items-center    justify-center   text-sm text-gray-700 px-2 truncate overflow-hidden' title={ele?.instructor!}>{ele?.instructor}</div>
  <div className='w-[7vw] min-w-[120px] flex items-center justify-center  text-sm text-gray-700 px-2 truncate overflow-hidden' title={ele?.student!}>{ele?.student}</div>
  <div className='w-[9vw] min-w-[140px] flex items-center justify-center whitespace-nowrap scale-95  text-sm text-gray-700 px-2' title={ele?.date+"."+ele?.start_time}>{ele?.date+"."+ele?.start_time.substring(0,5)}</div>
  <div className='w-[9vw] min-w-[140px] flex items-center justify-center whitespace-nowrap scale-95 text-sm text-gray-700 px-2' title={ele?.date+"."+ele?.end_time}>{ele?.date+"."+ele?.end_time.substring(0,5)}</div>
  <div className='w-[6vw] min-w-[90px] flex items-center justify-center  text-sm text-gray-700 px-2 truncate overflow-hidden' title={ele?.lesson_duration}>{ele?.lesson_duration}</div>

 
    
      {/* Status columns with colored badges */}

      
  <div className='w-[9vw] min-w-[140px] flex items-center justify-center text-md px-2'>
        <span
          style={{
            backgroundColor: mapColorToStatus(ele.payment_status!)?.colorbg,
            color: mapColorToStatus(ele.payment_status!)?.colortext
          }}
          className='whitespace-nowrap  text-sm px-2 py-1 rounded-lg'
        >
          {cap(mapColorToStatus(ele.payment_status!)?.status!) || ele.payment_status!}
        </span>
      </div>
        <div className='w-[9vw] min-w-[140px] flex items-center justify-center text-md px-2'>
        <span
          style={{
            backgroundColor: mapColorToStatus(ele.lesson_status!)?.colorbg,
            color: mapColorToStatus(ele.lesson_status!)?.colortext
          }}
          className='whitespace-nowrap  text-sm px-2 py-1 rounded-lg'
        >
          {cap(mapColorToStatus(ele.lesson_status!)?.status!) || ele.lesson_status!}
        </span>
      </div>
  <div className='w-[6vw] min-w-[90px] flex items-center justify-center  text-sm text-gray-700 px-2 truncate overflow-hidden' title={ele?.lesson_duration}>{timeToHoursRounded(ele?.lesson_duration)}</div>
   
    </div>
  )
}

// Actions column component for sticky right position
const TableElementActions = ({ ele }: { ele: ParsedLesson }) => {
  const modalRef = useRef<ActionModalRef>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);
  
  const handleDownloadCSV = () => {
    // CSV headers
    const headers = ['Instructeur', 'Student', 'Begintijd', 'Eindtijd', 'Lesduur', 'Betalingsstatus', 'Rijles status', 'Totale urenregistratie']
    
    // CSV data for single element
    const totalHours = timeToHoursRounded(ele.lesson_duration)
    const csvData = [
      ele.instructor || '',
      ele.student || '',
      `${ele.date}.${ele.start_time}` || '',
      `${ele.date}.${ele.end_time}` || '',
      ele.lesson_duration || '',
      ele.payment_status || '',
      ele.lesson_status || '',
      totalHours.toString()
    ]

    // Create CSV content
    const csvContent = [
      headers.join(','),
      csvData.map((cell: string) => `"${cell}"`).join(',')
    ].join('\n')

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `urenregistratie_${ele.student}_${ele.date}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Close modal after download
    actionMenuRef.current?.classList.add('hidden')
    actionMenuRef.current?.classList.remove('flex')
  }

  const openModal = () => {
    actionMenuRef.current?.classList.remove('hidden')
    actionMenuRef.current?.classList.add('flex')
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        actionMenuRef.current?.classList.add('hidden')
        actionMenuRef.current?.classList.remove('flex')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div 
      className='bg-gray-50 border-b-1 border-gray-200 flex items-center'
      style={{ height: '52px', position: 'relative' }}
    >
      <div className='w-[80px] px-3 flex justify-center items-center h-full border-l-1 border-gray-200 relative'>
        <button 
          className='outline-none cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors' 
          onClick={openModal}
        >
          <MenuIcon s='gray' w='20px' h='20px' f='gray' />
        </button>
        
        {/* Small Action Modal */}
        <div 
          ref={actionMenuRef}
          className='justify-center items-center hidden bg-white gap-2 tria px-1 py-2 top-8 right-[1.4vw] rounded-lg z-50 w-max border-1 border-gray-300 h-max min-h-[6vh] absolute shadow-md transition-all'
        >
          <span onClick={handleDownloadCSV} className='cursor-pointer'>
            <img src="/actions/download.svg" alt="Download" />
          </span>
        </div>
      </div>
    </div>
  )
}
