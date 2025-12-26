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
import { Map, Marker } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

export type IdentityModalRef = {
  open: () => void;
  close: () => void;
};

type IdentityModalProps = {
  coordinates?: { longitude: number; latitude: number };
  zoom?: number;
  mapStyleUrl?: string;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  className?: string;
};

const DEFAULT_COORDINATES = { longitude: 4.9041, latitude: 52.3676 }; // Amsterdam
const DEFAULT_ZOOM = 10;

const GOOGLE_STYLE_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_KEY || '';
const GOOGLE_STYLE_URL = GOOGLE_STYLE_KEY
  ? `https://maps.geoapify.com/v1/styles/googlemaps/style.json?apiKey=${GOOGLE_STYLE_KEY}`
  : undefined;

const DEFAULT_STYLE = GOOGLE_STYLE_URL ?? 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

const markerStyle =
  'flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-[#ff6b35] shadow-lg shadow-[#ff6b35]/40';

const IdentityModal = forwardRef<IdentityModalRef, IdentityModalProps>(
  (
    {
      coordinates = DEFAULT_COORDINATES,
      zoom = DEFAULT_ZOOM,
      mapStyleUrl = DEFAULT_STYLE,
      title = 'Adres bekijken',
      description,
      confirmLabel = 'Bevestigen',
      cancelLabel = 'Annuleren',
      onConfirm,
      onCancel,
      className = '',
    },
    ref,
  ) => {
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
          console.error('IdentityModal action error:', error);
        } finally {
          close();
        }
      },
      [close],
    );

    if (!isMounted || !isOpen || typeof document === 'undefined') {
      return null;
    }

    const initialViewState = {
      longitude: coordinates.longitude,
      latitude: coordinates.latitude,
      zoom,
    };

    return createPortal(
      <div className='fixed inset-0 z-50 flex items-center justify-center px-4 py-8'>
        <div
          className='absolute inset-0 bg-transparent'
          onClick={() => executeAndClose(onCancel)}
        />

        <div className='w-[17vw] h-[40vh] p-4   bg-white border-1 border-gray-300  rounded-2xl '>
          <div className='h-[50%] rounded-2xl overflow-hidden  '>
            <Map
              initialViewState={initialViewState}
              mapStyle={mapStyleUrl}
              style={{ height: '100%', width: '100%' }}
            >
              <Marker longitude={coordinates.longitude} latitude={coordinates.latitude} anchor='bottom'>
                <div className={markerStyle} />
              </Marker>
            </Map>
            
             </div>
               <h2 className='mt-4 text-2xl h-[45%] w-full text-black   flex flex-col justify-around 
               '>
                   <span> Venenweg 66</span>
               <span>1161 AK, Zwanenburg</span> 
               <span>Nederland</span>
           
                 </h2>
            
        </div>
         

      </div>,
      document.body,
    );
  },
);

IdentityModal.displayName = 'IdentityModal';

export default IdentityModal;
