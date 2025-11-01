"use client"
import Header from '@/components/admin/Header'
import LeftSide from '@/components/admin/LeftSide';
import TimeFilter from '@/components/admin/TimeFIlter';
import FIlterByType from '@/components/admin/FIlterByType'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CusTomDate from '@/components/admin/ui/CustomDateModal'
import { FaRegPlusSquare, FaArrowDown, FaChartLine, FaChartBar } from 'react-icons/fa'
import CustomSearch from "@/components/admin/ui/CustomSearch"
import CustomSelect from "@/components/admin/ui/CustomSelect"
import { Button } from '@/components/ui';
import Image from 'next/image';
import PlusIcon from '@/components/svgs/Plus';
import StudentTable, { Data_Student } from '@/components/admin/ui/tables/StudentTable';
import CreateModal, { CreateModalRef } from '@/components/admin/ui/CreateModal';
import studentsData from "@/data/students.json"
import CustmButton from '@/components/admin/ui/CustmButton';
import { useRouter } from 'next/navigation';

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

export default function page() {
     const router = useRouter()

    const back = useCallback(()=>{
        router.back()
    },[])

    const [primaryInfo, setPrimaryInfo] = useState({
        studentName: '',
        bsnNumber: '',
        email: '',
        birthDate: '',
        address: '',
        phoneNumber: '',
    })

    const [extraInfo, setExtraInfo] = useState({
        studentName: '',
        bsnNumber: '',
        notes: '',
    })

    return (
        <>
            <div className='content '>
                <Header title="Studenten" />
                <div className='w-full flex flex-col md:flex-row overflow-hidden'>
                    <LeftSide className='hidden md:flex md:w-[20%] border-l-0  rounded-t-none  mt-4 items-center bg-white rounded-r-lg  border-2 border-gray-200 h-auto  ' />
                    <div className='dashboard-container  w-full md:w-[80%] px-4 md:px-0 '>
                        <div className='form-container mx-4 rounded-lg mt-4 p-4  bg-white shadow-md'>
                            <h1 className='font-bold text-xl '>Persoonlijke gegevens</h1>
                            <form className='w-full  gap-2 flex  flex-wrap justify-between' action="">

                                <Input
                                    type='text'
                                    title='Naam student '
                                    value={primaryInfo.studentName}
                                    onChange={(e) => {
                                        setPrimaryInfo({ ...primaryInfo, studentName: e.target.value })
                                    }}
                                    placeholder='john doe'
                                />
                                <Input
                                    type='number'
                                    title='BSN-nummer'
                                    value={primaryInfo.bsnNumber}
                                    onChange={(e) => {
                                        setPrimaryInfo({ ...primaryInfo, bsnNumber: e.target.value })
                                    }}
                                    placeholder='28018273'
                                />
                                <Input
                                    type='email'
                                    title='E-mailadres'
                                    value={primaryInfo.email}
                                    onChange={(e) => {
                                        setPrimaryInfo({ ...primaryInfo, email: e.target.value })
                                    }}
                                    placeholder='example@example.com'
                                />
                                <Input
                                    type='text'
                                    title='Geboortedatum'
                                    value={primaryInfo.birthDate}
                                    onChange={(e) => {
                                        setPrimaryInfo({ ...primaryInfo, birthDate: e.target.value })
                                    }}
                                    placeholder='10/10/2000'
                                />
                                <Input
                                    type='text'
                                    title='Adres'
                                    value={primaryInfo.address}
                                    onChange={(e) => {
                                        setPrimaryInfo({ ...primaryInfo, address: e.target.value })
                                    }}
                                    placeholder='bijv:Bloemgracht 19'
                                />
                                <Input
                                    type='tel'
                                    title='Telefoonnummer'
                                    value={primaryInfo.phoneNumber}
                                    onChange={(e) => {
                                        setPrimaryInfo({ ...primaryInfo, phoneNumber: e.target.value })
                                    }}
                                    placeholder='+31656171811'
                                />

                            </form>
                        </div>
                        <div className='mt-4 form-container mx-4 rounded-lg  p-4  bg-white shadow-md'>
                            <h1 className='font-bold text-xl '>Aanvullende informatie</h1>
                            <form className='w-full  gap-2 flex  flex-wrap justify-between' action="">

                                <Input
                                    title='Naam student'
                                    value={extraInfo.studentName}
                                    onChange={(e) => {
                                        setExtraInfo({ ...extraInfo, studentName: e.target.value })
                                    }}
                                    placeholder='naam'
                                />
                                <Input
                                    title='BSN-nummer'
                                    value={extraInfo.bsnNumber}
                                    onChange={(e) => {
                                        setExtraInfo({ ...extraInfo, bsnNumber: e.target.value })
                                    }}
                                    placeholder='28018273'
                                />
                                <Input
                                    title='Opmerkingen'
                                    istextArea={true}
                                    value={extraInfo.notes}
                                    onChange={(e) => {
                                        setExtraInfo({ ...extraInfo, notes: e.target.value })
                                    }}
                                    placeholder='heeft moeite met inparkeren, verder een vlotte leerling.'
                                />

                            </form>
                        </div>
                        <div className='buttons mt-8 mb-4 mx-auto  w-[90%] flex flex-wrap gap-3 justify-between '>
                        <CustmButton  onClick={back} className='bg-[#fe911f] py-4 pl-4 pr-4  text-white text-sm '>
                            Annuleren
                        </CustmButton>
                            <CustmButton  onClick={() => {console.log({ primaryInfo, extraInfo })}}  className='bg-[#2d46c4] py-4 pl-4 pr-4  text-white text-sm '>
                            Opslaan
                        </CustmButton>
                    </div>
                    </div>
                    
                </div>

            </div>

        </>

    )
}


const Input = ({ title , type="text", placeholder, istextArea = false, onChange, value }: { type?: string, istextArea?: boolean, title: string, placeholder: string, onChange: (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, value: string }) => {
    return (
        <div className='form-field flex flex-col w-full md:w-[49%] mt-4'>
            <span className=''>{title}</span>
            {
                !istextArea &&
                <input type={type} onChange={onChange} value={value} className='border-2 mt-3 border-gray-300 rounded-lg py-3 pl-4    outline-none placeholder:capitalize w-full' placeholder={placeholder} />
                ||
                <textarea onChange={onChange} value={value} className='border-2 mt-3 border-gray-300 rounded-lg p-4 h-[10vh]  resize-none  outline-none   placeholder:capitalize w-full' placeholder={placeholder} />
            }
        </div>
    )
}

