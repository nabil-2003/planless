'use client'

import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import CustmButton from '../CustmButton'
import { mapColorToStatus } from '../tables/TableLessons'
import useLessons from '@/app/hooks/useLessons'
import Confirm from './confirmModal'
import DecicionModal from './DecicionModal'
import AddressModal from '@/components/ui/AddressModal'

export type LessonsModalRef = {
    open: () => void;
    close: () => void;
}

type LessonsModalProps = {
    id?: string | null
    status: string
}

const LessonsModal = forwardRef<LessonsModalRef, LessonsModalProps>(({ id, status }, ref) => {
    const [mounted, setMounted] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const { fetchLessonById, loadingforModal, lesson } = useLessons()
    const [openedOnce, setOpenedOnce] = useState(false)
    // 🔧 FIX #1: Guard to prevent duplicate fetches
    const fetchedIdRef = useRef<string | null>(null)
    const container = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    // 🔧 FIX #2: Fetch ONLY ONCE per id when modal opens
    useEffect(() => {
        if (isOpen && id && fetchedIdRef.current !== id) {
            fetchedIdRef.current = id
            fetchLessonById(id)
            document.body.style.overflow = 'hidden'
        } else if (!isOpen) {
            document.body.style.overflow = 'unset'
            // Reset when modal closes so next open can fetch fresh data
            fetchedIdRef.current = null
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, id]) // ✅ Do NOT include fetchLessonById or lesson
    const open = useCallback(() => {
        setIsOpen(true)
    }, [])

    const close = useCallback(() => {
        setIsOpen(false)
    }, [])

    useImperativeHandle(ref, () => ({
        open,
        close
    }), [open, close])

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).classList.contains('modal-backdrop')) {
            close()
        }
    }
    // handle open decision modal
        const handleOpenDecisionModal = () => {
            close()
            setOpenedOnce(true)
        }

    if (!mounted) return null

    return createPortal(<div ref={container} className={`modal-backdrop w-full ${isOpen ? 'block' : 'hidden'} z-10 top-0 fixed h-full bg-black/20`} onClick={handleBackdropClick}>

        <div className='w-[95%] md:w-[85%] lg:w-[60%] xl:w-[40%] px-4 md:px-8 lg:px-14 h-max max-h-[90vh] overflow-y-auto py-4 md:py-6 bg-white shadow-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg'>
            {
                loadingforModal && <div className='mx-auto animate-spin border-l-0 grid place-self-center scale-125 border-2 w-12 h-12 md:w-[3vw] md:h-[3vw] rounded-full border-blue-600'></div> ||
                <>

                    <div className='flex gap-2 md:gap-3 items-center'>
                        <span className='cursor-pointer' onClick={() => { alert("back") }}> <img src="/back.svg" alt="" className='w-5 h-5 md:w-6 md:h-6' /></span>
                        <h1 className='p-2 md:p-3 text-lg md:text-xl lg:text-2xl font-bold'>
                            Maandag 14 Aug - { lesson?.start_time }
                        </h1>
                    </div>
                    <div className='border-t-1 border-[#D9D9D9]' />
                    <div className='flex flex-col md:flex-row justify-between items-start md:items-center p-2 md:p-3 gap-2 md:gap-0'>
                        <span className='text-sm md:text-base'>
                            {lesson?.date}
                        </span>
                        <span className='text-sm md:text-base'>
                           { lesson?.start_time } - { lesson?.end_time }
                        </span>
                    </div>
                    <div className='border-t-1 border-[#D9D9D9]' />
                    <div className='p-2 md:p-3'>
                        <div className='text-lg md:text-xl font-semibold'>{lesson?.lesson_cards?.[0]?.vehicleType?.name}</div>
                        <span className='text-xs text-[#8D8D8D] ml-2 md:ml-4'>{lesson?.lesson_cards.map(card => card.name).join(", ")}</span>
                    </div>
                    <div className='border-t-1 border-[#D9D9D9]' />
                    <div>
                        <div className='p-2 md:p-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0'>
                            <div className='items-center'>
                                <div className='text-lg md:text-xl font-semibold'>Ophaallocatie:</div>
                                <div className='text-sm text-[#8D8D8D] ml-2 md:ml-4'>{lesson?.adress}</div>
                            </div>
                            <CustmButton 
                                className='bg-[#4CB4E7] flex items-center gap-2 md:gap-3 text-white text-sm md:text-base px-3 py-2 w-full md:w-auto justify-center'
                                onClick={() => {
                                    if (lesson?.adress) {
                                        const encodedAddress = encodeURIComponent(lesson.adress);
                                        window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
                                    }
                                }}
                            > 
                                <img className='scale-125 md:scale-150' src="/arrow-2.svg" /> Navigeren
                            </CustmButton>
                        </div>

                    </div>
                    <div className='border-t-1 border-[#D9D9D9]' />
                    <div className="map p-2 md:p-3">
                      <AddressModal isOpen={isOpen} close={close} address={lesson?.adress} />
                    </div>
                    <div className='border-t-1 border-[#D9D9D9]' />
                    <div className='flex flex-col md:flex-row justify-between px-3 md:px-6 py-2 items-start md:items-center gap-2 md:gap-0'>
                        <span className='w-full md:w-[50%] p-2 text-sm md:text-base'>{lesson?.student}</span>
                        <span className='w-full md:w-[50%] border-t-1 md:border-t-0 md:border-l-1 border-[#D9D9D9] p-2 text-sm md:text-base'>{lesson?.Studentphone}</span>
                    </div>
                    <div className='border-t-1 border-[#D9D9D9]' />
                    <div className="status flex flex-col md:flex-row justify-around items-center p-2 md:p-3 gap-3 md:gap-0">
                        <div className='flex flex-col items-center w-full md:w-auto'>
                            <span className='text-xs md:text-sm'>Betaalstatus</span>
                            <span className='rounded-lg p-1 mt-1 text-xs md:text-sm' style={{ background: mapColorToStatus(lesson?.payment_status!)?.colorbg, color: mapColorToStatus(lesson?.payment_status!)?.colortext }} >{mapColorToStatus(lesson?.payment_status!)?.status}</span>
                        </div>
                        <div className='flex flex-col items-center w-full md:w-auto'>
                            <span className='text-xs md:text-sm'>Rijlesstatus</span>
                            <span className='rounded-lg p-1 mt-1 text-xs md:text-sm' style={{ background: mapColorToStatus(lesson?.lesson_status!)?.colorbg, color: mapColorToStatus(lesson?.lesson_status!)?.colortext }}>{mapColorToStatus(lesson?.lesson_status!)?.status}</span>
                        </div>
                    </div>

                    {
                        status === "In behandeling" &&
                        <>
                            <div className='border-t-1 border-[#D9D9D9]' />
                            <div className='text-center text-sm md:text-base px-2 md:px-0'>
                                {lesson?.student} heeft {lesson?.instructor} om {lesson?.start_time} voorgesteld als nieuwe datum en tijd voor de rijles.
                            </div>
                            <div className='flex flex-col md:flex-row mt-2 items-center justify-center gap-3 md:gap-7 px-2 md:px-0'>
                                <CustmButton className='bg-[#FE911F] text-white w-full md:w-[40%] text-sm md:text-base py-2' onClick={(e: React.MouseEvent<HTMLButtonElement>) => {  handleOpenDecisionModal() }} >Afwijzen</CustmButton>
                                <CustmButton className='bg-[#024089] text-white w-full md:w-[40%] text-sm md:text-base py-2'>Bevestigen</CustmButton>
                            </div>
                            <DecicionModal 
                            isOpen={openedOnce} 
                            action="confirm" 
                            table="lessons"  
                            content="Plan snel een nieuwe rijles in voordat er geen datum meer beschikbaar is." 
                            title='Rijles geannuleerd' 
                            btn1={{text : "Annuleren" , onClick : ()=> setOpenedOnce(false) }}
                            btn2={{text: 'Nieuwe rijles plannen' , onClick : ()=> { alert('new lesson') }}} 
                            />
                        </>
                    }

                </>
            }
        </div>

    </div>, document.body)
})

LessonsModal.displayName = 'LessonsModal'
export default LessonsModal








