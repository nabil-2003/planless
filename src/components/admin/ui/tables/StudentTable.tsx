'use client'
import MenuIcon from '@/components/svgs/MenuIcon';
import { ActionModalRef } from '@/components/ui/Action';
import ActionModal from '@/components/ui/Action';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CustomScrollBar from '../ScrollBar';
import Link from 'next/link';
import LocationIcon from '@/components/svgs/Location';
import { DocumentModal, DocumentModalRef, IdentityModal } from '@/components/ui'
import useStudent from '@/app/hooks/useStudent';

const buildTelHref = (value: string) => value &&   `tel:${value.replace(/[^+\d]/g, '')}`

// Data types
export type Data_Student = {
    id: string;
    student: string;
    email: string;
    date_birth: string;
    city: string ;
    post_code? :  String ; 
    street? : string ;
    house_number?: string ;
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
 className
} :{
  data: Array<Data_Student>,
  className: string,
 
}) {
   const {total , pageSize , indexPage , setIndex,setSize}=useStudent()
  const [scrollBarWidth, setScrollBarWidth] = React.useState(800)
  const containerRef = useRef<HTMLDivElement>(null)
  

  const goToNextPage = useCallback(() => {
    if( (indexPage + 1) * pageSize >= total ) return;
        setIndex(indexPage + 1)
  }, [indexPage, setIndex])

  const goToPrevPage = useCallback(() => {
    if(indexPage === 0) return;
   setIndex(indexPage -1)
  }, [])

 

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

      {/* Table Container with Sticky NR and Actions Columns */}
      <div className={`${className} mb-4 w-[100%] scale-95`} style={{ position: 'relative' }}>
        <div style={{ display: 'flex', width: '100%' }}>
          {/* Sticky NR Column - Left */}
          <div style={{ position: 'sticky', left: 0, zIndex: 2, background: 'white' }}>
            {/* NR Header */}
            <div className='border-b-1 border-gray-200' style={{ height: '56px' }}>
              <div className='w-[60px] bg-gray-50 px-4 flex justify-center items-center h-full text-md font-semibold border-r-1 border-gray-200'>Nr</div>
            </div>
            {/* NR Body */}
            <div>
              {data.length > 0 ? (
                data.map((student, index) => (
                  <div 
                    key={`nr-${indexPage * pageSize + index + 1}`} 
                    className='bg-white border-b-1 border-gray-200'
                    style={{ height: '52px' }}
                  >
                    <div className='w-[60px] bg-gray-50 px-4 flex justify-center items-center h-full text-sm text-gray-700 border-r-1 border-gray-200'>
                      {indexPage * pageSize + index + 1}
                    </div>
                  </div>
                ))
              ) : null}
            </div>
          </div>

          {/* Scrollable Content - Middle */}
          <div id='students-table-container' className='flex-1 overflow-x-auto hide-native-scroll'>
            {/* Scrollable Header */}
            <div className='flex w-full justify-around pl-2 bg-transparent border-b-1 border-gray-200 items-center' style={{ height: '56px' }}>
              <div className='w-[140px] py-4 flex items-center justify-center text-md px-2 whitespace-nowrap truncate font-semibold'>Student</div>
              <div className='w-[240px] py-4 flex items-center justify-center text-md px-2 whitespace-nowrap truncate font-semibold'>Email</div>
              <div className='w-[140px] py-4 flex items-center justify-center text-md px-2 whitespace-nowrap truncate font-semibold'>Geboortedatum</div>
              <div className='w-[170px] py-4 flex items-center justify-center text-md px-2 whitespace-nowrap truncate font-semibold'>Stad</div>
              <div className='w-[160px] py-4 flex items-center justify-center text-md px-2 whitespace-nowrap truncate font-semibold'>Telefoonnummer</div>

            </div>
            {/* Scrollable Body */}
            <div className='w-full'>
              {data.length > 0 ? (
                data.map((student, index) => (
                  <StudentElementScrollable 
                    key={index} 
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
            <div className='bg-transparent border-b-1 border-gray-200 flex items-center' style={{ height: '56px' }}>
              <div className='w-[80px] px-3 flex justify-center items-center h-full text-md font-semibold border-l-1 bg-gray-50 border-gray-200'>Acties</div>
            </div>
            {/* Actions Body */}
            <div>
              {data.length > 0 ? (
                data.map((student, index) => (
                  <StudentElementActions 
                    key={`actions-${student.id}`} 
                    ele={student} 
                  />
                ))
              ) : null}
            </div>
          </div>
        </div>
      </div>
    
      {/* Pagination Controls - Stable Layout */}
      <div id='scroll' className='mt-10 w-[90%] mx-auto p-3 border-2 border-gray-200 bg-white rounded-lg'>
        <div className='mb-4 flex justify-between items-center'>
          <button
            onClick={goToPrevPage}
            className={`text-md border-2 rounded border-[#EAECF0] px-3 py-2 font-semibold ${
              indexPage === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'cursor-pointer hover:bg-blue-950/10'
            }`}
          >
            Vorige
          </button>

          <span className='text-md'>
            Pagina {indexPage + 1} van {Math.ceil(total / pageSize)}
          </span>

          <button
            onClick={goToNextPage}
            className={`text-md border-2 rounded border-[#EAECF0] px-3 py-2 font-semibold ${
              (indexPage + 1) * pageSize >= total
                ? 'text-gray-400 cursor-not-allowed'
                : 'cursor-pointer hover:bg-blue-950/10'
            }`}
          >
            Volgende
          </button>
        </div>
        <CustomScrollBar targetId="students-table-container" orientation='horizontal' />

        {/* Results Counter */}
        <div className='w-[95%] mx-auto mb-4 text-center'>
          <span className='text-md text-gray-600'>
            Weergaven {indexPage * pageSize + 1}-{Math.min((indexPage + 1) * pageSize, total)} van {total}
          </span>
        </div>
      </div>
    </>
  );
}
// Individual table row component


const StudentElementScrollable = ({ ele }: { ele: Data_Student }) => {
  const addressModal = useRef<React.ElementRef<typeof IdentityModal>>(null)
  const emailModal = useRef<DocumentModalRef>(null)
  const [isOpen , open]= useState<Boolean>(false)
  return (
    <div className='flex pl-2 w-full justify-around  border-b-1 bg-white hover:bg-blue-50 border-gray-200 items-center' style={{ height: '52px' }}>
      <div className='w-[140px] py-4 flex items-center justify-center text-sm text-gray-700 px-2 truncate overflow-hidden' title={ele.student}>{ele.student}</div>
      <div className='w-[240px] py-4 flex items-center justify-center text-sm text-gray-700 px-2 truncate overflow-hidden' title={ele.email}>
          <span className='truncate'>{ele.email}</span>
      </div>
      <div className='w-[140px] py-4 flex items-center justify-center text-sm text-gray-700 px-2 truncate overflow-hidden' title={ele.date_birth}>{ele.date_birth}</div>
      <div className='w-[170px] py-4 flex items-center justify-center text-sm text-gray-700 px-2' title={ele?.city|| "_"}>
        <span
          onClick={() => open(true)}
          className='cursor-pointer transition-all ml-7 duration-300 hover:scale-110'
        >
          <LocationIcon w={20} h={20} color="blue" /> 
        </span>
        <span className='w-[100px]'>{ele.city}</span>
      </div>
      <div
        className='w-[160px] py-4 flex items-center justify-center text-sm text-gray-700 px-2 truncate overflow-hidden transition-colors hover:text-blue-800 cursor-pointer'
        title={ele.phone_number}
      >
        {ele.phone_number}
      </div>
    </div>
  )
}

// Actions column component for sticky right position
const StudentElementActions = ({ ele }: { ele: Data_Student }) => {
  const modalRef = useRef<ActionModalRef>(null);

  return (
    <div 
      className='border-b-1 bg-gray-50 border-gray-200 flex items-center'
      style={{ height: '52px' }}
    >
      <div className='w-[80px] px-3 flex justify-center items-center h-full border-l-1 border-gray-200'>
        <button 
          className='outline-none cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors' 
          onClick={() => { modalRef.current?.Open() }}
        >
          <MenuIcon s='gray' w='20px' h='20px' f='gray' />
        </button>
        <ActionModal id={ele.id} className='right-[.55vw]' tableName='students' ref={modalRef} />
      </div>
    </div>
  )
}
