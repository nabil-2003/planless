import React from 'react'
import { 
  FaUserTie, 
  FaUsers,
  FaArrowUp,
  FaArrowDown,
  FaChartLine,
  FaChartBar
} from 'react-icons/fa'
import StatisticsCard from './ui/StatisticsCard'
export default function Statistcs({className}: {className?: string}) {
  return (
     <div className={` w-[95%] mt-4 h-[30vh] p-3 mx-auto  bg-white rounded-lg border-2 border-gray-200 items-center ${className}`}>
      <h1 className='font-bold text-lg text-gray-700 ml-3  '> Statistieken</h1>
      <ul className='flex justify-start gap-5 h-2/3  mt-4 w-full rounded-lg  mx-auto   text-gray-600  '>
          <StatisticsCard 
            percentage={-12.31}
            total={40}
            label="instructeurs"
            Icon={FaUserTie}
            className='h-[100%] w-[20%] '
          />
           <StatisticsCard 
            percentage={2.31}
            total={500}
            label="studenten"
            Icon={FaUsers}
             className='h-[100%] w-[20%] '
          />
           <StatisticsCard 
            percentage={12.31}
            total={50}
            label="auto's"
            Icon={FaUserTie}
            className='h-[100%] w-[20%] '
          />
       
        
      </ul>
    </div>
  )
}
