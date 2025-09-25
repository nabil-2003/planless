'use client'
import React from 'react'
import { FaUserTie, FaUsers, FaChartLine, FaChartBar } from 'react-icons/fa';
import { ResponsiveContainer, Tooltip, LineChart, Legend, Line, CartesianGrid, XAxis, YAxis, AreaChart, Area } from 'recharts'
import StatisticsCard, { Statistcs } from './StatisticsCard';

export default function CostumChart({className , data  ,title, statics }: { title : string , className?: string  ,  data: any[] , statics: Array<Statistcs>}) {
  const colors = ['#2563EB', '#22C55E', '#EAB308', '#F59E0B', '#8B5CF6', '#EF4444'];
  console.log();
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
                <Legend
                  verticalAlign="bottom"
                  align='left'
                  height={40}
                  style={{ marginLeft: '20px' }}
                  iconType="circle"
                  wrapperStyle={{ fontSize: "13px" }}
                />

                {/* Lines */}
               {
                //extract all keys except 'month' to create lines dynamically
                Object.keys(data[0]).filter(key => key !== "month").map((e,i) => (
                  <Area type="monotone" key={i} dataKey={e} stroke={colors[i]} fill='blue' fillOpacity={0.01} strokeWidth={2} dot={false} name={e} />
                ))
               }
               
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Statistics Cards Section */}
          <div className='mt-6'>
            <ul  style={{gap:15}} className='flex justify-start h-max mt-4 w-[auto] mx-auto  text-gray-600 '>
           {
            //map through the statics array to render StatisticsCard components
            statics.map((stat , index) => (
                < StatisticsCard 
                  label={stat.label}
                  key={index}       
                    total={stat.total}
                    percentage={stat.percentage}
                    className='h-[100%] w-[19%] py-2 px-1'
                    Icon={stat.Icon}
                />
           
            ))

            
                
           }
              
              
            </ul>
          </div>
        </div>
  )
}
