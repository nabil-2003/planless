"use client"
import React, { use, useEffect } from 'react'
import Header from '@/components/admin/Header'
import LeftSide from '@/components/admin/LeftSide';
import InputEditable from '@/components/admin/ui/InputEditable';
import CustmButton from '@/components/admin/ui/CustmButton';
import { useRouter } from 'next/navigation';
import useLessons from '@/app/hooks/useLessons';
import { mapColorToStatus } from '@/components/admin/ui/tables/TableLessons';
import { getparsedLesson } from '@/store/LessonsSlices';
import Breadcrumb from '@/components/admin/Breadcrumb';
export default function page({params} : {params: Promise<{lessons: string}>}) {
    const lessonId = use(params).lessons
  const navigate  = useRouter()
  const {lesson ,loading,  fetchLessonById}= useLessons()

 
 useEffect(()=>{
 fetchLessonById(lessonId)
      
 } , [lessonId , ])

  return (
    <div className='content'>
      <Header title="Rijles gegevens" />
      <div className='w-full flex flex-col md:flex-row overflow-hidden'>
        <LeftSide className='hidden md:flex md:w-[20%] border-l-0 rounded-t-none mt-4 items-center bg-white rounded-r-lg border-2 border-gray-200 h-auto' />
        {
          loading && <div className=' mx-auto animate-spin border-l-0 grid place-self-center scale-125 border-2 w-[3vw] h-[3vw] rounded-full border-blue-600'></div> ||
           <div className='dashboard-container w-full md:w-[80%] px-4 md:px-0'>
          <Breadcrumb />
          <div className='form-container mx-0 md:mx-4 rounded-lg mt-4 p-4 bg-white shadow-md'>
            <h2 className='text-left font-semibold text-2xl'>Rijles gegevens</h2>

            <form className='w-full gap-2 flex flex-wrap justify-between mt-4'>
              <DetailItem title='Instructeur' value={lesson?.instructor ?? '—'} />
              <DetailItem title='Student' value={lesson?.student ?? '—'} />
              <DetailItem title='Lespakketten' value={lesson?.lesson_cards ? lesson.lesson_cards?.map(card => `${card.vehicleType.name} ${card.lessonType} ${card.quantity} (${card.name})`).join("; ") : '—'} />
              <DetailItem title='Lesduur' value={lesson?.lesson_duration ?? '—'} />
              <DetailItem title='Starttijd les' value={lesson?.start_time ?? '—'} />
              <DetailItem title='Eindtijd les' value={lesson?.end_time ?? '—'} />
              <DetailItem title='Factuur bedrag' value={(lesson?.invoice_amount +" €")} />
               <DetailItem title='Datum rijles' value={lesson?.date ?? '—'} />
               <DetailItem styles={`${mapColorToStatus(lesson?.payment_status!)?.colorbg},${mapColorToStatus(lesson?.payment_status!)?.colortext}`} title='Betaalstatus' value={mapColorToStatus(lesson?.payment_status!)?.status ?? '—'} />
              <DetailItem styles={`${mapColorToStatus(lesson?.lesson_status!)?.colorbg},${mapColorToStatus(lesson?.lesson_status!)?.colortext}`} title='Status van rijlessen' value={mapColorToStatus(lesson?.lesson_status!)?.status ?? '—'} />
                
            </form>
          </div>

         
        </div>
        }
       
      </div>
    </div>
  )
}
 const DetailItem = ({ styles=",",  title, value = '—' }: { title: string; value: string , styles?: string  }) => (
    <div className='max-h-max form-field flex flex-col border-2 rounded-lg p-2 border-gray-200 w-full md:w-[49%] mt-4'>
      <span className='text-sm md:text-base'>{title}</span>
      <span style={{background: styles.split(",")[0] , color: styles.split(",")[1]}} className={` w-max py-2 px-5 rounded-xl mt-2 text-sm md:text-base break-words `}>{value}</span>
    </div>
  )