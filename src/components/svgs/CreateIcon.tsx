import Image from 'next/image'
import React from 'react'

export default function CreateIcon({ className , width = 20, height = 20} : {className?: string, width?: number, height?: number}) {
  return (
    <Image src='/iconCal.png' alt='create icon' width={width} height={height} className={className} />
  )
}
