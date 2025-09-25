'use client'

import SearchIcon, { SearchIconRef } from '@/components/svgs/Search'
import React, { useState, useRef } from 'react'

export default function CustomSearch({ className , type="text"}: { className: string , type?: string}) {
  const icon = useRef<SearchIconRef>(null)
  const [searchText, setSearchText] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchText(value)

    if (value !== "") {
      icon.current?.hide()
    } else {
      icon.current?.show()
    }
  }

  return (
    <div className="relative h-max w-max  rounded-md bg-amber-50">
      <input
        type={type}
        onChange={handleChange}
        value={searchText}
        className={className + " block placeholder:capitalize  placeholder:pl-10"}
        placeholder="zoeken"
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