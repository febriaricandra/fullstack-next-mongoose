"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [step, setStep] = useState(1);
  const [notif, setNotif] = useState("");
  const [otp, setOtp] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setStep(2);
      setNotif("");
    } else {
      setNotif("Email atau password salah!");
    }
  };

  const handleMfa = async () => {
    const res = await fetch("/api/auth/mfa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email, otp }),
    });
    if (res.ok) {
      const data = await res.json();
      setNotif("Login berhasil!");
      document.cookie = `user=${encodeURIComponent(
        JSON.stringify(data.user)
      )}; path=/`;
      if (data.user.role === "admin") {
        window.location.href = "/admin";
        return;
      }
      window.location.href = "/products";
    } else {
      setNotif("Kode OTP salah!");
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
              Selamat Datang
            </motion.h1>
            <p className="text-gray-600 text-sm">
              Masuk untuk melanjutkan ke <span className="font-medium">Allegra's food</span>
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

            {step === 1 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
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
                  className="border border-gray-300 px-3 py-2 rounded-md w-full mb-4 focus:ring-2 focus:ring-amber-500 outline-none"
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
                  onClick={handleLogin}
                >
                  Login
                </Button>

                <div className="mt-4 text-center text-sm text-gray-600">
                  Belum punya akun?{" "}
                  <a
                    href="/auth/register"
                    className="text-amber-700 font-semibold hover:underline"
                  >
                    Register di sini
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Masukkan Kode OTP
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="border border-gray-300 px-3 py-2 rounded-md w-full mb-6 focus:ring-2 focus:ring-amber-500 outline-none"
                />

                <Button
                  variant="default"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 rounded-md transition"
                  onClick={handleMfa}
                >
                  Verifikasi OTP
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} Allegra's Food. Semua hak dilindungi.
        </p>
      </motion.div>
    </div>
  );
}
