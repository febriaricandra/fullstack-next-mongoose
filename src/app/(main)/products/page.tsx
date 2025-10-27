"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/cart";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notif, setNotif] = useState<{ show: boolean; name: string }>({
    show: false,
    name: "",
  });

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data || []);
        setLoading(false);
      });
  }, []);

  const handleAdd = (product: any) => {
    addToCart(product);
    setNotif({ show: true, name: product.name });
    setTimeout(() => setNotif({ show: false, name: "" }), 2000);
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-8 relative">
      <h1 className="text-3xl font-bold mb-8 text-center">🛍️ Daftar Produk</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <Card
            key={product._id}
            className="group overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 bg-white border border-gray-100"
          >
            {/* Gambar produk */}
            <div className="relative w-full h-56 overflow-hidden">
              <Image
                src={product.image || "/placeholder.png"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 text-xs font-medium rounded-md text-gray-700">
                Rp {product.price.toLocaleString()}
              </div>
            </div>

            {/* Isi card */}
            <CardContent className="p-4 flex flex-col flex-1 justify-between">
              <div>
                <h2 className="font-semibold text-lg line-clamp-1 mb-1">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {product.description}
                </p>
              </div>

              <Button
                onClick={() => handleAdd(product)}
                className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors duration-200"
              >
                + Tambah ke Keranjang
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Popup notifikasi */}
      {notif.show && (
        <div
          className="fixed bottom-5 right-5 z-50 w-fit max-w-xs
          bg-white border border-gray-200 rounded-xl shadow-lg 
          px-5 py-3 text-sm text-gray-800
          animate-in slide-in-from-bottom fade-in duration-200"
        >
          <div className="flex items-start gap-2">
            <span className="text-green-600 text-lg">✅</span>
            <div>
              <p className="font-semibold">Ditambahkan ke keranjang!</p>
              <p className="text-xs text-gray-600">{notif.name}</p>
              <Link href="/cart">
                <Button
                  size="sm"
                  className="mt-2 h-6 px-2 text-xs"
                  variant="default"
                >
                  Lihat Keranjang
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
