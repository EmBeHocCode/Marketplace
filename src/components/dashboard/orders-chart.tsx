"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const data = [
  { name: "T2", orders: 42 },
  { name: "T3", orders: 58 },
  { name: "T4", orders: 53 },
  { name: "T5", orders: 76 },
  { name: "T6", orders: 88 },
  { name: "T7", orders: 71 },
  { name: "CN", orders: 95 }
];

export function OrdersChart() {
  return (
    <div className="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid stroke="#F2E9EF" vertical={false} />
          <XAxis dataKey="name" stroke="#7A8AAA" />
          <YAxis stroke="#7A8AAA" />
          <Tooltip />
          <Bar dataKey="orders" fill="#6C8CFF" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
