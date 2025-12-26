import React, { useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import { forwardRef } from 'react'
import { ConfirmIcon, RejectIcon } from '@/components/svgs/ActionIcons'
import { ModalRef } from '../admin/ui/modals/confirmModal'
import ConfirmModal from '../admin/ui/modals/confirmModal'
import StopModal from '../admin/ui/modals/stopModal'
import HideModal from '../admin/ui/modals/hideModal'
import { useRouter } from 'next/navigation'
import DownloadModal from '../admin/ui/modals/downLoadModal'


export type ActionModalRef = {
    isOpen?: boolean
    Close?: () => void
    Open: () => void


}

type ModalProps = {
    // Add other props as needed
    CurrentStatus?: {lessons: string , payment : string}
    className?: string
    type?: string,
    id?: string
    tableName : string 
}




const Action = forwardRef<ActionModalRef, ModalProps>(({ className = ''  , 
    CurrentStatus={ lessons : 'in behandeling' , payment : 'betaald' }, 

    id='',
    tableName='lessons' }, ref) =>
        {
            const router = useRouter()
    const modalRef = React.useRef<HTMLDivElement>(null);
    const confimModal = useRef<ModalRef>(null);
    const stopModal = useRef<ModalRef>(null);
    const hideModal = useRef<ModalRef>(null);
    const downloadModal = useRef<ModalRef>(null);

    const refs = {
        confimModal,
        stopModal,
        hideModal,
        downloadModal
    };

    const openModalAction = (ref: ModalRef | null) => {
        ref?.open && ref?.open()
        
    }

    useEffect(() => {
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



    switch (tableName) {
    case 'lessons':
        return lessonsActions(CurrentStatus, className, modalRef, openModalAction, refs , id )
    case 'students':
        return studentsActions(CurrentStatus, className, modalRef, openModalAction, refs , id )
    case 'instructors':
        return instructorsActions(CurrentStatus, className, modalRef, openModalAction, refs , id )
    case 'finance':
        return financeActions(CurrentStatus, className, modalRef, openModalAction, refs , id  )
    default:
         return lessonsActions(CurrentStatus, className, modalRef, openModalAction, refs ,id )
    }

})

Action.displayName = 'ActionModal'
export default Action

const lessonsActions = (status: {lessons : string , payment: string},  className : string  , modalRef: React.RefObject<HTMLDivElement|null>, openModalAction: (ref: ModalRef | null) => void, modalRefs: any , id : string | null ) => {
    const {navigate} = useOpenDetailsPage("driving-lessons" , id)
      const getoneStatus=(status : Array<string>):string=>{

        return  status.join(",").toLowerCase()
      }
    switch (getoneStatus([status.lessons, status.payment])) {
        case 'in behandeling,betaald':
            return (
                <>
             <div ref={modalRef} className={' justify-center items-center  hidden bg-white gap-2 tria px-1 py-2    transform translate-y-8  right-2   rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute   hover:shadow-md hover:scale-105 transition-all ' + className}>

                    <span onClick={() => openModalAction(modalRefs.confimModal.current)} className='cursor-pointer'>
                        <ConfirmIcon w='20px' h='20px' />
                    </span>
                    <span onClick={() => openModalAction(modalRefs.stopModal.current)} className='cursor-pointer'>
                        <RejectIcon w='20px' h='20px' />
                    </span>
                     <span onClick={() => openModalAction(modalRefs.downloadModal.current)} className='cursor-pointer'>
                        <img width={"20"} height={"20"} src="/download_icon.svg" alt="" />
                    </span>
                     <span onClick={() => openModalAction(modalRefs.downloadModal.current)} className='cursor-pointer'>
                        <img width={"20px"} height={"20px"} src="/schedule_icon.svg" alt="" />
                    </span>
                     <span onClick={() => openModalAction(modalRefs.downloadModal.current)} className='cursor-pointer'>
                        <img width={"20px"} height={"20px"} src="/eye_icon.png" alt="" />
                    </span>
                     <span onClick={() => openModalAction(modalRefs.downloadModal.current)} className='cursor-pointer'>
                        <img width={"20px"} height={"20px"} src="/pay_icon.svg" alt="" />
                    </span>
                    </div >
                    <ConfirmModal ref={modalRefs.confimModal} id={id!} table="lessons" />
                    <StopModal ref={modalRefs.stopModal} id={id!} table="lessons" />
                    <HideModal ref={modalRefs.hideModal} id={id!} table="lessons"  />
                </>
            )
        case 'in behandeling,betaald':
            
             return(      <>
                   <div ref={modalRef} className={' justify-center items-center  hidden bg-white gap-2 tria px-1 py-2    transform translate-y-8  right-2   rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute   hover:shadow-md hover:scale-105 transition-all ' + className}>
                    <span onClick={() => openModalAction(modalRefs.confimModal.current)} className='cursor-pointer'>
                        <ConfirmIcon w='20px' h='20px' />
                    </span>
                    <span onClick={() => openModalAction(modalRefs.stopModal.current)} className='cursor-pointer'>
                        <RejectIcon w='20px' h='20px' />
                    </span>
                     <span onClick={() => openModalAction(modalRefs.downloadModal.current)} className='cursor-pointer'>
                        <img width={"20"} height={"20"} src="/download_icon.svg" alt="" />
                    </span>
                     <span onClick={() => openModalAction(modalRefs.downloadModal.current)} className='cursor-pointer'>
                        <img width={"20px"} height={"20px"} src="/schedule_icon.svg" alt="" />
                    </span>
                     <span onClick={() => openModalAction(modalRefs.downloadModal.current)} className='cursor-pointer'>
                        <img width={"20px"} height={"20px"} src="/eye_icon.png" alt="" />
                    </span>
                     <span onClick={() => openModalAction(modalRefs.downloadModal.current)} className='cursor-pointer'>
                        <img width={"20px"} height={"20px"} src="/pay_icon.svg" alt="" />
                    </span>
                    </div >
                    <ConfirmModal ref={modalRefs.confimModal} id={id!} table="lessons" />
                    <StopModal ref={modalRefs.stopModal} id={id!} table="lessons" />
                    <HideModal ref={modalRefs.hideModal} id={id!} table="lessons"  />
                </>)



        default:
            return (
                <>
                <div ref={modalRef} className={'  hidden bg-white gap-2 tria px-1 py-2 max-w-[80vw] md:max-w-[7vw] flex-wrap transform translate-y-8  right-2   rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute  justify-center items-center hover:shadow-md hover:scale-105 transition-all ' + className}>
                    <span onClick={() => {navigate()}} className='cursor-pointer'>
                    <img width={20} height={20} src="/eye_icon.png" alt="" />
                </span>
                    <span onClick={() => openModalAction(modalRefs.hideModal.current)} className='cursor-pointer'>
                        <img width={20} height={20} src="/pause_icon.png" alt="" />
                    </span>
                      </div >
                    <ConfirmModal ref={modalRefs.confimModal} id={id!} table="lessons" />
                    <StopModal ref={modalRefs.stopModal}  id={id!} table="lessons" />
                    <HideModal ref={modalRefs.hideModal}  id={id!} table="lessons" />
                    <DownloadModal ref={modalRefs.downloadModal} id={id!} table="lessons" />
                </>
            )
    }
}
const studentsActions = (status: {lessons : string , payment: string},  className : string  , modalRef: React.RefObject<HTMLDivElement|null>, openModalAction: (ref: ModalRef | null) => void, modalRefs: any , id : string | null ) => {
         
                   const {navigate} = useOpenDetailsPage("students" , id)
            return (
                  <>
                <div ref={modalRef} className={'  hidden bg-white gap-2 tria px-1 py-2 max-w-[80vw] md:max-w-[7vw] flex-wrap transform translate-y-8  right-2   rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute  justify-center items-center hover:shadow-md hover:scale-105 transition-all ' + className}>
                    <span onClick={() => openModalAction(modalRefs.hideModal.current)} className='cursor-pointer'>
                        <img width={20} height={20} src="/eye_hide_icon.svg" alt="" />
                    </span>
                    <span onClick={() => { navigate() }} className='cursor-pointer'>
                        <img width={22} height={22} src="/eye_icon.png" alt="" />
                    </span>
                      </div >
                    <HideModal ref={modalRefs.hideModal} id={id!} table="students" />
                </>
            )
}

const instructorsActions = (status: {lessons : string , payment: string},  className : string  , modalRef: React.RefObject<HTMLDivElement|null>, openModalAction: (ref: ModalRef | null) => void, modalRefs: any , id : string | null) => {
         const {navigate} = useOpenDetailsPage("instructors" , id)
            return (
                  <>
                <div ref={modalRef} className={'  hidden bg-white gap-2 tria px-1 py-2 max-w-[80vw] md:max-w-[7vw] flex-wrap transform translate-y-8  right-2   rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute  justify-center items-center hover:shadow-md hover:scale-105 transition-all ' + className}>
                   
                    <span onClick={() =>{navigate()}} className='cursor-pointer'>
                        <img width={22} height={22} src="/eye_icon.png" alt="" />
                    </span>
                    <span onClick={() => openModalAction(modalRefs.hideModal.current)} className='cursor-pointer'>
                        <img width={22} height={22} src="/block_icon.png" alt="" />
                    </span>
                     <span onClick={() => openModalAction(modalRefs.hideModal.current)} className='cursor-pointer'>
                        <img width={20} height={20} src="/delete_action_icon.png" alt="" />
                    </span>
                      </div >
                    <ConfirmModal ref={modalRefs.confimModal} id={id!} table="instructors" />
                    <StopModal ref={modalRefs.stopModal} id={id!} table="instructors" />
                    <HideModal ref={modalRefs.hideModal} id={id!} table="instructors" />
                </>
            )
}

const financeActions = (status: {lessons : string , payment: string},  className : string  , modalRef: React.RefObject<HTMLDivElement|null>, openModalAction: (ref: ModalRef | null) => void, modalRefs: any , id : string | null) => {
        
            return (
                  <>
                <div ref={modalRef} className={'  hidden bg-white gap-2 tria px-1 py-2 max-w-[7vw] flex-wrap transform translate-y-8  right-2   rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute  justify-center items-center hover:shadow-md hover:scale-105 transition-all ' + className}>
                   
                    <span onClick={() => openModalAction(modalRefs.hideModal.current)} className='cursor-pointer'>
                        <img width={22} height={22} src="/hide_eye_icon.png" alt="" />
                    </span>
                    <span onClick={() => openModalAction(modalRefs.hideModal.current)} className='cursor-pointer'>
                        <img width={22} height={22} src="/download_icon.png" alt="" />
                    </span>
                      </div >
                    <ConfirmModal ref={modalRefs.confimModal} id={id!} table="finance" />
                    <StopModal ref={modalRefs.stopModal} id={id!} table="finance" />
                    <HideModal ref={modalRefs.hideModal} id={id!} table="finance" />
                </>
            )
}



   const useOpenDetailsPage = (tableName: string , id : string | null) => {  
                const router = useRouter()
                const navigate = useCallback(() => {
                      console.log('Navigating to details page for', tableName, 'with ID:', id);
                      if (id == null && tableName == null ) return 
                    router.push(`/admin-panel/${tableName}/${id}`) 
                   },[id])
     return {navigate}
             }