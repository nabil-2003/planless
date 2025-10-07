"use client"

// ================================
// STUDENTS PAGE COMPONENT
// ================================
// Main page for managing driving school students
// Features: View, search, filter, date filtering for students data

// React and Next.js imports
import React, { useCallback, useRef, useState } from 'react'

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
import ExportIcon from '@/components/svgs/ExportIcon'

// Data imports
import studentsData from "@/data/students.json"
import financialData from '@/data/finances.json'
import FinanTable, { StudentFinancialData, InstructorFinancialData } from '@/components/admin/ui/tables/finanTable'

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
    const [currentFilterType, setCurrentFilterType] = useState('in Behandeling')
    const [currentTimeFilter, setTimeFilter] = useState('24 uur')
    const [selectedDateRange, setSelectedDateRange] = useState<{ firstDateMs: number; lastDateMs: number } | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [ActiveSide, setActiveSide] = useState('s')
    const [isExporting, setIsExporting] = useState(false)
    
    // Modal references
    const CreateModalRef = useRef<CreateModalRef>(null)
    const dateModalRef = useRef<CustomDateRef>(null)

    // ================================
    // DATA PROCESSING
    // ================================
    
    /**
     * Parse and transform financial data from JSON
     * Ensures type safety and data consistency
     */
    const parsedFinancialData = useCallback(() => {
        const studentFinancials: StudentFinancialData[] = (financialData.students as any[]).map(item => ({
            id: item.id,
            factuurdatum: item.factuurdatum,
            vervaldatum: item.vervaldatum,
            betalingsstatus: item.betalingsstatus,
            rijlesstatus: item.rijlesstatus,
            factuur_bedrag: item.factuur_bedrag,
        }))
        
        const instructorFinancials: InstructorFinancialData[] = (financialData.instructeurs as any[]).map(item => ({
            id: item.id,
            instructeur: item.instructeur,
            rijles_datum: item.rijles_datum,
            betalingsstatus: item.betalingsstatus,
            rijlesstatus: item.rijlesstatus,
            urenregistratie: item.urenregistratie,
        }))
        
        return { students: studentFinancials, instructors: instructorFinancials }
    }, [])

    // Get current data based on selected side
    const getCurrentData = useCallback(() => {
        const financials = parsedFinancialData()
        return ActiveSide === 's' ? financials.students : financials.instructors
    }, [ActiveSide, parsedFinancialData])

    // ================================
    // EVENT HANDLERS
    // ================================
    
    /**
     * Opens the create new student modal
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

    /**
     * Handles CSV export functionality for financial data
     * Creates and downloads a CSV file with current financial data
     */
    const handleExportCSV = async () => {
        setIsExporting(true)
        
        try {
            const currentData = getCurrentData()
            
            // Define CSV headers based on active side
            const headers = ActiveSide === 's' 
                ? [
                    'ID',
                    'Factuurdatum',
                    'Vervaldatum',
                    'Betalingsstatus',
                    'Rijlesstatus',
                    'Factuur bedrag'
                ]
                : [
                    'ID',
                    'Instructeur',
                    'Rijles datum',
                    'Betalingsstatus',
                    'Rijlesstatus',
                    'Urenregistratie'
                ]

            // Create CSV content with proper escaping
            const csvContent = [
                headers.join(','),
                ...currentData.map(item => {
                    if (ActiveSide === 's') {
                        const studentItem = item as any
                        return [
                            `"${studentItem.id}"`,
                            `"${studentItem.factuurdatum}"`,
                            `"${studentItem.vervaldatum}"`,
                            `"${studentItem.betalingsstatus}"`,
                            `"${studentItem.rijlesstatus}"`,
                            `"${studentItem.factuur_bedrag}"`
                        ].join(',')
                    } else {
                        const instructorItem = item as any
                        return [
                            `"${instructorItem.id}"`,
                            `"${instructorItem.instructeur}"`,
                            `"${instructorItem.rijles_datum}"`,
                            `"${instructorItem.betalingsstatus}"`,
                            `"${instructorItem.rijlesstatus}"`,
                            `"${instructorItem.urenregistratie}"`
                        ].join(',')
                    }
                })
            ].join('\n')

            // Create and trigger download
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
            const link = document.createElement('a')
            const url = URL.createObjectURL(blob)
            
            const fileName = ActiveSide === 's' 
                ? `financien_studenten_${new Date().toISOString().split('T')[0]}.csv`
                : `financien_instructeurs_${new Date().toISOString().split('T')[0]}.csv`
            
            link.setAttribute('href', url)
            link.setAttribute('download', fileName)
            link.style.visibility = 'hidden'
            
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            
            console.log('CSV export completed successfully')
        } catch (error) {
            console.error('Export failed:', error)
        } finally {
            setIsExporting(false)
        }
    }

    // ================================
    // RENDER
    // ================================


    return (
        <div className='content'>
            {/* Page Header */}
            <Header title="financien" />
            
            <div className='w-full flex overflow-hidden'>
                {/* Left Sidebar - Minimized */}
                <LeftSide className='w-[15%] border-l-0 rounded-t-none mt-4 items-center bg-white rounded-r-xl border-2 border-gray-200 h-auto' />
                
                {/* Main Content Area - Maximum Width */}
                <div className='dashboard-container w-[85%] max-w-full px-1'>
                    {/* Spacing */}
                    <div className='  ' />
                     <div className='p-3 capitalize bg-white      mt-2 ml-6 flex  items-center gap-2'>
                      <span onClick={()=>{setActiveSide(t => "s")}} className={ActiveSide == 's' ? ' p-2 border-b-3 text-[var(--dark-blue)]  border-[var(--dark-blue)]  cursor-pointer  ': 'text-gray-400 cursor-pointer y-400'}>students</span>
                      <span onClick={()=>{setActiveSide(t => "i")}} className={ActiveSide !== 's' ? ' p-2 border-b-3 text-[var(--dark-blue)]  border-[var(--dark-blue)]  cursor-pointer  ': 'text-gray-400 cursor-pointer  y-400'}>instructeurs</span>

                     </div>
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
                                <span className={`text-md flex-1 truncate ${selectedDateRange ? 'text-gray-900' : 'text-gray-500'}`}>
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

                        {/* Export Button */}
                        <button
                            onClick={handleExportCSV}
                            disabled={isExporting}
                            className='group flex items-center text-[var(--dark-blue)] bg-white hover:bg-[#024089] disabled:bg-blue-300 hover:text-white px-6 py-2 rounded-xl border-1 border-[#024089] ml-4 transition-colors font-medium'
                        >
                            {isExporting ? (
                                <>
                                    <div className='animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2'></div>
                                    Exporteren...
                                </>
                            ) : (
                                <>
                                    <ExportIcon w='20' h='20' color='var(--dark-blue)' className='mr-2' />
                                    <span className='group-hover:text-white'>Export</span>
                                </>
                            )}
                        </button>
                    </div>
                    
                    {/* Finance Table - Full Width */}
                    <FinanTable
                        selectedSide={ActiveSide}  
                        className='w-full capitalize mx-0'
                        filterTable={currentFilterType} 
                        data={getCurrentData()}
                        searchQuery={searchQuery}
                        timeFilter={currentTimeFilter}
                        itemsPerPage={itemsPerPage}
                        selectedDateRange={selectedDateRange}
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
