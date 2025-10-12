'use client'
import React, { useState, useRef, useEffect } from 'react'
import { FaChevronDown } from 'react-icons/fa'

interface Option {
  value: string | number
  label: string
}

interface CustomSelectProps {
  options: Option[]
  value?: string | number
  defaultValue?: string | number
  placeholder?: string
  className?: string
  onChange?: (value: string | number) => void
}

export default function CustomSelect({
  options,
  value,
  defaultValue,
  placeholder = "Select an option",
  className = "",
  onChange
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value !== undefined ? value : (defaultValue || ""))
  const [selectedLabel, setSelectedLabel] = useState("")
  const selectRef = useRef<HTMLDivElement>(null)

  // Handle controlled vs uncontrolled behavior
  const currentValue = value !== undefined ? value : selectedValue

  // Set selected label based on current value
  useEffect(() => {
    const option = options.find(opt => opt.value === currentValue)
    setSelectedLabel(option ? option.label : "")
  }, [currentValue, options])

  // Update internal state when controlled value changes
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value)
    }
  }, [value])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Handle option selection
  const handleOptionClick = (option: Option) => {
    if (value === undefined) {
      // Uncontrolled behavior
      setSelectedValue(option.value)
    }
    setSelectedLabel(option.label)
    setIsOpen(false)
    if (onChange) {
      onChange(option.value)
    }
  }

  // Toggle dropdown open/close
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div
      ref={selectRef}
      className={`relative  ${className}`}
    >
      {/* Select Button */}
      <div
        onClick={toggleDropdown}
        className={`
          flex items-center justify-between
          px-4 py-2 
          min-w-[80px]
          border border-gray-300 rounded
          bg-white cursor-pointer
          transition-all duration-200 ease-in-out
          hover:border-blue hover:shadow-sm
          ${isOpen ? 'border-blue shadow-sm' : ''}
        `}
      >
        <span className={`${selectedLabel ? 'text-gray-900' : 'text-gray-500'}`}>
          {selectedLabel || placeholder}
        </span>
        <FaChevronDown
          className={`
            text-gray-400 text-sm transition-transform duration-200
            ${isOpen ? 'rotate-180' : 'rotate-0'}
          `}
        />
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg z-50 max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`
                px-4 py-2 cursor-pointer
                transition-all duration-200 ease-in-out
                hover:text-white
                ${currentValue === option.value ? 'text-white' : 'text-gray-900'}
              `}
              style={{
                backgroundColor: currentValue === option.value ? 'var(--dark-blue)' : 'transparent'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'var(--dark-blue)'
              }}
              onMouseLeave={(e) => {
                if (currentValue === option.value) {
                  (e.target as HTMLElement).style.backgroundColor = 'var(--dark-blue)'
                } else {
                  (e.target as HTMLElement).style.backgroundColor = 'transparent'
                }
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
