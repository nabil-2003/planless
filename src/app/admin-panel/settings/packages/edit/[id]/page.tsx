"use client"
import Header from '@/components/admin/Header'
import LeftSide from '@/components/admin/LeftSide';
import TimeFilter from '@/components/admin/TimeFIlter';
import FIlterByType from '@/components/admin/FIlterByType'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CusTomDate from '@/components/admin/ui/CustomDateModal'
import { FaRegPlusSquare, FaArrowDown, FaChartLine, FaChartBar } from 'react-icons/fa'
import CustomSearch from "@/components/admin/ui/CustomSearch"
import CustomSelect from "@/components/admin/ui/CustomSelect"
import { Button } from '@/components/ui';
import Image from 'next/image';
import PlusIcon from '@/components/svgs/Plus';
import StudentTable, { Data_Student } from '@/components/admin/ui/tables/StudentTable';
import CreateModal, { CreateModalRef } from '@/components/admin/ui/CreateModal';
import studentsData from "@/data/students.json"
import CustmButton from '@/components/admin/ui/CustmButton';
import { useRouter } from 'next/navigation';

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
     const router = useRouter()

    const back = useCallback(()=>{
        router.back()
    },[])

    const [primaryInfo, setPrimaryInfo] = useState({
        studentName: '',
        bsnNumber: '',
        email: '',
        birthDate: '',
        address: '',
        phoneNumber: '',
    })

    const [extraInfo, setExtraInfo] = useState({
        studentName: '',
        bsnNumber: '',
        notes: '',
    })

    return (
        <>
            <div className='content '>
                <Header title="Studenten" />
                <div className='w-full flex flex-col md:flex-row overflow-hidden'>
                    <LeftSide className='hidden md:flex md:w-[20%] border-l-0  rounded-t-none  mt-4 items-center bg-white rounded-r-lg  border-2 border-gray-200 h-auto  ' />
                    <div className='dashboard-container  w-full md:w-[80%] px-4 md:px-0 '>
                        <div className='form-container mx-4 rounded-lg mt-4 p-4  bg-white shadow-md'>
                           
                            <form className='w-full  gap-2 flex  flex-wrap justify-between' action="">
                                <Input
                                    type='text'
                                    title='Lespakket naam'
                                    value={primaryInfo.studentName}
                                    onChange={(e) => {
                                        setPrimaryInfo({ ...primaryInfo, studentName: e.target.value })
                                    }}
                                    placeholder=''
                                />
                                <Input
                                    type='text'
                                    title='Product'
                                    value={primaryInfo.bsnNumber}
                                    onChange={(e) => {
                                        setPrimaryInfo({ ...primaryInfo, bsnNumber: e.target.value })
                                    }}
                                    placeholder=''
                                />
                                   <Input
                                    type='text'
                                    title='Duur'
                                    value={primaryInfo.bsnNumber}
                                    onChange={(e) => {
                                        setPrimaryInfo({ ...primaryInfo, bsnNumber: e.target.value })
                                    }}
                                    placeholder=''
                                />
                                   <Input
                                    type='text'
                                    title='Prjis'
                                    value={primaryInfo.bsnNumber}
                                    onChange={(e) => {
                                        setPrimaryInfo({ ...primaryInfo, bsnNumber: e.target.value })
                                    }}
                                    placeholder=''
                                />
                                   <Input
                                    type='option'
                                    title='Status'
                                    value={primaryInfo.bsnNumber}
                                    onChange={(e) => {
                                        setPrimaryInfo({ ...primaryInfo, bsnNumber: e.target.value })
                                    }}
                                    placeholder=''
                                />
                              
                            </form>
                        </div>
                        <div className='buttons mt-8 mb-4 mx-auto  w-[90%] flex flex-wrap gap-3 justify-between '>
                        <CustmButton  onClick={back} className='bg-[#fe911f] py-4 pl-4 pr-4  text-white text-sm '>
                            Annuleren
                        </CustmButton>
                            <CustmButton  onClick={() => {console.log({ primaryInfo, extraInfo })}}  className='bg-[#2d46c4] py-4 pl-4 pr-4  text-white text-sm '>
                            Opslaan
                        </CustmButton>
                    </div>
                    </div>
                    
                </div>

            </div>

        </>

    )
}


const Input = ({ className="" , options=["1" , "2" , "3"] , title, type = "text", placeholder, istextArea = false, onChange, value }: { options?: Array<string>, className?: string ,  type?: string, istextArea?: boolean, title: string, placeholder: string, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, value: string }) => {
    
   const [show, setShow] = useState(false)
   const [selectedOption, setSelectedOption] = useState(value || placeholder || 'Selecteer een optie')
   const dropdownRef = useRef<HTMLDivElement>(null)

   // Close dropdown when clicking outside
   useEffect(() => {
     const handleClickOutside = (event: MouseEvent) => {
       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
         setShow(false)
       }
     }
     
     if (show) {
       document.addEventListener('mousedown', handleClickOutside)
     }
     
     return () => {
       document.removeEventListener('mousedown', handleClickOutside)
     }
   }, [show])

   const handleOptionSelect = (option: string) => {
     setSelectedOption(option)
     setShow(false)
     // Create a synthetic event for onChange
     const syntheticEvent = {
       target: { value: option }
     } as React.ChangeEvent<HTMLInputElement>
     onChange(syntheticEvent)
   }

   if (type !== "option") 
  return (
    <div className={className+' form-field flex flex-col w-full md:w-[49%]   mt-4'}>
      <span className=''>{title}</span>
      {
        !istextArea &&
        <div className='flex items-center border-2 mt-3 border-gray-300 rounded-lg w-full'>
          
          <input  type={type} onChange={onChange} value={value} className={' py-3 pl-4    outline-none placeholder:capitalize w-[95%]'} placeholder={placeholder} />
        </div>
        ||
        <div className='flex items-baseline  border-2 mt-3 relative  border-gray-300 rounded-lg w-full'>
         
          <textarea onChange={onChange} value={value} className=' p-4 h-[10vh]  resize-none  outline-none ml-9  placeholder:capitalize w-full' placeholder={placeholder} />

        </div>}

    </div>
  )
  else 
  return (
    <div className={className+' form-field flex flex-col w-full md:w-[49%] mt-4 h-max'}>
      <span className='mb-2'>{title}</span>
      <div className='relative h-max' ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="w-full flex items-center justify-between border-2 border-gray-300 bg-white p-4 rounded-lg hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
        >
          <span className='flex items-center gap-2'>
           
            <span className={value ? 'text-gray-900' : 'text-gray-400'}>{selectedOption}</span>
          </span>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${show ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {/* Dropdown Menu */}
        <div
          className={` w-full mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg h-max transition-all duration-200 origin-top ${
            show ? 'opacity-100 scale-y-100 block' : ' hidden opacity-0 scale-y-0 pointer-events-none'
          }`}
        >
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionSelect(option)}
              className={`px-4 py-3 cursor-pointer transition-colors duration-150 ${
                selectedOption === option
                  ? 'bg-blue-50 text-blue-800 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
)
}

