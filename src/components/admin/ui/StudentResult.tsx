import React, { ReactNode } from 'react'
import { FaAngleDown, FaArrowAltCircleDown, FaCarSide } from 'react-icons/fa'
import { FaArrowDown, FaArrowDownShortWide } from 'react-icons/fa6'
import CustmButton from './CustmButton'
import { GiConfirmed } from 'react-icons/gi'
export type Note = {
    name: string,
    note: number,
    comment?: string
}
export default function StudentResult({ Icon, Title, id, notes, isTitle, className = '' }: { isTitle?: boolean, Icon?: typeof FaCarSide, Title: string, id: string | number, notes?: Note[], className?: string }) {
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
            <div className='flex justify-between  ml-4   mt-7  p-4 rounded-2xl   items-center   '>
                <span className='flex  justify-around w-max items-center gap-2  '>
                    {Icon && <Icon className='text-2xl text-blue-900' />}
                    {isTitle && <span className='text-lg text-amber-400 font-semibold'>{Title}</span>}
                    {!isTitle && Title}
                </span>
                <FaAngleDown data-testid={id} onClick={open} className='hover:bg-gray-100 p-1 scale-175 rounded-full text-black' />
            </div>
            <div ref={notesRef} className={className + 'notes    hidden  border-1 rounded-4xl border-gray-300    p-3    '}>
                {
                    notes && notes.map((note, index) => (
                        <Note key={index} name={note.name} note={note.note} comment={note.comment || ""} />
                    ))
                }

            </div>
        </div>
    )
}
export function StudentResultEditing({ Icon, Title, id, notes, isTitle, className = '' }: { isTitle?: boolean, Icon?: typeof FaCarSide, Title: string, id: string | number, notes?: Note[], className?: string }) {
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
            <div className='flex justify-between  ml-4   mt-7  p-4 rounded-2xl   items-center   '>
                <span className='flex  justify-around w-max items-center gap-2  '>
                    {Icon && <Icon className='text-2xl text-blue-900' />}
                    {isTitle && <span className='text-lg text-amber-400 font-semibold'>{Title}</span>}
                    {!isTitle && Title}
                </span>
                <FaAngleDown data-testid={id} onClick={open} className='hover:bg-gray-100 p-1 scale-175 rounded-full text-black' />
            </div>
            <div ref={notesRef} className={className + 'notes    hidden  border-1 rounded-4xl border-gray-300    p-3    '}>
                {
                    notes && notes.map((note, index) => (
                        <InputNote key={index} name={note.name} note={note.note} comment={note.comment || ""} />
                    ))
                }

            </div>
        </div>
    )
}


export const Note = ({ name, note, className, comment = "" }: { comment: string, name: string, note: number, className?: string }) => {
    return (
        <div className={className + ' p-2  mx-2 flex justify-between items-center  '}>


            <PopUP title={<h2 className='  mb-2 mr-10 w-[100%]     '>{name}</h2>}>
                <div className='flex justify-between items-center'>
                    <p className='text-lg ml-3'>{comment}</p>
                    <span className='rounded-3xl border-red-600 text-red-600 border-1 py-2 px-5'>{note}/10</span>
                </div>
            </PopUP>
        </div>

    )
}
export const InputNote = ({ name, note, className, comment = "" }: { comment: string, name: string, note: number, className?: string }) => {
    const [inputComment, setInputComment] = React.useState<string>(comment);
    const [inputNote, setInputNote] = React.useState<Number>(note);
    const HandleNote = (t: String) => {
        if (isNaN(Number(t))) return;
        if (Number(t) < 0) return;
        if (Number(t) > 10) return;
        setInputNote(Number(t));
    }



    return (
        <div className={className + ' p-2  mx-2    flex justify-between items-center  '}>


            <PopUP title={<h2 className='  mb-2 mr-10 w-[100%]     '>{name}</h2>}>
                <div className='flex items-center'>
                    <span  className='scale-90 ml-4 ' ><img src={'/edit.svg'} />  </span>
                    {
                       <div className='w-[90%] ml-3  flex justify-between items-center  '>
                            <input className='text-lg ml-3 w-[80%] border-b-2 outline-none border-gray-200 py-3' onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInputComment(e.target.value) }} value={inputComment} />
                            <span className='rounded-3xl flex border-red-600 text-red-600 border-1 py-2 px-5 w-[12%]'>
                                <input className='w-[30%]' onChange={(e: React.ChangeEvent<HTMLInputElement>) => { HandleNote(e.target.value) }} value={inputNote.toString()} /><span>/10</span>
                            </span>
                        </div>
                       
                    }


                </div>
            </PopUP>
        </div>

    )
}



export function PopUP({ children, title, bodyStyle }: { children: ReactNode, title?: ReactNode, bodyStyle?: string }) {
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
        <div className='w-full'>
            <div className='flex justify-between    p-4 rounded-2xl   items-center   '>
                <span className='flex  justify-around w-max items-center gap-2  '>

                    {title}

                </span>
                <span ref={buttonRef}>
                    <FaAngleDown onClick={open} className='hover:bg-gray-100 p-1 scale-175 rounded-full text-black' />
                </span>
            </div>
            <div ref={notesRef} className={bodyStyle + 'notes p-2.5  hidden  w-[97%]  mx-auto     *:not-last:border-b-1 border-1 rounded-3xl   border-gray-300 '}>
                {children}
            </div>
        </div>
    )
}