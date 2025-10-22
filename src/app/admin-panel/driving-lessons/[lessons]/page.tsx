"use client"
import React from 'react'
import Header from '@/components/admin/Header'
import LeftSide from '@/components/admin/LeftSide';
import InputEditable from '@/components/admin/ui/InputEditable';
import CustmButton from '@/components/admin/ui/CustmButton';
import { useRouter } from 'next/navigation';
export default function page({lessons}: {lessons: string}) {
  const navigate  = useRouter()

  const DetailItem = ({ title, value = '—' }: { title: string; value?: string }) => (
    <div className='max-h-max form-field flex flex-col border-2 rounded-lg p-2 border-gray-200 w-full md:w-[49%] mt-4'>
      <span className='text-sm md:text-base'>{title}</span>
      <span className='mt-2 text-sm md:text-base break-words'>{value}</span>
    </div>
  )

  return (
    <div className='content'>
      <Header title="Rijles gegevens" />
      <div className='w-full flex flex-col md:flex-row overflow-hidden'>
        <LeftSide className='hidden md:flex md:w-[20%] border-l-0 rounded-t-none mt-4 items-center bg-white rounded-r-lg border-2 border-gray-200 h-auto' />

        <div className='dashboard-container w-full md:w-[80%] px-4 md:px-0'>
          <div className='form-container mx-0 md:mx-4 rounded-lg mt-4 p-4 bg-white shadow-md'>
            <h2 className='text-left font-semibold text-2xl'>Rijles gegevens</h2>

            <form className='w-full gap-2 flex flex-wrap justify-between mt-4'>
              <DetailItem title='Instructeur' value='Kareem Kareem' />
              <DetailItem title='Student' value='Kareem Kareem' />
              <DetailItem title='Lespakketten' value='Basis + Extra' />
              <DetailItem title='Lesduur' value='60 min' />
              <DetailItem title='Starttijd les' value='10:00' />
              <DetailItem title='Eindtijd les' value='11:00' />
              <DetailItem title='Factuur bedrag' value='€ 450' />
              <DetailItem title='Betaalstatus' value='Onbetaald' />
              <div className='w-full md:w-[100%] mt-4'>
                <label className='text-sm md:text-base block mb-2'>Annuleringsreden</label>
                <div className='border-2 border-gray-200 rounded-lg p-3 text-sm text-gray-700'>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia beatae recusandae officiis perferendis voluptas dolo
                </div>
              </div>
            </form>
          </div>

          <div className='buttons mt-5 mb-4 mx-auto w-full px-0 md:px-4 flex flex-col md:flex-row gap-3 md:justify-start'>
            <CustmButton onClick={() => { navigate.push('/admin-panel/driving-lessons') }} className='text-white hover:opacity-80 capitalize py-3 px-6 mr-0 md:mr-4 bg-amber-500 w-full md:w-auto'>
              Annuleren
            </CustmButton>
            <CustmButton className='text-white hover:opacity-80 capitalize py-3 px-6 bg-blue-700 w-full md:w-auto'>
              Opslaan
            </CustmButton>
          </div>
        </div>
      </div>
    </div>
  )
}
