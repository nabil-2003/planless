import React from 'react'

export  function ConfirmIcon({ w = '16px', h = '16px' }: { w?: string, h?: string }) {
  return (
   <svg className='border-1 bg-green-300 border-green-600  rounded-sm p-1' width={w} height={h} viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
<path fill="green" d="M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z"></path>
</svg>
  )
}
export  function RejectIcon({ w = '16px', h = '16px' }: { w?: string, h?: string }) {
  return (
  <svg className='border-1 bg-red-300 border-red-600  rounded-sm p-1' fill="red" width={w} height={h} viewBox="0 0 200 200" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><title/><path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,
  149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z"/></svg>
  )
}

