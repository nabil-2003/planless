import React from 'react'

export default function InputEditable({label , disabled=true ,  classeName , value , onChange }:{ disabled:boolean , label?:string , classeName?:string , value?:string , onChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void}) {
  return (
    <div className={classeName+' border-2   py-1 text-sm  border-gray-300  h-max rounded-lg '}>
        <span className='block w-max h-[2vh] text-gray-500 font-medium text-[1rem]  capitalize  mr-auto  ml-3 '>{label}</span>
      <input type="text" disabled={disabled} value={value} onChange={onChange} className=' capitalize text-sm border-2 text-[1rem] font-semibold border-none outline-none mt-3 py-2 pl-4 border-gray-300 w-full h-full rounded-lg' /> 
    </div>
  )
}
