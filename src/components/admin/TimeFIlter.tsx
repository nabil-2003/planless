'use client'
import Image from 'next/image';
import React from 'react'
import { PiArrowFatUp } from 'react-icons/pi';
import UpIcon from '../svgs/UpIcon';
export default function TimeFilter({ className, changeFilter, content, currentFilter = "20 dagen" }: {
  className?: string,
  content?: boolean,
  changeFilter: (filter: string) => void, currentFilter: string
}) {
  const chCurrentFilter = (e: React.MouseEvent<HTMLLIElement>) => {
    //change the filter based on the clicked li element's data-filter attribute
    const filter = e.currentTarget.getAttribute('data-filter');
    if (filter) {
      changeFilter(filter);
    }
  }
  return (
    <div className={` w-[95%] h-max p-3 mx-auto flex justify-between   bg-white rounded-lg border-2 border-gray-200 items-center 
    ${className}`}>
      <div>
        <h1 className='font-bold text-lg text-gray-700 ml-3  '>
          Selecteer periode </h1>
        <ul className='flex w-max mt-4 rounded-xl overflow-hidden  mr-3 text-sm text-gray-600 border border-gray-200'>

          <li onClick={chCurrentFilter} data-filter="12 maanden" className={`px-4 py-2 hover:bg-gray-100 cursor-pointer border-[1.5px] border-gray-200
           ${currentFilter === '12 maanden' ? 'bg-blue-900/10 text-dark-blue font-medium' : ''}`}>
            12 maanden</li>

          <li onClick={chCurrentFilter} data-filter="20 dagen" className={`px-4 py-2 hover:bg-gray-100 cursor-pointer border-[1.5px] border-gray-200
          ${currentFilter === '20 dagen' ? 'bg-blue-900/10 text-dark-blue font-medium' : ''}`}>
            20 dagen</li>
          <li onClick={chCurrentFilter} data-filter="7 dagen" className={`px-4 py-2 hover:bg-gray-100 cursor-pointer border-[1.5px] border-gray-200
          ${currentFilter === '7 dagen' ? 'bg-blue-900/10 text-dark-blue font-medium' : ''}`}>
            7 dagen</li>
          <li onClick={chCurrentFilter} data-filter="24 uur" className={`px-4 py-2 hover:bg-gray-100 cursor-pointer border-[1.5px] border-gray-200
          ${currentFilter === '24 uur' ? 'bg-blue-900/10 text-dark-blue font-medium' : ''}`}>
            24 uur</li>
        </ul>
      </div>
      {
        content &&
        <div className='centent  flex w-max items-center  text-black text-3xl border-2 border-gray-200 p-6 rounded-xl ' >
          <div className='w-max'>
            <h1 className='text-black mb-4 font-medium  text-2xl'>Rijlessen in behandeling</h1>
            <span className='text-black mb-4 block text-4xl font-bold'>2,450</span>
            <span className='  text-[1rem] flex items-center justify-center w-max capitalize'> <UpIcon width={20} height={20} color="var(--dark-blue)" /> 
            <span className='text-[var(--dark-blue)] text-dark-blue font-medium  py-1 rounded-md'>40%</span>
             <span className='text-gray-900 ml-2'>vs afgelopen jaar</span></span>
          </div >
          <img className=' mt-auto w-[10vw] h-[100%] object-cover  ' src={"/chart.png"} alt='' />
        </div>
      }
    </div>
  )
}
