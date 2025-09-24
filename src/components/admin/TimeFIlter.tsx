import React from 'react'

export default function TimeFilter({className}: {className?: string}) {
  return (
    <div className={` w-[95%] h-max p-3 mx-auto  h-12 bg-white rounded-lg border-2 border-gray-200 items-center ${className}`}>
      <h1 className='font-bold text-lg text-gray-700 ml-3  '> Selecteer periode </h1>
      <ul className='flex w-max mt-4 rounded-xl overflow-hidden  mr-3 text-sm text-gray-600 border border-gray-200'>
        <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer border-[1.5px] border-gray-200'>12 maanden</li>
        <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer border-[1.5px] border-gray-200'>20 dagen</li>
        <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer border-[1.5px] border-gray-200'>7 dagen</li>
        <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer border-[1.5px] border-gray-200'>24 uur</li>
      </ul>
    </div>
  )
}
