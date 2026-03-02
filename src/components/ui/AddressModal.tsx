"use client";
import React, { useEffect, useState, useRef } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

type Props = {
  isOpen: boolean;
  close: () => void;
  address?: string | null;
  lat?: number | null;
  lng?: number | null;
};

const containerStyle = {
  width: "100%",
  height: "300px",
};

// Default center (Netherlands)
const defaultCenter = {
  lat: 52.3676,
  lng: 4.9041
};

// Geocoding using our Next.js API route (which calls Nominatim server-side)
async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  if (!address || address === "---") return null;
  
  try {
    const url = `/api/geocode?address=${encodeURIComponent(address)}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 404) {
        console.log("Location not found for:", address);
      } else {
        console.error("Geocoding API error:", response.status);
      }
      return null;
    }
    
    const data = await response.json();
    
    if (data && data.lat && data.lng) {
      return { lat: data.lat, lng: data.lng };
    }
    
    return null;
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
}

export default function AddressModal({ isOpen, close, address, lat, lng }: Props) {
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [hasCoordinates, setHasCoordinates] = useState(false);
  const lastGeocodedAddress = useRef<string | null>(null);
  const isGeocodingRef = useRef(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
  });

  // Dynamic geocoding: Use coordinates if available, otherwise geocode the address
  useEffect(() => {
    if (!isLoaded) return;

    // Reset geocoding state when address changes
    if (lastGeocodedAddress.current && lastGeocodedAddress.current !== address) {
      lastGeocodedAddress.current = null;
      isGeocodingRef.current = false;
    }

    // Priority 1: Use direct lat/lng if provided
    if (lat && lng) {
      const position = { lat, lng };
      setMapCenter(position);
      setMarkerPosition(position);
      setHasCoordinates(true);
      setIsGeocoding(false);
      return;
    }

    // Priority 2: Geocode the address using Nominatim API
    if (address && address !== "---") {
      // Prevent repeated geocoding of the same address
      if (lastGeocodedAddress.current === address || isGeocodingRef.current) {
        return;
      }
      
      lastGeocodedAddress.current = address;
      isGeocodingRef.current = true;
      setIsGeocoding(true);
      
      geocodeAddress(address).then(coords => {
        if (coords) {
          setMapCenter(coords);
          setMarkerPosition(coords);
          setHasCoordinates(true);
        } else {
          setMapCenter(defaultCenter);
          setMarkerPosition(defaultCenter);
          setHasCoordinates(true);
        }
        setIsGeocoding(false);
        isGeocodingRef.current = false;
      }).catch(error => {
        console.error("Geocoding failed:", error);
        setMapCenter(defaultCenter);
        setMarkerPosition(defaultCenter);
        setHasCoordinates(true);
        setIsGeocoding(false);
        isGeocodingRef.current = false;
      });
    } else {
      // Show default location with marker if no address
      setMapCenter(defaultCenter);
      setMarkerPosition(defaultCenter);
      setHasCoordinates(true);
      setIsGeocoding(false);
    }
  }, [isLoaded, address, lat, lng]);

  if (!isLoaded) {
    return (
      <div className='w-full h-[300px] flex items-center justify-center bg-gray-100 rounded-lg'>
        <p className='text-gray-600'>Loading map...</p>
      </div>
    );
  }

  if (isGeocoding) {
    return (
      <div className='w-full h-[300px] flex items-center justify-center bg-gray-100 rounded-lg'>
        <div className='flex flex-col items-center gap-2'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
          <p className='text-gray-600'>Finding location...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full'>
      {/* Display Address Text */}
   
      
      {/* Map with dynamic coordinates */}
      <div className='w-full h-[21vh] rounded-lg overflow-hidden border border-gray-200'>
        <GoogleMap
          key={`${markerPosition.lat}-${markerPosition.lng}`}
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={hasCoordinates ? 15 : 7}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: true,
          }}
        >
          <Marker position={markerPosition} />
        </GoogleMap>
      </div>
    </div>
  );
}
