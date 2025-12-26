'use client'

import SearchIcon, { SearchIconRef } from '@/components/svgs/Search'
import React, { useState, useRef } from 'react'

export default function CustomSearch({ 
  className, 
  type = "text", 
  value, 
  onChange, 
  placeholder = "zoeken" 
}: { 
  className: string, 
  type?: string,
  value?: string,
  onChange?: (value: string) => void,
  placeholder?: string
}) {
  const icon = useRef<SearchIconRef>(null)
  const [internalSearchText, setInternalSearchText] = useState("")
  
  // Use external value if provided, otherwise use internal state
  const searchText = value !== undefined ? value : internalSearchText
  const setSearchText = onChange !== undefined ? onChange : setInternalSearchText

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setSearchText(inputValue)

    if (inputValue !== "") {
      icon.current?.hide()
    } else {
      icon.current?.show()
    }
  }

  return (
    <div className="relative h-max w-full md:w-max rounded-lg bg-amber-50">
      <input
        type={type}
        onChange={handleChange}
        value={searchText}
        className={className + " block placeholder:capitalize  pl-10"}
        placeholder={placeholder}
      />

      {/* The icon is controlled imperatively via ref */}
      <SearchIcon
        ref={icon}
        pathStroke="lightgray"
        className="absolute left-3 top-2 fill-transparent pointer-events-none"
        width="25px"
        height="25px"
      />
    </div>
  )
}
