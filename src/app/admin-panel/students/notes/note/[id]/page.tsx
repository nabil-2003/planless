"use client"
import Header from '@/components/admin/Header'
import LeftSide from '@/components/admin/LeftSide';

import React, { use, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FaRegPlusSquare, FaArrowDown, FaChartLine, FaChartBar, FaArrowLeft, FaHourglassHalf, FaRegEdit, FaCarSide, FaAngleDown } from 'react-icons/fa'

import CustmButton from '@/components/admin/ui/CustmButton';

import StudentResult, { Note, PopUP } from '@/components/admin/ui/StudentResult';
import { useRouter } from 'next/navigation';

export default function page({ params }: { params: Promise<{ id: string }>   }) {
 const id = use(params).id;


const navigate = useRouter()
  return (
    <>
      <div className='content bg-gray-50 '>
        <Header title="Studenten" />
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
                <span>Recente lesKaart</span> <span onClick={()=>{
                navigate.push("./../edit/"+id)
              }} className='bg-gray-200 text-sm cursor-pointer    rounded-xl '><div className='flex gap-2 text-[#575757] p-3'><img src="/edit.svg" /><span>bewerking</span></div></span>
              </h1>
              <h1 className='title-section mt-6 ml-4 mb-1'>
                Basisverichtingen</h1>
              <StudentResult
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


              <StudentResult
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
              <StudentResult
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

                <StudentResult
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
                  <Note name='Oogtest' note={0} comment='tt'></Note>
                  <Note name='Navigatiesysteem' note={0} comment='tt'></Note>
                </div>
              </PopUP>
              <h1 className='ml-4 mt-10 title-section'>Zelfreflectie kandidaat</h1>
              <Note name='Omgaan met het voertuig' note={0} comment='tt'></Note>
              <Note name='Veiligheid' note={0} comment='tt'></Note>
              <Note name='Doorstroming' note={0} comment='tt'></Note>
              <Note name='Sociaal rijgedrag' note={0} comment='tt'></Note>
              <Note name='Milieubewust rijden' note={0} comment='tt'></Note>
            </div>
            <div className='flex justify-between items-center'>
              <CustmButton onClick={()=>{
                navigate.back()
              }}  className='mt-5 select-none  ml-3 mb-5 h-[6vh] w-[8vw] bg-amber-500 text-white   '>
                <FaArrowLeft className='inline mr-2 ' />
                Terug
              </CustmButton>
              <span  className='mt-5 mr-3 p-3 rounded-xl overflow-hidden mb-5  w-max bg-[#FFDDBA] text-white  select-none  '>
                <span className='text-[#A95600] flex items-center gap-2 '><img src="/edit_brown.svg" alt="" />
                bewerkingsmodus</span>
                
              </span>
            </div>
          </div>



        </div>

      </div>

    </>

  )
}

/**
 * 
 * <PopUP title={<h1 className='text-amber-400 flex gap-3 items-center font-bold text-xl '> <span className=' w-[1vw] h-[1vw] p-3  grid place-content-center  rounded-full border-amber-400 border-2'>!</span>Onvoldoende examenonderdelen</h1>}>
                             <PopUP  title={<h1 className='text-amber-400 font-semibold text-lg '>Gedrag nabij en op kruispunt</h1>}>
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
                          <PopUP   title={<h1 className='text-amber-400 flex gap-3 items-center font-bold text-xl '> <span className=' w-[1vw] h-[1vw] p-3  grid place-content-center  rounded-full border-amber-400 border-2'>!</span>Onvoldoende uitgevoerde bijzondere verrichting</h1>}>
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
                          <PopUP   title={<h1 className='text-amber-400 flex gap-3 items-center font-bold text-xl '> <img src="/eyes_exam.svg" alt="" /> Oogtest</h1>}>
                             <Note  name='Kenteken lezen' note={0} comment='tt'></Note>
                          </PopUP>
                           <PopUP   title={<h1 className='text-amber-400 flex gap-3 items-center font-bold text-xl '> <img src="/eyes_exam.svg" alt="" /> Navigatiesysteem</h1>}>
                             <Note  comment='tt' name='Kenteken lezen' note={0}></Note>
                          </PopUP>
                          <h1 className='ml-4 mt-10 font-semibold text-2xl '>Zelfreflectie kandidaat</h1>
                          <PopUP   title={<h1 className='text-amber-400 flex gap-3 items-center font-bold text-xl '> <FaCarSide className='text-blue-800'></FaCarSide> Omgaan met het voertuig</h1>}>
                             <PopUP title='Onder normale verkeersomstandigheden bedien ik de auto op een technisch juiste wijze en heb ik de auto onder controle.'
                             >
                               <div>Onder normale verkeersomstandigheden bedien ik de auto op een technisch juiste wijze en heb ik de auto onder controle.</div>
                             </PopUP>
                          </PopUP>
                            <PopUP   title={<h1 className='text-amber-400 flex gap-3 items-center font-bold text-xl '> <img src="/protect.svg" alt="" /> Veiligheid</h1>}>
                             <PopUP title='Ik houd voldoende afstand van het verkeer dat voor mij rijdt en ik zorg voor voldoende ruimte rondom auto. Mogelijke gevaren herken ik op tijd en ik zorg dat het zo veilig mogelijk blijft.'
                             >
                               <div>Ik houd voldoende afstand van het verkeer dat voor mij rijdt en ik zorg voor voldoende ruimte rondom auto. Mogelijke gevaren herken ik op tijd en ik zorg dat het zo veilig mogelijk blijft.</div>
                             </PopUP>
                          </PopUP>
                             <PopUP   title={<h1 className='text-amber-400 flex gap-3 items-center font-bold text-xl '> <img src="/arrow.svg" alt="" /> Doorstroming</h1>}>
                             <PopUP title='Ik hinder het andere verkeer niet onnodig en zorg dat het zo veel mogelijk kan doorrijden.'
                             >
                               <div>Ik hinder het andere verkeer niet onnodig en zorg dat het zo veel mogelijk kan doorrijden.</div>
                             </PopUP>
                          </PopUP>
                            <PopUP   title={<h1 className='text-amber-400 flex gap-3 items-center font-bold text-xl '> <img src="/people.svg" alt="" /> Sociaal rijgedrag</h1>}>
                             <PopUP title='Bij het autorijden houd ik rekening met de gedragingen van zwakkere verkeersdeelnemers zoals kinderen, ouderen, voetgangers en fietsers. Ik hinder het andere verkeer niet onnodig en zorg dat het zoveel mogelijk kan doorrijden.'
                             >
                               <div>Bij het autorijden houd ik rekening met de gedragingen van zwakkere verkeersdeelnemers zoals kinderen, ouderen, voetgangers en fietsers. Ik hinder het andere verkeer niet onnodig en zorg dat het zoveel mogelijk kan doorrijden.</div>
                             </PopUP>
                          </PopUP>
                            <PopUP   title={<h1 className='text-amber-400 flex gap-3 items-center font-bold text-xl '> <img src="/spring.svg" alt="" /> Milieubewust rijden</h1>}>
                             <PopUP title='Bij het autorijden houd ik rekening met de gedragingen van zwakkere verkeersdeelnemers zoals kinderen, ouderen, voetgangers en fietsers. Ik hinder het andere verkeer niet onnodig en zorg dat het zoveel mogelijk kan doorrijden.'
                             >
                               <div>Ik weet hoe ik milieubewust moet autorijden en ik pas dat in de praktijk toe.</div>
                             </PopUP>
                          </PopUP>

 */
