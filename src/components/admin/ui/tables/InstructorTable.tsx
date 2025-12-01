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
import { DocumentModal, DocumentModalRef } from '@/components/ui'
import CustmButton from '../CustmButton'
import { IdentityModal, IdentityModalRef } from '@/components/ui'
import axios from 'axios'

const buildTelHref = (value: string) => `tel:${value.replace(/[^+\d]/g, '')}`

// ================================
// TYPE DEFINITIONS
// ================================

/**
 * Interface defining the structure of instructor data
 */
export type Data_Instructor = {
    id : number 
    instructor: string              // Instructor name
    bsn_nummer: string             // BSN (Social Security) number
    email: string    
    driving_license_issue_date ?: string  
    instructor_card_expiration_date ?: string            // Driving license issue date
    Date_birth: string          // Date of birth
    address: string                  // Address
    phone_number : string         // Phone number
    driving_license: string              // Driving license type
    contract_start_date?: string 
    salary?: string
    license_expiration_date: string  // License expiration date
    instructor_card: string      // Instructor card
    kvk_extract: string         // KVK extract
    employment_contract: string    // Employment contract
    contract_expiration_date: string    // Contract expiration date
    hours_registration: string        // Hours registration
    // Optional / additional fields used elsewhere
    medical_certificate?: string
    medical_expiration_date?: string
    registration_number?: string
    exam_contract?: string
   
}

/**
 * Props interface for InstructorTable component
 */
interface InstructorTableProps {
    data: any
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
        let filtered = parseInsructor(data)
        
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
                            <div className='w-[4vw] bg-gray-50  px-4 flex justify-center items-center h-full text-md  border-r-1 border-gray-200'>Nr</div>
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
                                        <div className='w-[4vw] bg-gray-50 px-4 flex justify-center items-center h-full text-md text-gray-700 border-r-1 border-gray-200'>
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
                        <div className='flex w-max pl-2 bg-transparent border-b-1 border-gray-200' style={{ height: '56px' }}>
                            <div className='w-[8vw] py-4 flex items-center text-md whitespace-nowrap truncate'>Instructeur</div>
                            <div className='w-[8vw] py-4 flex items-center text-md whitespace-nowrap truncate'>BSN Nummer</div>
                            <div className='w-[15vw]  flex items-center py-4 text-md whitespace-nowrap truncate'>Email</div>
                            <div className='w-[8vw]  py-4 flex items-center text-md whitespace-nowrap truncate'>Geboortedatum</div>
                            <div className='w-[8vw]  py-4 flex items-center justify-center text-md whitespace-nowrap truncate'>Adres</div>
                            <div className='w-[9vw]  py-4 flex items-center text-md whitespace-nowrap truncate'>Telefoonnummer</div>
                            <div className='w-[8vw]  py-4 flex items-center text-md whitespace-nowrap truncate'>Rijbewijs</div>
                            <div className='w-[10vw] py-4 flex items-center text-md whitespace-nowrap truncate'>Vervaldatum Rijbewijs</div>
                            <div className='w-[10vw] py-4 flex items-center text-md whitespace-nowrap truncate'>Instructeurskaart</div>
                            <div className='w-[10vw]  py-4 flex items-center text-md whitespace-nowrap truncate'>KVK Uittreksel</div>
                            <div className='w-[10vw]  py-4 flex items-center text-md whitespace-nowrap truncate'>Arbeidsovereenkomst</div>
                            <div className='w-[11vw]  py-4 flex items-center text-md whitespace-nowrap truncate'>Contractvervaldatum</div>
                            <div className='w-[7vw]  py-4 flex items-center text-md whitespace-nowrap truncate'>Urenregistratie</div>
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
                                <div className='w-[70vw] py-8  flex justify-center items-center   text-center text-gray-500'>
                                    Geen instructeurs gevonden
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sticky Actions Column - Right */}
                    <div style={{ position: 'sticky', right: 0, zIndex: 2, background: 'white', flexShrink: 0 }}>
                        {/* Actions Header */}
                        <div className='bg-transparent border-b-1 border-gray-200' style={{ height: '56px' }}>
                            <div className='w-[80px] px-3 flex justify-center items-center h-full text-md  border-l-1 bg-gray-50  border-gray-200'>Acties</div>
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
    const identityModal  = useRef<IdentityModalRef>(null)
    const licenseModal = useRef<DocumentModalRef>(null)
    const instructorCardModal = useRef<DocumentModalRef>(null)
    const kvkModal = useRef<DocumentModalRef>(null)
    const contractModal = useRef<DocumentModalRef>(null)
    

    return (
    <div className='flex relative pl-2 w-max border-b-1 bg-white hover:bg-blue-100/10 border-gray-200' style={{ height: '52px' }}>
            <div className='w-[8vw]  flex items-center text-md text-gray-700'>{ele.instructor}</div>
            <div className='w-[8vw]  flex items-center text-md text-gray-700'>{ele.bsn_nummer}</div>
            <div className='w-[15vw]  flex items-center text-md text-gray-700'>
                <Link href={`mailto:${ele.email}`}>
                {ele.email}
                </Link>
            </div>
            <div className='w-[8vw]  flex items-center text-md text-gray-700'>{ele.Date_birth}</div>
            <div className='w-[8vw]   flex items-center justify-center'>
                    <span onClick={()=>{identityModal.current?.open()}} 
                    className=' hover:scale-110  cursor-pointer transition-all duration-300'>
              <LocationIcon  w={20} h={20} color="blue" /></span>
              <IdentityModal ref={identityModal} description={ele.address} title='Adres bekijken'/>
            </div>
              
            <Link
                href={buildTelHref(ele.phone_number)}
                className='w-[9vw] flex items-center text-md text-gray-700 truncate transition-colors hover:text-blue-800 cursor-pointer'
                title={ele.phone_number}
            >
                {ele.phone_number}
            </Link>
            <div className='w-[8vw] flex items-center text-md text-gray-700'>
                <button
                    type='button'
                    onClick={() => licenseModal.current?.open()}
                    className='flex  cursor-pointer items-center gap-2  transition-colors hover:text-blue-800'
                >
                    <img src='/pdf_icon.png' width={16} height={16} alt='' />
                    <span className='truncate'>{ele.driving_license}</span>
                </button>
                <DocumentModal
                    ref={licenseModal}
                    title='Rijbewijs'
                    documentName={ele.driving_license}
                    description='Download of bekijk de scan van het rijbewijs.'
                />
            </div>
            <div className='w-[10vw]  flex items-center text-md text-gray-700'>{ele.license_expiration_date}</div>
            <div className='w-[10vw]  flex items-center text-md text-gray-700'>
                <button
                    type='button'
                    onClick={() => instructorCardModal.current?.open()}
                    className='flex items-center cursor-pointer   gap-2 transition-colors hover:text-blue-800'
                >
                    <img src='/pdf_icon.png' width={16} height={16} alt='' />
                    <span className='truncate'>{ele.instructor_card}</span>
                </button>
                <DocumentModal
                    ref={instructorCardModal}
                    title='Instructeurskaart'
                    documentName={ele.instructor_card}
                    description='Instructeurskaart van de instructeur.'
                />
            </div>
            <div className='w-[10vw]  flex items-center text-md text-gray-700'>
                <button
                    type='button'
                    onClick={() => kvkModal.current?.open()}
                    className='flex items-center  cursor-pointer gap-2 transition-colors hover:text-blue-800'
                >
                    <img src='/pdf_icon.png' width={16} height={16} alt='' />
                    <span className='truncate'>{ele.kvk_extract}</span>
                </button>
                <DocumentModal
                    ref={kvkModal}
                    title='KVK Uittreksel'
                    documentName={ele.kvk_extract}
                    description='Kamer van Koophandel uittreksel.'
                />
            </div>
            <div className='w-[10vw] min-w-[180px]  flex items-center text-md text-gray-700'>
                <button
                    type='button'
                    onClick={() => contractModal.current?.open()}
                    className='flex  cursor-pointer items-center gap-2 transition-colors hover:text-blue-800'
                >
                    <img src='/pdf_icon.png' width={16} height={16} alt='' />
                    <span className='truncate'>{ele.employment_contract}</span>
                </button>
                <DocumentModal
                    ref={contractModal}
                    title='Arbeidsovereenkomst'
                    documentName={ele.employment_contract}
                    description='Arbeidsovereenkomst voor deze instructeur.'
                />
            </div>
            <div className='w-[11vw]  flex items-center text-md text-gray-700'>{ele.contract_expiration_date}</div>
            <div className='w-[7vw]  flex items-center text-md text-gray-700'>{ele.hours_registration}</div>
        </div>
    )
}

