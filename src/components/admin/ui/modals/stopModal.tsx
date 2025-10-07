'use client'
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import CustmButton from '../CustmButton'



export type Modalref ={
    open ?: ()=>void 
    close? :()=>void 
}
type props = {


}
const stop= forwardRef<Modalref , props>((_, ref)=>{
       const refDiv = useRef<HTMLDivElement>(null)
         const open = useCallback(()=>{
               if(!refDiv.current) return 
              refDiv.current?.classList.remove("hidden")
               refDiv.current?.classList.add("grid")
              document.body.querySelectorAll('body > *:not(#action_confirm)').forEach((el)=>{
                  el.classList.add("blur")
              })
         },[])
         const close = useCallback(()=>{
               if(!refDiv.current) return
               refDiv.current?.classList.remove("grid")
              refDiv.current?.classList.add("hidden")
              document.body.querySelectorAll('body > *:not(#action_confirm)').forEach((el)=>{
                  el.classList.remove("blur")
              })
         },[])
       useEffect(()=>{
         const   divele = document.getElementById("action_confirm")
         if (!divele)  return   
        document.body.appendChild(divele!)

       },[])
        useImperativeHandle(ref , ()=>({
            open : ()=>{
                open()
                
            },
            close :()=>{
              close()
            }

        }))
    return (
        <div  id={'action_confirm'} className='fixed  hidden  place-items-center    inset-0  '  ref={refDiv}>
         
                 <div  className='   rounded-lg border-gray-100 shadow-lg  bg-white border-2 p-3    confirm  '>
                 <img src="/pause.svg" alt="" className='w-[30vw] h-[10vh] mx-auto mt-4' />
                 <div className='text-center mt-4'>
                     <h3 className='text-lg font-semibold'>Wil je deze rijles stoppen ?</h3>
                     <p className='text-sm text-gray-500'>wanneer je deze rijles stopt wordt de status aangepast naar <br /><span className='font-semibold text-gray-700 text-md'>"Geanuleerd".</span></p>    
                 </div>
                 <div className='w-[96%] h-max mt-4 mx-auto  flex justify-around'>
                    <CustmButton onClick={()=>{close()}} className='border-2 w-[49%] border-[var(--dark-blue)] text-[var(--dark-blue)]' >
                        annuleren
                    </CustmButton>
                     <CustmButton className='border-2 w-[49%] bg-[var(--dark-blue)] text-white' >
                        bevestigen
                    </CustmButton>
                 </div>
                  </div>

        </div>
    )
})
stop.displayName ="StopModal"
export  default stop

 
