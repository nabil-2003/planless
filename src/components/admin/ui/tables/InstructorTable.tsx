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

import axios from 'axios'
import useInstructor from '@/app/hooks/useInstructor'

const buildTelHref = (value: string) => `tel:${value?.replace(/[^+\d]/g, '')}`

// ================================
// TYPE DEFINITIONS
// ================================

/**
 * Interface defining the structure of instructor data
 */
export type Data_Instructor = {
    id: number
    instructor: string              // Instructor name          
    email: string
    driving_license_issue_date?: string
    instructor_card_expiration_date?: string            // Driving license issue date
    Date_birth: string          // Date of birth
    street: string
    houseNumber: string
    zipCode: string
    city: string                 // Address
    phone_number: string         // Phone number
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
    className = ''
}: InstructorTableProps) {

    // ================================
    // STATE MANAGEMENT
    // ================================

    const [scrollBarWidth, setScrollBarWidth] = React.useState(800)
    const containerRef = useRef<HTMLDivElement>(null)
    const { total, setPageIndex, index ,  size } = useInstructor()
    // ================================
    // DATA FILTERING AND PROCESSING
    // ================================

    /**
     * Filter data based on search query, time filter, and other criteria
     * Uses memoization for performance optimization
     */


    // ================================
    // PAGINATION CALCULATIONS
    // ================================


    // ================================
    // EVENT HANDLERS
    // ================================

    /**
     * Navigate to next page
     */
    const goToNextPage = useCallback(() => {
         if ((index + 1) * size >= total) return;
        setPageIndex(index + 1)
    }, [index, setPageIndex])

    /**
     * Navigate to previous page
     */
    const goToPrevPage = useCallback(() => {
         if (index === 0) return;   
        setPageIndex(index - 1)
    }, [index, setPageIndex])

 


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
            <div className={`${className} mb-4 p-1 ml-0 md:ml-4 mr-0 md:mr-3 scale-100 md:scale-[0.98] overflow-x-auto`} style={{ position: 'relative' }}>
                <div style={{ display: 'flex', width: '100%', maxWidth: '100vw' }}>
                    {/* Sticky NR Column - Left */}
                    <div style={{ position: 'sticky', left: 0, zIndex: 2, background: 'white' }}>
                        {/* NR Header */}
                        <div className='border-b-1 border-gray-200' style={{ height: '56px' }}>
                            <div className='w-[60px] md:w-[4vw] bg-gray-50 px-2 md:px-4 flex justify-center items-center h-full text-xs md:text-md border-r-1 border-gray-200'>Nr</div>
                        </div>
                        {/* NR Body */}
                        <div>
                            {data.length > 0 ? (
                                parseInsructor(data).map((_, i) => (
                                    <div
                                        key={`nr-${index * size + i + 1}`}
                                        className='bg-white border-b-1 border-gray-200'
                                        style={{ height: '52px' }}
                                    >
                                        <div className='w-[60px] md:w-[4vw] bg-gray-50 px-2 md:px-4 flex justify-center items-center h-full text-xs md:text-md text-gray-700 border-r-1 border-gray-200'>
                                            {index * size + i + 1}
                                        </div>
                                    </div>
                                ))
                            ) : null}
                        </div>
                    </div>

                    {/* Scrollable Content - Middle */}
                    <div id='instructors-table-container' className='flex-1 overflow-x-auto hide-native-scroll'>
                        {/* Scrollable Header */}
                        <div className='flex w-max pl-2 bg-transparent border-b-1 border-gray-200 items-center' style={{ height: '56px' }}>
                            <div className='w-[120px] md:w-[8vw] py-4 flex items-center justify-center text-xs md:text-sm whitespace-nowrap truncate'>Instructeur</div>
                            <div className='w-[180px] md:w-[15vw] flex items-center justify-center py-4 text-xs md:text-sm whitespace-nowrap truncate'>Email</div>
                            <div className='w-[140px] md:w-[8vw] py-4 flex items-center justify-center text-xs md:text-sm whitespace-nowrap truncate'>Geboortedatum</div>
                            <div className='w-[120px] md:w-[10vw] py-4 flex items-center justify-center text-xs md:text-sm whitespace-nowrap truncate'>Stad</div>
                            <div className='w-[140px] md:w-[9vw] py-4 flex items-center justify-center text-xs md:text-sm whitespace-nowrap truncate'>Telefoonnummer</div>
                            <div className='w-[100px] md:w-[8vw] py-4 flex items-center justify-center text-xs md:text-sm whitespace-nowrap truncate'>Rijbewijs</div>
                            <div className='w-[160px] md:w-[10vw] py-4 flex items-center justify-center text-xs md:text-sm whitespace-nowrap truncate'>Vervaldatum Rijbewijs</div>
                            <div className='w-[150px] md:w-[10vw] py-4 flex items-center justify-center text-xs md:text-sm whitespace-nowrap truncate'>Instructeurskaart</div>
                            <div className='w-[140px] md:w-[10vw] py-4 flex items-center justify-center text-xs md:text-sm whitespace-nowrap truncate'>KVK Uittreksel</div>
                            <div className='w-[170px] md:w-[10vw] py-4 flex items-center justify-center text-xs md:text-sm whitespace-nowrap truncate'>Arbeidsovereenkomst</div>
                            <div className='w-[160px] md:w-[11vw] py-4 flex items-center justify-center text-xs md:text-sm whitespace-nowrap truncate'>Contractvervaldatum</div>
                            <div className='w-[140px] md:w-[7vw] py-4 flex items-center justify-center text-xs md:text-sm whitespace-nowrap truncate'>Urenregistratie</div>
                        </div>
                        {/* Scrollable Body */}
                        <div className='w-max'>
                            {parseInsructor(data).length > 0 ? (
                                parseInsructor(data).map((instructor, i) => (
                                    <InstructorElementScrollable
                                        key={(size * index) + i}
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
                        <div className='bg-transparent border-b-1 border-gray-200 flex items-center' style={{ height: '56px' }}>
                            <div className='w-[80px] px-3 flex justify-center items-center h-full text-md  border-l-1 bg-gray-50  border-gray-200'>Acties</div>
                        </div>
                        {/* Actions Body */}
                        <div>
                            {parseInsructor(data).length > 0 ? (
                                parseInsructor(data).map((instructor) => (
                                    <InstructorElementActions
                                        key={`actions-${instructor.id}`}
                                        ele={instructor}
                                    />
                                ))
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>

            {/* Pagination Controls - Stable Layout */}
            <div id='scroll' className='mt-6 md:mt-10 w-full md:w-[90%] mx-auto p-2 md:p-3 border-2 border-gray-200 bg-white rounded-lg'>
                <div className='mb-4 flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-center'>
                    <button
                        onClick={goToPrevPage}
                        className={`w-full md:w-auto text-sm md:text-md border-2 rounded border-[#EAECF0] px-4 py-2 font-semibold ${
                            index === 0
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'cursor-pointer hover:bg-blue-950/10'
                        }`}
                    >
                        Vorige
                    </button>

                    <span className='text-sm md:text-md text-center'>
                        Pagina {index + 1} van {total}
                    </span>

                    <button
                        onClick={goToNextPage}
                        className={`w-full md:w-auto text-sm md:text-md border-2 rounded border-[#EAECF0] px-4 py-2 font-semibold ${
                            (index + 1) * size >= total
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'cursor-pointer hover:bg-blue-950/10'
                        }`}
                    >
                        Volgende
                    </button>
                </div>
                <CustomScrollBar targetId="instructors-table-container" orientation='horizontal' />

                {/* Results Counter */}
                <div className='w-full md:w-[95%] mx-auto mb-2 md:mb-4 text-center'>
                    <span className='text-xs md:text-md text-gray-600'>
                        Weergaven {index * size + 1}-{Math.min((index + 1) * size, total)} van {total}
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
        <div className='flex relative pl-2 w-max border-b-1 bg-white hover:bg-blue-100/10 border-gray-200 items-center' style={{ height: '52px' }}>
            <div className='w-[120px] md:w-[8vw] flex items-center justify-center text-xs md:text-sm text-gray-700'>{ele.instructor}</div>
            <div className='w-[180px] md:w-[15vw] flex items-center justify-center text-xs md:text-sm text-gray-700'>
                <Link href={`mailto:${ele.email}`}>
                    {ele.email}
                </Link>
            </div>
            <div className='w-[140px] md:w-[8vw] flex items-center justify-center text-xs md:text-sm text-gray-700'>{ele.Date_birth}</div>
            <div className='w-[120px] md:w-[10vw] flex items-center justify-center'>
                <span  onClick={() => {  }}
                    className='hover:scale-110 ml-2 md:ml-5 w-full justify-center flex cursor-pointer transition-all duration-300'>
                    <LocationIcon w={20} h={20} color="blue" /> <span className='w-[80%] text-xs md:text-sm'>{ele.city} </span></span>
            </div>

            <div
              
                className='w-[140px] md:w-[9vw] flex items-center justify-center text-xs md:text-sm text-gray-700 truncate transition-colors hover:text-blue-800 cursor-pointer'
                title={ele.phone_number}
            >
                {ele.phone_number}
            </div>
            <div className='w-[100px] md:w-[8vw] flex items-center justify-center text-xs md:text-sm text-gray-700'>
                <button
                    type='button'
                    onClick={() =>{}}
                    className='flex cursor-pointer items-center gap-1 md:gap-2 transition-colors hover:text-blue-800'
                >
                    <img src='/pdf_icon.png' width={16} height={16} alt='' />
                    <span className='truncate text-xs md:text-sm'>{ele.driving_license}</span>
                </button>
              
            </div>
            <div className='w-[160px] md:w-[10vw] flex items-center justify-center text-xs md:text-sm text-gray-700'>{ele.license_expiration_date}</div>
            <div className='w-[150px] md:w-[10vw] flex items-center justify-center text-xs md:text-sm text-gray-700'>
                <button
                    type='button'
                    onClick={() => {}}
                    className='flex items-center cursor-pointer gap-1 md:gap-2 transition-colors hover:text-blue-800'
                >
                    <img src='/pdf_icon.png' width={16} height={16} alt='' />
                    <span className='truncate text-xs md:text-sm'>{ele.instructor_card}</span>
                </button>
              
            </div>
            <div className='w-[140px] md:w-[10vw] flex items-center justify-center text-xs md:text-sm text-gray-700'>
                <button
                    type='button'
                    onClick={() => {}}
                    className='flex items-center cursor-pointer gap-1 md:gap-2 transition-colors hover:text-blue-800'
                >
                    <img src='/pdf_icon.png' width={16} height={16} alt='' />
                    <span className='truncate text-xs md:text-sm'>{ele.kvk_extract}</span>
                </button>
              
            </div>
            <div className='w-[170px] md:w-[10vw] min-w-[140px] flex items-center justify-center text-xs md:text-sm text-gray-700'>
                <button
                    type='button'
                    onClick={() => {}}
                    className='flex cursor-pointer items-center gap-1 md:gap-2 transition-colors hover:text-blue-800'
                >
                    <img src='/pdf_icon.png' width={16} height={16} alt='' />
                    <span className='truncate text-xs md:text-sm'>{ele.employment_contract}</span>
                </button>
                
            </div>
            <div className='w-[160px] md:w-[11vw] flex items-center justify-center text-xs md:text-sm text-gray-700'>{ele.contract_expiration_date}</div>
            <div className='w-[140px] md:w-[7vw] flex items-center justify-center text-xs md:text-sm text-gray-700'>{ele.hours_registration}</div>
        </div>
    )
}

// Actions column component for sticky right position
const InstructorElementActions = ({ ele }: { ele: Data_Instructor }) => {
    const modalRef = useRef<ActionModalRef>(null);

    return (
        <div
            className=' border-b-1 border-gray-200 bg-gray-50 flex items-center'
            style={{ height: '52px' }}
        >
            <div className='   w-[80px] px-3 flex justify-center items-center h-full border-l-1 border-gray-200'>
                <button
                    className='outline-none cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors'
                    onClick={() => { modalRef.current?.Open() }}
                >
                    <MenuIcon s='gray' w='20px' h='20px' f='gray' />
                </button>
                <ActionModal id={ele.id?.toString()} className='right-[-.8vw]   ' tableName='instructors' ref={modalRef} />
            </div>
        </div>
    )
}
export const parseInsructor = (data: any) => {
    let instructors: Data_Instructor[] = []
    data?.forEach((instructor: any) => {
        let instructor_item: Data_Instructor = {} as Data_Instructor
        instructor_item.email = instructor?.email
        instructor_item.Date_birth = instructor?.birthdate
        instructor_item.city = instructor?.city
        instructor_item.street = instructor?.street
        instructor_item.houseNumber = instructor?.houseNumber
        instructor_item.zipCode = instructor?.zipCode
        instructor_item.instructor = instructor?.name
        instructor_item.phone_number = instructor?.phone
        instructor_item.id = instructor?.id
        instructor_item.contract_expiration_date = "_"
        instructor_item.driving_license = "_"
        instructor_item.medical_certificate = "_"
        instructor_item.medical_expiration_date = "_"
        instructor_item.employment_contract = "_"
        instructor_item.kvk_extract = "_"
        instructor_item.instructor_card = "_"
        instructor_item.hours_registration = "0"
        instructor_item.license_expiration_date = "none"
        instructor_item.driving_license_issue_date = "_"
        instructor_item.contract_start_date = "_"
        instructor_item.salary = "_"
        instructors.push(instructor_item)


    })
    return instructors
}