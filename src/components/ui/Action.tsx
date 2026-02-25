import React, { use, useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import { forwardRef } from 'react'
import { ConfirmIcon, RejectIcon } from '@/components/svgs/ActionIcons'
import { ModalRef } from '../admin/ui/modals/confirmModal'
import ConfirmModal from '../admin/ui/modals/confirmModal'
import StopModal from '../admin/ui/modals/stopModal'
import HideModal from '../admin/ui/modals/hideModal'
import { useRouter } from 'next/navigation'
import DownloadModal from '../admin/ui/modals/downLoadModal'
import useInvoice from '@/app/hooks/useInvoice'
import LessonsModal, { LessonsModalRef } from '../admin/ui/modals/lessonsModal'
import { useAppDispatch } from '@/store/hooks'
import useLessons from '@/app/hooks/useLessons'
import DecicionModal from '../admin/ui/modals/DecicionModal'

// Consistent icon sizing for all action modal icons
const ACTION_ICON_CLASS = 'w-5 h-5';


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
    orderId? : string
}

const Action = forwardRef<ActionModalRef, ModalProps>(({ className = ''  , 
    CurrentStatus={ lessons : 'in behandeling' , payment : 'betaald' }, 
   orderId = "" , 
    id='',
    tableName='lessons' }, ref) =>
        {
            const router = useRouter()
    const modalRef = React.useRef<HTMLDivElement>(null);
    const confimModal = useRef<ModalRef>(null);
    const stopModal = useRef<ModalRef>(null);
    const hideModal = useRef<ModalRef>(null);
    const downloadModal = useRef<ModalRef>(null);
    // 🔧 FIX: Move lessonsModal ref to component level (not inside helper function)
    const lessonsModalRef = useRef<LessonsModalRef>(null);

    const refs = {
        confimModal,
        stopModal,
        hideModal,
        downloadModal,
        lessonsModal: lessonsModalRef
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

    // Add global style for action modal icons
    React.useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            [data-action-modal="true"] img {
                width: 20px !important;
                height: 20px !important;
            }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);



    switch (tableName) {
    case 'lessons':
        return lessonsActions(CurrentStatus, className, modalRef, openModalAction, refs , id )
    case 'students':
        return studentsActions(CurrentStatus, className, modalRef, openModalAction, refs , id )
    case 'instructors':
        return instructorsActions(CurrentStatus, className, modalRef, openModalAction, refs , id )
    case 'finance':
        return financeActions(CurrentStatus, orderId, className, modalRef, openModalAction, refs , id  )
    case 'cards':
        return cardsActions(CurrentStatus, className, modalRef, openModalAction, refs , id  )
    default:
         return <div></div>
    }

})

