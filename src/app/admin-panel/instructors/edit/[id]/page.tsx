"use client"
import Header from '@/components/admin/Header'
import LeftSide from '@/components/admin/LeftSide';
import React, { use, useCallback, useEffect, useRef, useState } from 'react'
import CustmButton from '@/components/admin/ui/CustmButton';
import { useRouter } from 'next/navigation';
import useInstructor from '@/app/hooks/useInstructor';
import Breadcrumb from '@/components/admin/Breadcrumb';
import { parseInsructor } from '@/components/admin/ui/tables/InstructorTable';
import { Button } from '@/components/ui';


export default function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const { instructor, fetchInstructorById } = useInstructor()

    const back = useCallback(() => {
        router.back()
    }, [])

    // File upload refs
    const rijbewijsFileRef = useRef<HTMLInputElement>(null)
    const contractFileRef = useRef<HTMLInputElement>(null)
    const instructeurskaartFileRef = useRef<HTMLInputElement>(null)

    // Preview states
    const [rijbewijsPreview, setRijbewijsPreview] = useState<string>("")
    const [contractPreview, setContractPreview] = useState<string>("")
    const [instructeurskaartPreview, setInstructeurskaartPreview] = useState<string>("")

    const [instructorData, setInstructorData] = useState<any>({
        // Personal Information
        naam_instructeur: "", 
        bsn_nummer: "", 
        email: "", 
        geboortedatum: "", 
        adres: "", 
        telefoonnummer: "", 
        
        // License Information
        rijbewijsnummer: "", 
        uitgiftedatum_rijbewijs: "", 
        vervaldatum_rijbewijs: "", 
        upload_bestanden: "", 
        
        // Instructor Information
        instructeurskaartnummer: "", 
        vervaldatum_instructeurskaart: "", 
        
        // Contract Information
        contractbegindatum: "", 
        contractvervaldatum: "", 
        salaris: "", 
        
        // Document Uploads
        upload_contract: "", 
        upload_instructeurskaart: "" 
    });

    useEffect(() => {
        fetchInstructorById(id)
    }, [id])

    useEffect(() => {
        if (instructor) {
            const parsedInstructor = parseInsructor([instructor])[0]
            setInstructorData({
                naam_instructeur: parsedInstructor.instructor || "",
              
                email: parsedInstructor.email || "",
                geboortedatum: parsedInstructor.Date_birth || "",
                adres: parsedInstructor.city || "",
                telefoonnummer: parsedInstructor.phone_number || "",
                rijbewijsnummer: parsedInstructor.driving_license || "",
                uitgiftedatum_rijbewijs: parsedInstructor.driving_license_issue_date || "",
                vervaldatum_rijbewijs: parsedInstructor.license_expiration_date || "",
                instructeurskaartnummer: parsedInstructor.instructor_card || "",
                vervaldatum_instructeurskaart: parsedInstructor.instructor_card_expiration_date || "",
                contractbegindatum: parsedInstructor.contract_start_date || "",
                contractvervaldatum: parsedInstructor.contract_expiration_date || "",
                salaris: parsedInstructor.salary || "",
                upload_bestanden: "",
                upload_contract: "",
                upload_instructeurskaart: ""
            })
        }
    }, [instructor])

    const handleSubmit = () => {
        console.log("Updated instructor data:", instructorData)
        // TODO: Send to backend API
    }

    // File upload handlers
    const handleRijbewijsUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setRijbewijsPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
            setInstructorData({ ...instructorData, upload_bestanden: file.name })
        }
    }

    const handleContractUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setContractPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
            setInstructorData({ ...instructorData, upload_contract: file.name })
        }
    }

    const handleInstructeurskaartUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setInstructeurskaartPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
            setInstructorData({ ...instructorData, upload_instructeurskaart: file.name })
        }
    }

    return (
        <>
            <div className='content '>
                <Header title="Instructeurs" />
                <div className='w-full flex flex-col md:flex-row overflow-x-hidden'>
                    <LeftSide className='hidden md:flex md:w-[20%] border-l-0  rounded-t-none  mt-4 items-center bg-white rounded-r-lg  border-2 border-gray-200 h-auto  ' />
                    <div className='dashboard-container w-full md:w-[80%] px-4 md:px-0'>
                        <Breadcrumb />
                        <div className='form-container mx-4 rounded-lg mt-4 p-4  bg-white shadow-md'>
                            <div className='flex items-center gap-3 '>
                                <h1 className='font-bold text-xl '>Persoonlijke gegevens</h1>
                                <span className=' px-3 py-3 rounded-2xl mt-5 mr-3 mb-5  w-max bg-[#FFDDBA] text-white   '>
                                    <span className='text-[#A95600] flex items-center gap-2'>
                                        <img src="/edit_brown.svg" alt="" />
                                        bewerkingsmodus
                                    </span>
                                </span>
                            </div>
                            <form className='w-full gap-2 flex flex-wrap justify-between' action="">
                                <Input 
                                    type='text' 
                                    title='Naam instructeur' 
                                    value={instructorData.naam_instructeur} 
                                    onChange={(e) => setInstructorData({ ...instructorData, naam_instructeur: e.target.value })} 
                                    placeholder='john doe' 
                                />
                                <Input 
                                    type='number' 
                                    title='BSN-nummer' 
                                    value={instructorData.bsn_nummer} 
                                    onChange={(e) => setInstructorData({ ...instructorData, bsn_nummer: e.target.value })} 
                                    placeholder='28018273' 
                                />
                                <Input 
                                    type='email' 
                                    title='E-mailadres' 
                                    value={instructorData.email} 
                                    onChange={(e) => setInstructorData({ ...instructorData, email: e.target.value })} 
                                    placeholder='example@example.com' 
                                />
                                <Input 
                                    type='text' 
                                    title='Geboortedatum' 
                                    value={instructorData.geboortedatum} 
                                    onChange={(e) => setInstructorData({ ...instructorData, geboortedatum: e.target.value })} 
                                    placeholder='10/10/2000' 
                                />
                                <Input 
                                    type='text' 
                                    title='Adres' 
                                    value={instructorData.adres} 
                                    onChange={(e) => setInstructorData({ ...instructorData, adres: e.target.value })} 
                                    placeholder='bijv:Bloemgracht 19' 
                                />
                                <Input 
                                    type='tel' 
                                    title='Telefoonnummer' 
                                    value={instructorData.telefoonnummer} 
                                    onChange={(e) => setInstructorData({ ...instructorData, telefoonnummer: e.target.value })} 
                                    placeholder='+31656171811' 
                                />
                            </form>
                        </div>

                        <div className='mx-4 rounded-lg mt-4 p-4  bg-white shadow-md'> 
                            <h1 className='font-bold text-xl'>Rijbewijsgegevens</h1>
                            <form className='w-full gap-2 flex flex-wrap justify-between' action="">
                                <Input 
                                    type='text' 
                                    title='Rijbewijsnummer' 
                                    value={instructorData.rijbewijsnummer} 
                                    onChange={(e) => setInstructorData({ ...instructorData, rijbewijsnummer: e.target.value })} 
                                    placeholder='AB123CD456' 
                                />
                                <Input 
                                    type='text' 
                                    title='Uitgiftedatum rijbewijs' 
                                    value={instructorData.uitgiftedatum_rijbewijs} 
                                    onChange={(e) => setInstructorData({ ...instructorData, uitgiftedatum_rijbewijs: e.target.value })} 
                                    placeholder='29/08/2022' 
                                />
                                <Input 
                                    type='text' 
                                    title='Vervaldatum rijbewijs' 
                                    value={instructorData.vervaldatum_rijbewijs} 
                                    onChange={(e) => setInstructorData({ ...instructorData, vervaldatum_rijbewijs: e.target.value })} 
                                    placeholder='29/08/2032' 
                                />
                                <div className='w-full h-[100vh] md:w-[49%] *:capitalize border-2 border-gray-200 rounded-lg  md:h-[50vh] mt-4'>
                                    <h1 className='font-bold mt-2 ml-2'>Rijbewijs</h1>
                                    <img 
                                        className='w-full max-w-[95%] mt-2  md:h-[47%] scale-110 mx-auto object-contain' 
                                        src={rijbewijsPreview || "/Id.png"} 
                                        alt="" 
                                    />
                                    <h1 className='text-sm text-gray-500 font-semibold mt-3 ml-4'>Vervaldatum rijbewijs</h1>
                                    <h1 className='text-sm text-gray-500 font-semibold mt-1 ml-4'>
                                        {instructorData.vervaldatum_rijbewijs || '10/10/2028'}
                                    </h1>
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        hidden 
                                        ref={rijbewijsFileRef} 
                                        onChange={handleRijbewijsUpload}
                                    />
                                    <CustmButton 
                                        onClick={() => rijbewijsFileRef.current?.click()} 
                                        className='w-full bg-white text-blue-800 md:w-[93%] mx-auto border-1 border-blue-800 hover:bg-blue-800 hover:text-white mb-2 grid place-content-center'
                                    >
                                        Vervangen
                                    </CustmButton>
                                    <CustmButton 
                                        onClick={() => { alert('Download rijbewijs') }} 
                                        className='w-full border border-blue-800 bg-blue-800 hover:opacity-90 text-white md:w-[93%] mx-auto mt-2 mb-2 grid place-content-center'
                                    >
                                        download
                                    </CustmButton>
                                </div>
                            </form>
                        </div>

                        <div className='mx-4 rounded-lg mt-4 p-4  bg-white shadow-md'> 
                            <h1 className='font-bold text-xl'>Instructeursgegevens</h1>
                            <form className='w-full gap-2 flex flex-wrap justify-between' action="">
                                <Input 
                                    type='text' 
                                    title='Instructeurskaartnummer' 
                                    value={instructorData.instructeurskaartnummer} 
                                    onChange={(e) => setInstructorData({ ...instructorData, instructeurskaartnummer: e.target.value })} 
                                    placeholder='KL987MN654' 
                                />
                                <Input 
                                    type='text' 
                                    title='Vervaldatum instructeurskaart' 
                                    value={instructorData.vervaldatum_instructeurskaart} 
                                    onChange={(e) => setInstructorData({ ...instructorData, vervaldatum_instructeurskaart: e.target.value })} 
                                    placeholder='29/08/2026' 
                                />
                            </form>
                        </div>

                        <div className='mx-4 rounded-lg mt-4 p-4  bg-white shadow-md'> 
                            <h1 className='font-bold text-xl'>Contractgegevens</h1>
                            <form className='w-full gap-2 flex flex-wrap justify-between' action="">
                                <Input 
                                    type='text' 
                                    title='Contractbegindatum' 
                                    value={instructorData.contractbegindatum} 
                                    onChange={(e) => setInstructorData({ ...instructorData, contractbegindatum: e.target.value })} 
                                    placeholder='29/08/2022' 
                                />
                                <Input 
                                    type='text' 
                                    title='Contractvervaldatum' 
                                    value={instructorData.contractvervaldatum} 
                                    onChange={(e) => setInstructorData({ ...instructorData, contractvervaldatum: e.target.value })} 
                                    placeholder='29/08/2025' 
                                />
                                <Input 
                                    type='text' 
                                    title='Salaris per maand' 
                                    value={instructorData.salaris} 
                                    onChange={(e) => setInstructorData({ ...instructorData, salaris: e.target.value })} 
                                    placeholder='€3500' 
                                />
                            </form>
                        </div>

                        <div className='mx-4 rounded-lg mt-4 p-4  bg-white shadow-md'> 
                            <h1 className='font-bold text-xl'>Documenten uploaden</h1>
                            <div className='w-full gap-2   justify-between'>
                                {/* Contract Document */}
                                <div className='w-full md:w-[100%] mt-4'>
                                    <div className='w-full h-max gap-2 flex flex-col border-2 border-gray-200 rounded-lg p-4'>
                                        <img 
                                            className='w-full max-w-[95%] mt-2 h-auto md:h-[25vh] mx-auto object-contain' 
                                            src={contractPreview || "/bankcart.png"} 
                                            alt="" 
                                        />
                                        <div className='w-full'>
                                            <h1 className='text-sm text-gray-500 font-semibold mt-3 ml-4'>Contract document</h1>
                                            <h1 className='text-sm text-gray-500 font-semibold mt-1 ml-4'>
                                                {instructorData.contractvervaldatum || '10/10/2028'}
                                            </h1>
                                            <input 
                                                type="file" 
                                                accept="image/*" 
                                                hidden 
                                                ref={contractFileRef} 
                                                onChange={handleContractUpload}
                                            />
                                            <CustmButton 
                                                onClick={() => contractFileRef.current?.click()} 
                                                className='w-full bg-white text-blue-800 md:w-[93%] mx-auto border-1 border-blue-800 hover:bg-blue-800 hover:text-white mb-2 grid place-content-center'
                                            >
                                                Vervangen
                                            </CustmButton>
                                            <CustmButton 
                                                onClick={() => { alert('Download contract') }} 
                                                className='w-full border border-blue-800 bg-blue-800 hover:opacity-90 text-white md:w-[93%] mx-auto mt-2 mb-2 grid place-content-center'
                                            >
                                                download
                                            </CustmButton>
                                        </div>
                                    </div>
                                </div>

                                {/* Instructor Card Document */}
                                <div className='w-full md:w-[100%] mt-4'>
                                    <div className='w-full h-max gap-2 flex flex-col border-2 border-gray-200 rounded-lg p-4'>
                                        <img 
                                            className='w-full max-w-[95%] mt-2 h-auto md:h-[30vh] mx-auto object-contain' 
                                            src={instructeurskaartPreview || "/facteur.png"} 
                                            alt="" 
                                        />
                                        <div className='w-full'>
                                            <h1 className='text-base md:text-md font-bold ml-4'>Instructeurskaart</h1>
                                            <input 
                                                type="file" 
                                                accept="image/*" 
                                                hidden 
                                                ref={instructeurskaartFileRef} 
                                                onChange={handleInstructeurskaartUpload}
                                            />
                                            <CustmButton 
                                                onClick={() => instructeurskaartFileRef.current?.click()} 
                                                className='w-full bg-white text-blue-800 md:w-[93%] mx-auto border-1 border-blue-800 hover:bg-blue-800 hover:text-white mb-2 grid place-content-center'
                                            >
                                                Vervangen
                                            </CustmButton>
                                            <CustmButton 
                                                onClick={() => { alert('Download instructeurskaart') }} 
                                                className='w-full border border-blue-800 bg-blue-800 hover:opacity-90 text-white md:w-[93%] mx-auto mt-2 mb-2 grid place-content-center'
                                            >
                                                download
                                            </CustmButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='buttons mt-8 mb-4 mx-auto w-[90%] flex flex-wrap gap-3 justify-between'>
                            <CustmButton onClick={back} className='bg-[#fe911f] py-4 pl-4 pr-4  text-white text-sm '>
                                Annuleren
                            </CustmButton>
                            <CustmButton onClick={handleSubmit} className='bg-[#2d46c4] py-4 pl-4 pr-4  text-white text-sm '>
                                Opslaan
                            </CustmButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


const Input = ({ title, type = "text", placeholder, istextArea = false, onChange, value }: { type?: string, istextArea?: boolean, title: string, placeholder: string, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, value: string }) => {
    const file = useRef<HTMLInputElement>(null)
    const [uploadMessage, setUploadMessage] = useState<string>("")
    
    const openFile = () => {
        file.current && file.current.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            setUploadMessage(`${selectedFile.name} uploaded successfully!`)
            const mockEvent = {
                target: {
                    value: selectedFile.name
                }
            } as React.ChangeEvent<HTMLInputElement>
            onChange(mockEvent)
        }
    }
   
    return (
        <div className='form-field flex flex-col w-full md:w-[49%] mt-4'>
            <span className=''>{title}</span>
            {
                type !== "file" ? (
                    !istextArea ? (
                        <div className='flex items-center border-2 mt-3 border-gray-300 rounded-lg w-full'>
                            <span className='scale-90 ml-4'><img src={'/edit.svg'} /></span>
                            <input 
                                type={type} 
                                onChange={onChange} 
                                value={value} 
                                className={'py-3 pl-4 outline-none placeholder:capitalize w-[95%]'} 
                                placeholder={placeholder} 
                            />
                        </div>
                    ) : (
                        <div className='flex items-baseline border-2 mt-3 relative border-gray-300 rounded-lg w-full'>
                            <span className='scale-90 ml-4 mt-4 absolute'><img src={'/edit.svg'} /></span>
                            <textarea 
                                onChange={onChange} 
                                value={value} 
                                className='p-4 h-[10vh] resize-none outline-none ml-9 placeholder:capitalize w-full' 
                                placeholder={placeholder} 
                            />
                        </div>
                    )
                ) : (
                    <div className='border-2 mt-4 border-gray-300 p-6 rounded-lg'>
                        <div className='file border-2 border-gray-300 p-2 rounded-lg'>
                            <span 
                                className='w-[5vw] h-[5vw] rounded-lg border-2 border-[var(--dark-blue)] border-dashed grid place-items-center text-lg text-[var(--dark-blue)] cursor-pointer' 
                                onClick={openFile}
                            >
                                +
                            </span>
                            <input 
                                type="file" 
                                accept="image/*" 
                                hidden 
                                ref={file}  
                                name='fileInput' 
                                onChange={handleFileChange} 
                            />
                            {uploadMessage && (
                                <div className='mt-2 text-sm text-green-600 font-medium'>
                                    {uploadMessage}
                                </div>
                            )}
                        </div>
                    </div>
                )
            }
        </div>
    )
}
