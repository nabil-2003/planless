'use client'
import Statistcs from '@/components/admin/Statistcs'
import React from 'react'
import Header from '@/components/admin/Header'
import LessonChart from '@/components/admin/ui/LessonChart'
import CostumChart from '@/components/admin/ui/LessonChart'
import ChartExample from '@/components/admin/ui/ChartExample'
import { FaArrowUp, FaArrowDown, FaChartLine, FaChartBar, FaRegCheckCircle, FaRegFileAlt, FaRegTimesCircle } from 'react-icons/fa'
import LeftSide from '@/components/admin/LeftSide'
import { IoFlagOutline } from 'react-icons/io5'
import { RxTimer } from 'react-icons/rx'
import useDashBoard from '@/app/hooks/useDashBoard'
import Breadcrumb from '@/components/admin/Breadcrumb'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
  PieChart,
  Pie,
  Legend
} from "recharts";
export default function page() {
  const [currentFilter, setCurrentFilter] = React.useState('20 dagen');

  const mapFilterToDays = (filter: string) => {
    switch (filter) {
      case '7 dagen':
        return 7;
      case '24 uur':
        return 1;
      case '20 dagen':
        return 20;
      case '12 maanden':
        return 365;
      default:
        return 20;
    }
  }
  const { fetchStats } = useDashBoard();
  const handleChangeFilter = (filter: string) => {
    setCurrentFilter(t => filter);
    // You can add additional logic here to fetch or filter data based on the selected time filter
  }
  React.useEffect(() => {
    const fetchData = async () => {
      await fetchStats(mapFilterToDays(currentFilter));
    }
    fetchData();
  }, [currentFilter])
  return (
    <>
      <Header title="dashboard overview" />
      <div className='w-full flex flex-col md:flex-row border-l-[2px] border-l-gray-200 bg-dashboard-primary h-max'>

        <LeftSide className='hidden md:flex md:w-[20%] border-l-0  rounded-t-none  mt-4 items-center bg-white rounded-r-lg  border-2 border-gray-200 h-auto  ' />
        <div className='dashboard-container w-full md:w-[80%] px-4 md:px-0'>
          <Statistcs className="mt-4" />
          <div className=' relative w-[95%] border-2 border-gray-200  rounded-xl overflow-hidden  ml-8 mt-3'>
            <h1 className='pl-20 py-5 bg-white text-2xl justify-around w-full  '>Studenten</h1>
            <div className='absolute -left-9 -rotate-90 top-[50%] text-xl text-gray-200  transform -translate-y-1/2'>Rijles statussen</div>
            <BarsChart data={[
              { name: "In behandeling", value: 200, color: "#fde7d3" },
              { name: "Bevestigd", value: 10000, color: "#e6ffe6" },
              { name: "Voltooid", value: 12, color: "#e6f6ff" },
              { name: "Geannuleerd", value: 300, color: "#f0f0f0" },
            ]} />
          </div>
          <div className=' relative w-[95%] border-2 border-gray-200  rounded-xl overflow-hidden  ml-8 mt-3'>
            <h1 className='pl-20 py-5 bg-white text-2xl justify-around w-full  '>Aantal leerlingen, instructeurs en beheerders</h1>
            <div className='absolute -left-3 -rotate-90 top-[50%] text-xl text-gray-200  transform -translate-y-1/2'>Statussen</div>
            <BarsChart data={[
              { name: "Studenten", value: 200, color: "#fde7d3" },
              { name: "Instructeurs", value: 10, color: "#e6ffe6" },
              { name: "Beheerders", value: 12, color: "#e6f6ff" },
            ]} />
            <div className='absolute bottom-11 left-1/2 transform -translate-x-1/2 p-4 text-gray-500 text-sm'>Total number of studenten, instructors and administrators</div>
          </div>
          <div className=' relative w-[95%] border-2 border-gray-200  rounded-xl overflow-hidden  ml-8 mt-3'>
            <h1 className='pl-20 py-5 bg-white text-2xl justify-around w-full  '>Leskaarten</h1>
            <div className='absolute -left-9 -rotate-90 top-[50%] text-lg text-gray-200  transform -translate-y-1/2'>Leskaart statussen</div>
            <BarsChart style={{}} data={[
              { name: "Aankomend", value: 200, color: "#fde7d3" },
              { name: "Geschiedenis", value: 170, color: "#e6ffe6" },
              { name: "Totaal gezakte studenten", value: 30, color: "#e6f6ff" },
            ]} />
            <div className='absolute bottom-11 left-1/2 transform -translate-x-1/2 p-4 text-gray-500 text-sm'>Total number of studenten</div>
          </div>

          <div className=' relative w-[95%] border-2 border-gray-200  rounded-xl overflow-hidden  ml-8 mt-3'>
            <h1 className='pl-20 py-5 bg-white text-2xl justify-around w-full  '>Financiën</h1>
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


export function BarsChart({ data = [], style = {} }: { data: Array<any>, style?: React.CSSProperties }) {


  return (
    <div style={{ width: "100%", background: "#fff", padding: "20px" }}>
      {/* Chart */}
      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 50, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="" />

            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "#666", fontSize: 13 }}
              width={250}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Bar dataKey="value" radius={[0, 10, 10, 0]}>
              <LabelList
                dataKey="value"
                position="right"
                fill="#666"
                fontSize={11}
                fontWeight={500}
              />
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend - Bottom Center */}
      <div style={{ display: "flex", gap: "40px", marginTop: "20px", flexWrap: "nowrap", justifyContent: "center" }}>
        {data.map((item, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: item.color,
              border: "1px solid #ddd"
            }} />
            <span style={{ fontSize: "14px", color: "#666", whiteSpace: "nowrap" }}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RadialChart({ data = [] }: { data: Array<any> }) {
  // Calculate total for percentage
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Prepare data with percentages
  const dataWithPercentage = data.map(item => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(0) 
  }));

  const renderCustomLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percentage } = props;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="black" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize={14}
        fontWeight={500}
      >
        {`${percentage}%`}
      </text>
    );
  };

  return (
    <div style={{ width: "100%", background: "#fff", padding: "20px" }}>
      <div style={{ width: "100%", height: 400, position: "relative" }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
          
              data={dataWithPercentage}
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={450}
              innerRadius="0%"
              outerRadius="85%"
              paddingAngle={0}
              dataKey="value"
              label={renderCustomLabel}
              labelLine={false}
             
            >
              {dataWithPercentage.map((entry, index) => (
                <Cell  key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: any, name: any, props: any) => [`${props.payload.percentage}%`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend */}
      <div style={{ display: "flex", gap: "30px", marginTop: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        {dataWithPercentage.map((item, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: item.fill,
              border: "1px solid #ddd"
            }} />
            <span style={{ fontSize: "14px", color: "#666", whiteSpace: "nowrap" }}>
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
