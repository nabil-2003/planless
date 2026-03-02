import React, { use, useEffect, useState } from 'react'
import { 
  FaUserTie, 
  FaUsers,
  FaArrowUp,
  FaArrowDown,
  FaChartLine,
  FaChartBar,
  FaRegFileAlt
} from 'react-icons/fa'
import StatisticsCard from './ui/StatisticsCard'
import useDashBoard from '@/app/hooks/useDashBoard';
import { GiGraduateCap, GiSteeringWheel } from 'react-icons/gi';
export default function Statistcs({className}: {className?: string}) {
 

  const { statistics , loading} = useDashBoard();
 
 
  const extractor = (key : string) => {
      if (!statistics) return 0;
      return statistics[key] || 0;
  }
  const percentageCalc = (key : string ) => {
     const current = Number(extractor(key).current) || 0;
     const previous = Number(extractor(key).previous) || 0;
      if (previous == 0 && current === 0) return 0;
      if (previous === 0) return 100 * current;
      const diff = current - previous;
      const percentage = (diff / previous) * 100;
      return Math.round(percentage);
    }

  return (
     <div className={`w-full md:w-[95%] mt-4 min-h-[30vh] p-2 md:p-3 mx-auto bg-white rounded-lg border-2 border-gray-200 items-center ${className}`}>
      <h1 className='font-bold text-base md:text-lg text-gray-700 ml-2 md:ml-3'>Statistieken</h1>
      <ul className='flex flex-wrap justify-start gap-3 md:gap-5 h-auto mt-4 w-full rounded-lg mx-auto text-gray-600'>
        {
          loading && <div className='w-8 h-8 md:w-[2vw] mt-10 md:h-[2vw]
                     rounded-full animate-spin border-2
                      border-blue-800 border-l-0  duration-300  mx-auto '></div> ||
        <div className='w-full flex flex-wrap justify-between gap-2 md:gap-0'>
          <StatisticsCard 
            percentage={percentageCalc("lessons")}
            total={0}
            label="rijlessen"
            Icon={GiSteeringWheel}
            className='h-auto w-full sm:w-[48%] p-2  lg:w-[19%] '
          />
           <StatisticsCard 
            percentage={percentageCalc("students")}
            total={0}
            label="studenten"
            Icon={'/statistics/student.svg'}
            isImg={true}
             className='h-auto w-full sm:w-[48%]  p-2  lg:w-[19%] '
          />
          <StatisticsCard 
            percentage={percentageCalc("instructors")}
            total={0}
            label="instructeurs"
            Icon={'/statistics/instructor.svg'}
            isImg={true}
            className='h-auto w-full sm:w-[48%] p-2  lg:w-[19%]  '
          />
           <StatisticsCard 
            percentage={0}
            total={0}
            label="Leskaarten"
            Icon={GiGraduateCap }
             className='h-auto w-full sm:w-[48%]  p-2  lg:w-[19%] '
          />
           <StatisticsCard 
            percentage={0}
            total={"0€"}
            label="Financiën"
            isImg={true}
            Icon={"/statistics/finance.svg"}
             className='h-auto w-full sm:w-[48%]  p-2  lg:w-[19%] '
          />
        </div>
        }

      </ul>
    </div>
  )
}
