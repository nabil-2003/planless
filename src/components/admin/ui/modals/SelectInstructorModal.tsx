'use client'
import useInstructor from '@/app/hooks/useInstructor';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom';
import { parseInsructor } from '../tables/InstructorTable';
import Spinner from '@/components/ui/Spinner';
import useLessons from '@/app/hooks/useLessons';
import { IoMdCloseCircle } from "react-icons/io";
import CustmButton from '../CustmButton';

export type InstructorModalRef = {
    toggle: (e: React.MouseEvent<HTMLSpanElement>) => void
    selected?: () => number;
    close?: () => void;
}

type SelectInstructorModalProps = {
   orderId : string ;
   instructorId : string  ;
}

// Track all open modal instances
const openModals = new Set<() => void>();

// ========== Loading Modal Component ==========
type LoadingModalProps = {
  isVisible: boolean;
};

const LoadingModal: React.FC<LoadingModalProps> = ({ isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div className='text-dark-blue w-[25vw] h-[28vh] grid place-content-center relative'>
      <Spinner />
    </div>
  );
};

// ========== Success Message Modal Component ==========
type SuccessMessageModalProps = {
  isVisible: boolean;
  onClose: () => void;
  changeCurrentPhase: () => void;
};

const SuccessMessageModal: React.FC<SuccessMessageModalProps> = ({ isVisible, onClose ,changeCurrentPhase}) => {
  useEffect(() => {
    if (isVisible) changeCurrentPhase();
  }, [isVisible]);

  if (!isVisible) return null;
  return (
    <div className='text-dark-blue w-[25vw] h-[28vh] grid  place-content-center relative'>
      <span 
        onClick={onClose}
        className='absolute mr-1 mt-1 right-0 cursor-pointer'
      >
        <IoMdCloseCircle className='scale-125' width={40} height={40} />
      </span>
      <span className='mx-auto text-center text-xl text-black'>
        Instructeur heeft de update succesvol voltooid.
      </span>
    </div>
  );
};

// ========== Confirmation Modal Component ==========
type ConfirmationModalProps = {
  isVisible: boolean;
  instructorName: string;
  onConfirm: () => void;
  onCancel: () => void;
  changeCurrentPhase: () => void;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ 
  isVisible, 
  instructorName, 
  onConfirm, 
  onCancel , 
  changeCurrentPhase
}) => {
  useEffect(() => {
    if (isVisible) changeCurrentPhase();
  }, [isVisible]);

  if (!isVisible) return null;

  const displayName = instructorName
  return (
    <div className='text-dark-blue  w-[25vw] h-[28vh] p-4 flex flex-col gap-3'>
      <img src="/modal/flag.svg" className='w-[40%] mx-auto h-[30%]' alt="" />
      <p className='text-lg font-semibold mx-auto text-black'>Instructeur toewijzen</p>
      <p className='text-gray-400 text-xs text-center'>
        Weet je zeker dat je<span className='font-semibold'>"{displayName}"</span>als instructeur wilt toewijzen?
      </p>
      <div className='flex gap-2 justify-center mt-2'>
        <CustmButton
          onClick={onCancel}
          className='px-4 py-2 bg-[#FE911F] text-white w-[49%] rounded hover:bg-gray-400 transition-colors'
        >
          Annuleren
        </CustmButton>
        <CustmButton
          onClick={onConfirm}
          className='px-4 py-2 bg-blue-900 text-white w-[49%] rounded hover:bg-blue-800 transition-colors'
        >
          Bevestigen
        </CustmButton>
      </div>
    </div>
  );
};

// ========== Instructor List Modal Component ==========
type InstructorListModalProps = {
  isVisible: boolean;
  instructors: any[];
  currentInstructorId: string;
  onSelectInstructor: (id: number, name: string) => void;
  changeCurrentPhase: () => void;
};

const InstructorListModal: React.FC<InstructorListModalProps> = ({ 
  isVisible, 
  instructors, 
  currentInstructorId,
  onSelectInstructor ,
  changeCurrentPhase 
}) => {
  useEffect(() => {
    if (isVisible) changeCurrentPhase();
  }, [isVisible]);

  if (!isVisible) return null;
  
  const filteredInstructors = parseInsructor(instructors).filter(
    e => e.id.toString() !== currentInstructorId
  );
  console.log("Filtered Instructors:", filteredInstructors);
  return (
    <>
      {filteredInstructors.map((e) => {
        const displayName = e.instructor?.length > 25 
          ? e.instructor.substring(0, 25) + '...' 
          : e.instructor;
        
        return (
          <span
            onClick={() => onSelectInstructor(e.id, e.instructor)}
            key={e.id}
            className='py-2 cursor-pointer  hover:bg-blue-900 hover:text-white pointer-events-auto block'
            data-id={e.id}
          >
            {displayName}
          </span>
        );
      })}
    </>
  );
};

