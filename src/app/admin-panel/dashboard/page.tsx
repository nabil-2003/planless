'use client'
import Statistcs from '@/components/admin/Statistcs'
import React from 'react'
import Header from '@/components/admin/Header'
import LeftSide from '@/components/admin/LeftSide'
import useDashBoard from '@/app/hooks/useDashBoard'
import { BarsChart, RadialChart } from '@/components/admin/DashboardCharts'
export default function page() {
 

  return (
    <>
      <Header title="dashboard overview" />
      <div className='w-full flex flex-col md:flex-row border-l-0 md:border-l-[2px] border-l-gray-200 bg-dashboard-primary h-max'>

        <LeftSide className='hidden md:flex md:w-[20%] border-l-0  rounded-t-none  mt-4 items-center bg-white rounded-r-lg  border-2 border-gray-200 h-auto  ' />
        <div className='dashboard-container w-full md:w-[80%] px-2 md:px-0'>
          <Statistcs className="mt-4" />
          <div className=' relative w-full md:w-[95%] border-2 border-gray-200  rounded-xl overflow-hidden ml-0 md:ml-8 mt-3 px-2 md:px-0'>
            <h1 className='pl-8 md:pl-20 py-5 bg-white text-lg md:text-2xl justify-around w-full  '>Studenten</h1>
            <div className='hidden md:block absolute -left-9 -rotate-90 top-[50%] text-xl text-gray-200  transform -translate-y-1/2'>Rijles statussen</div>
            <BarsChart data={[
              { name: "In behandeling", value: 200, color: "#FFE6D6" },
              { name: "Bevestigd", value: 10000, color: "#DCFFD6" },
              { name: "Voltooid", value: 12, color: "#DAEFFF" },
              { name: "Geannuleerd", value: 300, color: "#EDEDED" },
            ]} />
          </div>
          <div className=' relative w-full md:w-[95%] border-2 border-gray-200  rounded-xl overflow-hidden ml-0 md:ml-8 mt-3 px-2 md:px-0'>
            <h1 className='pl-8 md:pl-20 py-5 bg-white text-lg md:text-2xl justify-around w-full  '>Aantal leerlingen, instructeurs en beheerders</h1>
            <div className='hidden md:block absolute -left-3 -rotate-90 top-[50%] text-xl text-gray-200  transform -translate-y-1/2'>Statussen</div>
            <BarsChart data={[
              { name: "Studenten", value: 200, color: "#fde7d3" },
              { name: "Instructeurs", value: 10, color: "#e6ffe6" },
              { name: "Beheerders", value: 12, color: "#e6f6ff" },
            ]} />
            <div className='hidden md:block absolute bottom-11 left-1/2 transform -translate-x-1/2 p-4 text-gray-500 text-sm'>Total number of studenten, instructors and administrators</div>
          </div>
          <div className=' relative w-full md:w-[95%] border-2 border-gray-200  rounded-xl overflow-hidden ml-0 md:ml-8 mt-3 px-2 md:px-0'>
            <h1 className='pl-8 md:pl-20 py-5 bg-white text-lg md:text-2xl justify-around w-full  '>Leskaarten</h1>
            <div className='hidden md:block absolute -left-9 -rotate-90 top-[50%] text-lg text-gray-200  transform -translate-y-1/2'>Leskaart statussen</div>
            <BarsChart style={{}} data={[
              { name: "Aankomend", value: 200, color: "#fde7d3" },
              { name: "Geschiedenis", value: 170, color: "#e6ffe6" },
              { name: "Totaal gezakte studenten", value: 30, color: "#e6f6ff" },
            ]} />
            <div className='hidden md:block absolute bottom-11 left-1/2 transform -translate-x-1/2 p-4 text-gray-500 text-sm'>Total number of studenten</div>
          </div>

          <div className=' relative w-full md:w-[95%] border-2 border-gray-200  rounded-xl overflow-hidden ml-0 md:ml-8 mt-3 px-2 md:px-0'>
            <h1 className='pl-8 md:pl-20 py-5 bg-white text-lg md:text-2xl justify-around w-full  '>Financiën</h1>
            <RadialChart data={[
              { name: "Betaald", value: 30, fill: "#E8FFE8" },
              { name: "Geannuleerd", value: 39, fill: "#EBEBEB" },
              { name: "Mislukt", value: 10, fill: "#FFD6D6" },
              { name: "Onbetaald", value: 5, fill: "#FFB3B3" },
              { name: "Verlopen", value: 4, fill: "#EFB8C8" },
              { name: "In behandeling", value: 12, fill: "#FFE9D6" },
           

            ]} />
          </div>



        </div>

      </div>





    </>

  )
}


