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
     const [studentDetails, setStudentDetails] = useState<Data_Student>({
        student: '', 
        bsn_nummer: '',
        email: '', 
        geboortedatum: '', 
        adres: '',
        telefoonnummer: '', 
        status: '',
        rijbewijs_categorie: '',
        theorie_examen: '',
        praktijk_examen: '',
        aantal_lessen: 0,
        laatste_les: '',
        instructeur: '',
        opmerkingen: ''
    });

    const parsedStudents = useCallback(() => {
        const students: Data_Student[] = (studentsData as any[]).map(item => ({
            student: item.student,
            bsn_nummer: item.bsn_nummer,
            email: item.email,
            geboortedatum: item.geboortedatum,
            adres: item.adres,
            telefoonnummer: item.telefoonnummer,
            status: item.status,
            rijbewijs_categorie: item.rijbewijs_categorie,
            theorie_examen: item.theorie_examen,
            praktijk_examen: item.praktijk_examen,
            aantal_lessen: item.aantal_lessen,
            laatste_les: item.laatste_les,
            instructeur: item.instructeur,
            opmerkingen: item.opmerkingen,
        }));
        return students;
    }, [])

    const [currentFilterType, setCurrentFilterType] = React.useState('Alle');
    const [currentTimeFilter, setTimeFilter] = React.useState('24 uur');
    const [selectedDateRange, setSelectedDateRange] = useState<{ firstDateMs: number; lastDateMs: number } | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const CreateModalRef = useRef<CreateModalRef>(null);
    const dateModalRef = useRef<CustomDateRef>(null);

    //show the modal that create new student...
    const openCreateModal = () => {
        CreateModalRef.current?.open();
    }

    // Open date selection modal
    const openDateModal = () => {
        dateModalRef.current?.open();
    }

    // Handle date selection from modal (automatically detects single vs range)
    const handleDateSelect = (dates: { firstDateMs: number; lastDateMs: number } | null) => {
        setSelectedDateRange(dates);
    }

    // Format date for display
    const formatDateRange = () => {
        if (!selectedDateRange) return 'mm/dd/yyyy';

        const startDate = new Date(selectedDateRange.firstDateMs);
        const endDate = new Date(selectedDateRange.lastDateMs);

        const formatDate = (date: Date) => {
            return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
        };

        // If same date (single selection) show single date, otherwise show range
        if (selectedDateRange.firstDateMs === selectedDateRange.lastDateMs) {
            return formatDate(startDate);
        } else {
            return `${formatDate(startDate)} - ${formatDate(endDate)}`;
        }
    };

    // this function will change inside FilterByType 
    const chFilterByType = (filter: string) => {
        setCurrentFilterType(t => filter);
    }

    // this function will change inside TimeFilter
    const chTimeFilter = (filter: string) => {
        setTimeFilter(t => filter);
    }

    const activeclass = useMemo(() => " border-b-3 border-[var(--dark-blue)]  text-dark-blue ", [])
   
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

                                <Input type='text' title='Naam student ' value={studentDetails.student} onChange={(e) => {  setStudentDetails({...studentDetails, student: e.target.value }) }} placeholder='nabil' />
                                <Input type='number' title='BSN-nummer' value={studentDetails.bsn_nummer} onChange={(e) => { setStudentDetails({...studentDetails, bsn_nummer: e.target.value }) }} placeholder='28018273' />
                                <Input type='email' title='E-mailadres' value={studentDetails.email} onChange={(e) => { setStudentDetails({...studentDetails, email: e.target.value }) }} placeholder='example@example.com' />
                                <Input type='text' title='Geboortedatum' value={studentDetails.geboortedatum} onChange={(e) => { setStudentDetails({...studentDetails, geboortedatum: e.target.value }) }} placeholder='10/10/2000' />
                                <Input type='text' title='Adres' value={studentDetails.adres} onChange={(e) => { setStudentDetails({...studentDetails, adres: e.target.value }) }} placeholder='bijv:Bloemgracht 19' />
                                <Input type='tel' title='telefoonnummer' value={studentDetails.telefoonnummer} onChange={(e) => { setStudentDetails({...studentDetails, telefoonnummer: e.target.value }) }} placeholder='+31656171811' />

                            </form>
                        </div>
                        <div className='mt-4 form-container mx-4 rounded-lg  p-4  bg-white shadow-md'>
                            <h1 className='font-bold text-xl '>Aanvullende informatie</h1>
                            <form className='w-full  gap-2 flex  flex-wrap justify-between' action="">

                                <Input title='Naam student' value={studentDetails.student} onChange={(e) => { setStudentDetails({...studentDetails, student: e.target.value }) }} placeholder='nabil' />
                                <Input title='BSN-nummer' value={studentDetails.bsn_nummer} onChange={(e) => { setStudentDetails({...studentDetails, bsn_nummer: e.target.value }) }} placeholder='28018273' />
                                <Input title='opmerkingen' istextArea={true} value={studentDetails.opmerkingen} onChange={(e) => { setStudentDetails({...studentDetails, opmerkingen: e.target.value }) }} placeholder='heeft meite met inparkeren, verder een vlotte leerling. ' />

                            </form>
                        </div>
                        <div className='buttons mt-8 mb-4 mx-auto  w-[90%] flex flex-wrap gap-3 justify-between '>
                        <CustmButton  className='bg-[#fe911f] py-4 pl-4 pr-4  text-white text-sm '>
                            annlueren
                        </CustmButton>
                            <CustmButton  onClick={() => {console.log(studentDetails)}}  className='bg-[#2d46c4] py-4 pl-4 pr-4  text-white text-sm '>
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
                <input type={type} onChange={onChange} value={value} className='border-2 mt-3 border-gray-300 rounded-lg p-2  outline-none  placeholder:p-2 placeholder:capitalize w-full' placeholder={placeholder} />
                ||
                <textarea onChange={onChange} value={value} className='border-2 mt-3 border-gray-300 rounded-lg p-4 h-[10vh]  resize-none  outline-none   placeholder:capitalize w-full' placeholder={placeholder} />
            }
        </div>
    )
}

