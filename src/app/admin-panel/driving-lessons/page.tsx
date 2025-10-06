"use client"

// ================================
// DRIVING LESSONS PAGE COMPONENT
// ================================
// Main page for managing driving lessons
// Features: View, search, filter, date filtering for lessons data

// React and Next.js imports
import React, { useCallback, useRef, useState } from 'react'

// Component imports
import Header from '@/components/admin/Header'
import LeftSide from '@/components/admin/LeftSide'
import TimeFilter from '@/components/admin/TimeFIlter'
import FIlterByType from '@/components/FIlterByType'
import CustomSearch from "@/components/admin/ui/CustomSearch"
import CustomSelect from "@/components/admin/ui/CustomSelect"
import LessonsTable, { Data_Lessons } from '@/components/admin/ui/tables/TableLessons'
import CreateModal, { CreateModalRef } from '@/components/admin/ui/CreateModal'
import CusTomDate from '@/components/admin/ui/CustomDateModal'
import { Button } from '@/components/ui'

// Icon imports
import PlusIcon from '@/components/svgs/Plus'

// Data imports
import jsonData from "@/data/lessons.json"

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
 * Driving Lessons Page Component
 * Manages the driving lessons section of the admin dashboard
 */
export default function DrivingLessonsPage() {
    
    // ================================
    // STATE MANAGEMENT
    // ================================
    
    // Filter and search states
    const [currentFilterType, setCurrentFilterType] = useState('in Behandeling')
    const [currentTimeFilter, setTimeFilter] = useState('24 uur')
    const [selectedDateRange, setSelectedDateRange] = useState<{ firstDateMs: number; lastDateMs: number } | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [itemsPerPage, setItemsPerPage] = useState(10)
    
    // Modal references
    const CreateModalRef = useRef<CreateModalRef>(null)
    const dateModalRef = useRef<CustomDateRef>(null)

    // ================================
    // DATA PROCESSING
    // ================================
    
    /**
     * Parse and transform lessons data from JSON
     * Ensures type safety and data consistency
     */
    const parsedLessons = useCallback(() => {
        const lessons: Data_Lessons[] = (jsonData as any[]).map(item => ({
            instructeur: item.instructeur,
            student: item.student,
            begintijd: item.begintijd,
            eindtijd: item.eindtijd,
            lesduur: item.lesduur,
            factuur_bedrag: item.factuur_bedrag,
            betalingsstatus: item.betalingsstatus,
            rijles_status: item.rijles_status,
            annuleringstijd: item.annuleringstijd,
            annuleringsreden: item.annuleringsreden,
        }))
        return lessons
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
            return `${formatDate(startDate)} - ${formatDate(endDate)}`
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
    const handleTimeFilterChange = (filter: string) => {
        setTimeFilter(filter)
    }

    // ================================
    // RENDER
    // ================================
    
    return (
        <div className='content'>
            {/* Page Header */}
            <Header title="Rijlessen" />
            
            <div className='w-full flex overflow-hidden'>
                {/* Left Sidebar */}
                <LeftSide className='w-[20%] border-l-0 rounded-t-none mt-4 items-center bg-white rounded-r-xl border-2 border-gray-200 h-auto' />
                
                {/* Main Content Area */}
                <div className='dashboard-container w-[80%]'>
                    
                    {/* Filter By Type Component */}
                    <FIlterByType 
                        currentFilterType={currentFilterType} 
                        chFilterByType={handleFilterTypeChange} 
                    />
                    
                    {/* Spacing */}
                    <div className='mt-4' />
                    
                    {/* Time Filter Component */}
                    <TimeFilter 
                        currentFilter={currentTimeFilter} 
                        changeFilter={handleTimeFilterChange}
                        content={true}
                    />

                    {/* Controls Section */}
                    <div className='flex searchItem mx-auto mt-4 mb-4 justify-end w-[95%] h-max ml-auto'>
                        
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
                            value={itemsPerPage}
                            className='mr-auto w-32'
                            onChange={(value) => setItemsPerPage(Number(value))}
                        />
                        
                        {/* Search Input */}
                        <CustomSearch 
                            className='w-[15vw] rounded-md outline-none p-2 bg-white border border-gray-300'
                            value={searchQuery}
                            onChange={(value) => setSearchQuery(value)}
                            placeholder='Zoeken...'
                        />

                        {/* Custom Date Input that opens modal */}
                        <div className='relative ml-4'>
                            <div
                                onClick={openDateModal}
                                className='flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 w-48 cursor-pointer hover:border-gray-400 transition-colors'
                            >
                                {/* Calendar Icon */}
                                <svg
                                    className='w-5 h-5 text-gray-400 mr-2'
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
                                <span className={`text-md flex-1 ${selectedDateRange ? 'text-gray-900' : 'text-gray-500'}`}>
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
                                        className='ml-2 text-gray-400 hover:text-gray-600'
                                    >
                                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Add New Lesson Button */}
                        <Button onClick={openCreateModal} className='outline-none ml-4'>
                            <div className='flex gap-2 items-center'>
                                <PlusIcon color='white' w='15' h='15' className='border-2 text-white rounded border-white' />
                                Rijles toevoegen
                            </div>
                        </Button>
                    </div>
                    
                    {/* Lessons Table */}
                    <LessonsTable  
                        className='ml-8 capitalize'
                        filterTable={currentFilterType} 
                        data={[...parsedLessons()]}
                        searchQuery={searchQuery}
                        selectedDateRange={selectedDateRange}
                        timeFilter={currentTimeFilter}
                        itemsPerPage={itemsPerPage}
                    />
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
