import React, { useEffect, useImperativeHandle, useRef } from 'react'
import { forwardRef } from 'react'
import { ConfirmIcon , RejectIcon } from '@/components/svgs/ActionIcons'
import { ModalRef } from '../admin/ui/modals/confirmModal'
import ConfirmModal from '../admin/ui/modals/confirmModal'
import StopModal from '../admin/ui/modals/stopModal'
import HideModal from '../admin/ui/modals/hideModal'

export type ActionModalRef = {
     isOpen?: boolean
    Close?: () => void
    Open: () => void
 
}


type ModalProps = {
    // Add other props as needed
     CurrentStatus?: string
     className? : string 
  }




const Action = forwardRef<ActionModalRef, ModalProps>(({ className='' }, ref) => {
    const modalRef = React.useRef<HTMLDivElement>(null);
     const confimModal = useRef<ModalRef>(null)
     const stopModal = useRef<ModalRef>(null)
       const hideModal = useRef<ModalRef>(null)
      const openModalAction = ( ref : ModalRef | null) =>{
          ref?.open && ref?.open() 

      }
    
    useEffect(()=>{
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                modalRef.current?.classList.add('hidden');
                modalRef.current?.classList.remove('flex');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    useImperativeHandle(ref, () => ({
        Open: () => {
            modalRef.current?.classList.remove('hidden');
            modalRef.current?.classList.add('flex');
        },
      
    }));

  return (
  <>
   <div ref={modalRef} className={className+' hidden gap-2 tria px-1 py-2 max-w-[7vw] flex-wrap  top-9 rounded-lg z-10 -right-1.5 w-max bg-white border-1 border-gray-300 h-max  min-h-[6vh] absolute  justify-center items-center hover:shadow-md hover:scale-105 transition-all '}>
   <span onClick={() => openModalAction(confimModal.current)} className='cursor-pointer'>
    <ConfirmIcon  w='20px' h='20px'  />
   </span>
    <span  onClick={() => openModalAction(stopModal.current)} className='cursor-pointer'>
   <RejectIcon w='20px' h='20px' />
   </span>
    <span  onClick={() => openModalAction(hideModal.current)} className='cursor-pointer'>
   <img width={20} height={20}  src="/pause_icon.png" alt="" />
   </span>
    <span  onClick={() => openModalAction(hideModal.current)} className='cursor-pointer'>
   <img width={20} height={20}  src="/download_icon.png" alt="" />
   </span>
       <span  onClick={() => openModalAction(hideModal.current)} className='cursor-pointer'>
   <img width={20} height={20}  src="/eye_icon.png" alt="" />
   </span>
    <span  onClick={() => openModalAction(hideModal.current)} className='cursor-pointer'>
   <img width={20} height={20}  src="/hide_eye_icon.png" alt="" />
   </span>
       <span  onClick={() => openModalAction(hideModal.current)} className='cursor-pointer'>
   <img width={20} height={20}  src="/block_icon.png" alt="" />
   </span>
    <span  onClick={() => openModalAction(hideModal.current)} className='cursor-pointer'>
   <img width={20} height={20}  src="/euro_icon.png" alt="" />
   </span>
    <span  onClick={() => openModalAction(hideModal.current)} className='cursor-pointer'>
   <img width={20} height={20}  src="/write_icon.png" alt="" />
   </span>
    <span  onClick={() => openModalAction(hideModal.current)} className='cursor-pointer'>
   <img width={20} height={20}  src="/delete_action_icon.png" alt="" />
   </span>
   
   
   </div >
   
    <ConfirmModal ref={confimModal} />
    <StopModal ref={stopModal} />
    <HideModal ref={hideModal} />
  </>


  )
})

Action.displayName = 'ActionModal'
export default Action
