'use client'
import React, { MouseEventHandler, useCallback, useEffect, useMemo, useState } from 'react'
import CustmButton from './CustmButton';
import { Fira_Code } from 'next/font/google';
import next from 'next';
import { preconnect } from 'react-dom';
 // record date with day number 
type DateWithDay = {
  day: number;
  date: Date;
}
export default function CusTomDate() {
  // current date state
   const [currentMonth , setCurrentMonth] = useState<number>();
   const [currentYear , setCurrentYear] = useState<number>();
   const [currentDay , setCurrentDay] = useState<number>();
   //days 
   const [firstDate , selectDateOne] = useState<Date[]>([])
   const [rangeDates, setRangeDates] = useState<Date[]>([]) // New state for all dates in range
   
   useEffect(() => {
       const today = new Date();
       setCurrentDay(t=> today.getDate());
       setCurrentMonth(t=> today.getMonth());
       setCurrentYear(t=> today.getFullYear());
       selectDateOne([]);
      
   }, [])
   //change year and month 
//const Select Dates
    const selectDate = (e: React.MouseEvent<HTMLSpanElement>): void => {
  const dateAttr = e.currentTarget.getAttribute("data-date");
  if (!dateAttr) return; // Skip if no valid date attribute
  
  const parsedDate = new Date(dateAttr);
  if (isNaN(parsedDate.getTime())) return; // Skip if invalid date

  if (firstDate.length < 2) {
    // Check if date is already selected to avoid duplicates
    const isAlreadySelected = firstDate.some(date => 
      date.toDateString() === parsedDate.toDateString()
    );
    
    if (!isAlreadySelected) {
      selectDateOne(prev => {
        const newDates = [...prev, parsedDate];
        console.log("picked:", parsedDate, "total selected:", newDates);
        
        // If we now have 2 dates, calculate the range
        if (newDates.length === 2) {
          const sortedDates = newDates.sort((a, b) => a.getTime() - b.getTime());
          const allDatesInRange = getAllDatesInRange(sortedDates[0], sortedDates[1]);
          setRangeDates(allDatesInRange);
          console.log("Range calculated:", allDatesInRange);
        } else {
          setRangeDates([]);
        }
        
        return newDates;
      });
    }
  } else {
    // Reset selection and start with new date
    selectDateOne(() => {
      const newDates = [parsedDate];
      setRangeDates([]); // Clear range when resetting
      console.log("reset, new first picked:", parsedDate, "total selected:", newDates);
      return newDates;
    });
  }
};

// Helper function to get all dates between two dates (inclusive)
const getAllDatesInRange = (startDate: Date, endDate: Date): Date[] => {
  const dates: Date[] = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates;
};

   const changeMonth = (delta: number) => {
  setCurrentMonth((prevMonth) => {
    let newMonth = prevMonth! + delta;
    let newYear = currentYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear! += 1;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear! -= 1;
    }

    setCurrentYear(newYear);
    return newMonth;
  });
};
  const changeYear = (delta: number) => {
  setCurrentYear((prev) => prev! + delta);
};


//get the start of month is day
const startOfMonth = useCallback((month: number , year: number
  ) : string  => {
     
       const date = new Date();
       date.setMonth(month);
         date.setFullYear(year);
       date.setDate(1);
      return  date.toDateString().split(' ')[0].slice(0, 2).toUpperCase();
  }, []);
// map days of month
const MapDays = useCallback((month : number , year : number) : DateWithDay[] => {
        const daysInMonth :DateWithDay[] = []
       const days = [ "mo" ,"tu" ,"we" ,"th" ,"fr" ,"sa" ,"su"]

              const firstDay =  startOfMonth(month , year);
              const firstDayIndex = days.indexOf(firstDay.toLowerCase());
              console.log(firstDay);
                  for (let index = 1; index <= firstDayIndex; index++) {
                      daysInMonth.push({day: new Date(year, month , -firstDayIndex + index ).getDate() , date: new Date(year, month , -firstDayIndex + index )})
                  }   
             // add add all days of current month 
             const daysInCurrentMonth =  daysInMonth.length
              for (let index = 1; index <= 35  - daysInCurrentMonth; index++) {
                    daysInMonth.push({day: new Date(year, month , index ).getDate() , date: new Date(year, month , index )})
              }
              
  return daysInMonth;
},[])

