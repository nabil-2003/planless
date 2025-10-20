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
    // Optional / additional fields used elsewhere
    medisch_certificaat?: string
    vervaldatum_medisch?: string
    registratie_nummer?: string
    examen_contract?: string
   
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

            {/* Table Container with Sticky NR and Actions Columns */}
            <div className={`${className} mb-4  p-1 ml-4 mr-3 scale-[0.98]`}  style={{ position: 'relative' }}>
                <div style={{ display: 'flex', width: '100%', maxWidth: '100vw' }}>
                    {/* Sticky NR Column - Left */}
                    <div style={{ position: 'sticky', left: 0, zIndex: 2, background: 'white' }}>
                        {/* NR Header */}
                        <div className=' border-b-1 border-gray-200' style={{ height: '56px' }}>
                            <div className='w-[4vw] bg-blue-100/10  px-4 flex justify-center items-center h-full text-md  border-r-1 border-gray-200'>Nr</div>
                        </div>
                        {/* NR Body */}
                        <div>
                            {currentData.length > 0 ? (
                                currentData.map((instructor, index) => (
                                    <div 
                                        key={`nr-${startIndex + index}`} 
                                        className='bg-white border-b-1 border-gray-200'
                                        style={{ height: '52px' }}
                                    >
                                        <div className='w-[4vw] bg-blue-100/10 px-4 flex justify-center items-center h-full text-md text-gray-700 border-r-1 border-gray-200'>
                                            {startIndex + index + 1}
                                        </div>
                                    </div>
                                ))
                            ) : null}
                        </div>
                    </div>

                    {/* Scrollable Content - Middle */}
                    <div id='instructors-table-container' className='flex-1 overflow-x-auto hide-native-scroll'>
                        {/* Scrollable Header */}
                        <div className='flex w-max bg-transparent border-b-1 gap-2 border-gray-200 pr-3 ml-2.5' style={{ height: '56px' }}>
                            <div className='w-[8vw] py-4 flex items-center text-md '>Instructeur</div>
                            <div className='w-[8vw] py-4 flex items-center text-md '>BSN Nummer</div>
                            <div className='w-[12vw] flex items-center py-4 text-md '>Email</div>
                            <div className='w-[8vw] py-4 flex items-center text-md '>Geboortedatum</div>
                            <div className='w-[8vw] py-4 flex items-center justify-center text-md '>Adres</div>
                            <div className='w-[9vw] py-4 flex items-center text-md '>Telefoonnummer</div>
                            <div className='w-[8vw] py-4 flex items-center text-md '>Rijbewijs</div>
                            <div className='w-[10vw] py-4 flex items-center text-md '>Vervaldatum Rijbewijs</div>
                            <div className='w-[10vw] py-4 flex items-center text-md '>Instructeurskaart</div>
                            <div className='w-[10vw] py-4 flex items-center text-md '>KVK Uittreksel</div>
                            <div className='w-[10vw] py-4 flex items-center text-md '>Arbeidsovereenkomst</div>
                            <div className='w-[9vw] py-4 flex items-center text-md '>Contractvervaldatum</div>
                            <div className='w-[12vw] py-4 flex items-center text-md '>Urenregistratie</div>
                        </div>
                        {/* Scrollable Body */}
                        <div className='w-max'>
                            {currentData.length > 0 ? (
                                currentData.map((instructor, index) => (
                                    <InstructorElementScrollable 
                                        key={startIndex + index} 
                                        ele={instructor} 
                                    />
                                ))
                            ) : (
                                <div className='w-full py-8 text-center text-gray-500'>
                                    Geen instructeurs gevonden
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sticky Actions Column - Right */}
                    <div style={{ position: 'sticky', right: 0, zIndex: 2, background: 'white', flexShrink: 0 }}>
                        {/* Actions Header */}
                        <div className='bg-transparent border-b-1 border-gray-200' style={{ height: '56px' }}>
                            <div className='w-[80px] px-3 flex justify-center items-center h-full text-md  border-l-1 bg-blue-100/10  border-gray-200'>acties</div>
                        </div>
                        {/* Actions Body */}
                        <div>
                            {currentData.length > 0 ? (
                                currentData.map((instructor, index) => (
                                    <InstructorElementActions 
                                        key={`actions-${startIndex + index}`} 
                                        ele={instructor} 
                                    />
                                ))
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>

            {/* Pagination Controls */}
           <div className='w-[90%] mx-auto bg-white rounded-lg p-4 border border-gray-200'>
             <div className='flex  justify-between items-center mb-4 px-4'>
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
// Scrollable table row component (without NR and Actions)
const InstructorElementScrollable = ({ ele }: { ele: Data_Instructor }) => {
    return (
        <div className='flex relative w-max border-b-1 gap-2 bg-white hover:bg-blue-100/10 border-gray-200 ml-2.5' style={{ height: '52px' }}>
            <div className='w-[8vw] flex items-center text-md text-gray-700'>{ele.instructor}</div>
            <div className='w-[8vw] flex items-center text-md text-gray-700'>{ele.bsn_nummer}</div>
            <div className='w-[12vw] flex items-center text-md text-gray-700'>{ele.email}</div>
            <div className='w-[8vw] flex items-center text-md text-gray-700'>{ele.geboortedatum}</div>
            <div className='w-[8vw] flex items-center justify-center' title={ele.adres}>
                <Link href={""} className="hover:scale-110 transition-transform">
                    <LocationIcon w={24} h={24} color="blue" />
                </Link>
            </div>
            <div className='w-[9vw] flex items-center text-md text-gray-700'>{ele.telefoonnummer}</div>
            <div className='w-[8vw] flex items-center text-md text-gray-700'>
                <Link href={"#"} className='text-blue-600 underline'>
                    <img src="/pdf_icon.png" width={16} height={16} alt="" className='inline mr-2' />
                </Link>
                {ele.rijbewijs}
            </div>
            <div className='w-[10vw] flex items-center text-md text-gray-700'>{ele.vervaldatum_rijbewijs}</div>
            <div className='w-[10vw] flex items-center text-md text-gray-700'>
                <Link href={"#"} className='text-blue-600 underline'>
                    <img src="/pdf_icon.png" width={16} height={16} alt="" className='inline mr-2' />
                </Link>
                {ele.instructeurskaart}
            </div>
            <div className='w-[10vw] flex items-center text-md text-gray-700'>
                <Link href={"#"} className='text-blue-600 underline'>
                    <img src="/pdf_icon.png" width={16} height={16} alt="" className='inline mr-2' />
                </Link>
                {ele.kvk_uittreksel}
            </div>
            <div className='w-[10vw] flex items-center text-md text-gray-700'>
                <Link href={"#"} className='text-blue-600 underline'>
                    <img src="/pdf_icon.png" width={16} height={16} alt="" className='inline mr-2' />
                </Link>
                {ele.arbeidsovereenkomst}
            </div>
            <div className='w-[9vw] flex items-center text-md text-gray-700'>{ele.contractvervaldatum}</div>
            <div className='w-[12vw] flex items-center text-md text-gray-700'>{ele.urenregistratie}</div>
        </div>
    )
}

// Actions column component for sticky right position
const InstructorElementActions = ({ ele }: { ele: Data_Instructor }) => {
    const modalRef = useRef<ActionModalRef>(null);

    return (
        <div 
            className=' border-b-1 border-gray-200 bg-blue-100/10 '
            style={{ height: '52px' }}
        >
            <div className='   w-[80px] px-3 flex justify-center items-center h-full border-l-1 border-gray-200'>
                <button 
                    className='outline-none cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors' 
                    onClick={() => { modalRef.current?.Open() }}
                >
                    <MenuIcon s='gray' w='20px' h='20px' f='gray' />
                </button>
                <ActionModal className='right-[-.3vw]'  tableName='instructors' CurrentStatus={''} ref={modalRef} />
            </div>
        </div>
    )
}
