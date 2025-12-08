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
import TimeFilter from '@/components/admin/TimeFIlter'
import CustomSearch from "@/components/admin/ui/CustomSearch"
import CustomSelect from "@/components/admin/ui/CustomSelect"
import StudentTable, { Data_Student } from '@/components/admin/ui/tables/StudentTable'
import CreateModal, { CreateModalRef } from '@/components/admin/ui/CreateModal'
import CusTomDate from '@/components/admin/ui/CustomDateModal'

// Icon imports
import PlusIcon from '@/components/svgs/Plus'

// Data imports
import studentsData from "@/data/students.json"
import useStudent from '@/app/hooks/useStudent'

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
    const [currentFilterType, setCurrentFilterType] = useState('In behandeling')
    const [currentTimeFilter, setTimeFilter] = useState('24 uur')
    const [selectedDateRange, setSelectedDateRange] = useState<{ firstDateMs: number; lastDateMs: number } | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const {fetchAllStudents , students ,setSize, indexPage , pageSize , loading}= useStudent()
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
        console.log("students from hook ", students)
    },[indexPage , pageSize ])




    // ================================
    // EVENT HANDLERS
    // ================================
    
    /**
     * Opens the create new student modal

    /**
     * Opens the date selection modal
     */
    const openDateModal = () => {
        dateModalRef.current?.open()
    }

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
    const formatDateRange = () => {
        if (!selectedDateRange) return 'mm/dd/yyyy'

        const startDate = new Date(selectedDateRange.firstDateMs)
        const endDate = new Date(selectedDateRange.lastDateMs)

        const formatDate = (date: Date) => {
            return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`
        }

        // If same date (single selection) show single date, otherwise show range
        if (selectedDateRange.firstDateMs === selectedDateRange.lastDateMs) {
            return formatDate(startDate)
        } else {
            return `${formatDate(startDate)} - ${formatDate(endDate)}`
        }
    }

    /**
     * Handles filter type changes
     * @param filter - The selected filter type
     */

    /**
     * Handles time filter changes
     * @param filter - The selected time filter
     */
    const handleTimeFilterChange = (filter: string) => {
        setTimeFilter(filter)
    }

    // ================================
    // RENDER
    // ================================
    
    return (
        <div className='content'>
            {/* Page Header */}
            <Header title="Studenten" />
            
            <div className='w-full flex flex-col md:flex-row overflow-hidden'>
                {/* Left Sidebar */}
                <LeftSide className='hidden md:flex md:w-[20%] border-l-0 rounded-t-none mt-4 items-center bg-white rounded-r-lg border-2 border-gray-200 h-auto' />
                
                {/* Main Content Area */}
                <div className='dashboard-container w-full md:w-[80%] px-4 md:px-0'>
                    {/* Spacing */}
                    <div className='mt-4' />
                    
                    {/* Time Filter Component */}
                    <TimeFilter 
                        currentFilter={currentTimeFilter} 
                        changeFilter={handleTimeFilterChange}
                        content={true}
                    />

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
                            onChange={(value) => setSize(Number(value))}
                        />
                        
                        {/* Search Input */}
                        <CustomSearch 
                            className='w-full md:w-[15vw]  rounded-lg outline-none p-2.5 bg-white border border-gray-300'
                            value={searchQuery}
                            onChange={(value) => setSearchQuery(value)}
                            placeholder='Zoeken...'
                        />

                        {/* Custom Date Input that opens modal */}
                        {/* Add New Student Button */}
                        <Link href="./students/new-student" className='text-white rounded-lg  bg-dark-blue w-full md:w-auto text-center'>
                            <div className='flex gap-2 p-2.5  items-center'>
                                <PlusIcon color='white' w='15' h='15' className='border-2 text-white rounded border-white' />
                                Student toevoegen
                            </div>
                        </Link>
                        <div className='relative w-full md:w-auto'>
                            <div
                                onClick={openDateModal}
                                className='flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 w-full md:w-48 cursor-pointer hover:border-gray-400 transition-colors'
                            >
                                {/* Calendar Icon */}
                                <svg
                                    className='w-5 h-5 text-gray-400 mr-2 flex-shrink-0'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                                    />
                                </svg>
                                
                                {/* Date Display */}
                                <span className={`text-sm  p-1 md:text-md flex-1 truncate ${selectedDateRange ? 'text-gray-900' : 'text-gray-500'}`}>
                                    {formatDateRange()}
                                </span>
                                
                                {/* Clear Button Container */}
                                <div className='w-6 flex justify-center flex-shrink-0'>
                                    {selectedDateRange && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                dateModalRef.current?.clearSelection()
                                                setSelectedDateRange(null)
                                            }}
                                            className='text-gray-400 hover:text-gray-600'
                                        >
                                            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        
                    </div>
                    
                    {/* Students Table */}
                   {
                    loading   && <div className='w-[2vw] mt-10 h-[2vw]
                     rounded-full animate-spin border-2
                      border-blue-800 border-l-0  duration-300  mx-auto '></div> ||
                      <StudentTable  
                        className=' '
                       
                        data={[...parseStudents(students)]}
                      
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
 export const parseStudents = (student : any[] ) => {
        const s: Data_Student[] = student?.map(item => ({
            
            id: item?.id,
            student: item?.name,
            bsn_nummer: "_",
            email: item?.email,
            date_birth: item?.birthdate,
            adress: item?.city +", "+ item?.street +", "+ item?.zipCode +  "," +item?.houseNumber,
            phone_number: item?.phone,
            status: item?.active ? 'Actief' : 'Inactief',
            driving_license_category: "_",
            theory_exam: "_",
            practical_exam: "_",
            number_of_lessons: 0,
            last_lesson: "_",
            instructor: "_",
            remarks: "_",
        }))
        return s == null ? [] : s
    }