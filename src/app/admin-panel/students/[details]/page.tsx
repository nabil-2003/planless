"use client"
import Header from '@/components/admin/Header'
import LeftSide from '@/components/admin/LeftSide';
import React, { use, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Data_Student } from '@/components/admin/ui/tables/StudentTable';
import CustmButton from '@/components/admin/ui/CustmButton';
import { useRouter } from 'next/navigation';
import useStudent from '@/app/hooks/useStudent';
import { parseStudents } from '../page';
import Breadcrumb from '@/components/admin/Breadcrumb';




export default function page({ params }: { params: Promise<{ details: string }> }) {
    const { details: id } = use(params)
    const navigate = useRouter()
    const { fetchStudentById, loading, fetchPlanningStudentById, } = useStudent()

    useEffect(() => { fetchStudentById(id); fetchPlanningStudentById(id) }, [])

    const [active, setActive] = useState('details');
    const changePage = (status: string) => {
        setActive(status);
    }

    return (
        <>
            <div className='content '>
                <Header title="Studenten" />
                <div className='w-full flex flex-col md:flex-row overflow-hidden'>
                    <LeftSide className='hidden md:flex md:w-[20%] border-l-0  rounded-t-none  mt-4 items-center bg-white rounded-r-lg  border-2 border-gray-200 h-auto  ' />
                    <div className='dashboard-container  w-full md:w-[80%] px-4 md:px-0 '>
                        <Breadcrumb />
                        <>
                            <DetailsBar setActive={changePage} active={active} />
                           


                            {
                                loading && <div className='w-[2vw] mt-10 h-[2vw]
                     rounded-full animate-spin border-2
                      border-blue-800 border-l-0  duration-300  mx-auto '></div>
                                ||

                                active == "details" &&
                                <DetailsPage id={id} /> ||
                                <div>not yet </div>

                            }
                        </>
                    </div>

                </div>

            </div>

        </>

    )
}


const DetailItem = ({ title, value = "empty" }: { title: string, value: string }) => {
    return (
        <div className='form-field flex flex-col border-2 rounded-lg p-2 border-gray-200 w-full md:w-[49%] mt-4'>
            <span className=''>{title}</span>
            <span className=' mt-2'>{value}</span>
        </div>
    )
}


const DetailsBar = ({ active = 'details', setActive }: { active: string, setActive: (value: string) => void }) => {
    return (
        <ul className='flex mt-4 ml-0 md:ml-4 w-max rounded-lg shadow-sm overflow-hidden text-gray-500 capitalize font-semibold text-sm'>
            <li onClick={() => setActive('details')} className={`w-32 md:w-[7vw] text-center p-3  hover:text-[var(--dark-blue)] cursor-pointer  hover:bg-blue-700/20 ${active === 'details' ? 'bg-blue-700/10 text-[var(--dark-blue)]' : ''}`}>
                details
            </li>
            <li onClick={() => setActive('schedule')} className={`w-32 md:w-[7vw] text-center p-3  hover:text-[var(--dark-blue)]    cursor-pointer hover:bg-blue-700/10 ${active === 'schedule' ? 'bg-blue-700/10 text-[var(--dark-blue)]' : ''}`}>
                Werkrooster
            </li>
        </ul>
    )
}



const DetailsPage = ({ id }: { id: string }) => {
    const navigate = useRouter()
    const { student } = useStudent()

    const parsedStudent = parseStudents([student])[0]
    const [studentDetails,] = useState<Data_Student>({
        id: parsedStudent.id,
        student: parsedStudent.student,
 
        email: parsedStudent.email,
        date_birth: parsedStudent.date_birth,
        city: parsedStudent.city,
        house_number : parsedStudent.house_number?.toString() || "", 
        street : parsedStudent.street?.toString() || "",
        post_code : parsedStudent.post_code?.toString() || "",
        phone_number: parsedStudent.phone_number,
        status: parsedStudent.status,
        driving_license_category: parsedStudent.driving_license_category,
        theory_exam: parsedStudent.theory_exam,
        practical_exam: parsedStudent.practical_exam,
        number_of_lessons: parsedStudent.number_of_lessons,
        last_lesson: parsedStudent.last_lesson,
        instructor: parsedStudent.instructor,
        remarks: parsedStudent.remarks
    });
    return (
        <>

            <div className='form-container mx-0 md:mx-4 rounded-lg mt-4 p-4 bg-white shadow-md'>
               <div className='flex gap-3 items-center '>
                 <h1 className='font-bold text-lg md:text-xl'>Persoonlijke gegevens</h1>
                 <span onClick={() => {
                                navigate.push("./edit/" + id)
                            }} className='bg-gray-200 text-sm cursor-pointer    rounded-xl '>
                                <div className='flex gap-2 text-[#575757] p-3'>
                                    <img src="/edit.svg" />
                                    <span>bewerking</span>
                                </div>
                            </span>
               </div>
                <form className='w-full  gap-2 flex  flex-wrap justify-between' action="">

                    <DetailItem title='Naam student ' value={studentDetails.student} />
                  
                    <DetailItem title='E-mailadres' value={studentDetails.email} />
                    <DetailItem title='Geboortedatum' value={studentDetails.date_birth} />
                    <DetailItem title='Stad' value={studentDetails.city} />
                     <DetailItem title='Straat' value={studentDetails.street || ""} />
                      <DetailItem title='Postcode' value={studentDetails.post_code?.toString() || ""} />
                       <DetailItem title='Huisnummer' value={studentDetails.house_number || ""} />
                    <DetailItem title='Telefoonnummer' value={studentDetails.phone_number} />

                </form>
            </div>
            
         

        </>
    )
}


