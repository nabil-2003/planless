import React from 'react'

export default function PlusIcon({className, color , w , h}:{className?:string , color:string , h:string , w:string}) {
  return (
   <svg className={`${className}`} width={w} height={h} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 12H18M12 6V18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  )
}
