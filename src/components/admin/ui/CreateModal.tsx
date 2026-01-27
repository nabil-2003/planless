'use client'
import CreateIcon from '@/components/svgs/CreateIcon'
import React, { useImperativeHandle, useRef, useState, useEffect, MouseEventHandler, use } from 'react'
import { forwardRef } from 'react'
import CustomSelect from './CustomSelect'
import CustomSearch from './CustomSearch'
import CustomInput from '@/components/admin/ui/Input'
import { Button } from '@/components/ui'
import CustmButton from './CustmButton'
import CusTomDate from './CustomDateModal'
import { createPortal } from 'react-dom'

type CustomDateRef = {
    firstDateMs?: number;
    lastDateMs?: number;
    singleDate?: number;
    open: () => void;
    close: () => void;
    getSelectedRange: () => { firstDateMs: number; lastDateMs: number } | null;
    clearSelection: () => void;
    setDateRange: (startDate: string, endDate: string) => void;
}

export type CreateModalRef = {
    open: () => void
    close: () => void
}
type CreateProps = {
    name: string
}




const CreateModal = forwardRef<CreateModalRef, CreateProps>(({ name }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const modalRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true),
        close: () => setIsOpen(false)

    }));
    const [Step, setStep] = useState<number>(1);
    const changeStep = ({ to }: { to: number }) => {
        setStep(to);
    }




    if (!mounted || !isOpen) return null;

    return createPortal(
        <div className="fixed s inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black/50"

            />
            <div
                ref={modalRef}
                className="relative mt-5 bg-white rounded-lg p-6 shadow-xl max-w-md w-full mx-4 z-10"
            >
                {(() => {
                    switch (Step) {
                        case 1:
                            return <FirstStep close={() => setIsOpen(false)} changeStep={changeStep} />;
                        case 2:
                            return <SecondStep changeStep={changeStep} />;
                        case 3:
                            return <ThirdStep changeStep={changeStep} />;
                        default:
                            return null;
                    }
                })()}
                <div className="mt-1 flex justify-end gap-2">

                </div>
            </div>
        </div>,
        document.body
    );
});
const TableElement = ( ) => {
        const [count, setCount] = useState(0);

    return (<div className='flex  py-3 items-center justify-around w-full border-b-2 border-gray-300 '>
        <div className='text-sm'>Proefles</div>
        <div className='text-sm'>60 min</div>
        <div className='text-sm flex items-center gap-2'>
            <span onClick={() => setCount(count > 0 ? count - 1 : 0)} className=' grid place-content-center w-[1vw] h-[1vw] cursor-pointer  rounded-full border-1'>-</span>
            <span>{count}</span>
            <span onClick={() => setCount(count + 1)} className=' grid place-content-center w-[1vw] h-[1vw] cursor-pointer  rounded-full border-1'>+</span>

        </div>
        <div className='text-sm'>€50</div>
    </div>)
}


