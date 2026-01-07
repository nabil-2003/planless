"use client"

// ================================
// INSTRUCTORS PAGE COMPONENT
// ================================
// Main page for managing driving instructors
// Features: View, search, filter, export instructors data

// React and Next.js imports
import React, { forwardRef, ReactElement, use, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'

// Component imports
import Header from '@/components/admin/Header'
import LeftSide from '@/components/admin/LeftSide'
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
import CustmButton from '@/components/admin/ui/CustmButton'
import { mapColorToStatus } from '@/components/admin/ui/tables/TableLessons'
import { useRouter } from 'next/navigation'

export default function Page() {
    

    return (
        <div className='content'>
            {/* Page Header */}
            <Header title="Instructeurs" />

            <div className='w-full flex flex-col md:flex-row overflow-hidden'>
                {/* Left Sidebar */}
                <LeftSide className='hidden md:flex md:w-[20%] border-l-0 rounded-t-none mt-4 items-center bg-white rounded-r-lg border-2 border-gray-200 h-auto' />

                {/* Main Content Area */}
                <div className='dashboard-container w-full md:w-[80%] px-4 md:px-0'>
                    <div className='table_elements mt-6 ml-0 md:ml-4 bg-white rounded-lg shadow-md p-4'>
                        <h1 className='text-2xl md:text-3xl font-bold ml-2 md:ml-10 mt-5 mb-4'>Brommer (AM)</h1>
                        <div className='overflow-x-auto w-[70%] '>
                            <header className='flex  w-full bg-[#f0f2f6]  *:flex *:justify-center *:border-gray-300  *:border-b-1 '>
                                <div className=' p-3 w-[25%] '>Product</div>
                                <div className=' p-3 w-[25%]'>duur</div>
                                <div className=' p-3 w-[25%]'>status</div>
                                <div className=' p-3 w-[25%]'>Prjis</div>
                                <div className=' p-3 w-[15%] border-gray-300  border-l-1 border-b-1'>Acties</div>
                            </header>
                            {[1, 2, 3, 4, 5].map((_, index) => <Element id={String(index)} key={index} />)}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
const getType = (ele : any )=>{
    return typeof ele; 
}
const Element = ({ id }: { id: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLSpanElement>(null);
    const actionsRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node) &&
                actionsRef.current && !actionsRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (<div className='body flex  bg-[#ffffff] *:py-5  w-full *:flex *:justify-center *:border-gray-300  *:border-b-1'>
        <div className=' p-3 w-[25%] '>Proefles</div>
        <div className=' p-3 w-[25%]'>60 min</div>
        <div className=' p-3 w-[25%]'>

            <span className=' px-5 py-1 bg-[#DCFFD6] text-[#188006] rounded-xl'>
                active
            </span>
        </div>
        <div className=' p-3 w-[25%]'>500 €</div>
        <div ref={ref} className=' p-3 flex relative justify-center items-center w-[15%] border-gray-300 border-l-1 border-x-1  '>
            <span ref={buttonRef} onClick={handleToggle} className='cursor-pointer'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#575757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15.9945 12H16.0035" stroke="#575757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11.9945 12H12.0035" stroke="#575757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.99451 12H8.00349" stroke="#575757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </span>
           {isOpen && <Actions id={id} buttonRef={buttonRef} actionsRef={actionsRef} />}
        </div>
    </div>)
}
const Actions = ({ id, buttonRef, actionsRef }: { id: string, buttonRef: React.RefObject<HTMLSpanElement | null>, actionsRef: React.RefObject<HTMLDivElement | null> }) => {
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const navigate = useRouter()
    useEffect(() => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + window.scrollY ,
                left: rect.left + window.scrollX + (rect.width / 2)
            });
        }
    }, [buttonRef]);

    return createPortal(
        <div ref={actionsRef} style={{ position: 'absolute', top: `${position.top}px`, left: `${position.left}px`, zIndex: 1000 }}>
            <div className='absolute bg-white w-[12px] shadow-sm z-0 -top-[6px] h-[12px] rotate-45  -translate-x-1/2' />
            <div className='relative bg-white flex gap-2 shadow-md rounded-xl py-3 px-2 -translate-x-1/2'>
                <span className='cursor-pointer w-[1.5vw] h-[1.5vw] rounded-lg grid place-items-center hover:bg-gray-100' >
                    <img src="/actions/delete.svg" alt="Delete" />
                </span>
                <span className='cursor-pointer w-[1.5vw] h-[1.5vw] rounded-lg grid place-items-center hover:bg-gray-100' onClick={()=>{navigate.push("/admin-panel/settings/packages/edit/"+id) ; console.log("hello")}} > 
                    <img src="/actions/edit.svg" alt="Edit" />
                </span>
            </div>
        </div>,
        document.body
    );
}