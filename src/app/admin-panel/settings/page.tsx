"use client"

// ================================
// INSTRUCTORS PAGE COMPONENT
// ================================
// Main page for managing driving instructors
// Features: View, search, filter, export instructors data

// React and Next.js imports
import React, { ReactElement, use, useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Component imports
import Header from '@/components/admin/Header'
import LeftSide from '@/components/admin/LeftSide'
import TimeFilter from '@/components/admin/TimeFIlter'
import CustomSearch from "@/components/admin/ui/CustomSearch"
import CustomSelect from "@/components/admin/ui/CustomSelect"
import InstructorTable, { Data_Instructor } from '@/components/admin/ui/tables/InstructorTable'
import CreateModal, { CreateModalRef } from '@/components/admin/ui/CreateModal'

// Icon imports
import ExportIcon from '@/components/svgs/ExportIcon'
import PlusIcon from '@/components/svgs/Plus'

// Data imports
import instructorsData from "@/data/instructors.json"

import useInstructor from '@/app/hooks/useInstructor'
import CustmButton from '@/components/admin/ui/CustmButton'

// ================================
// TYPE DEFINITIONS
// ================================

/**
 * Interface for Custom Date Modal reference
 * Used for date picker functionality
 */


// ================================
// MAIN COMPONENT
// ================================

/**
 * Instructors Page Component
 * Manages the instructors section of the admin dashboard
 */
export default function InstructorsPage() {


  return (
    <div className='content'>
      {/* Page Header */}
      <Header title="Instructeurs" />

      <div className='w-full flex flex-col md:flex-row overflow-hidden'>
        {/* Left Sidebar */}
        <LeftSide className='hidden md:flex md:w-[20%] border-l-0 rounded-t-none mt-4 items-center bg-white rounded-r-lg border-2 border-gray-200 h-auto' />

        {/* Main Content Area */}
        <div className='dashboard-container w-full md:w-[80%] px-4 md:px-0'>
          <div className='form-container mx-0 md:mx-4 border-2 border-gray-200 rounded-lg mt-4 p-4 bg-white '>
            <h1 className='font-bold text-lg md:text-xl'>Accountinstellingen</h1>
            <form className='w-full gap-2 flex flex-wrap justify-between' action="">

              <Input type='text' title='E-mailadres' value={""} onChange={() => { }} placeholder='example@example.com' />
              <Input type='password' title='Wachtwoord' value={""} onChange={() => { }} placeholder='********' />
              <Input type='option' title='Standaardvaluta' value={""} onChange={() => { }} placeholder='' />

            </form>
          </div>
          <div className='form-container mx-0 md:mx-4 border-2 border-gray-200 rounded-lg mt-4 p-4 bg-white '>
            <h1 className='font-bold text-lg md:text-xl'>Lespakketten</h1>
            <form className='w-full gap-2 flex flex-wrap justify-between' action="">

              <Input type='card' SvgImg={"/scotter.svg"} title='' value={"Brommer (AM)"} onChange={() => { }} placeholder='example@example.com' />
              <Input type='card' SvgImg={"/moto.svg"} title='' value={"Motor (A1–A2–A)"} onChange={() => { }} placeholder='example@example.com' />
              <Input type='card' SvgImg={"/Auto2.svg"} title='' value={"Auto (Schakel B)"} onChange={() => { }} placeholder='example@example.com' />
              <Input type='card' SvgImg={"/Auto1.svg"} title='' value={"Auto (Automaat B)"} onChange={() => { }} placeholder='example@example.com' />
              <Input type='card' SvgImg={"/Trailer.svg"} title='' value={"Aanhanger (BE)"} onChange={() => { }} placeholder='example@example.com' />

            </form>
          </div>
        </div>
      </div>

    </div>
  )
}
const Input = ({ SvgImg, title, type = "text", placeholder, istextArea = false, onChange, value }: { SvgImg?: string, type?: string, istextArea?: boolean, title: string, placeholder: string, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, value: string }) => {
  const file = useRef<HTMLInputElement>(null)
  const [uploadMessage, setUploadMessage] = useState<string>("")
  const [previewUrl, setPreviewUrl] = useState<string>("")

  const openFile = () => {
    file.current && file.current.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setUploadMessage(`${selectedFile.name} uploaded successfully!`)

      // Create preview URL for the image
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)

      // Create a mock change event with the filename as value
      const mockEvent = {
        target: {
          value: selectedFile.name
        }
      } as React.ChangeEvent<HTMLInputElement>
      onChange(mockEvent)
    }
  }
  switch (type) {

    case "option":
      return (
        <div className='form-field flex flex-col w-full md:w-[49%] mt-4'>

          <span className='text-sm md:text-base'>{title}</span>

          <select onChange={() => { }} value={value} className='border-2 mt-3 border-gray-300 rounded-lg p-4 md:p-3 outline-none  placeholder:capitalize text-sm md:text-base'>
            <option value="" disabled >Selecteer een optie</option>
            <option value="1">Optie 1</option>
            <option value="2">Optie 2</option>
            <option value="3">Optie 3</option>
          </select>

        </div>
      )
    case "card":

      return (
        <div className='form-field flex flex-col w-full md:w-[49%] mt-4'>

          <span className='text-sm md:text-base'>{title}</span>

          <div className='border-1 hover:bg-blue-200/25  border-gray-300 rounded-2xl p-3  flex items-center justify-between mt-3  '>
            <div className='flex items-center gap-2'>
              <img src={SvgImg} alt={title} />
              <span>{value}</span>
            </div>
            <CustmButton className=' w-max h-max p-3 ' >
              <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 15.885L6.18084 9L0 2.115L1.90283 0L10 9L1.90283 18L0 15.885Z" fill="#8D8D8D" />
              </svg>
            </CustmButton>

          </div>

        </div>
      )

    default:
      return (
        <div className='form-field flex flex-col w-full md:w-[49%] mt-4'>

          <span className='text-sm md:text-base'>{title}</span>

          {
            type !== "file" && (
              !istextArea &&
              <input type={type} onChange={onChange} value={value} className='border-2 mt-3 border-gray-300 rounded-lg p-4 md:p-3 outline-none  placeholder:capitalize text-sm md:text-base' placeholder={placeholder} />
              ||
              <textarea onChange={onChange} value={value} className='border-2 mt-3 border-gray-300 rounded-lg p-3 md:p-4 h-[10vh] resize-none outline-none placeholder:capitalize text-sm md:text-base' placeholder={placeholder} />

            ) ||
            <div className='border-2 mt-4 border-gray-300 p-4 md:p-6 rounded-lg '>
              {previewUrl && (
                <div className='mb-4'>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className='w-full h-auto max-h-[40vh] object-contain rounded-lg border-2 border-gray-200'
                  />
                </div>
              )}
              <div className='file border-2 border-gray-300 p-2 rounded-lg '>
                <span className='w-12 h-12 md:w-[5vw] md:h-[5vw] rounded-lg border-2 border-[var(--dark-blue)] border-dashed grid place-items-center text-lg text-[var(--dark-blue)] cursor-pointer' onClick={openFile} >+</span>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  ref={file}
                  name='fileInput'
                  onChange={handleFileChange}
                />
                {uploadMessage && (
                  <div className='mt-2 text-sm text-green-600 font-medium'>
                    {uploadMessage}
                  </div>
                )}
              </div>
            </div>

          }

        </div>
      )
  }

}