Action.displayName = 'ActionModal'
export default Action
const cardsActions = (status: {lessons : string , payment: string},  className : string  , modalRef: React.RefObject<HTMLDivElement|null>, openModalAction: (ref: ModalRef | null) => void, modalRefs: any , id : string | null ) => {
          const {navigate} = useOpenDetailsPage("cards/notes/note" , id)
    return (
                <>
             <div ref={modalRef} data-action-modal="true" className={' flex-row justify-center items-center  hidden bg-white gap-2 tria px-1 py-2    transform translate-y-8  right-2   rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute   hover:shadow-md hover:scale-105 transition-all ' + className}>
               <span onClick={() => navigate()} className='cursor-pointer'>
                      <img  src={"/actions/show_icon.svg"} className='w-5 h-5' />
               </span>
                 <span onClick={() => openModalAction(modalRefs.confimModal.current)} className='cursor-pointer'>
                      <img  src={"/actions/hide_icon.svg"} className='w-5 h-5' />
               </span>
                <span onClick={() => openModalAction(modalRefs.confimModal.current)} className='cursor-pointer'>
                      <img  src={"/actions/download.svg"} className='w-5 h-5' />
               </span>
               
            </div >
                </>
            )
}
const lessonsActions = (status: {lessons : string , payment: string},  className : string  , modalRef: React.RefObject<HTMLDivElement|null>, openModalAction: (ref: ModalRef | null) => void, modalRefs: any , id : string | null ) => {
    const [openFlag , setOpenFlag] = React.useState(false);
    const [openReschedule, setOpenReschedule] = React.useState(false);
    const [openCashModal, setOpenCashModal] = React.useState(false);
    const [openHideModal, setOpenHideModal] = React.useState(false);
    const [openCancelModal , setOpenCancelModal] = React.useState(false);
    const [openConfirmModal , setOpenConfirmModal] = React.useState(false);
const open = () => {
    // 🔧 FIX: Use modalRefs.lessonsModal from parent
    if (!modalRefs.lessonsModal?.current) return;
    modalRefs.lessonsModal.current.open();
};

const getoneStatus=(status : Array<string>):string=>{

        return  status.join(",").toLowerCase()
      }
       //<LessonsModal status={status.lessons} id={id}   />
    const LessonSwitch = ()=>{
        const actionImgClass = "w-5 h-5";  // Consistent icon size
        switch (getoneStatus([status.lessons, status.payment])) {
        case 'in behandeling,onbetaald':
            return (
                <>
             <div ref={modalRef} className={' justify-center items-center  hidden bg-white gap-2 tria px-1 py-2    transform translate-y-8  right-2   rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute   hover:shadow-md hover:scale-105 transition-all [&_img]:w-5 [&_img]:h-5 ' + className}>
               <span onClick={() => open()}  className='cursor-pointer'>
                      <img  src={"/actions/show_icon.svg"}/>
               </span>
                <span onClick={() => setOpenConfirmModal(true)} className='cursor-pointer'>
                      <img  src={"/actions/aprove_booking.svg"}/>
               </span>
                 <span onClick={() => setOpenCancelModal(true)} className='cursor-pointer'>
                      <img  src={"/actions/cancel_icon.svg"}/>
               </span>
                <span onClick={() => setOpenCashModal(true)} className='cursor-pointer'>
                      <img  src={"/actions/cash_payement.svg"}/>
               </span>
                <span onClick={() => setOpenReschedule(true)} className='cursor-pointer'>
                      <img  src={"/actions/calendar.svg"}/>
               </span>
                <span onClick={() => openModalAction(modalRefs.confimModal.current)} className='cursor-pointer'>
                      <img  src={"/actions/card_payement.svg"}/>
               </span>
            </div >
                </>
            )
   case 'in behandeling,verlopen':
      return (
                <>
             <div ref={modalRef} className={' justify-center items-center  hidden bg-white gap-2 tria px-1 py-2    transform translate-y-8  right-2   rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute   hover:shadow-md hover:scale-105 transition-all ' + className}>

                 
               <span onClick={() => {open()}} className='cursor-pointer'>
                      <img  src={"/actions/show_icon.svg"}/>
               </span>
                <span onClick={() => setOpenConfirmModal(true)} className='cursor-pointer'>
                      <img  src={"/actions/aprove_booking.svg"}/>
               </span>
                 <span onClick={() => setOpenCancelModal(true)} className='cursor-pointer'>
                      <img  src={"/actions/cancel_icon.svg"}/>
               </span>
                <span onClick={() => setOpenReschedule(true)} className='cursor-pointer'>
                      <img  src={"/actions/calendar.svg"}/>
               </span>
                <span onClick={() => openModalAction(modalRefs.confimModal.current)} className='cursor-pointer'>
                      <img  src={"/actions/card_payement.svg"}/>
               </span>
            </div >
                </>
            )
    case 'in behandeling,mislukt':
       return (
                <>
             
            <div ref={modalRef} className={' justify-center items-center  hidden bg-white gap-2  px-1 py-2    transform translate-y-8  right-2   rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute   hover:shadow-md hover:scale-105 transition-all ' + className}>
               <span onClick={() => open()} className='cursor-pointer'>
                      <img  src={"/actions/show_icon.svg"}/>
               </span>
                <span onClick={() => setOpenConfirmModal(true)} className='cursor-pointer'>
                      <img  src={"/actions/aprove_booking.svg"}/>
               </span>
                 <span onClick={() => setOpenCancelModal(true)} className='cursor-pointer'>
                      <img  src={"/actions/cancel_icon.svg"}/>
               </span>
                <span onClick={() => setOpenReschedule(true)} className='cursor-pointer'>
                      <img  src={"/actions/calendar.svg"}/>
               </span>
                <span onClick={() => openModalAction(modalRefs.confimModal.current)} className='cursor-pointer'>
                      <img  src={"/actions/card_payement.svg"}/>
               </span>
    
                    </div >

                </>
            )
  
     case 'in behandeling,betaald':
       return (
                <>
             <div ref={modalRef} className={' justify-center items-center  hidden bg-white gap-2 tria px-1 py-2    transform translate-y-8  right-2   rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute   hover:shadow-md hover:scale-105 transition-all ' + className}>
               <span onClick={() => {open()}} className='cursor-pointer'>
                      <img  src={"/actions/show_icon.svg"}/>
               </span>
                <span onClick={() => setOpenConfirmModal(true)} className='cursor-pointer'>
                      <img  src={"/actions/aprove_booking.svg"}/>
               </span>
                 <span onClick={() => setOpenCancelModal(true)} className='cursor-pointer'>
                      <img  src={"/actions/cancel_icon.svg"}/>
               </span>
                <span onClick={() => setOpenReschedule(true)} className='cursor-pointer'>
                      <img  src={"/actions/calendar.svg"}/>
               </span>
                <span onClick={() => openModalAction(modalRefs.confimModal.current)} className='cursor-pointer'>
                      <img  src={"/actions/download.svg"}/>
               </span>
            </div >
                </>
            )
 case 'in behandeling,geanuleerd':
       return (
                <>
             <div ref={modalRef} className={' justify-center items-center  hidden bg-white gap-2 tria px-1 py-2    transform translate-y-8  right-2   rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute   hover:shadow-md hover:scale-105 transition-all ' + className}>
               <span onClick={() => {open()}} className='cursor-pointer'>
                      <img  src={"/actions/show_icon.svg"}/>
               </span>
                <span onClick={() => setOpenConfirmModal(true)} className='cursor-pointer'>
                      <img  src={"/actions/aprove_booking.svg"}/>
               </span>
                 <span onClick={() => setOpenCancelModal(true)} className='cursor-pointer'>
                      <img  src={"/actions/cancel_icon.svg"}/>
               </span>
                <span onClick={() => setOpenReschedule(true)} className='cursor-pointer'>
                      <img  src={"/actions/calendar.svg"}/>
               </span>
                <span onClick={() => openModalAction(modalRefs.confimModal.current)} className='cursor-pointer'>
                      <img  src={"/actions/card_payement.svg"}/>
               </span>
            </div >

                </>
            )

            case 'bevestigd,onbetaald':
       return (
                <>
             <div ref={modalRef} className={' justify-center items-center  hidden bg-white gap-2 tria px-1 py-2    transform translate-y-8  right-2   rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute   hover:shadow-md hover:scale-105 transition-all ' + className}>
                   <span onClick={() => open()} className='cursor-pointer'>
                      <img  src={"/actions/show_icon.svg"}/>
               </span>
                <span onClick={() => setOpenConfirmModal(true)} className='cursor-pointer'>
                      <img  src={"/actions/aprove_booking.svg"}/>
               </span>
                 <span onClick={() => setOpenCancelModal(true)} className='cursor-pointer'>
                      <img  src={"/actions/cancel_icon.svg"}/>
               </span>
                <span onClick={() => setOpenCashModal(true)} className='cursor-pointer'>
                      <img  src={"/actions/cash_payement.svg"}/>
               </span>
                
                <span onClick={() => openModalAction(modalRefs.confimModal.current)} className='cursor-pointer'>
                      <img  src={"/actions/card_payement.svg"}/>
               </span>
               <span onClick={() => setOpenFlag(true)} className='cursor-pointer'>
                      <img  src={"/actions/flag_icon.svg"}/>
               </span>
            </div >
                </>
            )
             case 'bevestigd,verlopen':
       return (
                <>
             <div ref={modalRef} className={' justify-center items-center  hidden bg-white gap-2 tria px-1 py-2    transform translate-y-8  right-10   rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute   hover:shadow-md hover:scale-105 transition-all ' + className}>
                <span onClick={() => {open()}} className='cursor-pointer'>
                      <img  src={"/actions/show_icon.svg"}/>
               </span>
                <span onClick={() => setOpenConfirmModal(true)} className='cursor-pointer'>
                      <img  src={"/actions/aprove_booking.svg"}/>
               </span>
                 <span onClick={() => setOpenCancelModal(true)} className='cursor-pointer'>
                      <img  src={"/actions/cancel_icon.svg"}/>
               </span>
               <span onClick={() => setOpenFlag(true)} className='cursor-pointer'>
                      <img  src={"/actions/flag_icon.svg"}/>
               </span>
            </div >
                </>
            )
         case 'bevestigd,mislukt':
       return (
                <>
             <div ref={modalRef} className={' justify-center items-center  hidden bg-white gap-2 tria px-1 py-2    transform translate-y-8  right-2   rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute   hover:shadow-md hover:scale-105 transition-all ' + className}>
                <span onClick={() => open()} className='cursor-pointer'>
                      <img  src={"/actions/show_icon.svg"}/>
               </span>
                <span onClick={() =>setOpenConfirmModal(true)} className='cursor-pointer'>
                      <img  src={"/actions/aprove_booking.svg"}/>
               </span>
                 <span onClick={() => setOpenCancelModal(true)} className='cursor-pointer'>
                      <img  src={"/actions/cancel_icon.svg"}/>
               </span>
               <span onClick={() => setOpenFlag(true)} className='cursor-pointer'>
                      <img  src={"/actions/flag_icon.svg"}/>
               </span>
                <span onClick={() => openModalAction(modalRefs.confimModal.current)} className='cursor-pointer'>
                      <img  src={"/actions/card_payement.svg"}/>
               </span>
            </div >
                </>
            )
            
         case 'bevestigd,geannuleerd':
       return (
                <>
             <div ref={modalRef} className={' justify-center items-center  hidden bg-white gap-2 tria px-1 py-2    transform translate-y-8  right-2   rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute   hover:shadow-md hover:scale-105 transition-all ' + className}>
                <span onClick={() => open()} className='cursor-pointer'>
                      <img  src={"/actions/show_icon.svg"}/>
               </span>
                <span onClick={() => setOpenConfirmModal(true)} className='cursor-pointer'>
                      <img  src={"/actions/aprove_booking.svg"}/>
               </span>
                 <span onClick={() => setOpenCancelModal(true)} className='cursor-pointer'>
                      <img  src={"/actions/cancel_icon.svg"}/>
               </span>
               <span onClick={() => setOpenFlag(true)} className='cursor-pointer'>
                      <img  src={"/actions/flag_icon.svg"}/>
               </span>
                <span onClick={() => openModalAction(modalRefs.confimModal.current)} className='cursor-pointer'>
                      <img  src={"/actions/card_payement.svg"}/>
               </span>
            </div >
                </>
            )
             case 'bevestigd,betaald':
       return (
                <>
             <div ref={modalRef} className={' justify-center items-center  hidden bg-white gap-2 tria px-1 py-2    transform translate-y-8  right-2   rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute   hover:shadow-md hover:scale-105 transition-all ' + className}>
                   <span onClick={() => open()} className='cursor-pointer'>
                      <img  src={"/actions/show_icon.svg"}/>
               </span>
                <span onClick={() => setOpenConfirmModal(true)} className='cursor-pointer'>
                      <img  src={"/actions/aprove_booking.svg"}/>
               </span>
                 <span onClick={() => setOpenCancelModal(true)} className='cursor-pointer'>
                      <img  src={"/actions/cancel_icon.svg"}/>
               </span>
               <span onClick={() => setOpenFlag(true)} className='cursor-pointer'>
                      <img  src={"/actions/flag_icon.svg"}/>
               </span>
                <span onClick={() => openModalAction(modalRefs.confimModal.current)} className='cursor-pointer'>
                      <img  src={"/actions/download.svg"}/>
               </span>
            </div >
                </>
            )
            case 'voltooid,onbetaald':
       return (
                <>
             <div ref={modalRef} className={' justify-center items-center  hidden bg-white gap-2 tria px-1 py-2    transform translate-y-8  right-2   rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute   hover:shadow-md hover:scale-105 transition-all ' + className}>
                <span onClick={() => open()} className='cursor-pointer'>
                      <img  src={"/actions/show_icon.svg"}/>
               </span>
                 <span onClick={() => openModalAction(modalRefs.confimModal.current)} className='cursor-pointer'>
                      <img  src={"/actions/card_payement.svg"}/>
               </span>
               <span onClick={() => setOpenCashModal(true)} className='cursor-pointer'>
                      <img  src={"/actions/cash_payement.svg"}/>
               </span>
            </div >
                </>
            )
              case 'voltooid,verlopen':
       return (
                <>
             <div ref={modalRef} className={' justify-center items-center  hidden bg-white gap-2 tria px-1 py-2    transform translate-y-8  right-2   rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute   hover:shadow-md hover:scale-105 transition-all ' + className}>
               <span onClick={() => open()} className='cursor-pointer'>
                      <img  src={"/actions/show_icon.svg"}/>
               </span>
                 <span onClick={() => openModalAction(modalRefs.confimModal.current)} className='cursor-pointer'>
                      <img  src={"/actions/card_payement.svg"}/>
               </span>
            </div >
                </>
            )
           
              case 'voltooid,mislukt':
       return (
                <>
             <div ref={modalRef} className={' justify-center items-center  hidden bg-white gap-2 tria px-1 py-2    transform translate-y-8  right-2   rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute   hover:shadow-md hover:scale-105 transition-all ' + className}>
                <span onClick={() => open()} className='cursor-pointer'>
                      <img  src={"/actions/show_icon.svg"}/>
               </span>
                 <span onClick={() => openModalAction(modalRefs.confimModal.current)} className='cursor-pointer'>
                      <img  src={"/actions/card_payement.svg"}/>
               </span>
            </div >
                </>
            )
           
              case 'voltooid,geannuleerd':
       return (
                <>
             <div ref={modalRef} className={' justify-center items-center  hidden bg-white gap-2 tria px-1 py-2    transform translate-y-8  right-2   rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute   hover:shadow-md hover:scale-105 transition-all ' + className}>
              <span onClick={() => open()} className='cursor-pointer'>
                      <img  src={"/actions/show_icon.svg"}/>
               </span>
                 <span onClick={() => openModalAction(modalRefs.confimModal.current)} className='cursor-pointer'>
                      <img  src={"/actions/card_payement.svg"}/>
               </span>
            </div >
                </>
            )
           
    case 'voltooid,betaald':
       return (
                <>
             <div ref={modalRef} className={' justify-center items-center  hidden bg-white gap-2 tria px-1 py-2    transform translate-y-8  right-2   rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute   hover:shadow-md hover:scale-105 transition-all ' + className}>
                <span onClick={() => open()} className='cursor-pointer'>
                      <img  src={"/actions/show_icon.svg"}/>
               </span>
                <span onClick={() => setOpenHideModal(true)} className='cursor-pointer'>
                      <img  src={"/actions/hide_icon.svg"}/>
               </span>
                <span onClick={() => openModalAction(modalRefs.confimModal.current)} className='cursor-pointer'>
                      <img  src={"/actions/download.svg"}/>
               </span>
            </div >
                </>
            )
    case 'geanuleerd,onbetaald':
       return (
                <>
             <div ref={modalRef} className={' justify-center items-center  hidden bg-white gap-2 tria px-1 py-2    transform translate-y-8  right-2   rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute   hover:shadow-md hover:scale-105 transition-all ' + className}>
                <span onClick={() => open()} className='cursor-pointer'>
                      <img  src={"/actions/show_icon.svg"}/>
               </span>
                <span onClick={() => setOpenReschedule(true)} className='cursor-pointer'>
                      <img  src={"/actions/calendar.svg"}/>
               </span>
                <span onClick={() => setOpenCashModal(true)} className='cursor-pointer'>
                      <img  src={"/actions/cash_payement.svg"}/>
               </span>
            </div >
                </>
            )
            case 'geanuleerd,verlopen':
       return (
                <>
             <div ref={modalRef} className={' justify-center items-center  hidden bg-white gap-2 tria px-1 py-2    transform translate-y-8  right-2   rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute   hover:shadow-md hover:scale-105 transition-all ' + className}>
                <span onClick={() => open()} className='cursor-pointer'>
                      <img  src={"/actions/show_icon.svg"}/>
               </span>
                <span onClick={() => setOpenReschedule(true)} className='cursor-pointer'>
                      <img  src={"/actions/calendar.svg"}/>
               </span>
                
            </div >
                </>
            )
            case 'geanuleerd,mislukt':
       return (
                <>
             <div ref={modalRef} className={' justify-center items-center  hidden bg-white gap-2 tria px-1 py-2    transform translate-y-8  right-2   rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute   hover:shadow-md hover:scale-105 transition-all ' + className}>
                <span onClick={() => open()} className='cursor-pointer'>
                      <img  src={"/actions/show_icon.svg"}/>
               </span>
                <span onClick={() => setOpenReschedule(true)} className='cursor-pointer'>
                      <img  src={"/actions/calendar.svg"}/>
               </span>
            </div >
                </>
            )
            case 'geanuleerd,geannuleerd':
       return (
                <>
             <div ref={modalRef} className={' justify-center items-center  hidden bg-white gap-2 tria px-1 py-2    transform translate-y-8  right-2   rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute   hover:shadow-md hover:scale-105 transition-all ' + className}>
                <span onClick={() => open()} className='cursor-pointer'>
                      <img  src={"/actions/show_icon.svg"}/>
               </span>
                <span onClick={() => setOpenReschedule(true)} className='cursor-pointer'>
                      <img  src={"/actions/calendar.svg"}/>
               </span>
              
            </div >
                </>
            )
            case 'geanuleerd,betaald':
       return (
                <>
             <div ref={modalRef} className={' justify-center items-center  hidden bg-white gap-2 tria px-1 py-2    transform translate-y-8  right-2   rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute   hover:shadow-md hover:scale-105 transition-all ' + className}>
                <span onClick={() => open()} className='cursor-pointer'>
                      <img  src={"/actions/show_icon.svg"}/>
               </span>
                <span onClick={() => setOpenReschedule(true)} className='cursor-pointer'>
                      <img  src={"/actions/calendar.svg"}/>
               </span>
                <span onClick={() => openModalAction(modalRefs.confimModal.current)} className='cursor-pointer'>
                      <img  src={"/actions/download.svg"}/>
               </span>
            </div >
                </>
            )
           
      
      return <>


      </>
    }
    }
    return(
        <>
         <LessonSwitch />
        <LessonsModal ref={modalRefs.lessonsModal} status={status.lessons} id={id}   />
        <DecicionModal isOpen={openFlag}
         btn1={{text : "Annuleren" , isForClose: true ,onClick:() => {setOpenFlag(false)}}}
         btn2={{text : "Bevestigen" , onClick: () => {alert("hi")}}} 
         action="flag" 
         table="lessons" id={id!}    
         title="Rijles afgerond"      
         content="Weet je zeker dat deze rijles is afgerond?" 
         />
          <DecicionModal isOpen={openReschedule}
         btn1={{text : "Annuleren" ,onClick:() => {setOpenReschedule(false)}}}
         btn2={{text : "Bevestigen" , onClick: () => {alert("reschedule")}}} 
         action="reschedule" 
         table="lessons" id={id!}    
         title="Rijles verzetten"      
         content="Weet je zeker dat je deze rijles wilt verzetten?" 
         />
          <DecicionModal isOpen={openCashModal}
         btn1={{text : "Annuleren" ,onClick:() => {setOpenCashModal(false)}}}
         btn2={{text : "Bevestigen" , onClick: () => {alert("reschedule")}}} 
         action="reschedule" 
         table="lessons" id={id!}    
         title="Contant betaling ontvangen"      
         content="Weet je zeker dat er een contante betaling is gedaan?" 
         />
        <DecicionModal isOpen={openHideModal}
         btn1={{text : "Annuleren" ,onClick:() => {setOpenHideModal(false)}}}
         btn2={{text : "Bevestigen" , onClick: () => {alert("hide")}}} 
         action="hide" 
         table="lessons" id={id!}    
         title="Rijles verbergen"      
         content="Bevestig om de rijles te verbergen of te annuleren" 
         />
        <DecicionModal isOpen={openCancelModal}
         btn1={{text : "Annuleren" ,onClick:() => {setOpenCancelModal(false)}}}
         btn2={{text : "Opnieuw plannen" , onClick: () => {alert("cancel")}}} 
         action="cancel" 
         table="lessons" id={id!}    
         title="Afspraak annuleren"      
         content="Weet je zeker dat je deze afspraak wilt annuleren?" 
         />
          <DecicionModal isOpen={openConfirmModal}
         btn1={{text : "Annuleren" ,onClick:() => {setOpenConfirmModal(false)}}}
         btn2={{text : "Bevestigen" , onClick: () => {alert("abrove")}}} 
         action="abrove" 
         table="lessons" id={id!}    
         title="Rijles goedkeuren"      
         content="Weet je zeker dat je deze rijles wilt goedkeuren?" 
         />

        </>
    )
}
        
    

