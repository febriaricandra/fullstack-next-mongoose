"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data || []);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="p-8 text-center text-gray-500 animate-pulse">
        Memuat data pengguna...
      </div>
    );

  // Filter pencarian
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      accessorKey: "name",
      header: "Nama Lengkap",
      cell: (info: any) => (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
            {info.row.original.name.charAt(0).toUpperCase()}
          </div>
          <span className="font-medium">{info.getValue()}</span>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (info: any) => (
        <span className="text-gray-600 text-sm">{info.getValue()}</span>
      ),
    },
    {
      accessorKey: "role",
      header: "Peran",
      cell: (info: any) => (
        <Badge
          className={
            info.getValue() === "admin"
              ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-sm"
              : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-sm"
          }
        >
          {info.getValue()}
        </Badge>
      ),
    },
  ];

  return (
    <motion.div
      className="max-w-5xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Manajemen User
          </h1>
          <p className="text-gray-500 text-sm">
            Lihat dan kelola daftar pengguna sistem Anda
          </p>
        </div>
      </div>

      <Card className="border-none shadow-lg rounded-2xl overflow-hidden backdrop-blur-md bg-white/70">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <h2 className="font-semibold text-lg">Daftar Pengguna</h2>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Cari user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredUsers.length > 0 ? (
            <DataTable columns={columns} data={filteredUsers} />
          ) : (
            <div className="text-center py-12 text-gray-500">
              Tidak ada pengguna ditemukan.
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
