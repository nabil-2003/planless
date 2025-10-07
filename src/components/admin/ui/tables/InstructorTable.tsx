'use client'

// ================================
// INSTRUCTOR TABLE COMPONENT
// ================================
// Displays instructor data in a table format with pagination, search, and filtering
// Features: Pagination, search filtering, time-based filtering, responsive design

// React imports
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'

// Component imports
import MenuIcon from '@/components/svgs/MenuIcon'
import LocationIcon from '@/components/svgs/Location'
import CustomScrollBar from '../ScrollBar'
import ActionModal from '@/components/ui/Action'
import { ActionModalRef } from '@/components/ui/Action'

// ================================
// TYPE DEFINITIONS
// ================================

/**
 * Interface defining the structure of instructor data
 */
export type Data_Instructor = {
    instructor: string              // Instructor name
    bsn_nummer: string             // BSN (Social Security) number
    email: string                  // Email address
    geboortedatum: string          // Date of birth
    adres: string                  // Address
    telefoonnummer: string         // Phone number
    rijbewijs: string              // Driving license type
    vervaldatum_rijbewijs: string  // License expiration date
    instructeurskaart: string      // Instructor card
    kvk_uittreksel: string         // KVK extract
    arbeidsovereenkomst: string    // Employment contract
    contractvervaldatum: string    // Contract expiration date
    urenregistratie: string        // Hours registration
}

/**
 * Props interface for InstructorTable component
 */
interface InstructorTableProps {
    data: Array<Data_Instructor>
    className: string
    filterTable: string
    searchQuery?: string
    selectedDateRange?: { firstDateMs: number; lastDateMs: number } | null
    timeFilter?: string
    itemsPerPage?: number
}

// ================================
// MAIN COMPONENT
// ================================

/**
 * InstructorTable Component
 * Renders a paginated table of instructors with search and filter capabilities
 */
