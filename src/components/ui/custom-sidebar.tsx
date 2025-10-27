"use client";

import { motion } from "framer-motion";
import { Home, Package, Users, ShoppingCart, BarChart3 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CustomSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const menus = [
    { name: "Dashboard", icon: Home, href: "/admin" },
    { name: "Produk", icon: Package, href: "/admin/products" },
    { name: "Pengguna", icon: Users, href: "/admin/users" },
    { name: "Transaksi", icon: ShoppingCart, href: "/admin/transactions" },
  ];

  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`h-screen sticky top-0 flex flex-col bg-gradient-to-b from-blue-600 via-indigo-700 to-purple-700 text-white shadow-xl border-r border-white/10 ${
        collapsed ? "w-20" : "w-64"
      } transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        {!collapsed && (
          <h1 className="text-lg font-bold tracking-wide">Allegra Admin</h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
          onClick={() => setCollapsed(!collapsed)}
        >
          <motion.div
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5" />
            </svg>
          </motion.div>
        </Button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20">
        {menus.map((menu) => (
          <Link key={menu.name} href={menu.href}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition"
            >
              <menu.icon className="w-5 h-5" />
              {!collapsed && <span>{menu.name}</span>}
            </motion.div>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 text-xs text-white/70">
        {!collapsed && (
          <p>
            © {new Date().getFullYear()} <br /> Allegra Food
          </p>
        )}
      </div>
    </motion.aside>
  );
}