const FirstStep = ({ changeStep , close  }: { close : () => void;  changeStep: ({ to }: { to: number  }) => void  }) => {
    const [activeType, setActiveType] = useState<'practice' | 'Theorie'>('practice');
     const [activeVehicle, setActiveVehicle] = useState<'scooter' | 'motor' | 'car1' | 'car2' | 'trailer'>('scooter');
    return (
        <div className='mx-10'>
            <h1 className='text-2xl justify-center flex font-bold mb-4'>
                Rijles toevoegen
            </h1>
            <div className="text-gray-600">

                <p className='text-sm text-gray-400 text-center'>
                    Wanneer je deze rijles toevoegt, wordt de status aangepast naar “Onbetaald”
                </p>
                <div className='type scale-75  flex p-1 gap-1 justify-center items-center'>
                    <span onClick={() => setActiveType('practice')} className={`py-2 px-3 text-xl font-semibold border-b-2 cursor-pointer ${activeType === 'practice' ? 'text-[#024089] bg-[#F2F4FF] border-blue-500' : 'text-[black] border-gray-200'}`}>Praktijk</span>
                    <span onClick={() => setActiveType('Theorie')} className={`py-2 px-3 text-xl font-semibold border-b-2 cursor-pointer ${activeType === 'Theorie' ? 'text-[#024089] bg-[#F2F4FF] border-blue-500' : 'text-[black] border-gray-200'}`}>Theorie</span>

                </div>
                <div className='vehicle flex p-1 gap-1 justify-between items-center scale-75 w-full'>
                    <span onClick={() => setActiveVehicle('scooter')} className={`font-semibold border-b-2 cursor-pointer ${activeVehicle === 'scooter' ? 'bg-[#F2F4FF] border-blue-500' : 'border-gray-200'}`}><img src="/scotter.svg" alt="" /></span>
                    <span onClick={() => setActiveVehicle('motor')} className={`font-semibold border-b-2 cursor-pointer ${activeVehicle === 'motor' ? 'bg-[#F2F4FF] border-blue-500' : 'border-gray-200'}`}><img src="/moto.svg" alt="" /></span>
                    <span onClick={() => setActiveVehicle('car2')} className={`font-semibold border-b-2 cursor-pointer ${activeVehicle === 'car2' ? 'bg-[#F2F4FF] border-blue-500' : 'border-gray-200'}`}><img src="/Auto2.svg" alt="" /></span>
                    <span onClick={() => setActiveVehicle('car1')} className={`font-semibold border-b-2 cursor-pointer ${activeVehicle === 'car1' ? 'bg-[#F2F4FF] border-blue-500' : 'border-gray-200'}`}><img src="/Auto1.svg" alt="" /></span>
                    <span onClick={() => setActiveVehicle('trailer')} className={`font-semibold border-b-2 cursor-pointer ${activeVehicle === 'trailer' ? 'bg-[#F2F4FF] border-blue-500' : 'border-gray-200'}`}><img src="/Trailer.svg" alt="" /></span>
                </div>
                <div className='scale-95'>
                    <div className='flex   py-3 items-center justify-around w-full border-b-2 border-gray-300 '>
                        <div className='text-sm'>product</div>
                        <div className='text-sm'>Duur</div>
                        <div className='text-sm'>Hoeveelheid</div>
                        <div className='text-sm'>Prijs</div>
                    </div>
                    {
                        Array.from({ length: 6 }).map((_, index) => (<TableElement key={index} />
                        ))
                    }
                    <div className='flex gap-3 items-center justify-center text-white'>
                        <CustmButton onClick={close} className='mt-4 w-full bg-[#FE911F]  ' >
                            Vorige
                        </CustmButton>
                        <CustmButton onClick={() => { changeStep({ to: 2 }) }} className='mt-4 w-full bg-[#024089]  ' >
                            Volgende
                        </CustmButton>
                    </div>




                </div>

            </div>
        </div>
    )

}



