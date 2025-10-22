'use client'
import React, { useMemo, useState } from 'react'
import { FaUserTie, FaUsers, FaChartLine, FaChartBar } from 'react-icons/fa';
import { ResponsiveContainer, Tooltip, LineChart, Legend, Line, CartesianGrid, XAxis, YAxis, AreaChart, Area } from 'recharts'
import StatisticsCard, { Statistcs } from './StatisticsCard';





export default function CostumChart({className , data=[] ,title, statics }: { title : string , className?: string  ,  data: any[] , statics: Array<Statistcs>}) {
  const colors = ['#2563EB', '#22C55E', '#EAB308', '#F59E0B', '#8B5CF6', '#EF4444'];

  const getColor = (status: string) => {

    switch (status) {
      case 'In Behandeling':
        return '#2563EB'; // Blue
      case 'Bevestigd':
        return '#22C55E'; // Green
      case 'Geannuleerd':
        return '#EF4444'; // Red
      case 'Afgewezen':
        return '#F59E0B'; // Orange
      case 'Voltooid':
        return '#8B5CF6'; // Purple
      case 'Verlopen':
        return '#EAB308'; 
      case 'Gerepareerd':
        return '#2563EB';
      case 'Openstaand': 
        return '#F59E0B'
        return '#22C55E';

        // Yellow
      default:
        return '#6B7280'; // Gray for unknown statuses
    }
  }
  const keys = useMemo(() => {
    if (data.length > 0) {
      return Object.keys(data[0]).filter(key => key !== 'month');
    }
    return [];
  }, [data]);

  return (
     <div className={`w-[95%] mt-4 p-3 mx-auto bg-white rounded-lg border-2 border-gray-200 items-center ${className}`} style={{ height: 'auto', minHeight: '70vh' }}>
          <h1 className='font-bold text-lg text-gray-700 ml-3 mb-4'>{title}</h1>
          
          {/* Chart Section */}
          <div className='w-full h-[40vh]'>
            <ResponsiveContainer height="100%" width="100%">
              <AreaChart data={data} margin={{ top: 20, right: 30, left: 30, bottom: 10 }}>
                {/* Light grid - horizontal lines only */}
                <CartesianGrid strokeDasharray="0.5" stroke="#E5E7EB" horizontal={true} vertical={false} />

                {/* Axis */}
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                />
                <Tooltip />

                {/* Legend at bottom */}
              

                {/* Lines */}
               {
                //extract all keys except 'month' to create lines dynamically
               keys.map((e,i) => 
                  {
                    console.log( e , getColor(e))
                    return(
                  <Area type="monotone" key={i} dataKey={e} stroke={getColor(e)} fill='blue' fillOpacity={0.015} strokeWidth={2} dot={false} name={e} />

                    )
                  }
                )
               }
               
              </AreaChart>
            </ResponsiveContainer>
         
          </div>
         <div id="legend" className='w-full px-2 sm:px-3 md:px-4 flex flex-wrap gap-x-4 gap-y-2 items-center justify-start text-gray-500 text-xs sm:text-sm mt-2 overflow-x-auto hide-native-scroll'>
            {
              keys.map((e,i) => (
                <div key={i} className='flex items-center' style={{color:getColor(e)}}>
                  <div className='w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full mr-1.5' style={{backgroundColor:getColor(e)}}></div>
                  <span className='whitespace-nowrap'>{e}</span>
                </div>
              ))
            }
          </div>
          {/* Statistics Cards Section */}
          <div>
            <ul className='flex flex-wrap justify-start gap-4 h-max mt-2 w-auto mx-auto text-gray-600'>
              {
                // map through the statics array to render StatisticsCard components
                statics.map((stat , index) => (
                  <StatisticsCard 
                    label={stat.label}
                    key={index}
                    total={stat.total}
                    percentage={stat.percentage}
                    className='h-auto w-full sm:w-[48%] lg:w-[20%] py-2 px-2'
                    Icon={stat.Icon}
                  />
                ))
              }
            </ul>
          </div>
        </div>
  )
}
