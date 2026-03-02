'use client'
import React from 'react'
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
} from "recharts";

export function BarsChart({ data = [], style = {} }: { data: Array<any>, style?: React.CSSProperties }) {
  return (
    <div style={{ width: "100%", background: "#fff", padding: "20px" }}>
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
      <div style={{ display: "flex", gap: "20px", marginTop: "20px", flexWrap: "wrap", justifyContent: "center", padding: "0 16px" }}>
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
  const total = data.reduce((sum, item) => sum + item.value, 0);
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
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: any, name: any, props: any) => [`${props.payload.percentage}%`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display: "flex", gap: "15px", marginTop: "20px", flexWrap: "wrap", justifyContent: "center", padding: "0 16px" }}>
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
