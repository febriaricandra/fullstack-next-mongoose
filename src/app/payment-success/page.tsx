"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { external_id?: string };
}) {
  const externalId = searchParams?.external_id;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-white px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="max-w-md w-full"
      >
        <Card className="shadow-lg border-none bg-white/80 backdrop-blur-md">
          <CardHeader className="flex flex-col items-center text-center">
            <motion.div
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CheckCircle2 className="w-16 h-16 text-green-600 mb-4" />
            </motion.div>
            <h1 className="text-3xl font-bold text-green-600 mb-2">
              Pembayaran Berhasil!
            </h1>
            <p className="text-gray-600">
              Terima kasih, pembayaran Anda telah diproses dengan sukses.
            </p>
          </CardHeader>
          <CardContent className="text-center">
            {externalId && (
              <p className="text-sm text-gray-500 mb-4">
                ID Transaksi: <span className="font-medium">{externalId}</span>
              </p>
            )}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/products">
                <Button className="bg-green-600 hover:bg-green-700 text-white w-full rounded-xl shadow">
                  Kembali ke Produk
                </Button>
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 text-gray-500 text-sm"
      >
        Anda akan menerima konfirmasi melalui WhatsApp segera.
      </motion.p>
    </div>
  );
}
