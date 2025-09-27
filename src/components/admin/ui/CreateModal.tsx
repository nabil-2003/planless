'use client'
import CreateIcon from '@/components/svgs/CreateIcon'
import React, { useImperativeHandle } from 'react'
import { forwardRef } from 'react'
import CustomSelect from './CustomSelect'
import CustomSearch from './CustomSearch'
import CustomInput from '@/components/admin/ui/Input'
import { Button } from '@/components/ui'
import CustmButton from './CustmButton'
 
export type CreateModalRef ={
    open :()=> void
    close :()=> void 
}
type CreateProps ={
     name: string
}




const CreateModal = forwardRef<CreateModalRef, CreateProps>(({name}, ref) => {
    const modalRef = React.useRef<HTMLDivElement>(null);  
    
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
                    placeholder='nabil filali'
                 className='w-full my-2' 
                    options={[
                        { value: 'kareem', label: "kareem" },
                        { value: 'nabil', label: "nabil" },]}
                 />
                  <label  htmlFor="Lespakketten" className='capitalize  text-sm  text-gray-400'>Lespakketten</label>
                <CustomSelect
                    
                    placeholder='Brommer: 10 lessen + examen'
                 className='w-full my-2' 
                    options={[
                        { value: 'kareem', label: "kareem" },
                        { value: 'nabil', label: "nabil" },]}
                 />
                  <label  htmlFor="facture" className='capitalize  text-sm  text-gray-400'>factuurbedrag</label>
                  <CustomInput type='text' placeholder='€ 450' onChange={()=>{}} className='bg-tansparent border-1 border-gray-300 p-2 w-full' />
                  <label  htmlFor="Starttijd" className='capitalize  text-sm  text-gray-400'>Starttijd Les</label>
                  <CustomInput type='date'  placeholder='Select date' onChange={()=>{}} className='bg-tansparent border-1 placeholder:text-gray-400 border-gray-300 p-2 w-full' />
                <label  htmlFor="Eindtijd" className='capitalize  text-sm  text-gray-400'>Eindtijd Les</label>
                  <CustomInput type='date'  placeholder='Select date' onChange={()=>{}} className='bg-tansparent border-1 placeholder:text-gray-400 border-gray-300 p-2 w-full' />
                 <div className='flex justify-around  gap-4 mt-6 mb-3'>
                    <CustmButton classeName='px-7 bg-white  border-[var(--dark-blue)] text-[var(--dark-blue)] hover:bg-[var(--dark-blue)] hover:text-white border-2'

                       onClick={()=>console.log("submiting form")}>
                      Annuleren
                    </CustmButton>
                       <CustmButton classeName='px-7 bg-dark-blue  text-white' onClick={()=>console.log("submiting form")} >
                      Bevestigen
                    </CustmButton>
                 </div>

             </form>
        
        </div>
    );
});

export default CreateModal;

CreateModal.displayName = 'CreateModal'