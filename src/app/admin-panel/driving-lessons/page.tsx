"use client"
import Header from '@/components/admin/Header'
import LeftSide from '@/components/admin/LeftSide';
import TimeFilter from '@/components/admin/TimeFIlter';
import FIlterByType from '@/components/FIlterByType'
import React, { useRef, useState } from 'react'
import CusTomDate from '@/components/admin/ui/CustomDateModal'
import { FaRegPlusSquare, FaArrowDown, FaChartLine, FaChartBar } from 'react-icons/fa'
import CustomSearch from "@/components/admin/ui/CustomSearch"
import CustomSelect from "@/components/admin/ui/CustomSelect"
import { Button } from '@/components/ui';
import Image from 'next/image';
import PlusIcon from '@/components/svgs/Plus';
import CustomTable from '@/components/admin/ui/CustomTable';
import CreateModal, { CreateModalRef } from '@/components/admin/ui/CreateModal';

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
  const [currentFilterType, setCurrentFilterType] = React.useState('in Behandeling');
  const [currentTimeFilter, setTimeFilter] = React.useState('24 uur');
  const [selectedDateRange, setSelectedDateRange] = useState<{ firstDateMs: number; lastDateMs: number } | null>(null);
  const CreateModalRef = useRef<CreateModalRef>(null);
  const dateModalRef = useRef<CustomDateRef>(null);

  //show the modal that create new rijles...
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
  const chFilterByType = (filter : string) => {
    setCurrentFilterType( t => filter);
   
  }
  // this function will change inside TimeFilter
  const chTimeFilter = (filter : string) => {
    setTimeFilter( t => filter);

  }
  const activeclass =" border-b-3 border-[var(--dark-blue)]  text-dark-blue " 
  return (
    <>
    <div className='content '>
      <Header title="Rijlessen"  />
    <div className='w-full flex   overflow-hidden'>
      <LeftSide className='w-[20%] border-l-0  rounded-t-none  mt-4 items-center bg-white rounded-r-xl  border-2 border-gray-200 h-auto  ' />
     <div className='dashboard-container w-[80%] '>
  <FIlterByType  currentFilterType={currentFilterType} chFilterByType={chFilterByType} />
  <div className='mt-4'/>
<TimeFilter currentFilter={currentTimeFilter} changeFilter={chTimeFilter} 
  content={null}
/>

  <div className='flex searchItem  mx-auto mt-4 p-4  justify-end  w-[95%] h-max  ml-auto '>
    <CustomSelect
      options={[
        { value: 10, label: "10" },
        { value: 20, label: "20" },
        { value: 30, label: "30" },
        { value: 40, label: "40" },
        { value: 50, label: "50" }
      ]}
      defaultValue={10}
      className='mr-auto w-32'
      onChange={(value) => console.log('Selected:', value)}
    />
     <CustomSearch className='
        w-[15vw] rounded-md outline-none p-2   bg-white  border border-gray-300
     ' />
     
     {/* Custom Date Input that opens modal */}
     <div className='relative ml-4'>
       <div 
         onClick={openDateModal}
         className='flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 w-48 cursor-pointer hover:border-gray-400 transition-colors'
       >
         <svg 
           className='w-5 h-5 text-gray-400 mr-2' 
           fill='none' 
           stroke='currentColor' 
           viewBox='0 0 24 24'
         >
           <path 
             strokeLinecap='round' 
             strokeLinejoin='round' 
             strokeWidth={2} 
             d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' 
           />
         </svg>
         <span className={`text-sm flex-1 ${selectedDateRange ? 'text-gray-900' : 'text-gray-500'}`}>
           {formatDateRange()}
         </span>
         {selectedDateRange && (
           <button
             onClick={(e) => {
               e.stopPropagation();
               dateModalRef.current?.clearSelection();
               setSelectedDateRange(null);
             }}
             className='ml-2 text-gray-400 hover:text-gray-600'
           >
             <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
               <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
             </svg>
           </button>
         )}
       </div>
     </div>
     
     <Button onClick={openCreateModal} className='outline-none ml-4'  >
     <div className='flex gap-2 items-center'>
      <PlusIcon color='white' w='15' h='15' className='border-2  text-white rounded border-white'/>
      Rijles toevoegen
     </div>
     </Button >
     </div>
     <CustomTable  data={[]} />
       
     </div>
   
    </div>
    </div>
    <CreateModal ref={CreateModalRef}  name='modal' />
    
    {/* Custom Date Modal */}
    <CusTomDate 
      ref={dateModalRef}
      singleUse={false}
      onDateSelect={handleDateSelect}
    />
    </>
    
  )
}
