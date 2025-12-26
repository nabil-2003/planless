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
};

const DocumentModal = forwardRef<DocumentModalRef, DocumentModalProps>(
  (
    {
      title = 'Document bekijken',
      documentName,
      documentUrl,
      description,
      className = '',
    },
    ref,
  ) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const previousOverflow = useRef<string | null>(null);

    useEffect(() => {
      setIsMounted(true);
    }, []);

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
         <div className='relative w-[40vw] h-[40vh] border-1 p-4 border-gray-300 rounded-2xl bg-white'>
            <img ref={imgRef} src="/Id.png" alt=""  className='w-full h-full object-cover rounded-2xl '/>
          <button onClick={downloadImg} className='bg-white hover:bg-gray-200 cursor-pointer absolute right-5 top-1  p-4 text-black rounded-full mt-4'>
                 <FaDownload></FaDownload>
            </button>
          
         </div>
      </div>,
      document.body,
    );
  },
);

DocumentModal.displayName = 'DocumentModal';

export default DocumentModal;
