"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-white">
      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4"
        >
          Nikmati <span className="text-amber-600">Natea Coffee</span>  
          <br />Teman Sempurna di Setiap Hari
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 max-w-xl mb-8"
        >
          Rasakan kenikmatan kopi terbaik dari biji pilihan, diseduh dengan cinta,  
          dan siap dipesan langsung dari aplikasi kami.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            href="/products"
            className="bg-amber-600 text-white px-8 py-3 rounded-full font-medium shadow hover:bg-amber-700 transition"
          >
            Mulai Pesan Sekarang
          </Link>
        </motion.div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Menu Favorit Kami
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                name: "Cappuccino",
                img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
              },
              {
                name: "Espresso",
                img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
              },
              {
                name: "Caramel Latte",
                img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <Image
                  src={item.img}
                  alt={item.name}
                  width={600}
                  height={400}
                  className="w-full h-60 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">Nikmati rasa khas terbaik kami</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-amber-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Siap Menemani Harimu?</h2>
        <p className="mb-6 text-white/90">
          Pesan sekarang dan nikmati sensasi menu dari Allegra's food langsung di sini.
        </p>
        <Link
          href="/auth/login"
          className="bg-white text-amber-700 px-8 py-3 rounded-full font-semibold shadow hover:bg-gray-100 transition"
        >
          Login untuk Mulai
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} Allegra's food. Semua hak dilindungi.
      </footer>
    </div>
  );
}