const SecondStep = ({ changeStep }: { changeStep: ({ to }: { to: number }) => void }) => {
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const [isOpenTime, setIsOpenTime] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedTime, setSelectedTime] = useState({ hour: 9, minute: 0 });

    const openCalendar = () => {
        setIsOpenTime(false)
        setIsOpenCalendar(true);
    }
    const openTime = () => {
        setIsOpenCalendar(false);
        setIsOpenTime(true)
    }

    const formatDate = (date: Date | null) => {
        if (!date) return formatDate(new Date());
        const months = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    const formatTime = (hour: number, minute: number) => {
        return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    };
    return (
        <>
            <div className='mx-10 '>
                <h1 className='text-2xl justify-center flex font-bold mb-4'>
                    Rijles plannen
                </h1>
                <div className="text-gray-600">

                    <p className='text-sm text-gray-400 text-center'>
                        Wanneer je deze rijles toevoegt, wordt de status aangepast naar “Onbetaald”                    </p>
                    <div className='form'>
                        <h1 className='text-sm mt-2 first-letter:uppercase text-black'>created by who ?</h1>
                        <SelectInput data={["instructor", "student"]} />
                        <h1 className='text-sm mt-2 first-letter:uppercase text-black'>Selecteer instructor</h1>
                        <SelectInput data={["user 1", "user 2"]} />
                        <h1 className='text-sm mt-2 first-letter:uppercase text-black'>Selecteer student</h1>
                        <SelectInput data={["user ", "mohamed"]} />
                        <div className=' border-1 mt-2 mb-2 border-gray-300' />
                        <div className='flex justify-between'>
                            <span className='p-1 rounded-lg'>Begint</span>
                            <div className='flex gap-4'>
                                <span
                                    onClick={openCalendar}
                                    className={`date border-[.5px] p-1 rounded-lg cursor-pointer transition-all duration-700 border-gray-400 
  ${isOpenCalendar ? 'text-amber-400' : 'bg-gray-200'}`}>{formatDate(selectedDate)}</span>
                                <span onClick={openTime}
                                    className={`time border-[.5px] p-1 transition-all duration-700 rounded-lg cursor-pointer border-gray-400 
  ${isOpenTime ? 'text-amber-400' : 'bg-gray-200'}`}> {formatTime(selectedTime.hour, selectedTime.minute)}</span></div>
                        </div>
                        <div className=' border-1 mt-2 mb-2 border-gray-300' />

                    </div>
                    <Calendar isOpen={isOpenCalendar} setOpen={() => setIsOpenCalendar(false)} onDateSelect={setSelectedDate} />
                    <Time isOpen={isOpenTime} setOpen={() => setIsOpenTime(false)} onTimeSelect={setSelectedTime} selectedDate={selectedDate} />
                    <div className=' border-1 mt-2 mb-2 border-gray-300' />
                    <div className='flex justify-between'>
                        <span className='p-1 rounded-lg'>Einde</span>
                        <div className='flex gap-4'>
                            <span
                                onClick={openCalendar}
                                className={`date border-[.5px] p-1 rounded-lg cursor-pointer transition-all duration-700 border-gray-400 
  ${isOpenCalendar ? 'text-amber-400' : 'bg-gray-200'}`}>{formatDate(selectedDate)}</span>
                            <span
                                className={`time border-[.5px] p-1 transition-all duration-700 rounded-lg cursor-pointer border-gray-400 
  ${isOpenTime ? 'text-amber-400' : 'bg-gray-200'}`}> {formatTime(selectedTime.hour + 1, selectedTime.minute)}</span></div>
                    </div>
                    <div className=' border-1 mt-2 mb-2 border-gray-300' />


                    <div className='flex gap-3 items-center justify-center text-white'>
                        <CustmButton onClick={() => { changeStep({ to: 1 }) }} className='mt-4 w-full bg-[#FE911F]  ' >
                            Vorige
                        </CustmButton>
                        <CustmButton onClick={() => { changeStep({ to: 3 }) }} className='mt-4 w-full bg-[#024089]  ' >
                            Volgende
                        </CustmButton>
                    </div>




                </div>

            </div>


        </>
    )
}

