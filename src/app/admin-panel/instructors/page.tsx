"use client"

// ================================
// INSTRUCTORS PAGE COMPONENT
// ================================
// Main page for managing driving instructors
// Features: View, search, filter, export instructors data

// React and Next.js imports
import React, { useCallback, useRef, useState } from 'react'
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
 * Instructors Page Component
 * Manages the instructors section of the admin dashboard
 */
export default function InstructorsPage() {
    
    // ================================
    // STATE MANAGEMENT
    // ================================
    
    // Filter and search states
    const [currentFilterType, setCurrentFilterType] = useState('Alle')
    const [currentTimeFilter, setTimeFilter] = useState('24 uur')
    const [searchQuery, setSearchQuery] = useState('')
    const [itemsPerPage, setItemsPerPage] = useState(10)
    
    // UI states
    const [isExporting, setIsExporting] = useState(false)
    
    // Modal reference
    const CreateModalRef = useRef<CreateModalRef>(null)

    // ================================
    // DATA PROCESSING
    // ================================
    
    /**
     * Parse and transform instructors data from JSON
     * Ensures type safety and data consistency
     */
    const parsedInstructors = useCallback(() => {
        const instructors: Data_Instructor[] = (instructorsData as any[]).map(item => ({
            instructor: item.instructor,
            bsn_nummer: item.bsn_nummer,
            email: item.email,
            geboortedatum: item.geboortedatum,
            adres: item.adres,
            telefoonnummer: item.telefoonnummer,
            rijbewijs: item.rijbewijs,
            vervaldatum_rijbewijs: item.vervaldatum_rijbewijs,
            medisch_certificaat: item.medisch_certificaat,
            vervaldatum_medisch: item.vervaldatum_medisch,
            registratie_nummer: item.registratie_nummer,
            examen_contract: item.examen_contract,
            opmerkingen: item.opmerkingen,
        }))
        return instructors
    }, [])

    // ================================
    // EVENT HANDLERS
    // ================================
    
    /**
     * Opens the create new instructor modal
     */
    const openCreateModal = () => {
        CreateModalRef.current?.open()
    }

    /**
     * Handles CSV export functionality
     * Creates and downloads a CSV file with all instructor data
     */
    const handleExportCSV = async () => {
        setIsExporting(true)
        
        try {
            const instructors = parsedInstructors()
            
            // Define CSV headers
            const headers = [
                'Instructeur',
                'BSN Nummer',
                'Email',
                'Geboortedatum',
                'Adres',
                'Telefoonnummer',
                'Rijbewijs',
                'Vervaldatum Rijbewijs',
                'Medisch Certificaat',
                'Vervaldatum Medisch',
                'Registratie Nummer',
                'Examen Contract',
                'Opmerkingen'
            ]

            // Create CSV content with proper escaping
            const csvContent = [
                headers.join(','),
                ...instructors.map(instructor => [
                    `"${instructor.instructor}"`,
                    `"${instructor.bsn_nummer}"`,
                    `"${instructor.email}"`,
                    `"${instructor.geboortedatum}"`,
                    `"${instructor.adres}"`,
                    `"${instructor.telefoonnummer}"`,
                    `"${instructor.rijbewijs}"`,
                    `"${instructor.vervaldatum_rijbewijs}"`,
                    `"${instructor.medisch_certificaat}"`,
                    `"${instructor.vervaldatum_medisch}"`,
                    `"${instructor.registratie_nummer}"`,
                    `"${instructor.examen_contract}"`,
                    `"${instructor.opmerkingen}"`
                ].join(','))
            ].join('\n')

            // Create and trigger download
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
            const link = document.createElement('a')
            const url = URL.createObjectURL(blob)
            
            link.setAttribute('href', url)
            link.setAttribute('download', `instructeurs_${new Date().toISOString().split('T')[0]}.csv`)
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
            <Header title="Instructeurs" />
            
            <div className='w-full flex overflow-hidden'>
                {/* Left Sidebar */}
                <LeftSide className='w-[20%] border-l-0 rounded-t-none mt-4 items-center bg-white rounded-r-xl border-2 border-gray-200 h-auto' />
                
                {/* Main Content Area */}
                <div className='dashboard-container w-[80%]'>
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

                        
                        <button
                            onClick={handleExportCSV}
                            disabled={isExporting}
                            className='flex items-center bg-white hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-2 rounded-xl border-1 border-blue-600 ml-4 transition-colors font-medium'
                        >
                            {isExporting ? (
                                <>
                                    <div className='animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2'></div>
                                    Exporteren...
                                </>
                            ) : (
                                <>
                                    <ExportIcon w='20' h='20' color='var(--dark-blue)' className='mr-2' />
                                    <span className='text-[var(--dark-blue)]'>Export</span>
                                </>
                            )}
                        </button>

                        {/* Add New Instructor Button */}
                        <Link href="./instructors/new-instructor" className='text-white rounded-lg p-2 bg-dark-blue ml-4'>
                            <div className='flex gap-2 items-center'>
                                <PlusIcon color='white' w='15' h='15' className='border-2 text-white rounded border-white' />
                                Instructeur toevoegen
                            </div>
                        </Link>
                    </div>
                    
                    {/* Instructors Table */}
                    <InstructorTable  
                        data={[...parsedInstructors()]}
                        className=""
                        filterTable={currentFilterType}
                        searchQuery={searchQuery}
                        timeFilter={currentTimeFilter}
                        itemsPerPage={itemsPerPage}
                    />
                </div>
            </div>
            
            {/* Create Modal */}
            <CreateModal ref={CreateModalRef} name='modal' />
        </div>
    )
}
