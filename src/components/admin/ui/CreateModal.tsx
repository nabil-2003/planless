'use client'
import CreateIcon from '@/components/svgs/CreateIcon'
import React, { useImperativeHandle, useRef, useState, useEffect } from 'react'
import { forwardRef } from 'react'
import CustomSelect from './CustomSelect'
import CustomSearch from './CustomSearch'
import CustomInput from '@/components/admin/ui/Input'
import { Button } from '@/components/ui'
import CustmButton from './CustmButton'
import CusTomDate from './CustomDateModal'
import { createPortal } from 'react-dom'

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
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const modalRef = React.useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true),
        close: () => setIsOpen(false)
    }));

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div 
                className="fixed inset-0 bg-black/50" 
                onClick={() => setIsOpen(false)}
            />
            <div 
                ref={modalRef}
                className="relative bg-white rounded-lg p-6 shadow-xl max-w-md w-full mx-4 z-10"
            >
                <h2 className="text-xl font-semibold mb-4">{name}</h2>
                <div className="text-gray-600">
                    Modal content here
                </div>
                <div className="mt-6 flex justify-end gap-2">
                    <CustmButton 
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 bg-gray-200 rounded"
                    >
                        Close
                    </CustmButton>
                </div>
            </div>
        </div>,
        document.body
    );
});

export default CreateModal;

CreateModal.displayName = 'CreateModal'
