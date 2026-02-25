"use client"
import React from 'react'
import Header from './Header'

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
    <ul
      className={
        className ||
        'mt-3 p-1 flex flex-nowrap md:flex-wrap gap-2 md:gap-5 *:cursor-pointer justify-start w-full ml-2 md:ml-13 text-gray-600 overflow-x-auto hide-native-scroll'
      }
    >
      <li
        onClick={chFilter}
        data-filter="Alle"
        className={`whitespace-nowrap pb-2 px-3 ${isActive('Alle') ? activeclass : ''}`}
      >
        Alle
      </li>
      <li
        onClick={chFilter}
        data-filter="In behandeling"
        className={`whitespace-nowrap pb-2 px-3 ${isActive('In behandeling') ? activeclass : ''}`}
      >
        In behandeling
      </li>
      <li
        onClick={chFilter}
        data-filter="Bevestigd"
        className={`whitespace-nowrap pb-2 px-3 ${isActive('Bevestigd') ? activeclass : ''}`}
      >
        Bevestigd
      </li>
      <li
        onClick={chFilter}
        data-filter="Geanuleerd"
        className={`whitespace-nowrap pb-2 px-3 ${isActive('Geanuleerd') ? activeclass : ''}`}
      >
        Geanuleerd
      </li>
      <li
        onClick={chFilter}
        data-filter="Voltooid"
        className={`whitespace-nowrap pb-2 px-3 ${isActive('Voltooid') ? activeclass : ''}`}
      >
        Voltooid
      </li>
    </ul>
  )
  
}