export default function InstructorTable({
    data, 
    filterTable, 
    searchQuery = '', 
    selectedDateRange, 
    timeFilter = '24 uur',
    itemsPerPage = 10, 
    className = ''
}: InstructorTableProps) {
    
    // ================================
    // STATE MANAGEMENT
    // ================================
    
    const [currentPage, setCurrentPage] = React.useState(1)
    const [scrollBarWidth, setScrollBarWidth] = React.useState(800)
    const containerRef = useRef<HTMLDivElement>(null)
    
    // ================================
    // DATA FILTERING AND PROCESSING
    // ================================
    
    /**
     * Filter data based on search query, time filter, and other criteria
     * Uses memoization for performance optimization
     */
    const filteredData = useMemo(() => {
        let filtered = data
        
        // Apply search filter - searches across name, email, and BSN number
        if (searchQuery) {
            filtered = filtered.filter(instructor => 
                instructor.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                instructor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                instructor.bsn_nummer.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }
        
        return filtered
    }, [data, searchQuery])

    // ================================
    // PAGINATION CALCULATIONS
    // ================================
    
    const totalPages = Math.ceil(filteredData.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentData = filteredData.slice(startIndex, endIndex)

    // ================================
    // EVENT HANDLERS
    // ================================
    
    /**
     * Navigate to next page
     */
    const goToNextPage = useCallback(() => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1)
        }
    }, [currentPage, totalPages])

    /**
     * Navigate to previous page
     */
    const goToPrevPage = useCallback(() => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1)
        }
    }, [currentPage])

    // ================================
    // EFFECTS
    // ================================
    
    /**
     * Reset to first page when filters change
     */
    useEffect(() => {
        setCurrentPage(1)
    }, [filterTable, searchQuery, selectedDateRange, timeFilter, itemsPerPage])

    /**
     * Calculate and update scrollbar width based on container size
     */
    useEffect(() => {
        const updateScrollBarWidth = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth
                setScrollBarWidth(containerWidth * 0.9) // 90% of container width
            }
        }
        
        updateScrollBarWidth()
        window.addEventListener('resize', updateScrollBarWidth)
        
        return () => window.removeEventListener('resize', updateScrollBarWidth)
    }, [])

    // ================================
    // RENDER
    // ================================

    return (
        <>
            {/* Hide native scrollbar styles */}
            <style jsx global>{`
                .hide-native-scroll::-webkit-scrollbar {
                    display: none;
                }
                .hide-native-scroll {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            {/* Table Container with Horizontal Scroll */}
            <div ref={containerRef} id='instructors-table-container' className={`${className} mb-4 overflow-x-auto overflow-y-hidden hide-native-scroll`}>
                
                {/* Table Header */}
                <div className='flex w-max relative bg-[#F9FAFB] border-b-1 gap-8 border-gray-200 pr-3'>
                    <div className='w-[4vw] px-4 border-x-1 border-gray-200 flex justify-center items-center py-4 table-header text-[#475467]'>Nr</div>
                    <div className='w-[8vw] py-4 flex items-center table-header text-[#475467]'>Instructeur</div>
                    <div className='w-[8vw] py-4 flex items-center table-header text-[#475467]'>BSN Nummer</div>
                    <div className='w-[12vw] flex items-center table-header py-4 text-[#475467]'>Email</div>
                    <div className='w-[8vw] py-4 flex items-center table-header text-[#475467]'>Geboortedatum</div>
                    <div className='w-[8vw] py-4 flex items-center table-header justify-center text-[#475467]'>Adres</div>
                    <div className='w-[9vw] py-4 flex items-center table-header text-[#475467]'>Telefoonnummer</div>
                    <div className='w-[8vw] py-4 flex items-center table-header text-[#475467]'>Rijbewijs</div>
                    <div className='w-[10vw] py-4 flex items-center table-header text-[#475467]'>Vervaldatum Rijbewijs</div>
                    <div className='w-[10vw] py-4 flex items-center table-header text-[#475467]'>Instructeurskaart</div>
                    <div className='w-[10vw] py-4 flex items-center table-header text-[#475467]'>KVK Uittreksel</div>
                    <div className='w-[10vw] py-4 flex items-center table-header text-[#475467]'>Arbeidsovereenkomst</div>
                    <div className='w-[9vw] py-4 flex items-center table-header text-[#475467]'>Contractvervaldatum</div>
                    <div className='w-[12vw] py-4 flex items-center table-header text-[#475467]'>Urenregistratie</div>
                    <div className='w-[6vw] px-3 flex py-4 items-center justify-center table-header text-[#475467]'>Actions</div>
                </div>

                {/* Table Body */}
                <div className='w-max'>
                    {currentData.length > 0 ? (
                        currentData.map((instructor, index) => (
                            <TableElement 
                                key={startIndex + index} 
                                ele={instructor} 
                                id={startIndex + index + 1} 
                            />
                        ))
                    ) : (
                        <div className='w-full py-8 text-center table-cell-text text-gray-500'>
                            Geen instructeurs gevonden
                        </div>
                    )}
                </div>
            </div>

            {/* Pagination Controls */}
            <div className='flex justify-between items-center mb-4 px-4'>
                <button 
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className={`btn-text border-2 rounded border-[#EAECF0] px-3 py-2 font-semibold ${
                        currentPage === 1 
                            ? 'text-gray-400 cursor-not-allowed' 
                            : 'text-gray-700 cursor-pointer hover:bg-blue-950/10'
                    }`}
                >
                    Vorige
                </button>
                
                <span className='btn-text text-gray-600'>
                    Pagina {currentPage} van {totalPages}
                </span>
                
                <button 
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className={`btn-text border-2 rounded border-[#EAECF0] px-3 py-2 font-semibold ${
                        currentPage === totalPages || totalPages === 0
                            ? 'text-gray-400 cursor-not-allowed' 
                            : 'text-gray-700 cursor-pointer hover:bg-blue-950/10'
                    }`}
                >
                    Volgende
                </button>
            </div>
            
            {/* Custom Scroll Bar */}
            <CustomScrollBar 
                targetId="instructors-table-container" 
                height={scrollBarWidth} 
                thumbHeight={120}
                orientation='horizontal' 
            />
        
            {/* Results Counter */}
            <div className='w-[95%] mx-auto mb-4 text-center'>
                <span className='btn-text text-gray-600'>
                    Weergaven {startIndex + 1}-{Math.min(endIndex, filteredData.length)} van {filteredData.length}
                </span>
            </div>
        </>
    )
}

// ================================
// TABLE ROW COMPONENT
// ================================

/**
 * Individual table row component for displaying instructor data
 * @param ele - Instructor data object
 * @param id - Row number for display
 */
const TableElement = ({ ele, id }: { ele: Data_Instructor, id: number }) => {
    const modalRef = useRef<ActionModalRef>(null)
    

    return (
        <ul className='flex w-max relative bg-white border-b-1 gap-8 border-gray-200 pr-3 hover:bg-gray-50 transition-colors'>
            {/* Row Number */}
            <li className='w-[4vw] px-4 border-x-1 border-gray-200 flex justify-center items-center py-3 table-cell-text font-medium text-gray-900'>{id}</li>
            
            {/* Instructor Name */}
            <li className='w-[8vw] py-3 flex items-center table-cell-text capitalize text-gray-900'>{ele.instructor}</li>
            
            {/* BSN Number */}
            <li className='w-[8vw] py-3 flex items-center table-cell-text text-gray-900'>{ele.bsn_nummer}</li>
            
            {/* Email */}
            <li className='w-[12vw] flex items-center py-3 table-cell-text text-gray-900'>{ele.email}</li>
            
            {/* Birth Date */}
            <li className='w-[8vw] py-3 flex items-center table-cell-text text-gray-900'>{ele.geboortedatum}</li>
            
            {/* Address - Shows as location icon with tooltip */}
            <li className='w-[8vw] py-3 flex items-center justify-center' title={ele.adres}>
                <Link href={""} className="hover:scale-110 transition-transform">
                    <LocationIcon w={24} h={24} color="blue" />
                </Link>
            </li>
            
            {/* Phone Number */}
            <li className='w-[9vw] py-3 flex items-center table-cell-text text-gray-900'>{ele.telefoonnummer}</li>
            
            {/* License Type */}
            <li className='w-[8vw] py-3 flex items-center table-cell-text text-gray-900'>
                <Link href={"#"}  className='text-blue-600 underline' >
         <img src="/pdf_icon.png" width={16} height={16} alt="" className='inline mr-2' />
        </Link>
                {ele.rijbewijs}</li>
            
            {/* License Expiration */}
            <li className='w-[10vw] py-3 flex items-center table-cell-text text-gray-900'>{ele.vervaldatum_rijbewijs}</li>
            
            {/* Instructor Card */}
            <li className='w-[10vw] py-3 flex items-center table-cell-text text-gray-900'>
                
                <Link href={"#"}  className='text-blue-600 underline' >
         <img src="/pdf_icon.png" width={16} height={16} alt="" className='inline mr-2' />
        </Link>
                
                {ele.instructeurskaart}</li>
            
            {/* KVK Extract */}
            <li className='w-[10vw] py-3 flex items-center table-cell-text text-gray-900'>
                
                <Link href={"#"}  className='text-blue-600 underline' >
         <img src="/pdf_icon.png" width={16} height={16} alt="" className='inline mr-2' />
        </Link>
                {ele.kvk_uittreksel}</li>
            
            {/* Employment Contract */}
            <li className='w-[10vw] py-3 flex items-center table-cell-text text-gray-900'>
                <Link href={"#"}  className='text-blue-600 underline' >
         <img src="/pdf_icon.png" width={16} height={16} alt="" className='inline mr-2' />
        </Link>
                
                
                {ele.arbeidsovereenkomst}</li>
            
            {/* Contract Expiration */}
            <li className='w-[9vw] py-3 flex items-center table-cell-text text-gray-900'>{ele.contractvervaldatum}</li>
            
            {/* Hours Registration */}
            <li className='w-[12vw] py-3 flex items-center table-cell-text text-gray-900'>{ele.urenregistratie}</li>
            
            {/* Actions Menu */}
            <li className='w-[6vw] px-3 flex py-3 items-center justify-center'>
                <button 
                    className='outline-none cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors' 
                    onClick={() => { modalRef.current?.Open() }}
                >
                    <MenuIcon s='gray' w='20px' h='20px' f='gray' />
                </button>
            </li>

            {/* Action Modal */}
            <ActionModal className='right-5' CurrentStatus={''} ref={modalRef} />
        </ul>
    )
}