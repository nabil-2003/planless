import React, { forwardRef } from 'react'

/* export default function SearchIcon ({ className ,width ,  pathStroke, height} :{ pathStroke:string , className :string , width :string , height:string }) {
  return (
<svg ref className={className} width={width} height={height} viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
<path d="M17 17L21 21" stroke={pathStroke}  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke={pathStroke} strokeWidth="2"/>
</svg>
  )
} */

 export type SearchIconRef =  {
    hide : ()=> void
    show : ()=> void
    className?: string
 }
 export type SearchIconProps = {    
    className?: string
    width?: string
    height?: string
    pathStroke?: string
 }
const SearchIcon = forwardRef<SearchIconRef, SearchIconProps>(({ className , width, height , pathStroke  }, ref) => {
   const svgRef = React.useRef<SVGSVGElement>(null);      
    React.useImperativeHandle(ref, () => ({
        hide: () => svgRef.current?.classList.add('hidden'),
        show: () => svgRef.current?.classList.remove("hidden"),
    }));    
            
    return (

<svg className={className}  ref={svgRef} width={width} height={height} viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
<path d="M17 17L21 21" stroke={pathStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke={pathStroke} strokeWidth="2"/>
</svg>
    )
})

SearchIcon.displayName = 'SearchIcon';
export default SearchIcon       
