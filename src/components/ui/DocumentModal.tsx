'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import CustmButton from '../admin/ui/CustmButton';
import Image from 'next/image';
import { FaDownload } from 'react-icons/fa';
import useInvoice from '@/app/hooks/useInvoice';
import { spawn } from 'child_process';

export type DocumentModalRef = {
  open: () => void;
  close: () => void;
};

type DocumentModalProps = {
  title?: string;
  documentName?: string;
  documentUrl?: string;
  description?: string;
  className?: string;
  orderId?: string
};

const DocumentModal = forwardRef<DocumentModalRef, DocumentModalProps>(
  (
    {
      title = 'Document bekijken',
      documentName,
      documentUrl,
      description,
      className = '',
      orderId
    },
    ref,
  ) => {
    const imgRef = useRef<HTMLIFrameElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const previousOverflow = useRef<string | null>(null);

    useEffect(() => {
      setIsMounted(true);
    }, []);
      const {getInvoiceById , loading , error , invoice} = useInvoice()
    const close = useCallback(() => {
      setIsOpen(false);
    }, []);

    const open = useCallback(() => {
      setIsOpen(true);
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        open,
        close,
      }),
      [close, open],
    );
    useEffect(()=>{
      if(isOpen && orderId){
        console.log("treating ...")
        getInvoiceById(orderId) ; 
      }
    },[orderId , isOpen ])

    useEffect(() => {
      if (!isOpen) {
        if (previousOverflow.current !== null) {
          document.body.style.overflow = previousOverflow.current;
          previousOverflow.current = null;
        }
        return;
      }


      previousOverflow.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          close();
        }
      };
     

      document.addEventListener('keydown', onKeyDown);

      return () => {
        document.removeEventListener('keydown', onKeyDown);
        if (previousOverflow.current !== null) {
          document.body.style.overflow = previousOverflow.current;
          previousOverflow.current = null;
        }
      };
    }, [close, isOpen]);

    const executeAndClose = useCallback(
      async (fn?: () => void | Promise<void>) => {
        if (!fn) {
          close();
          return;
        }

        try {
          await fn();
        } catch (error) {
          console.error('DocumentModal action error:', error);
        } finally {
          close();
        }
      },
      [close],
    );
 const downloadImg = ()=>{
        if(!imgRef.current) return;
        const link = document.createElement('a');
        link.href = imgRef.current.src;
        link.download = 'downloaded_image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    if (!isMounted || !isOpen || typeof document === 'undefined') {
      return null;
    }

    return createPortal(
      <div className='fixed inset-0 z-50 flex items-center justify-center px-4 py-8'>
        <div
          className='absolute inset-0 bg-transparent'
          onClick={() => executeAndClose()}
        />
         <div className='relative w-[90vw] grid h-[90vh] place-items-center border-1 p-4 border-gray-300 bg-white rounded-2xl '>
{
  loading  && <div className=' w-[3vw] h-[3vw] rounded-full my-auto border-l-0 animate-spin  border-1 '></div> 
  || 
  <iframe  className='w-full bg-amber-300 rounded  h-full' src={invoice}  />

}
           <span className='px-3 py-2 rounded grid place-content-center bg-blue-800  border-0.5 text-white hover:opacity-80  border-black absolute left-0 bottom-0 ml-5 mb-5 cursor-pointer ' onClick={close}>close</span>
         </div>
      </div>,
      document.body,
    );
  },
);

DocumentModal.displayName = 'DocumentModal';

export default DocumentModal;
