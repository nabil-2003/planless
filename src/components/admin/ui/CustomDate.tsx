"use client"
import React, { useState } from 'react'
export default function CusTomDate({ className }: { className: string }) {

  const [dateSearch, setdateSearch] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setdateSearch(value)
    }
  return (
    <div className="relative h-max w-max  rounded-md ">
      <input
        type="date"
        onChange={handleChange}
        value={dateSearch}
        className={className + " block placeholder:capitalize  "}
        placeholder="zoeken"
      />

      {/* The icon is controlled imperatively via ref */}

    </div>
  )
}
