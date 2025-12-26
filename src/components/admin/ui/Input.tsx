import React from 'react'

export default function CustomInput({
    className ,
    onChange ,
    placeholder = "Type something..."   ,
    value = "" , 
    type = "text"


}:{
    type?: string,
    className?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void , 
    placeholder?: string,
    value?: string
}) {
  return (
      <input
          value={value}
       type={type}
        placeholder={placeholder}
        className={className + ' block mt-2 rounded outline-none  px-3 placeholder:text-gray-500 transition-colors focus:outline-[#024089] focus:outline-2 w-full'}
        onChange={onChange}
      />
  )

}