const ThirdStep = ({ changeStep }: { changeStep: ({ to }: { to: number }) => void }) => {
           const [activeType, setActiveType] = useState<'practice' | 'Theorie'>('practice');

    const Element = () => {
        const [isActionsOpen, setIsActionsOpen] = useState(false);

        const openActions = () => {
            setIsActionsOpen(!isActionsOpen);
        }

        const handleEdit = () => {
            console.log('Edit clicked');
            setIsActionsOpen(false);
        }

        const handleDelete = () => {
            console.log('Delete clicked');
            setIsActionsOpen(false);
        }

        return (
            <div className='mt-1 flex w-full border-y-1 border-gray-300 relative'>
                <img src="/scotter.svg" alt="" />
                <div className='item w-[80%] flex flex-col p-2 rounded-lg'>
                    <div className="title flex items-center justify-between">
                        <span>Automaat (Schakel B)</span>
                        <div className='flex items-center gap-4'>
                            <span>€50</span>
                            <span
                                onClick={openActions}
                                className='cursor-pointer ml-3 transform  rotate-90   rounded transition-colors'
                            >
                                ...
                            </span>
                        </div>
                    </div>
                    <div className='flex text-[11px] text-gray-400 mt-1 justify-between'>
                        <span>
                            1 lessen + examen I 60 min x 1
                        </span>
                        <span>
                            19 Aug I 01:00
                        </span>
                    </div>
                </div>

                {/* Actions Modal */}
                {isActionsOpen && (
                    <>
                        {/* Backdrop */}
                        <div 
                            className='fixed inset-0 z-40' 
                            onClick={() => setIsActionsOpen(false)}
                        />
                        
                        {/* Actions Menu */}
                        <div className='absolute right-2 top-12 z-50 bg-white rounded-lg shadow-lg border border-gray-200  py-2'>
                            <button
                                onClick={handleEdit}
                                className='w-full px-4 py-2 text-left text-sm text-gray-700  cursor-pointer hover:text-blue-600 transition-colors flex items-center gap-2'
                            >
                               <img src="/actions/cancel_icon.svg" alt="" />
                            </button>
                            <button
                                onClick={handleDelete}
                                className='w-full px-4 py-2 text-left text-sm text-red-600  cursor-pointer  transition-colors flex items-center gap-2'
                            >
                                 <img src="/actions/edit.svg" alt="" />
                            </button>
                        </div>
                    </>
                )}
            </div>
        )
    }
    const ShowData =({title, value } : {title: string , value: string})=>{

        return (
            <div className='mt-2 flex w-full items-center justify-between'>
              <span>
                     {title}
              </span>
              <span> {value}</span>
            </div>
        )
    }
    return (
        <div className='mx-6 '>
              <div className='flex  gap-4 justify-center items-center '>
                <span onClick={() => setActiveType("practice")} className={`cursor-pointer p-3 border-b-2 ${activeType === "practice" ? "border-[#024089] bg-[#F2F4FF]" : "border-gray-300"}`}>Praktijk</span>
                <span onClick={() => setActiveType("Theorie")} className={`cursor-pointer p-3 border-b-2 ${activeType === "Theorie" ? "border-[#024089] bg-[#F2F4FF]" : "border-gray-300"}`}>Theorie</span>
              </div>
                <div className='mt-3' />
                <Element />
                <Element />
                <Element />
                <CustmButton className='border-blue-800 border-1 w-full mt-4 text-[#024089]' >
                    Voeg nog een les toe
                </CustmButton>
                <div className='mt-4' />
                <ShowData title='21% BTW' value='€63.00' />
                 <ShowData title='Totaalbedrag (Incl. 21% BTW)' value='€450.00' />
                  <div className='mt-4' />
                 <div className='flex btns justify-between items-center'>
                  <CustmButton onClick={() => { changeStep({ to: 2 }) }} className=' border-1 w-[47%] text-white bg-[#FE911F]' >
                    Annuleren
                </CustmButton>
                 <CustmButton onClick={() => { /* Handle save */ }} className=' border-1 w-[47%] bg-[#024089] text-white' >
                    Opslaan
                </CustmButton>
                 </div>
        </div>
    );
};
  
