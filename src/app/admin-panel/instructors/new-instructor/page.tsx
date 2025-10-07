"use client"
import Header from '@/components/admin/Header'
import LeftSide from '@/components/admin/LeftSide';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
    const [instructor, setInstructor] = useState<any>({
        // Personal Information
        naam_instructeur: "Jan van der Berg", // Name
        bsn_nummer: "123456789", // BSN number
        email: "jan.vandenberg@rijschool.nl", // Email address
        geboortedatum: "15/03/1985", // Birth date
        adres: "Hoofdstraat 45, 1234 AB Amsterdam", // Address
        telefoonnummer: "+31612345678", // Phone number
        
        // License Information
        rijbewijsnummer: "AB123CD456", // License number
        uitgiftedatum_rijbewijs: "15/03/2010", // Issue date license
        vervaldatum_rijbewijs: "15/03/2030", // Expiry date license
        upload_bestanden: "", // File upload
        
        // Instructor Information
        instructeurskaartnummer: "INS789456123", // Instructor card number
        vervaldatum_instructeurskaart: "15/03/2027", // Expiry date instructor card
        
        // Contract Information
        contractbegindatum: "01/01/2023", // Contract start date
        contractvervaldatum: "31/12/2025", // Contract expiry date
        salaris: "€3200", // Monthly salary
        
        // Document Uploads
        upload_contract: "", // Contract file
        upload_instructeurskaart: "" // Instructor card file
    });

    const handleSubmit = () => {
        // Prepare form data for backend submission
        const formData = {
            personalInfo: {
                naam_instructeur: instructor.naam_instructeur,
                bsn_nummer: instructor.bsn_nummer,
                email: instructor.email,
                geboortedatum: instructor.geboortedatum,
                adres: instructor.adres,
                telefoonnummer: instructor.telefoonnummer
            },
            licenseInfo: {
                rijbewijsnummer: instructor.rijbewijsnummer,
                uitgiftedatum_rijbewijs: instructor.uitgiftedatum_rijbewijs,
                vervaldatum_rijbewijs: instructor.vervaldatum_rijbewijs,
                upload_bestanden: instructor.upload_bestanden
            },
            instructorInfo: {
                instructeurskaartnummer: instructor.instructeurskaartnummer,
                vervaldatum_instructeurskaart: instructor.vervaldatum_instructeurskaart
            },
            contractInfo: {
                contractbegindatum: instructor.contractbegindatum,
                contractvervaldatum: instructor.contractvervaldatum,
                salaris: instructor.salaris
            },
            documents: {
                upload_contract: instructor.upload_contract,
                upload_instructeurskaart: instructor.upload_instructeurskaart,
                upload_bestanden: instructor.upload_bestanden
            }
        };

        // Log to console for validation
        console.log("Form Data to be sent to backend:", formData);
        
        // Show alert with formatted data
        alert(`Instructor Data Ready for Backend:\n\n` +
              `Personal Info:\n` +
              `- Name: ${formData.personalInfo.naam_instructeur}\n` +
              `- BSN: ${formData.personalInfo.bsn_nummer}\n` +
              `- Email: ${formData.personalInfo.email}\n` +
              `- Birth Date: ${formData.personalInfo.geboortedatum}\n` +
              `- Address: ${formData.personalInfo.adres}\n` +
              `- Phone: ${formData.personalInfo.telefoonnummer}\n\n` +
              `License Info:\n` +
              `- License Number: ${formData.licenseInfo.rijbewijsnummer}\n` +
              `- Issue Date: ${formData.licenseInfo.uitgiftedatum_rijbewijs}\n` +
              `- Expiry Date: ${formData.licenseInfo.vervaldatum_rijbewijs}\n` +
              `- License Documents: ${formData.licenseInfo.upload_bestanden || 'No file uploaded'}\n\n` +
              `Instructor Info:\n` +
              `- Card Number: ${formData.instructorInfo.instructeurskaartnummer}\n` +
              `- Card Expiry: ${formData.instructorInfo.vervaldatum_instructeurskaart}\n\n` +
              `Contract Info:\n` +
              `- Start Date: ${formData.contractInfo.contractbegindatum}\n` +
              `- End Date: ${formData.contractInfo.contractvervaldatum}\n` +
              `- Salary: ${formData.contractInfo.salaris}\n\n` +
              `Documents:\n` +
              `- Contract: ${formData.documents.upload_contract || 'No file uploaded'}\n` +
              `- Instructor Card: ${formData.documents.upload_instructeurskaart || 'No file uploaded'}\n` +
              `- License Files: ${formData.documents.upload_bestanden || 'No file uploaded'}`
        );

        // TODO: Send formData to backend API
        // Example: await fetch('/api/instructors', { method: 'POST', body: JSON.stringify(formData) })
    };

   



  
  

 


    return (
        <>
            <div className='content '>
                <Header title="instructeurs" />
                <div className='w-full flex   overflow-hidden'>
                    <LeftSide className='w-[20%] border-l-0  rounded-t-none  mt-4 items-center bg-white rounded-r-xl  border-2 border-gray-200 h-auto  ' />
                    <div className='dashboard-container  w-[80%] '>
                        <CustmButton  onClick={()=>{}} className="mt-4  py-3 px-6 bg-[#fe911f] ml-4 shadow-sm capitalize text-white  mr-4 flex items-center " >
                              <span>terug</span>
                        </CustmButton>
                        <div className='form-container mx-4 border-2 border-gray-200 rounded-xl mt-4 p-4  bg-white '>
                            <h1 className='font-bold text-xl  '>Persoonlijke gegevens</h1>
                            <form className='w-full  gap-2 flex  flex-wrap justify-between' action="">

                                <Input type='text' title='Naam instructeur' value={instructor.naam_instructeur} onChange={(e) => { setInstructor({ ...instructor, naam_instructeur: e.target.value }) }} placeholder='john doe' />
                                <Input type='number' title='BSN-nummer' value={instructor.bsn_nummer} onChange={(e) => { setInstructor({ ...instructor, bsn_nummer: e.target.value }) }} placeholder='28018273' />
                                <Input type='email' title='E-mailadres' value={instructor.email} onChange={(e) => { setInstructor({ ...instructor, email: e.target.value }) }} placeholder='example@example.com' />
                                <Input type='text' title='Geboortedatum' value={instructor.geboortedatum} onChange={(e) => { setInstructor({ ...instructor, geboortedatum: e.target.value }) }} placeholder='10/10/2000' />
                                <Input type='text' title='Adres' value={instructor.adres} onChange={(e) => { setInstructor({ ...instructor, adres: e.target.value }) }} placeholder='bijv:Bloemgracht 19' />
                                <Input type='tel' title='telefoonnummer' value={instructor.telefoonnummer} onChange={(e) => { setInstructor({ ...instructor, telefoonnummer: e.target.value }) }} placeholder='+31656171811' />

                            </form>
                        </div>
                    <div className=' mx-4 rounded-xl mt-4 p-4  border-2 border-gray-200  bg-white '> 
                          <h1 className='font-bold text-xl  '>Rijbewijsgegevens</h1>
                            <form className='w-full  gap-2 flex  flex-wrap justify-between' action="">

                                <Input type='text' title='Rijbewijsnummer' value={instructor.rijbewijsnummer} onChange={(e) => { setInstructor({ ...instructor, rijbewijsnummer: e.target.value }) }} placeholder='AB123CD456' />
                                <Input type='text' title='Uitgiftedatum rijbewijs' value={instructor.uitgiftedatum_rijbewijs} onChange={(e) => { setInstructor({ ...instructor, uitgiftedatum_rijbewijs: e.target.value }) }} placeholder='29/08/2022' />
                                <Input type='text' title='Vervaldatum rijbewijs' value={instructor.vervaldatum_rijbewijs} onChange={(e) => { setInstructor({ ...instructor, vervaldatum_rijbewijs: e.target.value }) }} placeholder='29/08/2032' />
                                <Input type='file' title='Upload bestanden' value={instructor.upload_bestanden} onChange={(e) => { setInstructor({ ...instructor, upload_bestanden: e.target.value }) }} placeholder='' />

                            </form>
                    </div>
                     <div className=' mx-4 rounded-xl mt-4 p-4  border-2 border-gray-200 bg-white '> 
                          <h1 className='font-bold text-xl  '>Instructeursgegevens</h1>
                            <form className='w-full  gap-2 flex  flex-wrap justify-between' action="">
                                <Input type='text' title='Instructeurskaartnummer' value={instructor.instructeurskaartnummer} onChange={(e) => { setInstructor({ ...instructor, instructeurskaartnummer: e.target.value }) }} placeholder='KL987MN654' />
                                <Input type='text' title='Vervaldatum instructeurskaart' value={instructor.vervaldatum_instructeurskaart} onChange={(e) => { setInstructor({ ...instructor, vervaldatum_instructeurskaart: e.target.value }) }} placeholder='29/08/2026' />
                            </form>
                    </div>
                      <div className=' mx-4 rounded-xl mt-4 p-4  bg-white border-2 border-gray-200'> 
                          <h1 className='font-bold text-xl  '>Contractgegevens</h1>
                            <form className='w-full  gap-2 flex  flex-wrap justify-between' action="">
                                <Input type='text' title='Contractbegindatum' value={instructor.contractbegindatum} onChange={(e) => { setInstructor({ ...instructor, contractbegindatum: e.target.value }) }} placeholder='29/08/2022' />
                                <Input type='text' title='Contractvervaldatum' value={instructor.contractvervaldatum} onChange={(e) => { setInstructor({ ...instructor, contractvervaldatum: e.target.value }) }} placeholder='29/08/2025' />
                                <Input type='text' title='Salaris per maand' value={instructor.salaris} onChange={(e) => { setInstructor({ ...instructor, salaris: e.target.value }) }} placeholder='€3500' />
                            </form>
                    </div>
                      <div className=' mx-4 rounded-xl mt-4 p-4  bg-white border-2 border-gray-200'> 
                          <h1 className='font-bold text-xl  '>Documenten uploaden</h1>
                            <form className='w-full  gap-2 flex  flex-wrap justify-between' action="">
                                <Input type='file' title='Upload contract' value={instructor.upload_contract} onChange={(e) => { setInstructor({ ...instructor, upload_contract: e.target.value }) }} placeholder='' />
                                <Input type='file' title='Upload instructeurskaart' value={instructor.upload_instructeurskaart} onChange={(e) => { setInstructor({ ...instructor, upload_instructeurskaart: e.target.value }) }} placeholder='' />
                            </form>
                    </div>
                     <div className='buttons mt-8 mb-4 mx-auto  w-[90%] flex justify-between '>
                                            <CustmButton  className='bg-[#fe911f] py-4 pl-4 pr-4  text-white text-sm'>
                                                annlueren
                                            </CustmButton>
                                                <CustmButton  onClick={handleSubmit}  className='bg-[#2d46c4] py-4 pl-4 pr-4  text-white text-sm '>
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
            // Create a mock change event with the filename as value
            const mockEvent = {
                target: {
                    value: selectedFile.name
                }
            } as React.ChangeEvent<HTMLInputElement>
            onChange(mockEvent)
        }
    }
   
    return (
        <div className='form-field flex flex-col w-[49%] mt-4'>

                  <span className=''>{title}</span>

            {
               type !== "file" && (
                 !istextArea &&
                <input type={type} onChange={onChange} value={value} className='border-2 mt-3 border-gray-300 rounded-md p-2  outline-none  placeholder:p-2 placeholder:capitalize' placeholder={placeholder} />
                ||
                <textarea onChange={onChange} value={value} className='border-2 mt-3 border-gray-300 rounded-md p-4 h-[10vh]  resize-none  outline-none   placeholder:capitalize' placeholder={placeholder} />

               ) ||
               <div className='border-2 mt-4   border-gray-300 p-6 rounded-xl '>
            
                <div className='file border-2 border-gray-300 p-2 rounded-xl '>
                    <span className='w-[5vw] h-[5vw]  rounded-lg border-2 border-[var(--dark-blue)]  border-dashed  grid  place-items-center text-lg text-[var(--dark-blue)] cursor-pointer' onClick={openFile} >+</span>
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

            }

        </div>
    )
}

