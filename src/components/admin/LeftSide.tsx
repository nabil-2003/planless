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
      <header className="flex justify-center items-center p-4 ">
      </header>
     
        <ul className=' flex items-center   flex-col *:text-gray-500   w-[100%]  mt-4 *:cursor-pointer    justify-center capitalize  '>
            <Link href='/admin-panel/dashboard' className='flex  items-center gap-3  hover-side-nav   hover:text-[var(--dark-blue)]  w-[85%] px-3 py-4 rounded-lg   '>
                <FaTh className='scale-150'/>
                    dashboard   
            </Link>
            <Link href='/admin-panel/driving-lessons' className='flex  items-center gap-3  hover-side-nav hover:text-[var(--dark-blue)]  w-[85%] px-3 py-4 rounded-lg    '> 
                <FaFileAlt className='scale-150'/>
                 Rijlessen
            </Link>
            <Link href='/admin-panel/students' className='flex  items-center gap-3  hover-side-nav hover:text-[var(--dark-blue)]  w-[85%] px-3 py-4 rounded-lg    '>
                <FaUsers className='scale-150   ' />
                studenten
            </Link>
            <Link href='/admin-panel/instructors' className='flex  items-center gap-3  hover-side-nav hover:text-[var(--dark-blue)]  w-[85%] px-3 py-4 rounded-lg   '>
                <FaUserTie className='scale-150   '/>
                instructeurs
            </Link>
            <Link href='/admin-panel/finances' className='flex  items-center gap-3  hover-side-nav   hover:text-[var(--dark-blue)]  w-[85%] px-3 py-4 rounded-lg    '>
                  <FaDollarSign  className='scale-150   ' /> 
                  Financiën
            </Link>
            <Link href='/admin-panel/settings' className='flex  items-center gap-3  hover-side-nav  hover:text-[var(--dark-blue)]  w-[85%] px-3 py-4 rounded-lg    '>
                    <FaCog  className='scale-150   '/> 
                    Instellingen
            </Link>
        </ul>

    </div>
  )
}
