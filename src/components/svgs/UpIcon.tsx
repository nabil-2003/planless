import React from 'react'

export default function UpIcon({width = 24, height = 24 , color}: { color:string , width?: number, height?: number}) {
  return (
   <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 17L12 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M16 11L12 7L8 11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  )
}
