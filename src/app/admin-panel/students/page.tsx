"use client"

// ================================
// STUDENTS PAGE COMPONENT
// ================================
// Main page for managing driving school students
// Features: View, search, filter, date filtering for students data

// React and Next.js imports
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'

// Component imports
import Header from '@/components/admin/Header'
import LeftSide from '@/components/admin/LeftSide'
import CustomSearch from "@/components/admin/ui/CustomSearch"
import CustomSelect from "@/components/admin/ui/CustomSelect"
import StudentTable, { Data_Student } from '@/components/admin/ui/tables/StudentTable'
import { parseStudents } from '@/lib/studentUtils'
import CreateModal, { CreateModalRef } from '@/components/admin/ui/CreateModal'
import CusTomDate from '@/components/admin/ui/CustomDateModal'

// Icon imports
import PlusIcon from '@/components/svgs/Plus'

// Data imports
import studentsData from "@/data/students.json"
import useStudent from '@/app/hooks/useStudent'
import Breadcrumb from '@/components/admin/Breadcrumb'

// ================================
// TYPE DEFINITIONS
// ================================

/**
 * Interface for Custom Date Modal reference
 * Used for date picker functionality
 */
type CustomDateRef = {
    firstDateMs?: number;
    lastDateMs?: number;
    singleDate?: number;
    open: () => void;
    close: () => void;
    getSelectedRange: () => { firstDateMs: number; lastDateMs: number } | null;
    clearSelection: () => void;
    setDateRange: (startDate: string, endDate: string) => void;
}

// ================================
// MAIN COMPONENT
// ================================

/**
 * Students Page Component
 * Manages the students section of the admin dashboard
 */
export default function StudentsPage() {

    
    // ================================
    // STATE MANAGEMENT
    // ================================
    
    // Filter and search states
    const [selectedDateRange, setSelectedDateRange] = useState<{ firstDateMs: number; lastDateMs: number } | null>(null)
    const {fetchAllStudents , students ,SearchStudent ,search,setSize, indexPage , setIndex , pageSize , loading}= useStudent()
    // Modal references
    const CreateModalRef = useRef<CreateModalRef>(null)
    const dateModalRef = useRef<CustomDateRef>(null)

    // ================================
    // DATA PROCESSING
    // ================================
    
    /**
     * Parse and transform students data from JSON
     * Ensures type safety and data consistency
     */
    useEffect(()=>{
        fetchAllStudents()
        console.log("students from hook ", search)
    },[indexPage , pageSize  , search])




    // ================================
    // EVENT HANDLERS
    // ================================
    
    /**
     * Opens the create new student modal

    /**
     * Opens the date selection modal
     */

    /**
     * Handles date selection from modal
     * Automatically detects single vs range selection
     * @param dates - Selected date range or null
     */
    const handleDateSelect = (dates: { firstDateMs: number; lastDateMs: number } | null) => {
        setSelectedDateRange(dates)
    }

    /**
     * Formats date range for display in the date picker
     * @returns Formatted date string or placeholder
     */
  


    return (
        <div className='content'>
            {/* Page Header */}
            <Header title="Studenten" />
            <Breadcrumb 
                         items={
                            [
                                {
                                    href : "/admin-panel/students" , label : "Studenten"
                                }
                            ]
                         }
                        
                        />
            <div className='w-full flex flex-col md:flex-row overflow-hidden'>
                {/* Left Sidebar */}
                <LeftSide className='hidden md:flex md:w-[20%] border-l-0 rounded-t-none mt-4 items-center bg-white rounded-r-lg border-2 border-gray-200 h-auto' />
                
                {/* Main Content Area */}
                <div className='dashboard-container w-full md:w-[80%] px-4 md:px-0'>
                  
                    {/* Spacing */}
                    <div className='mt-4' />

                    {/* Controls Section */}
                    <div className='flex flex-wrap gap-3   items-center searchItem mt-4 mb-4 justify-between md:justify-end w-full md:w-[95%] h-max mx-auto'>
                        
                        {/* Items Per Page Selector */}
                        <CustomSelect
                            options={[
                                { value: 10, label: "10" },
                                { value: 20, label: "20" },
                                { value: 30, label: "30" },
                                { value: 40, label: "40" },
                                { value: 50, label: "50" },
                                { value: 60, label: "60" },
                                { value: 70, label: "70" },
                                { value: 80, label: "80" },
                                { value: 90, label: "90" },
                                { value: 100, label: "100" },
                            ]}
                            value={pageSize}
                            className='w-full md:w-32  md:mr-auto'
                            onChange={(value) => {setSize(Number(value)); setIndex(0)}}
                        />
                        
                        {/* Search Input */}
                        <CustomSearch 
                            className='w-full md:w-[15vw]  rounded-lg outline-none p-2.5 bg-white border border-gray-300'
                            value={search}
                            onChange={(value) => SearchStudent(value)}
                            placeholder='Zoeken...'
                        />

                        {/* Custom Date Input that opens modal */}
                        {/* Add New Student Button */}
                        <Link href="./students/new-student" className='text-white rounded-lg  bg-blue-800 hover:bg-blue-800/80 w-full md:w-auto text-center'>
                            <div className='flex gap-2 p-2.5  items-center  '>
                                <PlusIcon color='white' w='15' h='15' className='border-2  text-white rounded border-white' />
                                <span  className='text-sm'>Student toevoegen</span>
                            </div>
                        </Link>
                        <div className='cursor-pointer flex items-center gap-1 text-[#667085] p-2 rounded-lg border-gray-300 border-1'>
                          <span><img src="/actions/hide_icon.svg" alt="" /></span>
                            Alles weergeven
                         </div>
                       

                        
                    </div>
                    
                    {/* Students Table */}
                   {
                    loading   && <div className='w-[2vw] mt-10 h-[2vw]
                     rounded-full animate-spin border-2
                      border-blue-800 border-l-0  duration-300  mx-auto '></div> ||
                      <StudentTable  
                        data={[...parseStudents(students)]}
                       className=''
                    /> 
                   }
                </div>
            </div>
            
            {/* Create Modal */}
            <CreateModal ref={CreateModalRef} name='modal' />

            {/* Custom Date Modal */}
            <CusTomDate
                className=''
                ref={dateModalRef}
                singleUse={false}
                onDateSelect={handleDateSelect}
            />
        </div>
    )
}