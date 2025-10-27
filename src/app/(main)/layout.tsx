"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import "@/styles/globals.css";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Store, LogIn, Home, Menu } from "lucide-react";

function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookie = document.cookie.split("; ").find((row) => row.startsWith("user="));
      if (cookie) {
        try {
          setUser(JSON.parse(decodeURIComponent(cookie.split("=")[1])));
        } catch {}
      }
    }
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl text-blue-600 flex items-center gap-2">
          <Store className="w-5 h-5 text-blue-600" />
          <span>Allegra's food</span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <Link href="/" className="hover:text-blue-600 transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" /> Home
          </Link>
          <Link href="/products" className="hover:text-blue-600 transition-colors flex items-center gap-1">
            <Store className="w-4 h-4" /> Produk
          </Link>
          <Link href="/cart" className="hover:text-blue-600 transition-colors flex items-center gap-1">
            <ShoppingCart className="w-4 h-4" /> Keranjang
          </Link>
        </div>

        {/* User Section */}
        <div className="flex items-center gap-3">
          {!user ? (
            <Link href="/auth/login">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <LogIn className="w-4 h-4" />
                Login
              </Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <Avatar className="cursor-pointer border border-gray-200">
                  <AvatarFallback>{user.name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="font-semibold">{user.name}</DropdownMenuItem>
                {user?.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin/products" className="text-red-600">
                      Dashboard Admin
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/auth/logout" className="text-blue-600">
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-sm">
          <div className="flex flex-col px-4 py-3 gap-2 text-gray-700 font-medium">
            <Link href="/" className="hover:text-blue-600 flex items-center gap-2">
              <Home className="w-4 h-4" /> Home
            </Link>
            <Link href="/products" className="hover:text-blue-600 flex items-center gap-2">
              <Store className="w-4 h-4" /> Produk
            </Link>
            <Link href="/cart" className="hover:text-blue-600 flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" /> Keranjang
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-gray-50 min-h-screen">
        <Navbar />
        <main className="max-w-6xl mx-auto py-8 px-4">{children}</main>
      </body>
    </html>
  );
}
