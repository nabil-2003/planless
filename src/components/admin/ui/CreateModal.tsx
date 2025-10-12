'use client'
import CreateIcon from '@/components/svgs/CreateIcon'
import React, { useImperativeHandle, useRef, useState } from 'react'
import { forwardRef } from 'react'
import CustomSelect from './CustomSelect'
import CustomSearch from './CustomSearch'
import CustomInput from '@/components/admin/ui/Input'
import { Button } from '@/components/ui'
import CustmButton from './CustmButton'
import CusTomDate from './CustomDateModal'

type CustomDateRef = {
  firstDateMs?: number;
  lastDateMs?: number; 
  singleDate?: number;
  open: () => void;
  close: () => void;
  getSelectedRange: () => { firstDateMs: number; lastDateMs: number } | null;
  clearSelection: () => void;
  setDateRange: (startDate: string, endDate: string) => void;
}
 
export type CreateModalRef ={
    open :()=> void
    close :()=> void 
}
type CreateProps ={
     name: string
}




const CreateModal = forwardRef<CreateModalRef, CreateProps>(({name}, ref) => {
    const modalRef = React.useRef<HTMLDivElement>(null);  
    const startTimeModalRef = useRef<CustomDateRef>(null);
    const endTimeModalRef = useRef<CustomDateRef>(null);
    const [student, setStudent] = useState<string>('');
    const [instructeur, setInstructeur] = useState<string>('');
    const [startDate, setStartDate] = useState<{ firstDateMs: number; lastDateMs: number } | null>(null);
    const [endDate, setEndDate] = useState<{ firstDateMs: number; lastDateMs: number } | null>(null);
    const [Facture , setFacture] = useState<string>('');
    
    const hideOtherElements = () => {
        const modal = modalRef.current;
        if (modal) {
             // Disable body scroll
            // Hide other elements
            const Elements = document.querySelectorAll('.content > *:not(.create-modal)');
            Elements.forEach((el) => {
                if (el !== modal) {
                    (el as HTMLElement).style.filter= "blur(5px)" ;
                    (el as HTMLElement).classList.add('pointer-events-none', 'select-none');
                }
            });
            modal.style.filter = "none"; // Ensure modal is not blurred

        }
    }

    // Handle start date selection
    const handleStartDateSelect = (dates: { firstDateMs: number; lastDateMs: number } | null) => {
        setStartDate(dates);
    };

    // Handle end date selection  
    const handleEndDateSelect = (dates: { firstDateMs: number; lastDateMs: number } | null) => {
        setEndDate(dates);
    };

    // Format date for display
    const formatDate = (dateObj: { firstDateMs: number; lastDateMs: number } | null) => {
        if (!dateObj) return 'Select date';
        const date = new Date(dateObj.firstDateMs);
        return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
    };

    // Handle form submission
    const handleSubmit = () => {
        console.log('Creating rijles with:', {
            Facture,
            startDate: startDate ? new Date(startDate.firstDateMs) : null,
            endDate: endDate ? new Date(endDate.firstDateMs) : null , 
            student,
            instructeur

        });
        // Add your form submission logic here
    }; 
    useImperativeHandle(ref, () => ({
        open() {
            hideOtherElements();
            modalRef.current?.classList.remove('hidden');
        },
        close() {
            console.log("closing modal");
            modalRef.current?.classList.add('hidden');
        }

    }));

    return (
        <>
            <div className='create-modal scale-90 z-index-50  
             absolute top-0 left-0 transform hidden  justify-center items-center w-[30vw] h-max bg-white rounded-lg border-2 border-gray-200 p-3
                translate-x-[115%]   shadow-2xl   '  aria-modal='true' role='dialog' aria-labelledby={name} aria-describedby={`This is the ${name} modal`}
             ref={modalRef}>
                 <CreateIcon className='mx-auto ' width={120} height={120}  />
                 <h2 className='text-center  font-bold text-2xl my-4'>Rijles toevoegen</h2>
                 <p className='text-center text-sm w-full text-gray-500 font-light'>wanneer je deze rijles toevoegt wordt de status aangepast naar <br/> <span className='font-bold'>"In behandeling"</span></p>
                 <form action="" className='mx-3'>
                     <label  htmlFor="instructeurs" className='capitalize  text-sm font- text-gray-400'>instructeur</label>
                     <CustomSelect
                        placeholder='Bijv: Kareem'
                     className='w-full my-2' 
                        options={[
                            { value: 'kareem', label: "kareem" },
                            { value: 'nabil', label: "nabil" },]}
                     />
                       <label  htmlFor="students" className='capitalize  text-sm  text-gray-400'>student</label>
                     <CustomSelect
                       onChange={(value) => setInstructeur(prev=> value.toString())}
                        placeholder='nabil filali'
                     className='w-full my-2' 
                        options={[
                            { value: 'kareem', label: "kareem" },
                            { value: 'nabil', label: "nabil" },]}
                     />
                      <label  htmlFor="Lespakketten" className='capitalize  text-sm  text-gray-400'>Lespakketten</label>
                    <CustomSelect
                            defaultValue={'kareem'}
                            onChange={(value) => setStudent(prev=> value.toString())}
                        placeholder='Brommer: 10 lessen + examen'
                     className='w-full my-2' 
                        options={[
                            { value: 'kareem', label: "kareem" },
                            { value: 'nabil', label: "nabil" },]}
                     />
                      <label  htmlFor="facture" className='capitalize  text-sm  text-gray-400'>factuurbedrag</label>
                      <CustomInput value={Facture!} type='text' placeholder='€ 450' onChange={(e)=>{setFacture(e.target.value)}} className='bg-tansparent border-1 border-gray-300 p-2 w-full' />
                      <label  htmlFor="Starttijd" className='capitalize  text-sm  text-gray-400'>Starttijd Les</label>
                      {/* Custom Date Input for Start Time */}
                      <div 
                        onClick={() => startTimeModalRef.current?.open()}
                        className='flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 w-full cursor-pointer hover:border-gray-400 transition-colors my-2'
                      >
                        <svg 
                          className='w-5 h-5 text-gray-400 mr-2' 
                          fill='none' 
                          stroke='currentColor' 
                          viewBox='0 0 24 24'
                        >
                          <path 
                            strokeLinecap='round' 
                            strokeLinejoin='round' 
                            strokeWidth={2} 
                            d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' 
                          />
                        </svg>
                        <span className={`text-sm flex-1 ${startDate ? 'text-gray-900' : 'text-gray-400'}`}>
                          {formatDate(startDate)}
                        </span>
                        {startDate && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startTimeModalRef.current?.clearSelection();
                              setStartDate(null);
                            }}
                            className='ml-2 text-gray-400 hover:text-gray-600'
                          >
                            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                            </svg>
                          </button>
                        )}
                      </div>

                    <label  htmlFor="Eindtijd" className='capitalize  text-sm  text-gray-400'>Eindtijd Les</label>
                      {/* Custom Date Input for End Time */}
                      <div 
                        onClick={() => endTimeModalRef.current?.open()}
                        className='flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 w-full cursor-pointer hover:border-gray-400 transition-colors my-2'
                      >
                        <svg 
                          className='w-5 h-5 text-gray-400 mr-2' 
                          fill='none' 
                          stroke='currentColor' 
                          viewBox='0 0 24 24'
                        >
                          <path 
                            strokeLinecap='round' 
                            strokeLinejoin='round' 
                            strokeWidth={2} 
                            d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' 
                          />
                        </svg>
                        <span className={`text-sm flex-1 ${endDate ? 'text-gray-900' : 'text-gray-400'}`}>
                          {formatDate(endDate)}
                        </span>
                        {endDate && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              endTimeModalRef.current?.clearSelection();
                              setEndDate(null);
                            }}
                            className='ml-2 text-gray-400 hover:text-gray-600'
                          >
                            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                            </svg>
                          </button>
                        )}
                      </div>
                     <div className='flex justify-around  gap-4 mt-6 mb-3'>
                        <CustmButton className='px-7 bg-white  border-[var(--dark-blue)] text-[var(--dark-blue)] hover:bg-[var(--dark-blue)] hover:text-white border-2'
                           onClick={() => {
                             console.log("cancelling form");
                             // Clear form data
                             setStartDate(null);
                             setEndDate(null);
                             // Close modal  
                             modalRef.current?.classList.add('hidden');
                             // Remove blur effect
                             const Elements = document.querySelectorAll('.content > *:not(.create-modal)');
                             Elements.forEach((el) => {
                               (el as HTMLElement).style.filter = "none";
                               (el as HTMLElement).classList.remove('pointer-events-none', 'select-none');
                             });
                           }}>
                          Annuleren
                        </CustmButton>
                           <CustmButton className='px-7 bg-dark-blue  text-white' onClick={handleSubmit} >
                          Bevestigen
                        </CustmButton>
                     </div>

                 </form>
            
            </div>
            
            {/* Date Selection Modals */}
            <CusTomDate 
            className=''
              ref={startTimeModalRef}
              singleUse={true}
              onDateSelect={handleStartDateSelect}
            />
            
            <CusTomDate 
            className=''
              ref={endTimeModalRef}
              singleUse={true}
              onDateSelect={handleEndDateSelect}
            />
        </>
    );
});

export default CreateModal;

CreateModal.displayName = 'CreateModal'
