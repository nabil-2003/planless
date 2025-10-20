"use client"
import React from 'react'
import Header from './admin/Header'

export default function FIlterByType({
    className , currentFilterType , chFilterByType 
}:
{
    className?: string , currentFilterType: string , chFilterByType : (filter : string) => void
}) {
  
     const activeclass =" border-b-3 border-[var(--dark-blue)]  text-dark-blue "
     
    const  chFilter= (e : React.MouseEvent<HTMLLIElement> ) =>   {
        chFilterByType(e.currentTarget.getAttribute("data-filter") || "")
       
      }
    // set the active class based on the current filter type

      const isActive = (type : string  ) : boolean => {

    return type == currentFilterType 
      }
  return (
          
            <ul className={className || 'mt-3 p-1 flex gap-5 *:cursor-pointer justify-start   w-full  ml-13  text-gray-600  '}>
                    <li onClick={chFilter} data-filter="Alle" className={` pb-2 px-3 ${  isActive("Alle") ?  activeclass : "" }`}>Alle</li>
                    <li onClick={chFilter} data-filter="In behandeling" className={` pb-2 px-3 ${  isActive("In behandeling") ?  activeclass : "" }`}>In behandeling</li>
                    <li onClick={chFilter} data-filter="Bevestigd" className={` pb-2 px-3 ${isActive("Bevestigd") ?  activeclass : "" }`}>Bevestigd</li>
                <li onClick={chFilter} data-filter="Geannuleerd" className={` pb-2 px-3 ${isActive("Geannuleerd") ?  activeclass : "" }`}>Geannuleerd</li>
                <li onClick={chFilter} data-filter="Voltooid" className={` pb-2 px-3 ${isActive("Voltooid") ?  activeclass : "" }`}>Voltooid</li>
            </ul>
   
  )
  
}
