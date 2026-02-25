"use client"

// ================================
// DRIVING LESSONS PAGE COMPONENT
// ================================
// Main page for managing driving lessons
// Features: View, search, filter, date filtering for lessons data

// React and Next.js imports
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { getparsedLesson, ParsedLesson } from '@/store/LessonsSlices'
// Component imports
import Header from '@/components/admin/Header'
import LeftSide from '@/components/admin/LeftSide'
import FIlterByType from '@/components/admin/FIlterByType'
import CustomSearch from "@/components/admin/ui/CustomSearch"
import CustomSelect from "@/components/admin/ui/CustomSelect"
import LessonsTable, { Data_Lessons, netherlandsToEngStatus } from '@/components/admin/ui/tables/TableLessons'
import CreateModal, { CreateModalRef } from '@/components/admin/ui/CreateModal'
import CusTomDate, { CustomDateRef } from '@/components/admin/ui/CustomDateModal'
import { Button } from '@/components/ui'

// Icon imports
import PlusIcon from '@/components/svgs/Plus'

// Data imports
import CustmButton from '@/components/admin/ui/CustmButton'
import useLessons from '@/app/hooks/useLessons'
import CardsTable from '@/components/admin/ui/tables/CardsTable'
import Breadcrumb from '@/components/admin/Breadcrumb'

// ================================
// TYPE DEFINITIONS
// ================================

// (CustomDateRef is imported from the modal component, no need to redefine)

// ================================
// MAIN COMPONENT
// ================================

/**
 * Driving Lessons Page Component
 * Manages the driving lessons section of the admin dashboard
 */
