"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCart, removeFromCart, clearCart, addToCart } from "@/lib/cart";
import { Trash2, ShoppingBag, Plus, Minus } from "lucide-react";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleRemove = (id: string) => {
    removeFromCart(id);
    setCart(getCart());
  };

  const handleClear = () => {
    clearCart();
    setCart([]);
  };

  const handleIncrease = (product: any) => {
    addToCart(product);
    setCart(getCart());
  };

  const handleDecrease = (product: any) => {
    const updated = cart
      .map((item) => {
        if (item._id === product._id) {
          return { ...item, qty: item.qty - 1 };
        }
        return item;
      })
      .filter((item) => item.qty > 0);

    localStorage.setItem("cart", JSON.stringify(updated));
    setCart(updated);
  };

  const handleCheckout = async () => {
    const external_id = `order-${Date.now()}`;

    const userCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user="));

    let email = "guest@edushop.com";
    if (userCookie) {
      try {
        const userData = JSON.parse(decodeURIComponent(userCookie.split("=")[1]));
        email = userData.email || "guest@edushop.com";
      } catch (e) {
        console.error("Error parsing user cookie:", e);
      }
    }

    const amount = cart.reduce((sum, p) => sum + p.price * p.qty, 0);
    const items = cart.map((item) => ({
      productId: item._id,
      name: item.name,
      quantity: item.qty,
      price: item.price,
    }));

    const res = await fetch("/api/payment/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ external_id, email, amount, items }),
    });

    if (res.ok) {
      const data = await res.json();
      window.location.href = data.invoice_url;
    }
  };

  const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <ShoppingBag className="w-7 h-7 text-blue-600" /> Keranjang Belanja
      </h1>

      {cart.length === 0 ? (
        <Card className="p-10 text-center border-dashed border-2 border-gray-200 bg-gray-50">
          <p className="text-gray-500 text-lg mb-4">Keranjang kamu kosong 😢</p>
          <Link href="/products">
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
              Belanja Sekarang
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* List Produk */}
          <div className="lg:col-span-2 space-y-5">
            {cart.map((item) => (
              <Card
                key={item._id}
                className="flex flex-col sm:flex-row items-center sm:items-start overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                {/* Gambar produk */}
                <div className="relative w-full sm:w-32 h-32 bg-gray-100">
                  <Image
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Detail */}
                <CardContent className="flex-1 w-full p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="font-semibold text-lg line-clamp-1">
                      {item.name}
                    </h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-red-500"
                      onClick={() => handleRemove(item._id)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>

                  <p className="text-gray-500 text-sm mb-2 line-clamp-2">
                    {item.description || "Tanpa deskripsi."}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="text-blue-600 font-semibold">
                      Rp {item.price.toLocaleString()}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8"
                        onClick={() => handleDecrease(item)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">
                        {item.qty}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8"
                        onClick={() => handleIncrease(item)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="text-right text-gray-600 text-sm mt-2">
                    Subtotal:{" "}
                    <span className="font-semibold text-gray-800">
                      Rp {(item.price * item.qty).toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Ringkasan Pesanan */}
          <div>
            <Card className="shadow-md border border-gray-100 sticky top-24">
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-800">
                  Ringkasan Pesanan
                </h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Total Item</span>
                  <span>{cart.length}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Total Harga</span>
                  <span className="font-semibold text-gray-800">
                    Rp {total.toLocaleString()}
                  </span>
                </div>

                <hr className="my-3" />

                <div className="flex flex-col gap-3">
                  <Button
                    variant="default"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm"
                    onClick={handleCheckout}
                  >
                    Lanjut ke Pembayaran
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-gray-700"
                    onClick={handleClear}
                  >
                    Kosongkan Keranjang
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
