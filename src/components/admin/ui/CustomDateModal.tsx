'use client'
import React, { useCallback, useEffect, useImperativeHandle, useState, useRef, forwardRef } from 'react'
import CustmButton from './CustmButton';

// Record date with day number 
type DateWithDay = {
  day: number;
  date: Date;
}

export type CustomDateRef = {
  firstDateMs?: number;
  lastDateMs?: number; 
  singleDate?: number;
  open: () => void;
  close: () => void;
  getSelectedRange: () => { firstDateMs: number; lastDateMs: number } | null;
  clearSelection: () => void;
  setDateRange: (startDate: string, endDate: string) => void;
}

type PropsDate = {
  singleUse?: boolean;
  onDateSelect?: (dates: { firstDateMs: number; lastDateMs: number } | null) => void;
  className : string ; 
}

const CusTomDate = forwardRef<CustomDateRef, PropsDate>(({ singleUse = false,  className='',  onDateSelect }, ref) => {
  const [currentMonth, setCurrentMonth] = useState<number>();
  const [currentYear, setCurrentYear] = useState<number>();
  const [range, selectDateRange] = useState<string[]>([]);
  const refModal = useRef<HTMLDivElement>(null);

  // Expose methods via useImperativeHandle
  useImperativeHandle(ref, () => ({
    open: () => {
      if (refModal.current) {
        refModal.current.style.display = "block";
      }
    },
    close: () => {
      if (refModal.current) {
        refModal.current.style.display = "none";
      }
    },
    get firstDateMs() {
      if (range.length >= 1) {
        const sortedRange = [...range].sort();
        return new Date(sortedRange[0]).getTime();
      }
      return undefined;
    },
    get lastDateMs() {
      if (range.length === 2) {
        const sortedRange = [...range].sort();
        return new Date(sortedRange[1]).getTime();
      }
      return undefined;
    },
    get singleDate() {
      return range.length === 1 ? new Date(range[0]).getTime() : undefined;
    },
    getSelectedRange: () => {
      if (range.length === 2) {
        const sortedRange = [...range].sort();
        return {
          firstDateMs: new Date(sortedRange[0]).getTime(),
          lastDateMs: new Date(sortedRange[1]).getTime()
        };
      }
      return null;
    },
    clearSelection: () => {
      const days = document.querySelectorAll("span.day");
      resetSelectedDays(days);
      selectDateRange([]);
    },
    setDateRange: (startDate: string, endDate: string) => {
      selectDateRange([startDate, endDate]);
    }
  }), [range]);

  // Helper function to reset selected days styling
  const resetSelectedDays = (days: NodeListOf<Element>) => {
    days.forEach(ee => {
      ee.classList.remove("bordersDate");
      ee.classList.remove("betweenDate");
    });
  };
   
   
   useEffect(() => {
       const today = new Date();
       setCurrentMonth(t=> today.getMonth());
       setCurrentYear(t=> today.getFullYear());
      
   }, [])
   
   // Clear range when navigating to different month/year
   useEffect(() => {
     if (currentMonth !== undefined && currentYear !== undefined) {
       // Clear the visual styling when month or year changes, but keep the range selection
       const days = document.querySelectorAll("span.day");
       resetSelectedDays(days);
       
       // Don't clear the range - let users keep their selection across month navigation
     }
   }, [currentMonth, currentYear]);
   
   useEffect(() => {
      const days = document.querySelectorAll("span.day")
            
      if(range.length >= 1){
        const sortedRange = [...range].sort();
        const startDate = sortedRange[0];
        const endDate = sortedRange[range.length - 1]; // Last date in range
        
        days.forEach(dayElement => {
          const dayDate = dayElement.getAttribute("data-date");
          if (dayDate) {
            if (range.length === 1) {
              // Single date selection
              if (dayDate === startDate) {
                dayElement.classList.add("bordersDate");
              }
            } else if (range.length === 2) {
              // Range selection
              if (dayDate === startDate || dayDate === endDate) {
                dayElement.classList.add("bordersDate");
              }
              // Check if this day is between the range (for cross-month selections)
              else if (dayDate > startDate && dayDate < endDate) {
                dayElement.classList.add("betweenDate");
              }
            }
          }
        });
      }
   }, [range, currentMonth, currentYear])

  // Button handlers
  const handleCancel = () => {
    const days = document.querySelectorAll("span.day");
    resetSelectedDays(days);
    selectDateRange([]);
    if (refModal.current) {
      refModal.current.style.display = "none";
    }
  };

  const handleConfirm = () => {
    if (range.length === 2) {
      // Two dates selected - range mode
      const sortedDates = [...range].sort();
      const firstDate = new Date(sortedDates[0]);
      const lastDate = new Date(sortedDates[1]);
      
      const result = {
        firstDateMs: firstDate.getTime(),
        lastDateMs: lastDate.getTime()
      };
      
      if (onDateSelect) {
        onDateSelect(result);
      }
      
      if (refModal.current) {
        refModal.current.style.display = "none";
      }
      
      return result;
    } else if (range.length === 1) {
      // One date selected - treat as single date (same start and end)
      const singleDate = new Date(range[0]);
      const result = {
        firstDateMs: singleDate.getTime(),
        lastDateMs: singleDate.getTime()
      };
      
      if (onDateSelect) {
        onDateSelect(result);
      }
      
      if (refModal.current) {
        refModal.current.style.display = "none";
      }
      
      return result;
    }
    // No dates selected or invalid selection
    return null;
  };

  // Preset functions
  const selectLast7Days = () => {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);
    
    const firstDate = sevenDaysAgo.toISOString().split('T')[0];
    const lastDate = today.toISOString().split('T')[0];
    
    const days = document.querySelectorAll("span.day");
    resetSelectedDays(days);
    selectDateRange([firstDate, lastDate]);
    
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  const selectLastMonth = () => {
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setDate(today.getDate() - 30);
    
    const firstDate = lastMonth.toISOString().split('T')[0];
    const lastDate = today.toISOString().split('T')[0];
    
    const days = document.querySelectorAll("span.day");
    resetSelectedDays(days);
    selectDateRange([firstDate, lastDate]);
    
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  const selectLast6Months = () => {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    
    const firstDate = sixMonthsAgo.toISOString().split('T')[0];
    const lastDate = today.toISOString().split('T')[0];
    
    const days = document.querySelectorAll("span.day");
    resetSelectedDays(days);
    selectDateRange([firstDate, lastDate]);
    
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };
  // Date selection handler
  const selectDate = (e: React.MouseEvent<HTMLSpanElement>): void => {
    const current = e.currentTarget;
    const date = current.getAttribute("data-date");
    
    if (!date) return;
    
    if (singleUse) {
      // Single date selection mode
      const days = document.querySelectorAll("span.day");
      resetSelectedDays(days);
      current.classList.add("bordersDate");
      selectDateRange([date]);
    } else {
      // Range selection mode
      current.classList.add("bordersDate");
      
      selectDateRange(prev => {
        if (prev.length >= 2) {
          // Reset and start new range
          const days = document.querySelectorAll("span.day");
          resetSelectedDays(days);
          current.classList.add("bordersDate");
          return [date];
        } else {
          // Continue building current range
          return [...prev, date];
        }
      });
    }
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
    <div 
      ref={refModal} 
      className='fixed z-50 p-4 bg-white rounded-lg shadow-lg left-4 right-4 md:left-auto md:right-[30%] top-10 w-[90vw] md:w-[25vw] max-h-[70vh] overflow-y-auto hidden'
      style={{ display: 'none' }}
    >
      <div className='flex scale-90 justify-around items-center mt-2'>
        <CustmButton 
          onClick={selectLast7Days}
          className=' text-sm bg-[#f4f4f5] hover:bg-[var(--logo-blue)] hover:text-white transition-all' 
          type='button' 
        >
          last 7 days
        </CustmButton>
        <CustmButton 
          onClick={selectLastMonth}
          className=' text-sm bg-[#f4f4f5]  hover:bg-[var(--logo-blue)] hover:text-white transition-all' 
          type='button' 
        >
          last Month
        </CustmButton>
        <CustmButton 
          onClick={selectLast6Months}
          className=' text-sm bg-[#f4f4f5] hover:bg-[var(--logo-blue)] hover:text-white transition-all' 
          type='button' 
        >
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
             
              
              return (
                <Day
                  key={index}
                  day={dayObj}
                  selectDate={selectDate}
                />
              );
            })}
      </div>
      
      {/* Action buttons */}
      <div className='flex justify-between gap-3 mt-4 pt-3 border-t border-gray-200'>
        <CustmButton 
          onClick={handleCancel}
          className='flex-1 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all'
          type='button'
        >
          Annuleren
        </CustmButton>
        <CustmButton 
          onClick={handleConfirm}
          className='flex-1 px-4 py-2 text-white bg-[var(--dark-blue)] rounded-lg hover:bg-[var(--logo-blue)] transition-all'
          type='button'
        >
          Bevestigen
        </CustmButton>
      </div>

    </div>

  )
})

const Day = ({ 
  day,
  selectDate
}: { 
  day: DateWithDay;
  selectDate: (ele: React.MouseEvent<HTMLSpanElement>) => void;
}) => {
  let dateString: string;
  
  try {
    if (day.date instanceof Date && !isNaN(day.date.getTime())) {
      const correctedDate = new Date(day.date);
      correctedDate.setDate(correctedDate.getDate() + 1);
      dateString = correctedDate.toISOString().split('T')[0];
    } else {
      dateString = new Date().toISOString().split('T')[0];
    }
  } catch (error) {
    dateString = new Date().toISOString().split('T')[0];
  }
 
  return (
    <span
      className='day flex p-2 justify-around items-center capitalize text-gray-700 hover:bg-gray-100 cursor-pointer rounded'
      onClick={selectDate}
      data-date={dateString}
    >
      {day.day.toString()}
    </span>
  );
};
export default CusTomDate;
CusTomDate.displayName = "CusTomDateModal";
