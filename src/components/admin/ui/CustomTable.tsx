'use client'
import MenuIcon from '@/components/svgs/MenuIcon';
import { ActionModalRef } from '@/components/ui/Action';
import ActionModal from '@/components/ui/Action';
import React, { useRef } from 'react'


type Data = {
    instructeur : string , 
    student : string , 
    begintijd : string , 
    eindtijd : string , 
    lesduur : string , 
    factuur_bedrag : string , 
    betalingsstatus : string , 
    rijles_status : string , 
    annuleringstijd : string , 
    annuleringsreden : string , 
    acties : string , 
}


export default function CustomTable({data} :{data: Array<Data>} ) {

   

  return (
<>

    <div className='mb-4'>
     <ul className='  flex justify-around   border-gray-200 w-[95%] mx-3 *:h-[7vh]   bg-gray-100/90 p *:capitalize *:font-normal *:text-xs  items-center '>
       <li className='w-[4%] p-2  text-center flex items-center  border-gray-200 justify-center '>nr</li>
        <li className='w-[10%] p-2  text-center flex items-center  border-gray-200 justify-center'>instructeur</li>
        <li className='w-[8%] p-2  text-center flex items-center border-gray-200 justify-center'>student</li>
        <li className='w-[9%] p-2  text-center flex items-center  border-gray-200 justify-center'>Begintijd</li>
        <li className='w-[9%] p-2  text-center flex items-center  border-gray-200 justify-center'>Eindtijd</li>
        <li className='w-[7%] p-2  text-center flex items-center  border-gray-200 justify-center'>Lesduur</li>
        <li className='w-[9%] p-2  text-center flex items-center  border-gray-200 justify-center'>factuur bedrag</li>
        <li className='w-[11%] p-2  text-center flex items-center borde border-gray-200 justify-center'>Betalingsstatus</li>
        <li className='w-[9%] p-2  text-center flex items-center border-gray-200 justify-center'>Rijles status</li>
        <li className='w-[11%] p-2  text-center flex items-center  border-gray-200 justify-center'>annuleringstijd</li>
        <li className='w-[12%] p-2  text-center flex items-center  border-gray-200 justify-center'>annuleringsreden</li>
        <li className='w-[6%] p-2  text-center flex items-center  border-gray-200 justify-center'>acties</li>
      </ul>
        <TableElement ele={[]} />
        <TableElement ele={[]} />
        <TableElement ele={[]} />
        <TableElement ele={[]} />
        <TableElement ele={[]} />
        <TableElement ele={[]} />
        <TableElement ele={[]} />
        <TableElement ele={[]} />
        <TableElement ele={[]} />
        <TableElement ele={[]} />
              
    </div>
     <div className='w-[95%] mx-auto  mb-4 flex justify-around items-center   '>
      <span className='cursor-pointer text-sm  border-2 rounded border-[#EAECF0] hover:bg-blue-950/10 px-3 py-2 font-semibold'>Vorige</span>
      <span className=' text-sm'>Pagina 1 van 10</span>
      <span className='cursor-pointer text-sm  border-2 rounded border-[#EAECF0] hover:bg-blue-950/10 px-3 py-2  font-semibold'>Volgende</span>
     </div>
     <div className='mt-6 mb-10 ml-3'>
            <span className='cursor-pointer text-sm  border-2 rounded border-[#EAECF0] hover:bg-blue-950/10 px-3 py-2  font-semibold'>Weergaven 1-10 van 84</span>
     </div>
</>
     

  );
}
const TableElement = ({ele}: {ele: Data}) => {
  const modalRef = useRef<ActionModalRef>(null);
  

console.log(ele)
    return(
         <ul className=' relative border-1 border-gray-200  flex justify-around  w-[95%] mx-3 *:h-[7vh]   bg-gray-100/40 p *:capitalize *:font-normal *:text-xs  items-center '>
        <li className='w-[4%] p-2  text-center flex items-center border-r-1 border-gray-200 justify-center '>1</li>
        <li className='w-[10%] p-2  text-center flex items-center justify-center '>kareem</li>
        <li className='w-[8%] p-2  text-center  flex items-center justify-center'>nabil</li>
        <li className='w-[9%] p-2  text-center flex items-center justify-center'>08/11/23 09:00</li>
        <li className='w-[9%] p-2  text-center flex items-center justify-center'>08/11/24 10:00</li>
        <li className='w-[7%] p-2  text-center flex items-center justify-center'>00:00:00</li>
        <li className='w-[9%] p-2  text-center flex items-center justify-center'>450 £</li>
        <li className='w-[11%] p-2  text-center flex items-center justify-center'><span className='bg-[var(--table-bg-clr)] text-[var(--table-text-clr)] text-xs px-2 py-1 rounded-lg '>in Behandeling</span></li>
        <li className='w-[11%] p-2  text-center flex items-center justify-center'><span className='bg-[var(--table-bg-clr)] text-[var(--table-text-clr)] text-xs px-2 py-1 rounded-lg '>in Behandeling</span></li>
        <li className='w-[11%] p-2  text-center flex items-center justify-center'>12/10/24 09/00</li>
        <li className='whitespace-normal w-[12%] flex items-center justify-center text-xs p-2  text-center '>Lorem ipsum dolor sit amet.</li>
        <li className='w-[6%] h-full p-2 flex items-center justify-center  text-center border-l-1 border-gray-200 '>

            <button className='outline-none cursor-pointer' onClick={() => {modalRef.current?.Open()}} >
              <MenuIcon   s='gray' w='20px' h='20px' f='gray'/>
            </button>
           
        </li>
 <ActionModal ref={modalRef}  />
      </ul>

    )
}
   

