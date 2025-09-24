import React from 'react'
import { 
  FaUsers, 
  FaUserTie, 
  FaDollarSign, 
  FaCog,
  FaTh,
  FaFileAlt
} from 'react-icons/fa';
import Logo2 from '../svgs/logo2'
import Link from 'next/link';
export default function LeftSide({ className }: { className?: string }) {
    const classes = `flex flex-col   ${className}`
  return (
    <div className={classes}  >
      <header className="flex justify-center items-center p-4">
       <Logo2 width={180} className='mx-auto' />
      </header>
     
        <ul className=' flex  flex-col *:text-gray-500   w-[100%]  mt-4 *:cursor-pointer   items-end justify-center capitalize  '>
            <Link href='/admin-panel/dashboard' className='flex  items-center gap-3  hover-side-nav   hover:text-[var(--dark-blue)]  w-[85%] px-3 py-4 rounded-lg  mr-2  '>
                <FaTh className='scale-150'/>
                    dashboard   
            </Link>
            <Link href='/admin-panel/lessons' className='flex  items-center gap-3  hover-side-nav hover:text-[var(--dark-blue)]  w-[85%] px-3 py-4 rounded-lg  mr-2  '> 
                <FaFileAlt className='scale-150'/>
                 Rijlessen
            </Link>
            <Link href='/admin-panel/students' className='flex  items-center gap-3  hover-side-nav hover:text-[var(--dark-blue)]  w-[85%] px-3 py-4 rounded-lg  mr-2  '>
                <FaUsers className='scale-150   ' />
                studenten
            </Link>
            <Link href='/admin-panel/instructors' className='flex  items-center gap-3  hover-side-nav hover:text-[var(--dark-blue)]  w-[85%] px-3 py-4 rounded-lg  mr-2  '>
                <FaUserTie className='scale-150   '/>
                instructeurs
            </Link>
            <Link href='/admin-panel/finances' className='flex  items-center gap-3  hover-side-nav   hover:text-[var(--dark-blue)]  w-[85%] px-3 py-4 rounded-lg  mr-2  '>
                  <FaDollarSign  className='scale-150   ' /> 
                  Financiën
            </Link>
            <Link href='/admin-panel/settings' className='flex  items-center gap-3  hover-side-nav  hover:text-[var(--dark-blue)]  w-[85%] px-3 py-4 rounded-lg  mr-2  '>
                    <FaCog  className='scale-150   '/> 
                    Instellingen
            </Link>
        </ul>

    </div>
  )
}
