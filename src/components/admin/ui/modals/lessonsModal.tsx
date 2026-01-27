'use client'

import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import CustmButton from '../CustmButton'
import { mapColorToStatus } from '../tables/TableLessons'
import useLessons from '@/app/hooks/useLessons'
import Confirm from './confirmModal'
import DecicionModal from './DecicionModal'

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

    return createPortal(<div ref={container} className={`modal-backdrop w-full ${isOpen ? 'block' : 'hidden'} z-10 top-0 fixed h-full bg-black/10`} onClick={handleBackdropClick}>

        <div className='w-[40%] px-14  h-max py-6 bg-white shadow-md  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg '>
            {
                loadingforModal && <div className=' mx-auto animate-spin border-l-0 grid place-self-center scale-125 border-2 w-[3vw] h-[3vw] rounded-full border-blue-600'></div> ||
                <>

                    <div className='flex gap-3 items-center '>
                        <span className='cursor-pointer' onClick={() => { alert("back") }}> <img src="/back.svg" alt="" /></span>
                        <h1 className=' p-3 text-2xl font-bold  '>
                            Maandag 14 Aug - { lesson?.start_time }
                        </h1>
                    </div>
                    <div className=' border-t-1 border-[#D9D9D9] ' />
                    <div className='flex justify-between items-center p-3'>
                        <span>
                            {lesson?.date}
                        </span>
                        <span>
                           { lesson?.start_time } - { lesson?.end_time }
                        </span>
                    </div>
                    <div className=' border-t-1 border-[#D9D9D9] ' />
                    <div className='p-3 '>
                        <div className='text-xl font-semibold'>{lesson?.lesson_cards?.[0]?.vehicleType?.name}</div>
                        <span className='text-xs text-[#8D8D8D] ml-4'>{lesson?.lesson_cards.map(card => card.name).join(", ")}</span>
                    </div>
                    <div className=' border-t-1 border-[#D9D9D9] ' />
                    <div>
                        <div className=' p-3 flex items-center justify-between'>
                            <div className=' items-center'>
                                <div className='text-xl font-semibold'>Ophaallocatie:</div>
                                <div className='text-sm text-[#8D8D8D]   ml-4 '>{lesson?.adress}</div>
                            </div>
                            <CustmButton className='bg-[#4CB4E7] flex items-center gap-3 text-white '> <img className='scale-150' src="/arrow-2.svg" /> Navigeren</CustmButton>
                        </div>

                    </div>
                    <div className=' border-t-1 border-[#D9D9D9] ' />
                    <div className="map p-3">
                        <img src="/demo/mapimg.svg" alt="" />
                    </div>
                    <div className=' border-t-1 border-[#D9D9D9] ' />
                    <div className='flex justify-between px-6 py-2 items-center'>
                        <span className='w-[50%] p-2'>{lesson?.student}</span>
                        <span className='w-[50%] border-[#D9D9D9]  border-l-1 p-2'>{lesson?.Studentphone}</span>
                    </div>
                    <div className=' border-t-1 border-[#D9D9D9] ' />
                    <div className="status flex justify-around items-center p-3">
                        <div className=' flex flex-col items-center ' >
                            <span className='text-xs' >Betaalstatus</span>
                            <span className='rounded-lg p-1 mt-1' style={{ background: mapColorToStatus(lesson?.payment_status!)?.colorbg, color: mapColorToStatus(lesson?.payment_status!)?.colortext }} >{mapColorToStatus(lesson?.payment_status!)?.status}</span>
                        </div>
                        <div className=' flex flex-col items-center '>
                            <span className='text-xs'>Rijlesstatus</span>
                            <span className='rounded-lg p-1 mt-1' style={{ background: mapColorToStatus(lesson?.lesson_status!)?.colorbg, color: mapColorToStatus(lesson?.lesson_status!)?.colortext }}>{mapColorToStatus(lesson?.lesson_status!)?.status}</span>
                        </div>
                    </div>

                    {
                        status === "In behandeling" &&
                        <>
                            <div className=' border-t-1 border-[#D9D9D9] ' />
                            <div className='text-center '>
                                {lesson?.student} heeft {lesson?.instructor} om {lesson?.start_time} voorgesteld als nieuwe datum en tijd voor de rijles.
                            </div>
                            <div className='flex mt-2 items-center justify-center gap-7'>
                                <CustmButton className='bg-[#FE911F] text-white w-[40%]' onClick={(e: React.MouseEvent<HTMLButtonElement>) => {  handleOpenDecisionModal() }} >Afwijzen</CustmButton>
                                <CustmButton className='bg-[#024089]  text-white w-[40%]'  >Bevestigen</CustmButton>
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








