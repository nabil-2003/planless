'use client'
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import CustmButton from '../CustmButton'
import useLessons from '@/app/hooks/useLessons'



export type ModalRef ={
    open ?: ()=>void 
    close? :()=>void 
}
type props = {
   id : string , 
   table : string

}
const Confirm= forwardRef<ModalRef , props>(({id, table}, ref)=>{
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
        // console.log(table , id , 'from where we did come .??')
     
     const  {action}=  useActions({key : "lessons", id : id})
    
    
    return (
        <div  id={'action_confirm'} className='fixed  hidden  place-items-center  select-none   inset-0  '  ref={refDiv}>
         
                 <div  className='rounded-lg border-gray-100 shadow-lg bg-white border-2 p-3 w-[90vw] md:w-auto confirm'>
                 <img src="/confirm.svg" alt="" className='w-[80vw] md:w-[15vw] h-[10vh] mx-auto mt-4' />
                 <div className='text-center mt-4'>
                     <h3 className='text-lg font-semibold'>Wil je deze rijles bevestigen ?</h3>
                     <p className='text-sm text-gray-500'>wanneer je deze rijles bevestigd wordt de status aangepast naar <br /><span className='font-semibold text-gray-700 text-md'>bevestigd.</span></p>    
                 </div>
                 <div className='w-[96%] h-max mt-4 mx-auto  flex flex-wrap   justify-around'>
                    <CustmButton onClick={()=>{close()}} className='border-2 w-full md:w-[49%] border-[var(--dark-blue)] text-[var(--dark-blue)]' >
                        annuleren
                    </CustmButton>
                     <CustmButton onClick={action ? () => { action(); close () } : undefined} className='border-2 w-full md:w-[49%] bg-[var(--dark-blue)] text-white' >
                        bevestigen

                    </CustmButton>
                 </div>
                  </div>

        </div>
    )
})
Confirm.displayName ="ConfirmModal"
  export default Confirm

  export   const  useActions  = ({key , id }:{key: string , id : string }) : {action : (() => void)|null} =>{ 
           const {confirmStatus } = useLessons()
              
             switch(key){
                case "lessons" : return { action : ()=>{confirmStatus(id)} }
                case "students" : return  {action : null}
                case "instructors" : return {action : null}
                case "finance" : return {action : null}
                default : return  {action : null}
             }
        }