// Actions column component for sticky right position
const InstructorElementActions = ({ ele }: { ele: Data_Instructor }) => {
    const modalRef = useRef<ActionModalRef>(null);

    return (
        <div 
            className=' border-b-1 border-gray-200 bg-gray-50 '
            style={{ height: '52px' }}
        >
            <div className='   w-[80px] px-3 flex justify-center items-center h-full border-l-1 border-gray-200'>
                <button 
                    className='outline-none cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors' 
                    onClick={() => { modalRef.current?.Open() }}
                >
                    <MenuIcon s='gray' w='20px' h='20px' f='gray' />
                </button>
                <ActionModal id={ele.id.toString() } className='right-[-.3vw]'  tableName='instructors' CurrentStatus={''} ref={modalRef} />
            </div>
        </div>
    )
}
  export const parseInsructor = (data : any )=>{
               let  instructors : Data_Instructor[] = []
           data?.forEach((instructor:any)=>{
              let  instructor_item : Data_Instructor = {} as Data_Instructor
                  instructor_item.email =   instructor?.email
                  instructor_item.Date_birth =   instructor?.birthdate
                  instructor_item.address = instructor?.city +" ," + instructor?.street +" ," +
                   instructor?.zipCode +" ,"+ instructor?.houseNumber
                  instructor_item.instructor = instructor?.name
                  instructor_item.phone_number = instructor?.phone
                  instructor_item.id = instructor?.id
                  instructor_item.bsn_nummer = "-"
                  instructor_item.contract_expiration_date ="_"
                   instructor_item.driving_license ="_"
                   instructor_item.medical_certificate ="_"
                   instructor_item.medical_expiration_date = "_"
                   instructor_item.employment_contract = "_"
                   instructor_item.kvk_extract = "_"
                   instructor_item.instructor_card ="_"
                   instructor_item.hours_registration = "0"
                   instructor_item.license_expiration_date = "none"
                   instructor_item.driving_license_issue_date = "_"
                     instructor_item.contract_start_date = "_"
                     instructor_item.salary = "_"
                     
                 instructors.push(instructor_item)
            

           })
        return instructors
    }