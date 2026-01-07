"use client";
import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

type Props = {
  lat: number;
  lng: number;
};

const containerStyle = {
  width: "100%",
  height: "400px",
};



export default function AddressModal( {isOpen , close } : {isOpen : boolean , close : () => void}) {
       const divRef = React.useRef<HTMLDivElement>(null);
       const [body , setBody] = React.useState<HTMLElement | null>(null);
       useEffect(() => {

        if (isOpen  && divRef.current) {
            setBody(document.body);
        }
        if(body){
          body.innerHTML =' <div></div>'
           body.style.position = isOpen ? 'fixed' : 'static';
           console.log("body style setted")
        }
       }, [isOpen])
     const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
  });

  if (!isLoaded) return <p>Loading map...</p>;
  return createPortal(
    <>
    {

      isOpen && 
       <div ref={divRef}  className='w-[100vw]  grid place-content-center  absolute top-0 bottom-0 z-50 abs h-[100vh] bg-black/20'>
        <div className=' relative w-[40vw] h-[40vh] bg-white rounded-lg flex items-center justify-center'>
            <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: 10, lng: 10 }}
      zoom={15}
    >
      <Marker position={{ lat: 10, lng: 10 }} />
    </GoogleMap>
               <button className=' text-lg text-gray-400 absolute top-1 p-1 right-1 mt-1 mr-1' onClick={close}>X</button>
        </div>
        
    </div>
    }
    </>, document.body
  )
}
