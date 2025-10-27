import React, { ReactNode } from 'react'
import { FaAngleDown, FaArrowAltCircleDown, FaCarSide } from 'react-icons/fa'
import { FaArrowDown, FaArrowDownShortWide } from 'react-icons/fa6'
export type Note = {
    name: string,
    note: number
}
export default function StudentResult({ Icon, title, id, notes }: { Icon: typeof FaCarSide, title: string, id: string | number, notes?: Note[] }) {
    const notesRef = React.useRef<HTMLDivElement>(null);


    const open = (e: React.MouseEvent<SVGElement>) => {
        const notesDiv = notesRef.current;
        if (!notesDiv) return;

        if (notesDiv.classList.contains('hidden')) {
            notesDiv.classList.remove('hidden');
        } else {
            notesDiv.classList.add('hidden');
        }

    }


    return (
        <div>
            <div className='flex justify-between  ml-11   mt-7  p-4 rounded-2xl   items-center   '>
                <span className='flex  justify-around w-max items-center gap-2  '>
                    <Icon
                        className='text-blue-800 scale-150   ' />
                    {title}

                </span>
                <FaAngleDown data-testid={id} onClick={open} className='hover:bg-gray-100 p-1 scale-175 rounded-full text-black' />
            </div>
            <div ref={notesRef} className='notes  hidden   ml-11   p-3  *:not-last:border-b-1 border-1 rounded-3xl   border-gray-300 '>
                {
                    notes && notes.map((note, index) => (
                        <Note key={index} name={note.name} note={note.note} />
                    ))
                }

            </div>
        </div>
    )
}

const Note = ({ name, note }: { name: string, note: number }) => {
    return (
        <div className=' p-2  mx-2   flex justify-between items-center  border-gray-300 '>
            <h2 className='  mb-2  '>{name}</h2>
            <span className='rounded-3xl border-red-600 text-red-600 border-1 py-2 px-5'>{note}/10</span>
        </div>

    )
}
export const ExamenField = ({ name }: { name: string }) => {
    return (
        <div className=' p-2  mx-2   flex justify-between items-center  border-gray-300 '>
            <h2 className='  mb-2  '>{name}</h2>
        </div>

    )
}


export function PopUP({ children, title }: { children: ReactNode, title: ReactNode }) {
    const notesRef = React.useRef<HTMLDivElement>(null);
    const buttonRef = React.useRef<HTMLDivElement>(null);



    const open = () => {
        const notesDiv = notesRef.current;
        if (!notesDiv) return;

        if (notesDiv.classList.contains('hidden')) {
            notesDiv.classList.remove('hidden');
        } else {
            notesDiv.classList.add('hidden');
        }
        rotate()

    }
    const rotate = () => {
        const buttonDiv = buttonRef.current;
        if (!buttonDiv) return;
        buttonDiv.classList.toggle('rotate-180');
    }
     


    return (
        <div>
            <div className='flex justify-between  ml-11   p-4 rounded-2xl   items-center   '>
                <span className='flex  justify-around w-max items-center gap-2  '>

                    {title}

                </span>
                <span ref={buttonRef}>
                    <FaAngleDown onClick={open} className='hover:bg-gray-100 p-1 scale-175 rounded-full text-black' />
                </span>
            </div>
            <div ref={notesRef} className='notes  hidden      p-3  *:not-last:border-b-1 border-1 rounded-3xl   border-gray-300 '>

                {children}
            </div>
        </div>
    )
}