// 
  return (
    <div className='  absolute z-50 p-4 bg-white rounded-lg border-2 right-6  w-[25vw] h-[60vh]'>
      <div className='flex scale-90 justify-around items-center mt-2'>
        <CustmButton className=' text-sm bg-gray-200 ' type='button' >
          last 7 days
        </CustmButton>
        <CustmButton className=' text-sm bg-gray-200   ' type='button' >
          last Month
        </CustmButton>
        <CustmButton className=' text-sm bg-gray-200  ' type='button' >
          last 6 months
        </CustmButton>
      </div>
      <div className='flex mt-4 justify-around items-center '>
        <div >
          <CustmButton onClick={() => changeYear(-1)} className='text-lg bg-white border-1  border-gray-200 ml-1' type='button' >
            &#8249;&#8249;
          </CustmButton>
          <CustmButton onClick={() => changeMonth(-1)} className=' text-lg bg-white border-1  border-gray-200 ml-1' type='button' >
            &#8249;
          </CustmButton>
        </div>
        <span>
          {new Date(currentYear!, currentMonth!).toLocaleString('default', { month: 'long' })} {currentYear}
        </span>
        <div >
          <CustmButton onClick={() => changeMonth(1)} className='text-lg bg-white border-1  border-gray-200 ml-1' type='button' >
            &#8250;
          </CustmButton>
          <CustmButton onClick={() => changeYear(1)} className='text-lg bg-white border-1  border-gray-200 ml-1' type='button' >
            &#8250;&#8250;
          </CustmButton>
        </div>
      </div>
      <div className='days flex mt-4 justify-around items-center capitalize text-gray-400'>
        <span className=''>mo</span>
        <span>tu</span>
        <span>we</span>
        <span>th</span>
        <span>fr</span>
        <span>sa</span>
        <span>su</span>
      </div>
      <div className='days grid grid-cols-7 grid-rows-5 mt-4 justify-around items-center capitalize text-gray-300'>
            {MapDays(currentMonth! , currentYear!).map((dayObj , index) => {
              // Check if this date is a selected endpoint (firstDate)
              const isEndpoint = firstDate.some(date => 
                date.toDateString() === dayObj.date.toDateString()
              );
              
              // Check if this date is in the range
              const isInRange = rangeDates.some(date => 
                date.toDateString() === dayObj.date.toDateString()
              );
              
              return (
                <Day
                  key={index}
                  day={dayObj}
                  selectDate={selectDate}
                  isEndpoint={isEndpoint}
                  isInRange={isInRange}
                />
              );
            })}
      </div>

    </div>

  )
}
const Day = ({ 
  day, 
  selectDate, 
  isEndpoint, 
  isInRange 
}: { 
  day: DateWithDay, 
  selectDate: (e: React.MouseEvent<HTMLSpanElement>) => void,
  isEndpoint: boolean,
  isInRange: boolean
}) => {
  const getClassName = () => {
    let baseClass = "text-center cursor-pointer p-2 rounded-lg transition-all";
    
    if (isEndpoint) {
      // bg-dark-blue for range endpoints (firstDate array)
      return `${baseClass} bg-[var(--dark-blue)] text-white`;
    } else if (isInRange) {
      // bg-blue for dates in range
      return `${baseClass} bg-[var(--logo-blue)] text-white`;
    } else {
      // Default styling with hover
      return `${baseClass} text-gray-800 hover:bg-[var(--logo-blue)] hover:text-white`;
    }
  };

  return(
    <span
      onClick={selectDate}
      data-date={day.date instanceof Date && !isNaN(day.date.getTime()) ? day.date.toISOString() : ''}
      className={getClassName()}
    >
      {day.day.toString()}
    </span>
  )
}
