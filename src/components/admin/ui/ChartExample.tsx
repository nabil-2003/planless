'use client'
import React from 'react'
import Chart from '@/components/svgs/Chart'

export default function ChartExample() {
  const statuses = ['Unpaid', 'Confirmed', 'Completed', 'Pending', 'Cancelled', 'In Progress'] as const;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Chart Status Examples</h2>
      
      <div className="grid grid-cols-2 gap-6">
        {statuses.map((status) => (
          <div key={status} className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">{status}</h3>
            <div className="flex justify-center">
              <Chart status={status} />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Color Scheme:</h3>
        <ul className="space-y-1 text-sm">
          <li><span className="inline-block w-4 h-4 bg-[#FFD6D6] border border-[#7A1C1C] mr-2"></span>Unpaid: Light red background, dark red stroke</li>
          <li><span className="inline-block w-4 h-4 bg-[#DCFFD6] border border-[#1C7A2C] mr-2"></span>Confirmed: Light green background, dark green stroke</li>
          <li><span className="inline-block w-4 h-4 bg-[#D6FFDC] border border-[#2C7A1C] mr-2"></span>Completed: Light green background, dark green stroke</li>
          <li><span className="inline-block w-4 h-4 bg-[#FFF4D6] border border-[#7A5C1C] mr-2"></span>Pending: Light yellow background, dark yellow stroke</li>
          <li><span className="inline-block w-4 h-4 bg-[#E6E6E6] border border-[#666666] mr-2"></span>Cancelled: Light gray background, dark gray stroke</li>
          <li><span className="inline-block w-4 h-4 bg-[#D6E4FF] border border-[#1C3F7A] mr-2"></span>In Progress: Light blue background, dark blue stroke</li>
        </ul>
      </div>
    </div>
  )
}