export default CreateModal;
const Calendar = ({ isOpen, setOpen, onDateSelect }: { isOpen: boolean; setOpen: () => void; onDateSelect?: (date: Date) => void }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    // Get day of week (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDayOfMonth.getDay();
    // Convert to Monday start (0 = Monday)
    const startOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    const monthNames = [
        'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
        'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'
    ];

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const handleDateClick = (day: number) => {
        const clickedDate = new Date(year, month, day);

        // Check if date is already selected
        const isAlreadySelected = selectedDates.some(date =>
            date.getDate() === day &&
            date.getMonth() === month &&
            date.getFullYear() === year
        );

        if (isAlreadySelected) {
            // Remove date from selection
            setSelectedDates(selectedDates.filter(date =>
                !(date.getDate() === day &&
                    date.getMonth() === month &&
                    date.getFullYear() === year)
            ));
        } else {
            // Add date to selection
            setSelectedDates([clickedDate]);
            // Call the callback with selected date
            if (onDateSelect) {
                onDateSelect(clickedDate);
                setOpen();
            }
        }
    };

    const isToday = (day: number) => {
        const today = new Date();
        return today.getDate() === day &&
            today.getMonth() === month &&
            today.getFullYear() === year;
    };

    const isSelected = (day: number) => {
        return selectedDates.some(date =>
            date.getDate() === day &&
            date.getMonth() === month &&
            date.getFullYear() === year
        );
    };

    return (
        <>

            {

                isOpen && <div id='animation' className='my-2 scale-90  '>
                    <div className='flex justify-between items-center mb-2 px-1'>
                        <span
                            onClick={goToPreviousMonth}
                            className='cursor-pointer hover:bg-gray-100 p-1 rounded text-sm'
                        >
                            &lt;
                        </span>
                        <span className='font-semibold text-sm'>{monthNames[month]} {year}</span>
                        <span
                            onClick={goToNextMonth}
                            className='cursor-pointer hover:bg-gray-100 p-1 rounded text-sm'
                        >
                            &gt;
                        </span>
                    </div>
                    <div className='grid grid-cols-7 gap-1 place-items-center p-2 text-gray-600 text-xs font-medium'>
                        <span className='col-span-1'>Ma</span>
                        <span className='col-span-1'>Di</span>
                        <span className='col-span-1'>Wo</span>
                        <span className='col-span-1'>Do</span>
                        <span className='col-span-1'>Vr</span>
                        <span className='col-span-1'>Za</span>
                        <span className='col-span-1'>Zo</span>
                    </div>
                    <div className='grid grid-cols-7 gap-1 place-items-center'>
                        {/* Empty cells for days before the first day of the month */}
                        {Array.from({ length: startOffset }).map((_, i) => (
                            <span key={`empty-${i}`} className='w-8 h-8'></span>
                        ))}

                        {/* Days of the month */}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const today = isToday(day);
                            const selected = isSelected(day);

                            return (
                                <span
                                    key={day}
                                    onClick={() => handleDateClick(day)}
                                    className={`
                                w-8 h-8 text-sm rounded-full inline-grid place-content-center 
                                cursor-pointer hover:bg-orange-100 transition-colors
                                ${today ? 'border-2 border-orange-500' : ''}
                                ${selected ? 'bg-[#FE911F] text-white hover:bg-orange-600' : ''}
                            `}
                                >
                                    {day}
                                </span>
                            );
                        })}
                    </div>
                </div>
            }

        </>
    );
}

