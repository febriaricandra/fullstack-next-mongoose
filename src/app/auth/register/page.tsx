"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    whatsappNumber: "",
  });
  const [notif, setNotif] = useState("");

  const handleRegister = async () => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setNotif("Registrasi berhasil! Silakan login.");
      setForm({ name: "", email: "", password: "", whatsappNumber: "" });
    } else {
      setNotif("Registrasi gagal! Coba lagi nanti.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg border-none rounded-2xl backdrop-blur-sm bg-white/70">
          <CardHeader className="text-center space-y-3 pt-8">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-extrabold bg-gradient-to-r from-amber-600 to-yellow-700 bg-clip-text text-transparent"
            >
              Daftar Sekarang
            </motion.h1>
            <p className="text-gray-600 text-sm">
              Buat akun dan nikmati layanan <span className="font-medium">Allegra's food</span>
            </p>
          </CardHeader>

          <CardContent className="px-8 pb-10">
            {notif && (
              <div
                className={`mb-4 p-2 text-sm text-center rounded ${
                  notif.includes("berhasil")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {notif}
              </div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                placeholder="Contoh: Budi Santoso"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className="border border-gray-300 px-3 py-2 rounded-md w-full mb-3 focus:ring-2 focus:ring-amber-500 outline-none"
              />

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                className="border border-gray-300 px-3 py-2 rounded-md w-full mb-3 focus:ring-2 focus:ring-amber-500 outline-none"
              />

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nomor WhatsApp
              </label>
              <input
                type="text"
                placeholder="08xxxxxxxxxx"
                value={form.whatsappNumber}
                onChange={(e) =>
                  setForm((f) => ({ ...f, whatsappNumber: e.target.value }))
                }
                className="border border-gray-300 px-3 py-2 rounded-md w-full mb-3 focus:ring-2 focus:ring-amber-500 outline-none"
              />

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
                className="border border-gray-300 px-3 py-2 rounded-md w-full mb-6 focus:ring-2 focus:ring-amber-500 outline-none"
              />

              <Button
                variant="default"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 rounded-md transition"
                onClick={handleRegister}
              >
                Register
              </Button>

              <div className="mt-4 text-center text-sm text-gray-600">
                Sudah punya akun?{" "}
                <a
                  href="/auth/login"
                  className="text-amber-700 font-semibold hover:underline"
                >
                  Login di sini
                </a>
              </div>
            </motion.div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} Allegra's food. Semua hak dilindungi.
        </p>
      </motion.div>
    </div>
  );
}
