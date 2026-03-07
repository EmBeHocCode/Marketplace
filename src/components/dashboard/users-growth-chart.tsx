"use client";

import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const data = [
  { name: "T2", users: 2200 },
  { name: "T3", users: 2480 },
  { name: "T4", users: 2760 },
  { name: "T5", users: 3140 },
  { name: "T6", users: 3520 },
  { name: "T7", users: 3890 },
  { name: "CN", users: 4210 }
];

export function UsersGrowthChart() {
  return (
    <div className="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#F2E9EF" vertical={false} />
          <XAxis dataKey="name" stroke="#7A8AAA" />
          <YAxis stroke="#7A8AAA" />
          <Tooltip />
          <Line type="monotone" dataKey="users" stroke="#FFD166" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
