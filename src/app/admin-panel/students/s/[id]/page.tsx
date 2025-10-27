"use client"
import Header from '@/components/admin/Header'
import LeftSide from '@/components/admin/LeftSide';
import TimeFilter from '@/components/admin/TimeFIlter';
import FIlterByType from '@/components/admin/FIlterByType'
import React, { use, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CusTomDate from '@/components/admin/ui/CustomDateModal'
import { FaRegPlusSquare, FaArrowDown, FaChartLine, FaChartBar, FaArrowLeft, FaHourglassHalf, FaRegEdit, FaCarSide, FaAngleDown } from 'react-icons/fa'
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
import { FaCar, FaCarOn } from 'react-icons/fa6';
import StudentResult, {  ExamenField, PopUP } from '@/components/admin/ui/StudentResult';


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




    return (
        <>
            <div className='content '>
                <Header title="Studenten" />
                <div className='w-full flex flex-col md:flex-row overflow-hidden'>
                    <LeftSide className='hidden md:flex md:w-[20%] border-l-0  rounded-t-none  mt-4 items-center bg-white rounded-r-lg  border-2 border-gray-200 h-auto  ' />
                    <div className='dashboard-container mx-5  w-full md:w-[80%] px-4 md:px-0 '>
                        <div className='flex flex-col md:flex-row justify-between items-start md:items-center  mt-5 mb-3 '> 
                          <CustmButton className='mt-5 h-[6vh] w-[8vw] bg-amber-500 text-white   '>
                            <FaArrowLeft className='inline mr-2 ' />
                            Terug
                        </CustmButton>
                      <CustmButton className=' mt-5 h-[6vh] w-[8vw] bg-dark-blue text-white   '>
                            <FaRegEdit className='inline mr-2 ' />
                            Bewerken
                        </CustmButton>
                        </div>
                        <h1 className='text-3xl  mb-2 font-semibold'>
                          Leskaart Details
                        </h1>
                        <span className='text-black mt-2 '>Maandag 14 Aug - 14:00</span>
                         <h1 className='text-2xl font-semibold mt-9 ml-4 mb-2  '>
                          Recente lesKaart
                         </h1>
                         <span className='text-black  ml-4 mb-4  '>Maandag 14 Aug - 14:00</span>
                         <h1 className='text-2xl font-semibold mt-9 ml-4 mb-2  '>
                            Basisverichtingen</h1>
                        <StudentResult
                         id={1}
                         title='Bediening van voertuig'
                         Icon={FaCarSide}
                         notes={ [
                             { name: "Voorbereidings & controlehandelingen", note: 6 },
                             { name: "Stuurroefeningen / kijktechnieken", note: 8 },
                             { name: "Ontkoppelen / koppelingen / wegrijden", note: 7 },
                             { name: "Remmen (afremmen en tot stilstand brengen)", note: 9 },
                             { name: "Opschakelen", note: 5 },
                             { name: "Terugschakelen", note: 10 },
                             { name: "Gasdosering / snelheidregeling", note: 6 },
                             { name: "Volgafstand", note: 6 },
                             { name: "Milieubewust rijgedrag", note: 8 }
                         ]}
                        />
                        
                       
                        <StudentResult
                        id={2}
                         title='Bijzondere verrichtingen'
                         Icon={FaCarSide}
                         notes={[
                           { name: "Stopopdracht / in rechte lijn achteruit", note: 0 },
                           { name: "Achteruit rijden door een bocht", note: 0 },
                           { name: "Parkeren in een vak achteruit", note: 0 },
                           { name: "Parkeren in een vak vooruit (links/rechts)", note: 0 },
                           { name: "Fileparkeren achterwaarts", note: 0 },
                           { name: "Fileparkeren voorwaarts", note: 0 },
                           { name: "Keren door middel van steken", note: 0 },
                           { name: "Keren door halve draai", note: 0 },
                           { name: "Hellingproef", note: 0 }
                         ]}
                        
                        />
                        <StudentResult
                        id={3} 
                         title='Bedrevenheid kijktechniek'
                         Icon={FaCarSide}
                         notes={[
                            { name: "Plaats op de weg", note: 0 },
                            { name: "Gevaarherkenning", note: 0 },
                                  { name: "Naderen en oversteken van kruispunten", note: 0 },
                           { name: "Geregelde / Ongeregelde kruispunten", note: 0 },
                           { name: "Naar rechts van richting veranderen", note: 0 },
                           { name: "Naar links van richting veranderen", note: 0 },
                           { name: "Berijden van rotondes", note: 0 },
                           { name: "Rijstrooktechniek", note: 0 },
                           { name: "Tegenoetkomen / Voorbijgaan / Inhalen", note: 0 },
                           { name: "Invoegen / Uitvoegen op auto(snel)wegen", note: 0 },
                           { name: "Zelfstandig rijden / Zelfreflectie", note: 0 },
                           { name: "Navigatiesysteem rijden", note: 0 }
                         ]}
                         />
                           <h1 className='ml-4 mt-10 font-semibold text-2xl '>Examen oefeningen</h1>
                          <PopUP title={<h1 className='text-amber-400 flex gap-3 items-center font-bold text-xl '> <span className=' w-[1vw] h-[1vw]  grid place-content-center  rounded-full border-amber-400 border-2'>!</span>Onvoldoende examenonderdelen</h1>}>
                             <PopUP title={<h1 className='text-amber-400 font-semibold text-lg '>Gedrag nabij en op kruispunt</h1>}>
                               <ExamenField  name='Plaats op de weg/van handeling'/>
                               <ExamenField  name='    Ontkoppelen / koppelingen / wegrijden'/>
                               <ExamenField  name='Aangepast/besluitvaardig rijden'/>
                               <ExamenField  name='    Geven van /reageren op signalen'/>
                               <ExamenField  name='Kijkgedrag'/>
                               <ExamenField  name='Reageren op verkeerslichten'/>
                               <ExamenField  name='Snellheid'/>
                               <ExamenField  name=' Reageren op overige tekens'/>
                               <ExamenField  name='    Belangen andere weggebruikers'/>

                             </PopUP>
                           
                          </PopUP>
                       
                    </div>
                 

                </div>

            </div>

        </>

    )
}


