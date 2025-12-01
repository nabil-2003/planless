"use client"

// ================================
// INSTRUCTORS PAGE COMPONENT
// ================================
// Main page for managing driving instructors
// Features: View, search, filter, export instructors data

// React and Next.js imports
import React, { use, useCallback, useEffect, useRef, useState } from 'react'
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
    
    // ================================
    // STATE MANAGEMENT
    // ================================
    
    // Filter and search states
    const [currentFilterType, setCurrentFilterType] = useState('Alle')
    const [currentTimeFilter, setTimeFilter] = useState('24 uur')
    const [searchQuery, setSearchQuery] = useState('')
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const { fetchAllInstructors, instructors, loading, error } = useInstructor()  
    // UI states
    const [isExporting, setIsExporting] = useState(false)
    useEffect(()=>{
        fetchAllInstructors()
    },[])
    // Modal reference
    const CreateModalRef = useRef<CreateModalRef>(null)



    const handleTimeFilterChange = (filter: string) => {
        setTimeFilter(filter)
    }

    // ================================
    // RENDER
    // ================================
    console.log(instructors)
    return (
        <div className='content'>
            {/* Page Header */}
            <Header title="Instructeurs" />
            
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
                    <div className='flex flex-wrap gap-3 searchItem mt-4 mb-4 justify-end w-[95%] h-max mx-auto'>
                        
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
                            className='w-full sm:w-64 md:w-72 rounded-lg outline-none p-2.5 bg-white border border-gray-300'
                            value={searchQuery}
                            onChange={(value) => setSearchQuery(value)}
                            placeholder='Zoeken...'
                        />

                        
                      

                        {/* Add New Instructor Button */}
                        <Link href="./instructors/new-instructor" className='text-white rounded-lg  bg-dark-blue ml-4'>
                            <div className='flex gap-2 items-center p-2.5'>
                                <PlusIcon color='white' w='15' h='15' className='border-2 text-white rounded border-white' />
                                Instructeur toevoegen
                            </div>
                        </Link>
                          <button
                            disabled={isExporting}
                            className='group flex items-center text-[var(--dark-blue)] bg-white hover:bg-[#024089] disabled:bg-blue-300 hover:text-white px-6 py-2 rounded-lg border-1 border-[#024089] ml-4 transition-colors font-medium'
                        >
                            {isExporting ? (
                                <>
                                    <div className='animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2'></div>
                                    Exporteren...
                                </>
                            ) : (
                                <>
                                    <ExportIcon w='20' h='20'  color='var(--dark-blue)' className='mr-2' />
                                    <span className=' '>Export</span>
                                </>
                            )}
                        </button>
                    </div>
                    
                    {/* Instructors Table */}
                  { loading && <div className='text-center mx-auto  w-[2vw] animate-spin duration-400  h-[2vw] mt-20 text-gray-500 border-2 border-blue-800 border-l-0 rounded-full '></div> || 
                    <InstructorTable  
                        data={instructors  }
                        className=""
                        filterTable={currentFilterType}
                        searchQuery={searchQuery}
                        timeFilter={currentTimeFilter}
                        itemsPerPage={itemsPerPage}
                        
                    />}
                </div>
            </div>
            
            {/* Create Modal */}
            <CreateModal ref={CreateModalRef} name='modal' />
        </div>
    )
}