const studentsActions = (status: {lessons : string , payment: string},  className : string  , modalRef: React.RefObject<HTMLDivElement|null>, openModalAction: (ref: ModalRef | null) => void, modalRefs: any , id : string | null ) => {
         
                   const {navigate} = useOpenDetailsPage("students" , id)
            return (
                  <>
                <div ref={modalRef} className={'  hidden bg-white gap-2 tria px-1 py-2 max-w-[80vw] md:max-w-[7vw] flex-wrap transform translate-y-8  right-2   rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute  justify-center items-center hover:shadow-md hover:scale-105 transition-all '+ className}>
                    <span onClick={() => openModalAction(modalRefs.hideModal.current)} className='cursor-pointer'>
                        <img width={20} height={20} src="/actions/hide_icon.svg" alt="" />
                    </span>
                    <span onClick={() => { navigate() }} className='cursor-pointer'>
                        <img width={22} height={22} src="/actions/show_icon.svg" alt="" />
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
                <div ref={modalRef} className={'  hidden bg-white gap-2 tria px-1 py-2 max-w-[80vw] md:max-w-[7vw]  transform translate-y-8  right-2   rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute  justify-center items-center hover:shadow-md hover:scale-105 transition-all ' + className}>
                   
                    <span onClick={() =>{navigate()}} className='cursor-pointer'>
                        <img width={22} height={22} src="/actions/show_icon.svg" alt="" />
                    </span>
                    <span onClick={() => openModalAction(modalRefs.hideModal.current)} className='cursor-pointer'>
                        <img width={22} height={22} src="/actions/block_icon.svg" alt="" />
                    </span>
                     <span onClick={() => openModalAction(modalRefs.hideModal.current)} className='cursor-pointer'>
                        <img width={20} height={20} src="/actions/delete.svg" alt="" />
                    </span>
                     <span onClick={() => {navigate(true)}} className='cursor-pointer'>
                        <img width={20} height={20} src="/actions/edit.svg" alt="" />
                    </span>
                      </div >
                    <ConfirmModal ref={modalRefs.confimModal} id={id!} table="instructors" />
                    <StopModal ref={modalRefs.stopModal} id={id!} table="instructors" />
                    <HideModal ref={modalRefs.hideModal} id={id!} table="instructors" />
                </>
            )
}

