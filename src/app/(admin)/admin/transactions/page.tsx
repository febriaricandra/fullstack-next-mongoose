"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Order {
  _id: string;
  userId: string;
  items: Array<{
    productId: string;
    name: string;
    qty: number;
    price: number;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  status: string;
  paymentId?: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminTransactionsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        const ordersArray = Array.isArray(data) ? data : [];
        setOrders(ordersArray);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setOrders([]);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="p-8 text-center text-gray-500 animate-pulse">
        Memuat data transaksi...
      </div>
    );

  // Filter berdasarkan pencarian
  const filteredOrders = orders.filter(
    (o) =>
      o._id.toLowerCase().includes(search.toLowerCase()) ||
      o.userId.toLowerCase().includes(search.toLowerCase()) ||
      o.status.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const base = "px-2 py-1 rounded text-xs font-semibold";
    switch (status) {
      case "COMPLETED":
        return <Badge className="bg-green-500 text-white">Selesai</Badge>;
      case "PAID":
        return <Badge className="bg-blue-500 text-white">Dibayar</Badge>;
      case "PENDING":
        return <Badge className="bg-yellow-500 text-white">Menunggu</Badge>;
      case "FAILED":
        return <Badge className="bg-red-500 text-white">Gagal</Badge>;
      default:
        return <Badge className="bg-gray-400 text-white">{status}</Badge>;
    }
  };

  const columns = [
    {
      accessorKey: "_id",
      header: "Order ID",
      cell: (info: any) => (
        <span className="font-mono text-sm text-gray-700">{info.getValue()}</span>
      ),
    },
    {
      accessorKey: "userId",
      header: "User ID",
      cell: (info: any) => (
        <span className="text-gray-700 text-sm">{info.getValue()}</span>
      ),
    },
    {
      accessorKey: "total",
      header: "Total Pembayaran",
      cell: (info: any) => (
        <span className="font-medium text-gray-800">
          Rp {Number(info.getValue()).toLocaleString("id-ID")}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info: any) => getStatusBadge(info.getValue()),
    },
    {
      accessorKey: "createdAt",
      header: "Tanggal",
      cell: (info: any) => (
        <span className="text-sm text-gray-600">
          {new Date(info.getValue()).toLocaleString("id-ID")}
        </span>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }: any) => {
        const id = row.original._id;
        const isExpanded = expandedRow === id;
        return (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setExpandedRow(isExpanded ? null : id)}
            className="hover:bg-gray-100"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        );
      },
    },
  ];

  return (
    <motion.div
      className="max-w-6xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Daftar Transaksi
          </h1>
          <p className="text-gray-500 text-sm">
            Lihat seluruh transaksi pelanggan dan status pembayarannya
          </p>
        </div>

        <div className="relative w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Cari transaksi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <Card className="border-none shadow-lg rounded-2xl overflow-hidden backdrop-blur-md bg-white/70">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <h2 className="font-semibold text-lg">Manajemen Transaksi</h2>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable columns={columns} data={filteredOrders} />

          {/* Expanded Row Details */}
          {expandedRow && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="border-t border-gray-200 bg-gray-50/70 p-6"
            >
              {orders
                .filter((order) => order._id === expandedRow)
                .map((order) => (
                  <div key={order._id}>
                    <h3 className="font-semibold mb-3 text-gray-800">
                      Detail Pesanan #{order._id}
                    </h3>
                    <div className="space-y-3">
                      {order.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center bg-white rounded-lg shadow-sm p-3"
                        >
                          <span className="font-medium text-gray-700">
                            {item.name}
                          </span>
                          <span className="text-gray-600 text-sm">
                            {item.qty}x @ Rp{" "}
                            {item.price.toLocaleString("id-ID")}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                      <div>Subtotal: Rp {order.subtotal.toLocaleString("id-ID")}</div>
                      <div>Pajak: Rp {order.tax.toLocaleString("id-ID")}</div>
                      <div className="font-semibold text-gray-800">
                        Total: Rp {order.total.toLocaleString("id-ID")}
                      </div>
                      <div>Status: {getStatusBadge(order.status)}</div>
                      <div className="text-gray-500 text-xs mt-2">
                        Dibuat pada: {new Date(order.createdAt).toLocaleString("id-ID")}
                      </div>
                    </div>
                  </div>
                ))}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
