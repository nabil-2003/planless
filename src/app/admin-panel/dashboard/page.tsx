'use client'
import Statistcs from '@/components/admin/Statistcs'
import React from 'react'
import Header from '@/components/admin/Header'
import TimeFilter from '@/components/admin/TimeFIlter'
import LessonChart from '@/components/admin/ui/LessonChart'
import CostumChart from '@/components/admin/ui/LessonChart'
import ChartExample from '@/components/admin/ui/ChartExample'
import { FaArrowUp, FaArrowDown, FaChartLine, FaChartBar, FaRegCheckCircle, FaRegFileAlt, FaRegTimesCircle } from 'react-icons/fa'
import LeftSide from '@/components/admin/LeftSide'
import { IoFlagOutline } from 'react-icons/io5'
import { RxTimer } from 'react-icons/rx'
export default function page() {
  const [currentFilter, setCurrentFilter] = React.useState('20 dagen');
  const handleChangeFilter = (filter: string) => {
    setCurrentFilter( t => filter);
    // You can add additional logic here to fetch or filter data based on the selected time filter
  }
  return (
    <>
      <Header title="dashboard overview"   />
       <div className='w-full flex border-l-[2px] border-l-gray-200 bg-dashboard-primary h-max'>

        <LeftSide className='w-[20%] border-l-0  rounded-t-none  mt-4 items-center bg-white rounded-r-lg  border-2 border-gray-200 h-auto  ' />
     <div className='dashboard-container w-[80%] '>
        <TimeFilter  changeFilter={handleChangeFilter} className="mt-4"  currentFilter={currentFilter}/>
        <Statistcs  />
                  <CostumChart
        title='Rijlessen'
          className="mt-4"
          data={[
            { month: 'Jan', "In Behandeling": 30, "Bevestigd": 20, "Geannuleerd": 10, "Afgewezen": 5, "Voltooid": 15, "Verlopen": 2 },
            { month: 'Feb', "In Behandeling": 25, "Bevestigd": 30, "Geannuleerd": 15, "Afgewezen": 10, "Voltooid": 20, "Verlopen": 3 },
            { month: 'Mar', "In Behandeling": 20, "Bevestigd": 25, "Geannuleerd": 20, "Afgewezen": 15, "Voltooid": 25, "Verlopen": 4 },
            { month: 'Apr', "In Behandeling": 35, "Bevestigd": 40, "Geannuleerd": 10, "Afgewezen": 5, "Voltooid": 30, "Verlopen": 1 },
            { month: 'May', "In Behandeling": 40, "Bevestigd": 35, "Geannuleerd": 15, "Afgewezen": 10, "Voltooid": 20, "Verlopen": 2 },
            { month: 'Jun', "In Behandeling": 30, "Bevestigd": 30, "Geannuleerd": 20, "Afgewezen": 15, "Voltooid": 25, "Verlopen": 3 },
            { month: 'Jul', "In Behandeling": 25, "Bevestigd": 20, "Geannuleerd": 25, "Afgewezen": 20, "Voltooid": 30, "Verlopen": 4 },
            { month: 'Aug', "In Behandeling": 20, "Bevestigd": 25, "Geannuleerd": 30, "Afgewezen": 25, "Voltooid": 35, "Verlopen": 5 },
            { month: 'Sep', "In Behandeling": 15, "Bevestigd": 30, "Geannuleerd": 35, "Afgewezen": 30, "Voltooid": 40, "Verlopen": 6 },
            { month: 'Oct', "In Behandeling": 10, "Bevestigd": 35, "Geannuleerd": 40, "Afgewezen": 35, "Voltooid": 45, "Verlopen": 7 },
            { month: 'Nov', "In Behandeling": 5, "Bevestigd": 40, "Geannuleerd": 45, "Afgewezen": 40, "Voltooid": 50, "Verlopen": 8 },
            { month: 'Dec', "In Behandeling": 0, "Bevestigd": 45, "Geannuleerd": 50, "Afgewezen": 45, "Voltooid": 55, "Verlopen": 9 },
          ]}
          statics={[
            { label: "In Behandeling", total: 120, percentage: 5.5, Icon: FaRegFileAlt },
            { label: "Bevestigd", total: 300, percentage: 10.2, Icon: FaRegCheckCircle },
            { label: "Geannuleerd", total: 150, percentage: -3.4, Icon: FaRegTimesCircle},
            { label: "Voltooid", total: 80, percentage: -1.2, Icon:IoFlagOutline } ,     
             { label: "Verlopen", total: 80, percentage: -1.2, Icon:RxTimer }

          ]}
        />
         <CostumChart
         title='studerenden'
          className="mt-4"
          data={[
            { month: 'Jan', "In Behandeling": 30, "Bevestigd": 20 },
            { month: 'Feb', "In Behandeling": 25, "Bevestigd": 30},
            { month: 'Mar', "In Behandeling": 20, "Bevestigd": 25 },
            { month: 'Apr', "In Behandeling": 35, "Bevestigd": 40 },
            { month: 'May', "In Behandeling": 40, "Bevestigd": 35 },
            { month: 'Jun', "In Behandeling": 30, "Bevestigd": 30 },
            { month: 'Jul', "In Behandeling": 25, "Bevestigd": 20 },
            { month: 'Aug', "In Behandeling": 20, "Bevestigd": 25 },
            { month: 'Sep', "In Behandeling": 15, "Bevestigd": 30 },
            { month: 'Oct', "In Behandeling": 10, "Bevestigd": 35, },
            { month: 'Nov', "In Behandeling": 5, "Bevestigd": 40, },
            { month: 'Dec', "In Behandeling": 0, "Bevestigd": 45, },
          ]}
          statics={[
            { label: "In Behandeling", total: 120, percentage: 5.5, Icon: FaRegFileAlt },
            { label: "Bevestigd", total: 300, percentage: 10.2, Icon:FaRegCheckCircle },

          ]}
        />
        <CostumChart
         title='instructeurs'
          className="mt-4"
          data={[
            { month: 'Jan', "Gerepareerd": 30, "Openstaand": 20 },
            { month: 'Feb', "Gerepareerd": 25, "Openstaand": 30 },
            { month: 'Mar', "Gerepareerd": 20, "Openstaand": 25 },
            { month: 'Apr', "Gerepareerd": 35, "Openstaand": 40 },
            { month: 'May', "Gerepareerd": 40, "Openstaand": 35 },
            { month: 'Jun', "Gerepareerd": 30, "Openstaand": 30 },
            { month: 'Jul', "Gerepareerd": 25, "Openstaand": 20 },
            { month: 'Aug', "Gerepareerd": 20, "Openstaand": 25 },
            { month: 'Sep', "Gerepareerd": 15, "Openstaand": 30 },
            { month: 'Oct', "Gerepareerd": 10, "Openstaand": 35, },
            { month: 'Nov', "Gerepareerd": 5, "Openstaand": 40, },
            { month: 'Dec', "Gerepareerd": 0, "Openstaand": 45, },
          ]}
          statics={[
            { label: "Gerepareerd", total: 120, percentage: 5.5, Icon: FaRegCheckCircle },
            { label: "Openstaand", total: 300, percentage: 10.2, Icon: FaRegCheckCircle },

          ]}
        />
         <CostumChart
         title='leskaarten'
          className="mt-4"
          data={[
            { month: 'Jan', "Gerepareerd": 30, "Openstaand": 20 },
            { month: 'Feb', "Gerepareerd": 25, "Openstaand": 30 },
            { month: 'Mar', "Gerepareerd": 20, "Openstaand": 25 },
            { month: 'Apr', "Gerepareerd": 35, "Openstaand": 40 },
            { month: 'May', "Gerepareerd": 40, "Openstaand": 35 },
            { month: 'Jun', "Gerepareerd": 30, "Openstaand": 30 },
            { month: 'Jul', "Gerepareerd": 25, "Openstaand": 20 },
            { month: 'Aug', "Gerepareerd": 20, "Openstaand": 25 },
            { month: 'Sep', "Gerepareerd": 15, "Openstaand": 30 },
            { month: 'Oct', "Gerepareerd": 10, "Openstaand": 35, },
            { month: 'Nov', "Gerepareerd": 5, "Openstaand": 40, },
            { month: 'Dec', "Gerepareerd": 0, "Openstaand": 45, },
          ]}
          statics={[
            { label: "Gerepareerd", total: 120, percentage: 5.5, Icon: FaRegCheckCircle },
            { label: "Openstaand", total: 300, percentage: 10.2, Icon: FaRegCheckCircle },

          ]}
        />
   <CostumChart
         title='financiën'
          className="mt-4"
          data={[
            { month: 'Jan', "Gerepareerd": 30, "Openstaand": 20 },
            { month: 'Feb', "Gerepareerd": 25, "Openstaand": 30 },
            { month: 'Mar', "Gerepareerd": 20, "Openstaand": 25 },
            { month: 'Apr', "Gerepareerd": 35, "Openstaand": 40 },
            { month: 'May', "Gerepareerd": 40, "Openstaand": 35 },
            { month: 'Jun', "Gerepareerd": 30, "Openstaand": 30 },
            { month: 'Jul', "Gerepareerd": 25, "Openstaand": 20 },
            { month: 'Aug', "Gerepareerd": 20, "Openstaand": 25 },
            { month: 'Sep', "Gerepareerd": 15, "Openstaand": 30 },
            { month: 'Oct', "Gerepareerd": 10, "Openstaand": 35, },
            { month: 'Nov', "Gerepareerd": 5, "Openstaand": 40, },
            { month: 'Dec', "Gerepareerd": 0, "Openstaand": 45, },
          ]}
          statics={[
            { label: "Gerepareerd", total: 120, percentage: 5.5, Icon: FaRegCheckCircle },
            { label: "Openstaand", total: 300, percentage: 10.2, Icon: FaRegCheckCircle },

          ]}
        />
        </div>
      
     </div>

     
      
   
        
    </>
   
  )
}
