"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const data = [
  { name: "T2", revenue: 12000000 },
  { name: "T3", revenue: 16800000 },
  { name: "T4", revenue: 15400000 },
  { name: "T5", revenue: 20200000 },
  { name: "T6", revenue: 24800000 },
  { name: "T7", revenue: 22100000 },
  { name: "CN", revenue: 27100000 }
];

export function RevenueChart() {
  return (
    <div className="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF7FA9" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#FF7FA9" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#F2E9EF" vertical={false} />
          <XAxis dataKey="name" stroke="#7A8AAA" />
          <YAxis stroke="#7A8AAA" />
          <Tooltip />
          <Area type="monotone" dataKey="revenue" stroke="#FF7FA9" fill="url(#revenueFill)" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
