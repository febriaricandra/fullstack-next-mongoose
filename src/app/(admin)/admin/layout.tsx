"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Bell, Settings, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CustomSidebar } from "@/components/ui/custom-sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      {/* Sidebar Modern */}
      <CustomSidebar />

      {/* Main Section */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <header className="h-16 bg-white/70 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30 shadow-sm">
          <div className="text-xl font-semibold tracking-tight">
            Allegra's Food Dashboard
          </div>

          <div className="flex items-center space-x-4">

            {/* Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 focus:outline-none">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                    A
                  </div>
                  <span className="font-medium hidden sm:inline">Admin</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 mt-2 mr-2" align="end">
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 focus:text-red-700"
                  onClick={() => {
                    document.cookie =
                      "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    window.location.href = "/auth/login";
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-6xl mx-auto"
          >
            {children}
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="h-14 bg-white/60 backdrop-blur-md border-t border-gray-200 flex items-center justify-center text-sm text-gray-500">
          © {new Date().getFullYear()} Allegra's Food Admin — Built with ❤️
        </footer>
      </div>
    </div>
  );
}
