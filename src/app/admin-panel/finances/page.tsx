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
    const [ActiveTab, setActiveTab] = useState<'students' | 'instructeurs'>('students')
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


    // Get current data based on selected side


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


            // Define CSV headers based on active side
            const headers = ActiveTab === 'students'
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
                ...[].map(item => {
                    if (ActiveTab === 'students') {
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

            const fileName = ActiveTab === 'students'
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
   console.log("selected" , selectedDateRange)

    return (
        <div className='content'>
            {/* Page Header */}
            <Header title="financien" />

            <div className='w-full flex flex-col md:flex-row'>
                {/* Left Sidebar - Consistent with other pages */}
                <LeftSide className='hidden md:flex md:w-[20%] border-l-0 rounded-t-none mt-4 items-center bg-white rounded-r-lg border-2 border-gray-200 h-auto' />

                {/* Main Content Area - Consistent with other pages */}
                <div className='dashboard-container mb-8 w-full md:w-[80%] px-4 md:px-0'>
                    {/* Spacing */}
                    <div className='mt-4' />
                    <div className='p-3 capitalize bg-white mt-2 flex items-center gap-3 w-full md:w-[95%] mx-auto overflow-x-auto'>
                        <span onClick={() => { setActiveTab(t => "students") }} className={(ActiveTab == 'students' ? 'text-[var(--dark-blue)] border-[var(--dark-blue)]  border-b-3 ' : 'text-gray-400 ') + 'whitespace-nowrap p-2 cursor-pointer'}>students</span>
                        <span onClick={() => { setActiveTab(t => "instructeurs") }} className={(ActiveTab == 'instructeurs' ? 'text-[var(--dark-blue)] border-[var(--dark-blue)]  border-b-3 ' : 'text-gray-400 ') + 'whitespace-nowrap p-2 cursor-pointer'}>instructeurs</span>

                    </div>
                    {/* Controls Section */}
                    <div className='flex flex-wrap gap-3 items-center  searchItem mt-4 mb-4 justify-between md:justify-end w-full md:w-[95%] h-max mx-auto'>

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
                            defaultValue={10}
                            value={itemsPerPage}
                            className='w-full md:w-32 md:mr-auto'
                            onChange={(value) => setItemsPerPage(Number(value))}
                        />

                        {/* Search Input */}
                        <CustomSearch
                            className='w-full md:w-[15vw] rounded-lg  outline-none p-2.5 bg-white border border-gray-300'
                            value={searchQuery}
                            onChange={(value) => setSearchQuery(value)}
                            placeholder='Zoeken...'
                        />

                        {/* Custom Date Input that opens modal */}
                        {/* Export Button */}
                        <button
                            onClick={handleExportCSV}
                            disabled={isExporting}
                            className='group flex items-center justify-center text-[var(--dark-blue)] bg-white hover:bg-[#024089] disabled:bg-blue-300 hover:text-white px-6 py-2.5 rounded-lg border-1 border-[#024089] w-full md:w-auto transition-colors font-medium'
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
                                <span className={`text-sm md:text-md p-1 flex-1 truncate ${selectedDateRange ? 'text-gray-900' : 'text-gray-500'}`}>
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

                    {/* Finance Table - Full Width */}
                    <FinanTable
                        
                        selectedTab={ActiveTab === 'students' ? 'student' : 'instructor'}
                        selectedDateRange={selectedDateRange}
                        filterTable={currentFilterType}
                        timeFilter={currentTimeFilter}
                        searchQuery={searchQuery}
                        itemsPerPage={itemsPerPage}
                        instructorData={
                            [
                                {
                                    "id": 1,
                                    "instructeur": "Ahmed El Mansouri",
                                    "rijles_datum": "2025-10-15",
                                    "betalingsstatus": "Betaald",
                                    "rijlesstatus": "Voltooid",
                                    "urenregistratie": "2 uur"
                                },
                                {
                                    "id": 2,
                                    "instructeur": "Fatima Bennani",
                                    "rijles_datum": "2025-10-16",
                                    "betalingsstatus": "Onbetaald",
                                    "rijlesstatus": "Gepland",
                                    "urenregistratie": "1.5 uur"
                                },
                                {
                                    "id": 3,
                                    "instructeur": "Youssef Amrani",
                                    "rijles_datum": "2025-10-17",
                                    "betalingsstatus": "Openstaand",
                                    "rijlesstatus": "In behandeling",
                                    "urenregistratie": "2 uur"
                                },
                                {
                                    "id": 4,
                                    "instructeur": "Samira Tahiri",
                                    "rijles_datum": "2025-10-18",
                                    "betalingsstatus": "Verlopen",
                                    "rijlesstatus": "Geannuleerd",
                                    "urenregistratie": "0 uur"
                                },
                                {
                                    "id": 5,
                                    "instructeur": "Mohamed El Idrissi",
                                    "rijles_datum": "2025-10-19",
                                    "betalingsstatus": "Betaald",
                                    "rijlesstatus": "Bevestigd",
                                    "urenregistratie": "1 uur"
                                } , 
                                 {
                                    "id": 1,
                                    "instructeur": "Ahmed El Mansouri",
                                    "rijles_datum": "2025-10-15",
                                    "betalingsstatus": "Betaald",
                                    "rijlesstatus": "Voltooid",
                                    "urenregistratie": "2 uur"
                                },
                                {
                                    "id": 2,
                                    "instructeur": "Fatima Bennani",
                                    "rijles_datum": "2025-10-16",
                                    "betalingsstatus": "Onbetaald",
                                    "rijlesstatus": "Gepland",
                                    "urenregistratie": "1.5 uur"
                                },
                                {
                                    "id": 3,
                                    "instructeur": "Youssef Amrani",
                                    "rijles_datum": "2025-10-17",
                                    "betalingsstatus": "Openstaand",
                                    "rijlesstatus": "In behandeling",
                                    "urenregistratie": "2 uur"
                                },
                                {
                                    "id": 4,
                                    "instructeur": "Samira Tahiri",
                                    "rijles_datum": "2025-10-18",
                                    "betalingsstatus": "Verlopen",
                                    "rijlesstatus": "Geannuleerd",
                                    "urenregistratie": "0 uur"
                                },
                                {
                                    "id": 5,
                                    "instructeur": "Mohamed El Idrissi",
                                    "rijles_datum": "2025-10-19",
                                    "betalingsstatus": "Betaald",
                                    "rijlesstatus": "Bevestigd",
                                    "urenregistratie": "1 uur"
                                }, 
                                 {
                                    "id": 1,
                                    "instructeur": "Ahmed El Mansouri",
                                    "rijles_datum": "2025-10-15",
                                    "betalingsstatus": "Betaald",
                                    "rijlesstatus": "Voltooid",
                                    "urenregistratie": "2 uur"
                                },
                                {
                                    "id": 2,
                                    "instructeur": "Fatima Bennani",
                                    "rijles_datum": "2025-10-16",
                                    "betalingsstatus": "Onbetaald",
                                    "rijlesstatus": "Gepland",
                                    "urenregistratie": "1.5 uur"
                                },
                                {
                                    "id": 3,
                                    "instructeur": "Youssef Amrani",
                                    "rijles_datum": "2025-10-17",
                                    "betalingsstatus": "Openstaand",
                                    "rijlesstatus": "In behandeling",
                                    "urenregistratie": "2 uur"
                                },
                                {
                                    "id": 4,
                                    "instructeur": "Samira Tahiri",
                                    "rijles_datum": "2025-10-18",
                                    "betalingsstatus": "Verlopen",
                                    "rijlesstatus": "Geannuleerd",
                                    "urenregistratie": "0 uur"
                                },
                                {
                                    "id": 5,
                                    "instructeur": "Mohamed El Idrissi",
                                    "rijles_datum": "2025-10-19",
                                    "betalingsstatus": "Betaald",
                                    "rijlesstatus": "Bevestigd",
                                    "urenregistratie": "1 uur"
                                }, 
                                 {
                                    "id": 1,
                                    "instructeur": "Ahmed El Mansouri",
                                    "rijles_datum": "2025-10-15",
                                    "betalingsstatus": "Betaald",
                                    "rijlesstatus": "Voltooid",
                                    "urenregistratie": "2 uur"
                                },
                                {
                                    "id": 2,
                                    "instructeur": "Fatima Bennani",
                                    "rijles_datum": "2025-10-16",
                                    "betalingsstatus": "Onbetaald",
                                    "rijlesstatus": "Gepland",
                                    "urenregistratie": "1.5 uur"
                                },
                                {
                                    "id": 3,
                                    "instructeur": "Youssef Amrani",
                                    "rijles_datum": "2025-10-17",
                                    "betalingsstatus": "Openstaand",
                                    "rijlesstatus": "In behandeling",
                                    "urenregistratie": "2 uur"
                                },
                                {
                                    "id": 4,
                                    "instructeur": "Samira Tahiri",
                                    "rijles_datum": "2025-10-18",
                                    "betalingsstatus": "Verlopen",
                                    "rijlesstatus": "Geannuleerd",
                                    "urenregistratie": "0 uur"
                                },
                                {
                                    "id": 5,
                                    "instructeur": "Mohamed El Idrissi",
                                    "rijles_datum": "2025-10-19",
                                    "betalingsstatus": "Betaald",
                                    "rijlesstatus": "Bevestigd",
                                    "urenregistratie": "1 uur"
                                }, 
                                 {
                                    "id": 1,
                                    "instructeur": "Ahmed El Mansouri",
                                    "rijles_datum": "2025-10-15",
                                    "betalingsstatus": "Betaald",
                                    "rijlesstatus": "Voltooid",
                                    "urenregistratie": "2 uur"
                                },
                                {
                                    "id": 2,
                                    "instructeur": "Fatima Bennani",
                                    "rijles_datum": "2025-10-16",
                                    "betalingsstatus": "Onbetaald",
                                    "rijlesstatus": "Gepland",
                                    "urenregistratie": "1.5 uur"
                                },
                                {
                                    "id": 3,
                                    "instructeur": "Youssef Amrani",
                                    "rijles_datum": "2025-10-17",
                                    "betalingsstatus": "Openstaand",
                                    "rijlesstatus": "In behandeling",
                                    "urenregistratie": "2 uur"
                                },
                                {
                                    "id": 4,
                                    "instructeur": "Samira Tahiri",
                                    "rijles_datum": "2025-10-18",
                                    "betalingsstatus": "Verlopen",
                                    "rijlesstatus": "Geannuleerd",
                                    "urenregistratie": "0 uur"
                                },
                                {
                                    "id": 5,
                                    "instructeur": "Mohamed El Idrissi",
                                    "rijles_datum": "2025-10-19",
                                    "betalingsstatus": "Betaald",
                                    "rijlesstatus": "Bevestigd",
                                    "urenregistratie": "1 uur"
                                }
                            ]

                        }
                        studentData={[{
                            id: 1,
                            student_naam: "John Doe",
                            factuurdatum: "2023-10-01",
                            vervaldatum: "2023-10-15",
                            betalingsstatus: "Betaald",
                            rijlesstatus: "Voltooid",
                            factuur_bedrag: "€150.00"
                        },
                        {
                            id: 2,
                            student_naam: "Jane Smith",
                            factuurdatum: "2023-09-20",
                            vervaldatum: "2023-10-05",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€200.00"

                        },
                        {
                            id: 3,
                            student_naam: "Alice Johnson",
                            factuurdatum: "2023-08-15",
                            vervaldatum: "2023-08-30",
                            betalingsstatus: "Betaald",
                            rijlesstatus: "Voltooid",
                            factuur_bedrag: "€180.00"
                        },
                        {
                            id: 4,
                            student_naam: "Bob Brown",
                            factuurdatum: "2023-07-10",
                            vervaldatum: "2023-07-25",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€220.00"
                        }, 
                        {
                            id: 5,
                            student_naam: "Bob Brown",
                            factuurdatum: "2023-07-10",
                            vervaldatum: "2023-07-25",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€220.00"
                        }, 
                          {
                            id: 5,
                            student_naam: "Bob Brown",
                            factuurdatum: "2023-07-10",
                            vervaldatum: "2023-07-25",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€220.00"
                        }, 
                          {
                            id: 5,
                            student_naam: "Bob Brown",
                            factuurdatum: "2023-07-10",
                            vervaldatum: "2023-07-25",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€220.00"
                        }, 
                          {
                            id: 5,
                            student_naam: "Bob Brown",
                            factuurdatum: "2023-07-10",
                            vervaldatum: "2023-07-25",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€220.00"
                        }, 
                          {
                            id: 5,
                            student_naam: "Bob Brown",
                            factuurdatum: "2023-07-10",
                            vervaldatum: "2023-07-25",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€220.00"
                        }, 
                          {
                            id: 5,
                            student_naam: "Bob Brown",
                            factuurdatum: "2023-07-10",
                            vervaldatum: "2023-07-25",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€220.00"
                        }, 
                          {
                            id: 5,
                            student_naam: "Bob Brown",
                            factuurdatum: "2023-07-10",
                            vervaldatum: "2023-07-25",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€220.00"
                        }, 
                          {
                            id: 5,
                            student_naam: "Bob Brown",
                            factuurdatum: "2023-07-10",
                            vervaldatum: "2023-07-25",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€220.00"
                        }, 
                          {
                            id: 5,
                            student_naam: "Bob Brown",
                            factuurdatum: "2023-07-10",
                            vervaldatum: "2023-07-25",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€220.00"
                        }, 
                          {
                            id: 5,
                            student_naam: "Bob Brown",
                            factuurdatum: "2023-07-10",
                            vervaldatum: "2023-07-25",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€220.00"
                        }, 
                          {
                            id: 5,
                            student_naam: "Bob Brown",
                            factuurdatum: "2023-07-10",
                            vervaldatum: "2023-07-25",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€220.00"
                        }, 
                          {
                            id: 5,
                            student_naam: "Bob Brown",
                            factuurdatum: "2023-07-10",
                            vervaldatum: "2023-07-25",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€220.00"
                        }, 
                          {
                            id: 5,
                            student_naam: "Bob Brown",
                            factuurdatum: "2023-07-10",
                            vervaldatum: "2023-07-25",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€220.00"
                        }, 
                          {
                            id: 5,
                            student_naam: "Bob Brown",
                            factuurdatum: "2023-07-10",
                            vervaldatum: "2023-07-25",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€220.00"
                        }, 
                          {
                            id: 5,
                            student_naam: "Bob Brown",
                            factuurdatum: "2023-07-10",
                            vervaldatum: "2023-07-25",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€220.00"
                        }, 
                          {
                            id: 5,
                            student_naam: "Bob Brown",
                            factuurdatum: "2023-07-10",
                            vervaldatum: "2023-07-25",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€220.00"
                        }, 
                          {
                            id: 5,
                            student_naam: "Bob Brown",
                            factuurdatum: "2023-07-10",
                            vervaldatum: "2023-07-25",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€220.00"
                        }, 
                          {
                            id: 5,
                            student_naam: "Bob Brown",
                            factuurdatum: "2023-07-10",
                            vervaldatum: "2023-07-25",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€220.00"
                        }, 
                          {
                            id: 5,
                            student_naam: "Bob Brown",
                            factuurdatum: "2023-07-10",
                            vervaldatum: "2023-07-25",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€220.00"
                        }, 
                          {
                            id: 5,
                            student_naam: "Bob Brown",
                            factuurdatum: "2023-07-10",
                            vervaldatum: "2023-07-25",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€220.00"
                        }, 
                          {
                            id: 5,
                            student_naam: "Bob Brown",
                            factuurdatum: "2023-07-10",
                            vervaldatum: "2023-07-25",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€220.00"
                        }, 
                          {
                            id: 5,
                            student_naam: "Bob Brown",
                            factuurdatum: "2023-07-10",
                            vervaldatum: "2023-07-25",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€220.00"
                        }, 
                          {
                            id: 5,
                            student_naam: "Bob Brown",
                            factuurdatum: "2023-07-10",
                            vervaldatum: "2023-07-25",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€220.00"
                        }, 
                          {
                            id: 5,
                            student_naam: "Bob Brown",
                            factuurdatum: "2023-07-10",
                            vervaldatum: "2023-07-25",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€220.00"
                        }, 
                          {
                            id: 5,
                            student_naam: "Bob Brown",
                            factuurdatum: "2023-07-10",
                            vervaldatum: "2023-07-25",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€220.00"
                        }, 
                          {
                            id: 5,
                            student_naam: "Bob Brown",
                            factuurdatum: "2023-07-10",
                            vervaldatum: "2023-07-25",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€220.00"
                        }, 
                          {
                            id: 5,
                            student_naam: "Bob Brown",
                            factuurdatum: "2023-07-10",
                            vervaldatum: "2023-07-25",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€220.00"
                        }, 
                          {
                            id: 5,
                            student_naam: "Bob Brown",
                            factuurdatum: "2023-07-10",
                            vervaldatum: "2023-07-25",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€220.00"
                        }, 
                          {
                            id: 5,
                            student_naam: "Bob Brown",
                            factuurdatum: "2023-07-10",
                            vervaldatum: "2023-07-25",
                            betalingsstatus: "Openstaand",
                            rijlesstatus: "In Behandeling",
                            factuur_bedrag: "€220.00"
                        }, 
                        
                        ]}
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
