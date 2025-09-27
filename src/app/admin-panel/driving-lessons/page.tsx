"use client"
import Header from '@/components/admin/Header'
import LeftSide from '@/components/admin/LeftSide';
import TimeFilter from '@/components/admin/TimeFIlter';
import FIlterByType from '@/components/FIlterByType'
import React, { useRef } from 'react'
import CusTomDate from '@/components/admin/ui/CustomDate'
import { FaRegPlusSquare, FaArrowDown, FaChartLine, FaChartBar } from 'react-icons/fa'
import CustomSearch from "@/components/admin/ui/CustomSearch"
import CustomSelect from "@/components/admin/ui/CustomSelect"
import { Button } from '@/components/ui';
import Image from 'next/image';
import PlusIcon from '@/components/svgs/Plus';
import CustomTable from '@/components/admin/ui/CustomTable';
import CreateModal, { CreateModalRef } from '@/components/admin/ui/CreateModal';
export default function page() {
  const [currentFilterType, setCurrentFilterType] = React.useState('in Behandeling');
   const [currentTimeFilter, setTimeFilter] = React.useState('24 uur');
  const CreateModalRef =  useRef<CreateModalRef>(null);

  //show the modal that create new rijles...
  const openCreateModal = () => {
    CreateModalRef.current?.open(); 
  }
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
     <CusTomDate  className='
        w-[10vw] rounded-md outline-none p-2   bg-white  border border-gray-300 ml-4
     ' />
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
    </>
    
  )
}
