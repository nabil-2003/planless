import React from 'react'
import { createPortal } from 'react-dom'
import CustmButton from '../CustmButton'


export default function DecicionModal({action , table  , content , isOpen , title  , btn1 , btn2} : {
    action : "confirm" | "cancel" | "flag" | "reschedule" | "hide" | "abrove" , 
    table : string , 
    content : string ,  isOpen : boolean ,
    title? : string,
    id ?: string
    btn1 : {
        text : string ,
        onClick : ()=>void 
        isForClose ?: boolean
    } ,
    btn2 : {
        text : string ,
        onClick : ()=>void,
        isForClose ?: boolean
    }
}) {
    const  getsrcImage = ()=>{
            switch(action){
                case "confirm" : return "/confirm.svg"
                case "cancel" : return "/modal/delete.svg"
                case "flag" : return "/modal/flag.svg"
                case "reschedule" : return "/modal/flag.svg"
                case 'hide' : return "/modal/hide.svg"
                case "abrove" : return "/modal/flag.svg"
                default : return "/confirm.svg"
            }
    }
  return createPortal(<>
       <div  id={'action_confirm'} className={`fixed ${isOpen ? 'grid' : 'hidden'} place-items-center  select-none   inset-0 bg-black/50 z-50 `}>
              
                      <div  className='rounded-lg border-gray-100 shadow-lg bg-white border-2 p-3 w-[90vw] md:w-auto confirm'>
                      <img src={getsrcImage()} alt="" className='w-[80vw] md:w-[15vw] h-[10vh] mx-auto mt-4' />
                      <div className='text-center mt-4'>
                          <h3 className='text-lg font-semibold'>{title}</h3>
                          <p className='text-sm p-4 text-gray-500'>{content}</p>    
                      </div>
                      <div className='w-[96%] h-max mt-4 mx-auto  flex flex-wrap  gap-2  justify-around'>
                         <CustmButton onClick={btn1?.onClick} className='bg-[#FE911F]  text-white w-[47%]' >
                             {btn1?.text}
                         </CustmButton>
                          <CustmButton onClick={btn2?.onClick} className='bg-[#024089] text-xs  text-white w-[48%]' >
                             {btn2?.text}
                         </CustmButton>
                      </div>
                       </div>
             </div>

  </>, document.body)
}
