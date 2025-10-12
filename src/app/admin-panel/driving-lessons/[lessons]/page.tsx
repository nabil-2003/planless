import React from 'react'
import Header from '@/components/admin/Header'
import LeftSide from '@/components/admin/LeftSide';
import InputEditable from '@/components/admin/ui/InputEditable';
import CustmButton from '@/components/admin/ui/CustmButton';
export default function page({lessons}: {lessons: string}) {
       
  return (
     <div className='content'>
                    <Header title="Rijles gegevens" />
                    <div className='w-full flex   overflow-hidden'>
                        <LeftSide className='w-[20%] border-l-0  rounded-t-none  mt-4 items-center bg-white rounded-r-lg  border-2 border-gray-200 h-auto  ' />
                        <div className='dashboard-container text-4xl text-center  w-[80%] '>
                           <div className='bg-white border-2 h-[70vh] border-gray-200 rounded-lg mx-3 mt-4 '>
                             <h2 className='text-left font-semibold text-2xl ml-4 mt-4'>Rijles gegevens</h2>
                             <div className='grid grid-cols-4 grid-rows-4  gap-2 mt-4   w-[95%] mx-auto h-[85%]  '>
                              
                               <InputEditable classeName='col-span-2 row-span-1 border-2' disabled={true} value='kareem kareem' label="instructeur" />
                                <InputEditable classeName='col-span-2 row-span-1' disabled={true} value='kareem kareem' label="student" />
                                <InputEditable classeName='col-span-2 row-span-1' disabled={true} value='kareem kareem' label="Lespakketten" />
                                <InputEditable classeName='col-span-2 row-span-1' disabled={true} value='kareem kareem' label="lesson duration" />
                                <InputEditable classeName='col-span-2 row-span-1' disabled={true} value='kareem kareem' label="starttijd les" />
                                <InputEditable classeName='col-span-2 row-span-1' disabled={true} value='kareem kareem' label="eindtijd les" />
                                <InputEditable classeName='col-span-2 row-span-1' disabled={true} value='€ 450' label="factuur bedrag" />
                                <InputEditable classeName='col-span-2 row-span-1' disabled={true} value='kareem kareem' label="betaalstatus" />
                                <InputEditable classeName='col-span-4 row-span-1' disabled={true} 
                                value='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia beatae recusandae officiis perferendis voluptas dolo' label="annuleringsreden" />
                            
                             </div>

                           </div>
                           <div className='mt-5 ml-10 mr-auto w-max '>
                            <CustmButton children="anulleren" 
                            
                           className=' text-white hover:opacity-80  capitalize py-4 px-8 mr-4 bg-amber-500 ' />
                            <CustmButton children="opslaan" 
                           className='  text-white hover:opacity-80  capitalize py-4 px-8 bg-blue-700 ' />
                           </div>

                        </div>
    
                    </div>
                </div>
  )
}
