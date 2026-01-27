"use client"
import Header from '@/components/admin/Header'
import LeftSide from '@/components/admin/LeftSide';
import FIlterByType from '@/components/admin/FIlterByType'
import React, { use, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CusTomDate from '@/components/admin/ui/CustomDateModal'
import { FaRegPlusSquare, FaArrowDown, FaChartLine, FaChartBar, FaArrowLeft, FaHourglassHalf, FaRegEdit, FaCarSide, FaAngleDown } from 'react-icons/fa'

import CustmButton from '@/components/admin/ui/CustmButton';

import StudentResult, { InputNote, Note, PopUP, StudentResultEditing } from '@/components/admin/ui/StudentResult';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import Breadcrumb from '@/components/admin/Breadcrumb';

export default function page({params}:{params: Promise<{id : string}>}) {
const router = useRouter();
const id = use(params).id;


  return (
    <>
      <div className='content bg-gray-50 '>
        <Header title="Studenten" />
         <Breadcrumb items={[
                    
                    { href: '/admin-panel/cards', label: 'Rijlessen ' },
                     { href: '/admin-panel/cards/', label: "edit"  } , 
                    { href: '/admin-panel/cards/notes/edit/'+id, label: id  },
                   ]
             } />
        <div className='w-full flex flex-col md:flex-row overflow-hidden'>
          <LeftSide className='hidden md:flex md:w-[20%] border-l-0  rounded-t-none  mt-4 items-center bg-white rounded-r-lg  border-2 border-gray-200 h-auto  ' />
          <div className='dashboard-container mx-5  w-full md:w-[80%] px-4 md:px-0 '>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center  mt-5 mb-3 '>



            </div>
            <h1 className='title-page mb-1'>
              Leskaart Details
            </h1>
            <span className='text-black mt-2 '>Maandag 14 Aug - 14:00</span>
            <div className='border-1 p-3 mt-4  border-gray-50 rounded-4xl bg-white'>
              <h1 className='title-section gap-3 mt-6 ml-4 mb-1 flex items-center '>
                <span>Recente lesKaart</span> <span className=' px-3 py-3 rounded-2xl mt-5 mr-3 mb-5  w-max bg-[#FFDDBA] text-white   '>
                  <span className='text-[#A95600] flex items-center gap-2'><img src="/edit_brown.svg" alt="" />
                    bewerkingsmodus</span>
                </span>
              </h1>
              <h1 className='title-section mt-6 ml-4 mb-1'>
                Basisverichtingen</h1>
              <StudentResultEditing
                id={1}
                className='mx-4 '
                Title='Bediening van voertuig'
                Icon={FaCarSide}
                notes={[
                  { name: "Voorbereidings & controlehandelingen", note: 6, comment: 'tt' },
                  { name: "Stuurroefeningen / kijktechnieken", note: 8, comment: 'tt' },
                  { name: "Ontkoppelen / koppelingen / wegrijden", note: 7, comment: 'tt' },
                  { name: "Remmen (afremmen en tot stilstand brengen)", note: 9, comment: 'tt' },
                  { name: "Opschakelen", note: 5, comment: 'tt' },
                  { name: "Terugschakelen", note: 10, comment: 'tt' },
                  { name: "Gasdosering / snelheidregeling", note: 6, comment: 'tt' },
                  { name: "Volgafstand", note: 6, comment: 'tt' },
                  { name: "Milieubewust rijgedrag", note: 8, comment: 'tt' }
                ]}
              />


              <StudentResultEditing
                id={2}
                className='mx-4 '
                Title='Bijzondere verrichtingen'
                Icon={FaCarSide}

                notes={[
                  { name: "Stopopdracht / in rechte lijn achteruit", note: 0, comment: 'tt' },
                  { name: "Achteruit rijden door een bocht", note: 0, comment: 'tt' },
                  { name: "Parkeren in een vak achteruit", note: 0, comment: 'tt' },
                  { name: "Parkeren in een vak vooruit (links/rechts)", note: 0, comment: 'tt' },
                  { name: "Fileparkeren achterwaarts", note: 0, comment: 'tt' },
                  { name: "Fileparkeren voorwaarts", note: 0, comment: 'tt' },
                  { name: "Keren door middel van steken", note: 0, comment: 'tt' },
                  { name: "Keren door halve draai", note: 0, comment: 'tt' },
                  { name: "Hellingproef", note: 0, comment: 'tt' }
                ]}

              />
              <StudentResultEditing
                id={3}
                Title='Bedrevenheid kijktechniek'
                className='mx-4 '
                Icon={FaCarSide}

                notes={[
                  { name: "Plaats op de weg", note: 0, comment: 'tt' },
                  { name: "Gevaarherkenning", note: 0 },
                  { name: "Naderen en oversteken van kruispunten", note: 0, comment: 'tt' },
                  { name: "Geregelde / Ongeregelde kruispunten", note: 0, comment: 'tt' },
                  { name: "Naar rechts van richting veranderen", note: 0, comment: 'tt' },
                  { name: "Naar links van richting veranderen", note: 0, comment: 'tt' },
                  { name: "Berijden van rotondes", note: 0, comment: 'tt' },
                  { name: "Rijstrooktechniek", note: 0, comment: 'tt' },
                  { name: "Tegenoetkomen / Voorbijgaan / Inhalen", note: 0, comment: 'tt' },
                  { name: "Invoegen / Uitvoegen op auto(snel)wegen", note: 0, comment: 'tt' },
                  { name: "Zelfstandig rijden / Zelfreflectie", note: 0, comment: 'tt' },
                  { name: "Navigatiesysteem rijden", note: 0, comment: 'tt' }
                ]}
              />
              <h1 className='ml-4 mt-10 title-section'>Examen oefeningen</h1>
              <PopUP title={<h1 className='text-amber-400 flex gap-3 items-center title-section font-semibold'> <span className=' w-[1vw] h-[1vw] p-3  grid place-content-center  rounded-full border-amber-400 border-2'>!</span>Onvoldoende examenonderdelen</h1>}>

                <StudentResultEditing
                  Title='Gedrag nabij en op kruispunt'
                  id={4}
                  isTitle={true}
                  notes={[{ name: "Plaats op de weg/van handeling", note: 0, comment: 'tt' },
                  { name: "Ontkoppelen / koppelingen / wegrijden", note: 0, comment: 'tt' },
                  { name: "Aangepast/besluitvaardig rijden", note: 0, comment: 'tt' },
                  { name: "Geven van /reageren op signalen", note: 0, comment: 'tt' },
                  { name: "Kijkgedrag", note: 0, comment: 'tt' },
                  { name: "Rijklaar maken en bediening/beheersen", note: 0, comment: 'tt' },
                  { name: "Reageren op verkeerslichten", note: 0, comment: 'tt' },
                  { name: "Snelheid", note: 0, comment: 'tt' },
                  { name: "Reageren op overige tekens", note: 0, comment: 'tt' },
                  { name: "Belangen andere weggebruikers", note: 0, comment: 'tt' },
                  ]}


                />
              </PopUP>
              <PopUP title={<h1 className='text-amber-400 flex gap-3 items-center title-section font-semibold'> <span className=' w-[1vw] h-[1vw] p-3  grid place-content-center  rounded-full border-amber-400 border-2'>!</span>Onvoldoende uitgevoerde bijzondere verrichting</h1>}>
                <div>
                  <InputNote name='Oogtest' note={0} comment='tt'></InputNote>
                  <InputNote name='Navigatiesysteem' note={0} comment='tt'></InputNote>
                </div>
              </PopUP>
              <h1 className='ml-4 mt-10 title-section'>Zelfreflectie kandidaat</h1>
              <InputNote name='Omgaan met het voertuig' note={0} comment='tt'></InputNote>
              <InputNote name='Veiligheid' note={0} comment='tt'></InputNote>
              <InputNote name='Doorstroming' note={0} comment='tt'></InputNote>
              <InputNote name='Sociaal rijgedrag' note={0} comment='tt'></InputNote>
              <InputNote name='Milieubewust rijden' note={0} comment='tt'></InputNote>
            </div>
            <div className='flex justify-between items-center'>
              <CustmButton onClick={()=>{
                router.back()
              }} className='mt-5 ml-3 mb-5 h-[6vh] w-[8vw] bg-amber-500 text-white   '>
                <FaArrowLeft className='inline mr-2 ' />
                Terug
              </CustmButton>
              <CustmButton className='mt-5 mr-3 mb-5 h-[6vh] w-max bg-dark-blue text-white   '>
                <span className='text-[white] flex items-center gap-2'><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 3.75C2.5 3.41848 2.6317 3.10054 2.86612 2.86612C3.10054 2.6317 3.41848 2.5 3.75 2.5H4.5V4.75C4.5 4.91415 4.53233 5.0767 4.59515 5.22835C4.65797 5.38001 4.75004 5.51781 4.86612 5.63388C5.10054 5.8683 5.41848 6 5.75 6H9.75C9.91415 6 10.0767 5.96767 10.2284 5.90485C10.38 5.84203 10.5178 5.74996 10.6339 5.63388C10.75 5.51781 10.842 5.38001 10.9048 5.22835C10.9677 5.0767 11 4.91415 11 4.75V2.52C11.2497 2.56574 11.4796 2.68643 11.659 2.866L13.134 4.341C13.2501 4.4571 13.3421 4.59492 13.4049 4.7466C13.4677 4.89827 13.5 5.06084 13.5 5.225V12.25C13.5001 12.5382 13.4006 12.8175 13.2183 13.0407C13.0361 13.264 12.7823 13.4174 12.5 13.475V9.25C12.5 8.91848 12.3683 8.60054 12.1339 8.36612C11.8995 8.1317 11.5815 8 11.25 8H4.75C4.41848 8 4.10054 8.1317 3.86612 8.36612C3.6317 8.60054 3.5 8.91848 3.5 9.25V13.475C3.21766 13.4174 2.9639 13.264 2.78167 13.0407C2.59945 12.8175 2.49994 12.5382 2.5 12.25V3.75ZM4.5 13.5V9.25C4.5 9.1837 4.52634 9.12011 4.57322 9.07322C4.62011 9.02634 4.6837 9 4.75 9H11.25C11.3163 9 11.3799 9.02634 11.4268 9.07322C11.4737 9.12011 11.5 9.1837 11.5 9.25V13.5H4.5ZM10 2.5V4.75C10 4.8163 9.97366 4.87989 9.92678 4.92678C9.87989 4.97366 9.8163 5 9.75 5H5.75C5.6837 5 5.62011 4.97366 5.57322 4.92678C5.52634 4.87989 5.5 4.8163 5.5 4.75V2.5H10ZM3.75 1.5C3.15326 1.5 2.58097 1.73705 2.15901 2.15901C1.73705 2.58097 1.5 3.15326 1.5 3.75V12.25C1.5 12.8467 1.73705 13.419 2.15901 13.841C2.58097 14.2629 3.15326 14.5 3.75 14.5H12.25C12.8467 14.5 13.419 14.2629 13.841 13.841C14.2629 13.419 14.5 12.8467 14.5 12.25V5.225C14.5 4.92952 14.4418 4.63694 14.3287 4.36396C14.2157 4.09097 14.0499 3.84293 13.841 3.634L12.366 2.159C12.1571 1.95007 11.909 1.78434 11.636 1.67126C11.3631 1.55819 11.0705 1.5 10.775 1.5H3.75Z" fill="white" />
                </svg>

                  Opslaan</span>

              </CustmButton>

            </div>
          </div>



        </div>

      </div>

    </>

  )
}

