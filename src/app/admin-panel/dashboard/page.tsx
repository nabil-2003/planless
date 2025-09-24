'use client'
import Statistcs from '@/components/admin/Statistcs'
import React from 'react'
import Header from '@/components/admin/Header'
import TimeFilter from '@/components/admin/TimeFIlter'
import LessonChart from '@/components/admin/ui/LessonChart'
import CostumChart from '@/components/admin/ui/LessonChart'
import { FaArrowUp, FaArrowDown, FaChartLine, FaChartBar } from 'react-icons/fa'
export default function page() {
  return (
    <div className='ml-auto border-l-[2px] border-l-gray-200 w-[85%] bg-dashboard-primary h-max'>
        <Header title="dashboard overview"  />
        <TimeFilter className="mt-4" />
        <Statistcs  />
        <CostumChart
          className="mt-4"
          data={[
            { month: 'Jan', inBehandeling: 30, bevestigd: 20, geannuleerd: 10, afgewezen: 5, voltooid: 15, verlopen: 2 },
            { month: 'Feb', inBehandeling: 25, bevestigd: 30, geannuleerd: 15, afgewezen: 10, voltooid: 20, verlopen: 3 },
            { month: 'Mar', inBehandeling: 20, bevestigd: 25, geannuleerd: 20, afgewezen: 15, voltooid: 25, verlopen: 4 },
            { month: 'Apr', inBehandeling: 35, bevestigd: 40, geannuleerd: 10, afgewezen: 5, voltooid: 30, verlopen: 1 },
            { month: 'May', inBehandeling: 40, bevestigd: 35, geannuleerd: 15, afgewezen: 10, voltooid: 20, verlopen: 2 },
            { month: 'Jun', inBehandeling: 30, bevestigd: 30, geannuleerd: 20, afgewezen: 15, voltooid: 25, verlopen: 3 },
            { month: 'Jul', inBehandeling: 25, bevestigd: 20, geannuleerd: 25, afgewezen: 20, voltooid: 30, verlopen: 4 },
            { month: 'Aug', inBehandeling: 20, bevestigd: 25, geannuleerd: 30, afgewezen: 25, voltooid: 35, verlopen: 5 },
            { month: 'Sep', inBehandeling: 15, bevestigd: 30, geannuleerd: 35, afgewezen: 30, voltooid: 40, verlopen: 6 },
            { month: 'Oct', inBehandeling: 10, bevestigd: 35, geannuleerd: 40, afgewezen: 35, voltooid: 45, verlopen: 7 },
            { month: 'Nov', inBehandeling: 5, bevestigd: 40, geannuleerd: 45, afgewezen: 40, voltooid: 50, verlopen: 8 },
            { month: 'Dec', inBehandeling: 0, bevestigd: 45, geannuleerd: 50, afgewezen: 45, voltooid: 55, verlopen: 9 },
          ]}
          statics={[
            { label: "In Behandeling", total: 120, percentage: 5.5, Icon: FaChartLine },
            { label: "Bevestigd", total: 300, percentage: 10.2, Icon:FaChartLine },
            { label: "Geannuleerd", total: 150, percentage: -3.4, Icon: FaChartLine},
            { label: "Afgewezen", total: 80, percentage: -1.2, Icon:FaChartLine }

          ]}
        />
         <CostumChart
          className="mt-4"
          data={[
            { month: 'Jan', inBehandeling: 30, bevestigd: 20, },
            { month: 'Feb', inBehandeling: 25, bevestigd: 30,  },
            { month: 'Mar', inBehandeling: 20, bevestigd: 25},
            { month: 'Apr', inBehandeling: 35, bevestigd: 40 },
            { month: 'May', inBehandeling: 40, bevestigd: 35,},
            { month: 'Jun', inBehandeling: 30, bevestigd: 30, },
            { month: 'Jul', inBehandeling: 25, bevestigd: 20, },
            { month: 'Aug', inBehandeling: 20, bevestigd: 25,},
            { month: 'Sep', inBehandeling: 15, bevestigd: 30,},
            { month: 'Oct', inBehandeling: 10, bevestigd: 35,  },
            { month: 'Nov', inBehandeling: 5, bevestigd: 40,},
            { month: 'Dec', inBehandeling: 0, bevestigd: 45, },
          ]}
          statics={[
            { label: "In Behandeling", total: 120, percentage: 5.5, Icon: FaChartLine },
        

          ]}
        />
              <CostumChart
          className="mt-4"
          data={[
            { month: 'Jan', inBehandeling: 30 },
            { month: 'Feb', inBehandeling: 25  },
            { month: 'Mar', inBehandeling: 20},
            { month: 'Apr', inBehandeling: 35},
            { month: 'May', inBehandeling: 40},
            { month: 'Jun', inBehandeling: 30},
            { month: 'Jul', inBehandeling: 25 },
            { month: 'Aug', inBehandeling: 20},
            { month: 'Sep', inBehandeling: 15},
            { month: 'Oct', inBehandeling: 10  },
            { month: 'Nov', inBehandeling: 5},
            { month: 'Dec', inBehandeling: 0 },
          ]}
          statics={[
            { label: "In Behandeling", total: 120, percentage: 5.5, Icon: FaChartLine },
         { label: "In Behandeling", total: 120, percentage: 5.5, Icon: FaChartLine },
          { label: "In Behandeling", total: 120, percentage: 5.5, Icon: FaChartLine },

          ]}
        />
          <CostumChart
          className="mt-4"
          data={[
            { month: 'Jan', inBehandeling: 30 },
            { month: 'Feb', inBehandeling: 25  },
            { month: 'Mar', inBehandeling: 20},
            { month: 'Apr', inBehandeling: 35},
            { month: 'May', inBehandeling: 40},
            { month: 'Jun', inBehandeling: 30},
            { month: 'Jul', inBehandeling: 25 },
            { month: 'Aug', inBehandeling: 20},
            { month: 'Sep', inBehandeling: 15},
            { month: 'Oct', inBehandeling: 10  },
            { month: 'Nov', inBehandeling: 5},
            { month: 'Dec', inBehandeling: 0 },
          ]}
          statics={[
            { label: "In Behandeling", total: 120, percentage: 5.5, Icon: FaChartLine },
         { label: "In Behandeling", total: 120, percentage: 5.5, Icon: FaChartLine },
          { label: "In Behandeling", total: 120, percentage: 5.5, Icon: FaChartLine },
            { label: "In Behandeling", total: 120, percentage: 5.5, Icon: FaChartLine },

          ]}
        />
        
    </div>
  )
}
