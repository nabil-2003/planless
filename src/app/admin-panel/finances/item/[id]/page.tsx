"use client"
import React, { use, useEffect } from 'react'
import Header from '@/components/admin/Header'
import LeftSide from '@/components/admin/LeftSide';

import useLessons from '@/app/hooks/useLessons';
import { mapColorToStatus } from '@/components/admin/ui/tables/TableLessons';
import { useRouter } from 'next/navigation';
import CustmButton from '@/components/admin/ui/CustmButton';
import useInvoice from '@/app/hooks/useInvoice';
import Breadcrumb from '@/components/admin/Breadcrumb';
type  LessonParams = {
    id : string
}
export default function page({params} : {params: Promise<{id: string}>}) {
    const lessonId = use(params).id
  const {lesson ,loading,  fetchLessonById}= useLessons()
  const {getInvoiceById , invoice ,resetInvoice , loading: invoiceLoading}= useInvoice()
  const [pendingDownload, setPendingDownload] = React.useState(false)
  
   const downloadInvoice = async  (orderId : string) => {
          resetInvoice() 
          setPendingDownload(true)
          await getInvoiceById(orderId)
    }

  // Trigger download when invoice is loaded
  useEffect(() => {
    if (invoice && pendingDownload) {
      const a = document.createElement("a")
      a.href = invoice
      a.download = `factuur_${order}.pdf`
      a.click()
      setPendingDownload(false)
    }
  }, [invoice, pendingDownload])

 useEffect(()=>{
 fetchLessonById(lessonId)
 } , [lessonId])
     const order = (lesson?.order as LessonParams)?.id
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
            <div className='flex justify-between items-center'>
                <h2 className='text-left font-semibold text-2xl'>Bekijk en beheer je facturen</h2>
                 <div className='grid grid-cols-3 gap-4'>
                     <h2>Datum rijles</h2>
                     <h2>Eindtijd</h2>
                 </div>
            </div>

            <form className='w-full gap-2 flex flex-wrap justify-between mt-4'>
              <DetailItem title='Student' value={lesson?.student ?? '—'} />
             
              <DetailItem title='Lesduur' value={lesson?.lesson_duration ?? '—'} />
              <DetailItem title='Datum rijles' value={lesson?.date ?? '—'} />
              <DetailItem title='Begintijd' value={lesson?.start_time ?? '—'} />
              <DetailItem title='Eindtijd' value={lesson?.end_time ?? '—'} />
              <DetailItem title='Factuur bedrag' value={(lesson?.invoice_amount +" €")} />
              <DetailItem title='Vervaldatum' value={"_" } />
              <DetailItem styles={`${mapColorToStatus(lesson?.payment_status!)?.colorbg},${mapColorToStatus(lesson?.payment_status!)?.colortext}`} title='Betaalstatus' value={mapColorToStatus(lesson?.payment_status!)?.status ?? '—'} />
              <CustmButton
               className='w-full bg-blue-800 text-white '
              onClick={()=> downloadInvoice(order!)}>
                {
                    invoiceLoading && <div className=' border-gray-100 mx-auto border-l-blue-800 border-1 w-[2vw] h-[2vw]  animate-spin duration-500 rounded-full'/> || <span>Download</span>
                }
              </CustmButton>
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