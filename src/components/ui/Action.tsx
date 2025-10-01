import React, { useEffect, useImperativeHandle } from 'react'
import { forwardRef } from 'react'
import { ConfirmIcon , RejectIcon } from '@/components/svgs/ActionIcons'
export type ActionModalRef = {
     isOpen?: boolean
    Close?: () => void
    Open: () => void
 
}


type ModalProps = {
    // Add other props as needed
     CurrentStatus?: string
  }




const Action = forwardRef<ActionModalRef, ModalProps>(({ CurrentStatus }, ref) => {
    const modalRef = React.useRef<HTMLDivElement>(null);
    
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
   <div ref={modalRef} className=' hidden gap-2 tria top-9 rounded-lg z-10 -right-1.5 w-[5vw] bg-white  h-[1vh] absolute  justify-center items-center hover:shadow-md hover:scale-105 transition-all '>
   <ConfirmIcon w='15px' h='15px'  />
   <RejectIcon w='15px' h='15px'  />
   </div >

  )
})

Action.displayName = 'ActionModal'
export default Action