const Time = ({ isOpen, setOpen, onTimeSelect, selectedDate }: { isOpen: boolean; setOpen: () => void; onTimeSelect?: (time: { hour: number; minute: number }) => void; selectedDate?: Date | null }) => {
    const [selectedHour, setSelectedHour] = useState(12);
    const [selectedMinute, setSelectedMinute] = useState(0);
    const [activeColumn, setActiveColumn] = useState<'hours' | 'minutes' | null>(null);
    const scrollRefHour = useRef<HTMLDivElement>(null);
    const scrollRefMinute = useRef<HTMLDivElement>(null);

    // Determine working hours based on selected date (or today if none)
    const dateToCheck = selectedDate || new Date();
    const dayOfWeek = dateToCheck.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday

    const startHour = isWeekend ? 9 : 8;
    const endHour = isWeekend ? 15 : 17; // End time minus 1 hour (16:00-1 and 18:00-1)

    // Generate hours within working hours only
    const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => i + startHour);
    const minutes = Array.from({ length: 60 }, (_, i) => i);

    const isTimeAllowed = (hour: number, minute: number = 0) => {
        if (hour < startHour || hour > endHour) return false;
        // If it's the last hour, no restrictions on minutes
        return true;
    };

    const handleHourScroll = () => {
        if (!scrollRefHour.current) return;
        setActiveColumn('hours');
        const scrollTop = scrollRefHour.current.scrollTop;
        const itemHeight = 28;
        const index = Math.round(scrollTop / itemHeight);
        const actualHour = hours[index];
        if (actualHour !== undefined && isTimeAllowed(actualHour)) {
            setSelectedHour(actualHour);
        }
    };

    const handleMinuteScroll = () => {
        if (!scrollRefMinute.current) return;
        setActiveColumn('minutes');
        const scrollTop = scrollRefMinute.current.scrollTop;
        const itemHeight = 28;
        const index = Math.round(scrollTop / itemHeight);
        if (isTimeAllowed(selectedHour, index)) {
            setSelectedMinute(index);
        }
    };

    useEffect(() => {
        if (isOpen && scrollRefHour.current && scrollRefMinute.current) {
            const hourIndex = hours.indexOf(selectedHour);
            scrollRefHour.current.scrollTop = (hourIndex >= 0 ? hourIndex : 0) * 28;
            scrollRefMinute.current.scrollTop = selectedMinute * 28;
        }
    }, [isOpen]);

    useEffect(() => {
        if (onTimeSelect) {
            onTimeSelect({ hour: selectedHour, minute: selectedMinute });
        }
    }, [selectedHour, selectedMinute]);

    // Reset to valid hour when date changes and current hour is outside new range
    useEffect(() => {
        if (selectedHour < startHour || selectedHour > endHour) {
            setSelectedHour(startHour);
        }
    }, [selectedDate, isWeekend]);

    return (
        <>
            {isOpen && (
                <div className='my-2 bg-white rounded-lg p-3 shadow-sm border border-gray-100'>
                    {/* Header Tab */}
                    <div className='flex justify-center mb-2'>
                        <span className='px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium'>
                            Werktijden
                        </span>
                    </div>

                    {/* Working Hours Text */}
                    <p className='text-center text-[10px] text-gray-400 mb-2'>
                        08:00 t/m 18:00 ma - vr / 09:00 t/m 16:00 za - zo
                    </p>

                    {/* Time Picker */}
                    <div className='relative flex items-center justify-center gap-3'>
                        {/* Hours Column */}
                        <div className='relative w-16 transition-all duration-200'>
                            <div
                                ref={scrollRefHour}
                                onScroll={handleHourScroll}
                                onClick={() => setActiveColumn('hours')}
                                className='h-[112px] overflow-y-scroll hide-scrollbar scroll-smooth snap-y snap-mandatory px-1'
                                style={{
                                    scrollbarWidth: 'none',
                                    msOverflowStyle: 'none',
                                }}
                            >
                                <div className='py-11'>
                                    {hours.map((hour, index) => {
                                        const distance = Math.abs(hour - selectedHour);
                                        const isSelected = hour === selectedHour;
                                        const isActive = activeColumn === 'hours' && isSelected;
                                        const isDisabled = !isTimeAllowed(hour);

                                        return (
                                            <div
                                                key={hour}
                                                onClick={() => {
                                                    if (!isDisabled && scrollRefHour.current) {
                                                        scrollRefHour.current.scrollTop = index * 28;
                                                        setActiveColumn('hours');
                                                        setSelectedHour(hour);
                                                    }
                                                }}
                                                className={`h-7 flex items-center justify-center snap-start transition-all duration-150 ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
                                                    }`}
                                            >
                                                <div className='relative inline-flex items-center justify-center'>
                                                    {isSelected && !isDisabled && (
                                                        <div className='absolute inset-0 bg-blue-50 rounded-md border border-blue-100'></div>
                                                    )}
                                                    <span
                                                        className={`relative z-10 text-base transition-all duration-150 px-2.5 py-0.5 ${isDisabled
                                                                ? 'font-normal text-gray-200 line-through'
                                                                : isSelected
                                                                    ? 'font-semibold text-blue-600'
                                                                    : 'font-normal text-gray-300'
                                                            }`}
                                                    >
                                                        {String(hour).padStart(2, '0')}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Minutes Column */}
                        <div className='relative w-16 transition-all duration-200'>
                            <div
                                ref={scrollRefMinute}
                                onScroll={handleMinuteScroll}
                                onClick={() => setActiveColumn('minutes')}
                                className='h-[112px] overflow-y-scroll hide-scrollbar scroll-smooth snap-y snap-mandatory px-1'
                                style={{
                                    scrollbarWidth: 'none',
                                    msOverflowStyle: 'none',
                                }}
                            >
                                <div className='py-11'>
                                    {minutes.map((minute) => {
                                        const distance = Math.abs(minute - selectedMinute);
                                        const isSelected = minute === selectedMinute;
                                        const isActive = activeColumn === 'minutes' && isSelected;
                                        const isDisabled = !isTimeAllowed(selectedHour, minute);

                                        return (
                                            <div
                                                key={minute}
                                                onClick={() => {
                                                    if (!isDisabled && scrollRefMinute.current) {
                                                        scrollRefMinute.current.scrollTop = minute * 28;
                                                        setActiveColumn('minutes');
                                                        setSelectedMinute(minute);
                                                    }
                                                }}
                                                className={`h-7 flex items-center justify-center snap-start transition-all duration-150 ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
                                                    }`}
                                            >
                                                <div className='relative inline-flex items-center justify-center'>
                                                    {isSelected && !isDisabled && (
                                                        <div className='absolute inset-0 bg-blue-50 rounded-md border border-blue-100'></div>
                                                    )}
                                                    <span
                                                        className={`relative z-10 text-base transition-all duration-150 px-2.5 py-0.5 ${isDisabled
                                                                ? 'font-normal text-gray-200 line-through'
                                                                : isSelected
                                                                    ? 'font-semibold text-blue-600'
                                                                    : 'font-normal text-gray-300'
                                                            }`}
                                                    >
                                                        {String(minute).padStart(2, '0')}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Selected Time Display */}
                    <div className='mt-2 text-center'>
                        <p className='text-xs text-gray-500'>
                            Geselecteerde tijd:{' '}
                            <span className='font-semibold text-gray-900'>
                                {String(selectedHour).padStart(2, '0')}:
                                {String(selectedMinute).padStart(2, '0')}
                            </span>
                        </p>
                    </div>

                    <style jsx>{`
                        .hide-scrollbar::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>
                </div>
            )}
        </>
    );
};



CreateModal.displayName = 'CreateModal'





const SelectInput = ({ data = [] }: { data: string[] }) => {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<string>(data[0])
    return (
        <div className='relative '>
            <div className="'select   w-full selected flex bg-gray-100 p-2 rounded-md">
                <div className="selected w-[95%] cursor-pointer">{selected}</div>
                <button className={" transition-transform duration-500 cursor-pointer " + (open ? "rotate-180 " : "rotate-0 ")} onClick={() => {
                    setOpen(t => !t)
                }} > <img src="/selectFlech.svg" alt="select arrow" />
                </button>
            </div>
            <div className={` max-h-[20vh] overflow-y-auto shadow-xs p-1 rounded bg-white mt-2 body z-10 w-full absolute  transition-all duration-700  ${open ? "h-max opacity-100 " : "max-h-0  opacity-0"}`}>
                {data.map((item, index) => (
                    <div data-item={item} key={index} onClick={(e) => {
                        setSelected(item);
                        setOpen(false);
                    }} className={'option ' + (open ? "block" : "hidden") + '  p-2 rounded-md mb-2 cursor-pointer bg-[#F4F4F4] hover:bg-amber-300 '}>
                        {item}
                    </div>
                ))}
            </div>



        </div>
    )
}