export default function DrivingLessonsPage() {
    
    // ================================
    // STATE MANAGEMENT
    // ================================
    
    // Filter and search states
    const [currentFilterType, setCurrentFilterType] = useState('In behandeling')
    const [selectedDateRange, setSelectedDateRange] = useState<{ firstDateMs: number; lastDateMs: number } | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
  
    const {fetchAllLessons , lessons ,loading  , endDateLessons, startDateLessons, size, index , setIndex , setSize }= useLessons()
    // Modal references
    const CreateModalRef = useRef<CreateModalRef>(null)
    const dateModalRef = useRef<CustomDateRef>(null)
      
   
     

     useEffect(()=>{
           if (selectedDateRange?.firstDateMs === selectedDateRange?.lastDateMs && selectedDateRange !== null) 
                    setSelectedDateRange({
                        firstDateMs: selectedDateRange!.firstDateMs- 86400000,
                        lastDateMs: selectedDateRange!.firstDateMs , // add 23:59:59 in ms
                    })
        fetchAllLessons(index,size ,searchQuery , selectedDateRange?.firstDateMs ?? 0, selectedDateRange?.lastDateMs ?? new Date("01-01-2100").getTime() , netherlandsToEngStatus(currentFilterType)?.engStatus)
     },[index,size ,selectedDateRange , searchQuery ,  currentFilterType])
    const parsedLessons = useCallback((lessonss :any[] ) :any => {
            const  parsedLessons : ParsedLesson[]= []          
           lessonss?.forEach(lesson => {
            const parsed = getparsedLesson(lesson)
            if (parsed !== null) {
                parsedLessons.push(parsed)
            }
           })
       
     return parsedLessons;
       
    }, [])

    // ================================
    // EVENT HANDLERS
    // ================================
    
    /**
     * Opens the create new lesson modal
     */
    const openCreateModal = () => {
        CreateModalRef.current?.open()
    }

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
            return ` ${formatDate(endDate)}`
        }
    }

    /**
     * Handles filter type changes
     * @param filter - The selected filter type
     */
    const handleFilterTypeChange = (filter: string) => {
        setCurrentFilterType(filter)
    }

    /**
     * Handles time filter changes
     * @param filter - The selected time filter
     */
    // ================================
    // RENDER
    // ================================
    
    return (
        <div className='content' id='root'>
            {/* Page Header */}
            <Header title="Rijlessen" />
             <Breadcrumb items={[
                    
                    { href: '/admin-panel/cards', label: 'Rijlessen ' },
                     { href: '/admin-panel/cards', label:  currentFilterType },
               
                   ]
             } />
            <div className='w-full flex flex-col md:flex-row overflow-hidden'>
                {/* Left Sidebar */}
                <LeftSide className='hidden md:flex md:w-[20%] border-l-0 rounded-t-none mt-4 items-center bg-white rounded-r-lg border-2 border-gray-200 h-auto' />
                
                {/* Main Content Area */}
                <div className='dashboard-container w-full md:w-[80%] px-4 md:px-0'>
                 
                    
                    {/* Filter By Type Component */}
                    <FIlterByType 
                        currentFilterType={currentFilterType} 
                        chFilterByType={handleFilterTypeChange} 
                    />
                     
                    {/* Spacing */}
                    <div className='mt-4' />
                    
                    {/* Time Filter Component */}
                   
                    {/* Controls Section - Fully Responsive Toolbar */}
                    <div className='flex flex-col sm:flex-row sm:flex-wrap gap-3 items-stretch sm:items-center mt-4 mb-4 w-full lg:w-[95%] mx-auto'>
                        
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
                            value={size}
                            className='w-full sm:w-32 sm:mr-auto bg-white h-[42px]'
                            onChange={(value) => {setSize(Number(value)); setIndex(0)}}
                        />
                        
                        {/* Search Input */}
                        <CustomSearch 
                            className='w-full sm:flex-1 sm:basis-48 lg:flex-none lg:w-[200px] rounded-lg outline-none px-3 py-2.5 h-[42px] bg-white border border-gray-300'
                            value={searchQuery}
                            onChange={(value) => setSearchQuery(value)}
                            placeholder='Zoeken...'
                        />
                        
                        {/* Add New Lesson Button */}
                        <CustmButton 
                            onClick={openCreateModal} 
                            className='w-full sm:flex-1 sm:basis-44 lg:flex-none lg:w-[180px] h-[42px] rounded-lg bg-dark-blue text-white outline-none flex items-center justify-center gap-2 px-4'
                        >
                            <PlusIcon color='white' w='15' h='15' className='border-2 text-white rounded border-white flex-shrink-0' />
                            <span className='whitespace-nowrap'>Rijles toevoegen</span>
                        </CustmButton>
                        
                        {/* Custom Date Input that opens modal */}
                        <div className='w-full sm:flex-1 sm:basis-48 lg:flex-none lg:w-[200px] h-[42px]'>
                            <div
                                onClick={openDateModal}
                                className='flex items-center bg-white border border-gray-300 rounded-lg px-3 h-full cursor-pointer hover:border-blue-400 transition-colors'
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
                                <span className={`text-sm flex-1 truncate ${selectedDateRange ? 'text-gray-900' : 'text-gray-500'}`}>
                                    {formatDateRange()}
                                </span>
                                
                                {/* Clear Button */}
                                {selectedDateRange && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            dateModalRef.current?.clearSelection()
                                            setSelectedDateRange(null)
                                        }}
                                        className='ml-2 text-gray-400 hover:text-gray-600 flex-shrink-0'>
                                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                        
                        {/* Show All Button */}
                        <div className='w-full sm:flex-1 sm:basis-44 lg:flex-none lg:w-[180px] h-[42px] cursor-pointer flex items-center justify-center gap-2 text-[#667085] rounded-lg border border-gray-300 px-3'>
                            <img src="/actions/hide_icon.svg" alt="" className='w-5 h-5 flex-shrink-0' />
                            <span className='whitespace-nowrap text-sm'>Alles weergeven</span>
                        </div>
                      
                    </div>
                    
                    {/* Lessons Table */}
                    { 
                      loading && <div className='text-center mx-auto  w-[2vw] animate-spin duration-400  h-[2vw] mt-20 text-gray-500 border-2 border-blue-800 border-l-0 rounded-full '></div> || 
                      <CardsTable  
                        data={ parsedLessons(lessons as any[]) }
                        className=''
                        currentTap={netherlandsToEngStatus(currentFilterType)?.engStatus  || 'pending'}
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
