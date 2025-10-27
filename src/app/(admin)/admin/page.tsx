"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  format,
  subDays,
  eachDayOfInterval,
} from "date-fns";

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#3B82F6"];

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}
interface Order {
  _id: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
}
interface DailyData {
  date: string;
  total: number;
  orders: number;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [timeRange, setTimeRange] = useState("7days");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  // Generate daily data
  const processDaily = (days: number): DailyData[] => {
    const endDate = new Date();
    const startDate = subDays(endDate, days - 1);
    const dates = eachDayOfInterval({ start: startDate, end: endDate });

    return dates.map((d) => {
      const dayOrders = orders.filter(
        (o) => new Date(o.createdAt).toDateString() === d.toDateString()
      );
      return {
        date: format(d, "dd/MM"),
        total: dayOrders.reduce((sum, o) => sum + o.total, 0),
        orders: dayOrders.length,
      };
    });
  };

  const processStatusData = () => {
    const map: Record<string, number> = {};
    orders.forEach((o) => (map[o.status] = (map[o.status] || 0) + 1));
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  };

  const processTopItems = () => {
    const items: Record<string, number> = {};
    orders.forEach((o) =>
      o.items.forEach((i) => (items[i.name] = (items[i.name] || 0) + i.qty))
    );
    return Object.entries(items)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  };

  const totalRevenue = orders
    .filter((o) => o.status === "LUNAS")
    .reduce((s, o) => s + o.total, 0);

  const avgValue =
    totalRevenue /
      (orders.filter((o) => o.status === "LUNAS").length || 1) || 0;

  const data = {
    daily: processDaily(timeRange === "7days" ? 7 : 30),
    status: processStatusData(),
    topItems: processTopItems(),
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-gray-500 animate-pulse">Loading dashboard...</p>
      </div>
    );

  return (
    <div className="p-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          📊 Dashboard Analitik
        </h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px] mt-3 sm:mt-0">
            <SelectValue placeholder="Pilih Periode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">7 Hari Terakhir</SelectItem>
            <SelectItem value="30days">30 Hari Terakhir</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <Card className="bg-white/70 backdrop-blur border-none shadow-md hover:shadow-lg transition">
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Total Pendapatan</p>
            <h2 className="text-2xl font-bold text-slate-700 mt-1">
              Rp {totalRevenue.toLocaleString()}
            </h2>
          </CardContent>
        </Card>
        <Card className="bg-white/70 backdrop-blur border-none shadow-md hover:shadow-lg transition">
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Rata-rata Pesanan</p>
            <h2 className="text-2xl font-bold text-slate-700 mt-1">
              Rp {Math.round(avgValue).toLocaleString()}
            </h2>
          </CardContent>
        </Card>
        <Card className="bg-white/70 backdrop-blur border-none shadow-md hover:shadow-lg transition">
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Pesanan Selesai</p>
            <h2 className="text-2xl font-bold text-green-600 mt-1">
              {orders.filter((o) => o.status === "LUNAS").length}
            </h2>
          </CardContent>
        </Card>
        <Card className="bg-white/70 backdrop-blur border-none shadow-md hover:shadow-lg transition">
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Total Pesanan</p>
            <h2 className="text-2xl font-bold text-blue-600 mt-1">
              {orders.length}
            </h2>
          </CardContent>
        </Card>
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Daily revenue line chart */}
        <Card className="col-span-2 bg-white/70 backdrop-blur border-none shadow-md hover:shadow-lg transition">
          <CardHeader>
            <CardTitle>Pendapatan Harian</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.daily}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#6366F1"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie chart: order status */}
        <Card className="bg-white/70 backdrop-blur border-none shadow-md hover:shadow-lg transition">
          <CardHeader>
            <CardTitle>Status Pesanan</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.status}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                >
                  {data.status.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar chart: top products */}
        <Card className="bg-white/70 backdrop-blur border-none shadow-md hover:shadow-lg transition">
          <CardHeader>
            <CardTitle>Produk Terlaris</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.topItems} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={100} />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