// ========== Main Select Instructor Modal ==========
const SelectInstructorModal = forwardRef<InstructorModalRef, SelectInstructorModalProps>(({orderId , instructorId}, ref) => {
    const refDiv = useRef<HTMLDivElement>(null);
    const [selectedInstructor, setSelectedInstructor] = useState<number | null>(null);
    const [tentativeInstructor, setTentativeInstructor] = useState<{id: number, name: string} | null>(null);
    const {fetchAllInstructors , instructors , loading , resetMessage , msg , changeInstructorInOrder } = useInstructor() ;
    const { fetchAllLessons } = useLessons() ;
    const [isOpen, setIsOpen] = useState(false);
    const [originalPosition, setOriginalPosition] = useState<{top: string, left: string} | null>(null);
      

    // Close function
    const closeModal = useCallback(() => {
        if (refDiv.current) {
            refDiv.current.classList.add('hidden');
            refDiv.current.classList.remove('flex');
            refDiv.current!.style.opacity = '0';
            setIsOpen(false);
            setOriginalPosition(null);
            setTentativeInstructor(null);
            openModals.delete(closeModal);
        }
    }, []);

    // Register/unregister this modal instance
    useEffect(() => {
        return () => {
            openModals.delete(closeModal);
        };
    }, [closeModal]);

    useImperativeHandle(ref, () => ({
        toggle: (e) => {
            if (refDiv.current != null && refDiv.current.classList.contains('hidden')) {
                // Close all other open modals first
                openModals.forEach(closeFn => {
                    if (closeFn !== closeModal) {
                        closeFn();
                    }
                });
                
                refDiv.current.classList.remove('hidden');
                refDiv.current.classList.add('flex');
                refDiv.current!.style.opacity = '1';
                console.log( e.clientX , e.clientY )
                const topPos = e.clientY +7+window.scrollY+'px';
                const leftPos = e.clientX -110.5+window.scrollX + 'px';
                refDiv.current!.style.top = topPos;
                refDiv.current!.style.left = leftPos;
                setOriginalPosition({ top: topPos, left: leftPos });
                setIsOpen(true);
                openModals.add(closeModal);
            } else if (refDiv.current) {
                closeModal();
            }
        },
        close: closeModal,
    }), [closeModal]);

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
        setTentativeInstructor(null);
      }
    }, [selectedInstructor]);

    // Update positioning when modal state changes
    useEffect(() => {
      if (refDiv.current && isOpen) {
        const shouldCenter = loading || !!msg || !!tentativeInstructor;
        const isList = !tentativeInstructor && !loading && !msg;
        const scale = loading ? 'scale(0.5)' : isList ? 'scale(0.75)' : 'scale(1)';
        if (shouldCenter) {
          // Center the modal
          refDiv.current.style.position = 'fixed';
          refDiv.current.style.top = '50%';
          refDiv.current.style.left = '50%';
          refDiv.current.style.transform = `translate(-50%, -50%) ${scale}`;
        } else if (originalPosition) {
          // Restore original position for instructor list
          refDiv.current.style.position = 'absolute';
          refDiv.current.style.top = originalPosition.top;
          refDiv.current.style.left = originalPosition.left;
          refDiv.current.style.transform = scale;
        }
      }
    }, [loading, msg, tentativeInstructor, isOpen, originalPosition]);

    const handleConfirmSelection = () => {
      if (tentativeInstructor) {
        setSelectedInstructor(tentativeInstructor.id);
      }
    };

    const handleCancelSelection = () => {
      setTentativeInstructor(null);
    };

    const handleSelectInstructor = (id: number, name: string) => {
      setTentativeInstructor({ id, name });
    };

    const handleSuccessClose = () => {
      resetMessage();
      setSelectedInstructor(null);
      closeModal();
      setTimeout(() => {
        fetchAllLessons()
      }, 200);
    };

    // Determine which modal to show
    const showLoading: boolean = loading;
    const showSuccess: boolean = !!msg && !loading;
    const showConfirmation: boolean = !!tentativeInstructor && !loading && !msg;
    const showInstructorList: boolean = !tentativeInstructor && !selectedInstructor && !loading && !msg;
    
    // Show backdrop only for centered modals, not for instructor list
    const showBackdrop = showLoading || showSuccess || showConfirmation;
    return createPortal(
        <>
        {/* Backdrop overlay - only for centered modals */}
        {isOpen && showBackdrop && <div className='fixed inset-0 bg-black/30 z-40 pointer-events-auto' onClick={closeModal} />}
        
        {/* Modal container with arrow */}
        <div 
          className="z-50 hidden w-fit h-fit p-0 flex-col pointer-events-auto overflow-visible origin-top"
          ref={refDiv} 
          style={{ filter: 'drop-shadow(0 20px 25px rgb(0 0 0 / 0.15))', position: 'absolute' }}
        >
          {/* Arrow pointing up - before the white box, only for instructor list */}
          {showInstructorList && (
            <div className='w-0 h-0 mx-auto border-l-[10px] border-l-transparent border-b-[10px] border-b-white border-r-[10px] border-r-transparent' />
          )}

          {/* Modal content */}
          <div
            className={`bg-white z-50 transition-all duration-300 min-w-[15vw] min-h-[15vh] p-2 flex flex-col pointer-events-auto [&::-webkit-scrollbar]:hidden ${showInstructorList ? 'overflow-auto rounded-lg max-h-[40vh] gap-2' : 'rounded-lg gap-2'}`}
            style={showInstructorList ? { scrollbarWidth: 'none' } : undefined}
          >
            
            <LoadingModal isVisible={showLoading} />
            
            <SuccessMessageModal 
              isVisible={showSuccess} 
              onClose={handleSuccessClose}
              changeCurrentPhase={() => {}}
            />
            
            <ConfirmationModal
              isVisible={showConfirmation}
              instructorName={tentativeInstructor?.name || ''}
              onConfirm={handleConfirmSelection}
              onCancel={handleCancelSelection}
              changeCurrentPhase={() => {}}
            />
            
            <InstructorListModal
              isVisible={showInstructorList}
              instructors={instructors}
              currentInstructorId={instructorId}
              onSelectInstructor={handleSelectInstructor}
              changeCurrentPhase={() => {}}
            />
          </div>
        </div>
        </>,
        document.body
    )
});

SelectInstructorModal.displayName = 'SelectInstructorModal';

export default SelectInstructorModal;