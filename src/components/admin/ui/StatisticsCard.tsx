import React from 'react'
import { FaArrowDown , FaArrowUp } from 'react-icons/fa'


export interface Statistcs {
    className?: string, 
    percentage?: number,
    total?: String | number,
    label?: string,
    Icon: typeof FaArrowDown | any
}
  
export default function StatisticsCard({ className, percentage, total, label, Icon }: Statistcs) {
   function UporDown(percentage : number):typeof FaArrowDown | any {
   return percentage < 0 ? 
     <FaArrowDown 
       className='inline text-sm rounded ml-1 p-1 ' 
       style={{ backgroundColor: '#dc2626', color: 'white' }}
     />  : 
     <FaArrowUp 
       className='inline text-sm rounded ml-1 p-1' 
       style={{ backgroundColor: '#16a34a', color: 'white' }}
     />
    }
  return (
    <li className={' rounded-lg shadow-md border border-gray-200 '+ className}>
           <div className={`percentage text-right mr-3 md:mr-4 mt-2 md:mt-3 text-sm md:text-base ${percentage! < 0 ? 'text-red-500' : 'text-green-500'} `}>
            {percentage}% {UporDown(percentage!)}
           </div>
           <div className='text-[#2d46c4] text-2xl md:text-4xl text-left ml-2 md:ml-3 font-bold'>
           {total} 
           </div>
           <div id='data' className='items-center text-gray-500 text-left ml-2 md:ml-3 flex justify-between px-2 md:px-3 mt-2 text-sm md:text-base'>
              <span className='lowercase first-letter:uppercase'>{label}</span> 
                <div className='border-2 border-gray-200 rounded-lg p-1.5 md:p-2'>
                    <Icon className='text-sm md:text-base' />
                </div>
             
            </div>
        </li>
  )
}
