'use client'
import React from 'react'

export default function TimeFilter({className ,changeFilter ,content, currentFilter="20 dagen"}: {
  className?: string , 
  content?: React.ReactNode ,
  changeFilter: (filter: string) => void , currentFilter: string}) {
    const chCurrentFilter = (e: React.MouseEvent<HTMLLIElement>) => {
        //change the filter based on the clicked li element's data-filter attribute
      const filter = e.currentTarget.getAttribute('data-filter');
        if (filter) {
            changeFilter(filter);
        }
    }
  return (
    <div className={` w-[95%] h-max p-3 mx-auto   bg-white rounded-lg border-2 border-gray-200 items-center 
    ${className}`}>
      <h1 className='font-bold text-lg text-gray-700 ml-3  '>
         Selecteer periode </h1>
      <ul className='flex w-max mt-4 rounded-xl overflow-hidden  mr-3 text-sm text-gray-600 border border-gray-200'>

        <li onClick={chCurrentFilter} data-filter="12 maanden" className={`px-4 py-2 hover:bg-gray-100 cursor-pointer border-[1.5px] border-gray-200
           ${currentFilter === '12 maanden' ?'bg-blue-900/10 text-dark-blue font-medium': ''}`}>
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
      {
        content && 
        <div className='content'>

        </div>
      }
    </div>
  )
}