const financeActions = (status: { payment: string},  orderId : string , className : string  , modalRef: React.RefObject<HTMLDivElement|null>, openModalAction: (ref: ModalRef | null) => void, modalRefs: any , id : string | null) => {
               const {getInvoiceById, invoice} = useInvoice()
               const [downloadLoading, setDownloadLoading] = React.useState(false)
               const [currentOrderId, setCurrentOrderId] = React.useState<string | null>(null)
               console.log(id)
                  const {navigate}= useOpenDetailsPage("finances/item" , id)
               const handleDownload = async () => {
                   if (downloadLoading) return
                   
                   setDownloadLoading(true)
                   setCurrentOrderId(orderId)
                   try {
                       await getInvoiceById(orderId)
                   } catch (error) {
                       console.error('Failed to download invoice:', error)
                   } finally {
                       setDownloadLoading(false)
                   }
               }

               // Trigger download when invoice is loaded for current order
               useEffect(() => {
                   if (invoice && currentOrderId === orderId && !downloadLoading) {
                       const a = document.createElement("a")
                       a.href = invoice
                       a.download = `invoice_${orderId}.pdf`
                       a.click()
                       setCurrentOrderId(null)
                   }
               }, [invoice, currentOrderId, orderId, downloadLoading])

    if (status.payment.toLowerCase() == "betaald" )
            return (
                  <>
                <div ref={modalRef} className={'  hidden bg-white gap-2 tria px-1 py-2 max-w-[7vw] flex-wrap transform translate-y-8  -left-1.5  rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute  justify-center items-center hover:shadow-md hover:scale-105 transition-all ' + className}>
                   
                    <span onClick={() => openModalAction(modalRefs.hideModal.current)} className='cursor-pointer'>
                        <img width={22} height={22} src="/actions/hide_icon.svg" alt="" />
                    </span>
                    <span onClick={() => {navigate()}} className='cursor-pointer'>
                        <img width={22} height={22} src="/actions/show_icon.svg" alt="" />
                    </span>
                    {
                        downloadLoading ? (
                            <div className='w-[22px] h-[22px] border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin'></div>
                        ) : (
                            <span onClick={handleDownload} className='cursor-pointer hover:opacity-70 transition-opacity'>
                                <img width={22} height={22} src="/actions/download.svg" alt="" />
                            </span>
                        )
                    }
                      </div >
                    
                </>
            )
    else
           return (
                  <>
                <div ref={modalRef} className={'  hidden bg-white gap-2 tria px-1 py-2 max-w-[7vw] flex-wrap transform translate-y-8  -left-1.5  rounded-lg z-10  w-max border-1 border-gray-300 h-max  min-h-[6vh] absolute  justify-center items-center hover:shadow-md hover:scale-105 transition-all ' + className}>
                   
                    <span onClick={() => openModalAction(modalRefs.hideModal.current)} className='cursor-pointer'>
                        <img width={22} height={22} src="/actions/hide_icon.svg" alt="" />
                    </span>
                     <span onClick={() => {navigate()}} className='cursor-pointer'>
                        <img width={22} height={22} src="/actions/show_icon.svg" alt="" />
                    </span>
                      </div >
                   
                </>)
}



   const useOpenDetailsPage = (tableName: string , id : string | null) => {  
                const router = useRouter()
                const navigate = useCallback((edit?: boolean  ) => {
                      if (id == null && tableName == null ) return 
                    router.push(`/admin-panel/${edit? tableName+"/edit" : tableName}/${id}`) 
                   },[id])
     return {navigate}
             }
