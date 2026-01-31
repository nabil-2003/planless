'use client'
import useInstructor from '@/app/hooks/useInstructor';
import React, { forwardRef, use, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { createPortal } from 'react-dom';
import { parseInsructor } from '../tables/InstructorTable';
import Spinner from '@/components/ui/Spinner';
import useLessons from '@/app/hooks/useLessons';
import { IoMdCloseCircle } from "react-icons/io";
import CustmButton from '../CustmButton';

export type InstructorModalRef = {
    toggle: (e: React.MouseEvent<HTMLSpanElement>) => void
    selected?: () => number;
}

type SelectInstructorModalProps = {
   orderId : string ;
   instructorId : string  ;
}

const SelectInstructorModal = forwardRef<InstructorModalRef, SelectInstructorModalProps>(({orderId , instructorId}, ref) => {
    const refDiv = useRef<HTMLDivElement>(null);
    const [selectedInstructor, setSelectedInstructor] = useState<number | null>(null);
    const [tentativeInstructor, setTentativeInstructor] = useState<{id: number, name: string} | null>(null);
    const {fetchAllInstructors , instructors , loading , resetMessage , msg , changeInstructorInOrder } = useInstructor() ;
    const { fetchAllLessons } = useLessons() ;
    const [isOpen, setIsOpen] = useState(false);
    useImperativeHandle(ref, () => ({
        toggle: (e) => {
            if (refDiv.current != null && refDiv.current.classList.contains('hidden')) {
                refDiv.current.classList.remove('hidden');
                refDiv.current.classList.add('flex');
                refDiv.current!.style.opacity = '1';
                console.log( e.clientX , e.clientY )
                refDiv.current!.style.top = e.clientY +window.scrollY+'px';
                refDiv.current!.style.left = e.clientX +30+window.scrollX + 'px';
                setIsOpen(true);
            } else if (refDiv.current) {
                refDiv.current.classList.add('hidden');
                refDiv.current.classList.remove('flex');
                refDiv.current!.style.opacity = '0';
                setIsOpen(false);
            }
        },

      
    }));
  useEffect(() => {
     if(isOpen){
        console.log(isOpen)
        console.log("Fetching instructors for modal")
         fetchAllInstructors();
     }
    }, [isOpen]);
  useEffect(() => {
    if (selectedInstructor !== null) {
        console.log(selectedInstructor, orderId)
      changeInstructorInOrder(selectedInstructor, orderId);
      setTentativeInstructor(null); // Reset after change
    }
  }, [selectedInstructor]);

  const handleConfirmSelection = () => {
    if (tentativeInstructor) {
      setSelectedInstructor(tentativeInstructor.id);
    }
  };

  const handleCancelSelection = () => {
    setTentativeInstructor(null);
  };
  
    return createPortal(
        <div className='bg-white transition-all duration-300 min-w-[15vw] min-h-[15vh]     shadow-sm rounded-lg max-h-[40vh] overflow-auto  p-2 gap-2  my-50% z-89 w-max absolute    flex-col hidden' ref={refDiv}>
              {
                loading  && <div className='text-dark-blue w-[25vw] h-[28vh] grid place-content-center relative '><Spinner  /></div> || 
                <>
                  {
                    msg && <div className='text-dark-blue w-[25vw] h-[28vh] grid place-content-center relative '>
                        <span onClick={()=>{
                            resetMessage();
                            if (refDiv.current) {
                                refDiv.current.classList.add('hidden');
                                refDiv.current.classList.remove('flex');
                                refDiv.current!.style.opacity = '0';
                                setIsOpen(false);
                            }
                            setTimeout(() => {
                                fetchAllLessons()
                            }, 200);

                        }} className='absolute mr-1 mt-1 right-0   cursor-pointer'><IoMdCloseCircle className='scale-125' width={40} height={40} /></span>
                               <span className='mx-auto text-center text-xl text-black '> Instructeur heeft de update succesvol voltooid.</span>
                        </div> || <>
                 {
                   tentativeInstructor ? (
                     <div className='text-dark-blue w-[25vw] h-[28vh] p-4 flex flex-col gap-3'>
                        <img src="/modal/flag.svg" className='w-[40%] mx-auto h-[30%]' alt="" />
                       <p className='text-lg font-semibold mx-auto text-black'>bevestigen wijzigen</p>
                       <p className=' text-gray-400 text-center'>Weet je zeker dat je <span className='font-semibold'>"{tentativeInstructor.name}"</span> als instructeur wilt?</p>
                       <div className='flex gap-2 justify-center mt-2'>
                         <CustmButton
                           onClick={handleCancelSelection}
                           className='px-4 py-2 bg-[#FE911F] text-white  w-[49%] rounded hover:bg-gray-400 transition-colors'
                         >
                           Annuleren
                         </CustmButton>
                         <CustmButton
                           onClick={handleConfirmSelection}
                           className='px-4 py-2 bg-blue-900 text-white w-[49%] rounded hover:bg-blue-800 transition-colors'
                         >
                           Bevestigen
                         </CustmButton>
                        
                       </div>
                     </div>
                   ) : !selectedInstructor && parseInsructor(instructors).filter(e => e.id.toString() !== instructorId).map((e)=>(
                    <span  onClick={(event)=>{
                      setTentativeInstructor({
                        id: parseInt(event.currentTarget.getAttribute("data-id")!),
                        name: event.currentTarget.textContent!
                      })
                    }}  key={e.id} className='py-2  cursor-pointer hover:bg-blue-900 hover:text-white' data-id={e.id}>{e.instructor}</span>
       
))                     || <div className='text-dark-blue w-[20vw]  h-[20vh] grid place-content-center relative '>Instructor changed successfully!</div>       
                 }
                </>
                  }
                 
                </>
              }
        </div>, document.body
    )

});

SelectInstructorModal.displayName = 'SelectInstructorModal';

export default SelectInstructorModal;