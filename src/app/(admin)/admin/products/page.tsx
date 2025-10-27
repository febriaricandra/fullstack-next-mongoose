"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit">("add");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data || []);
        setLoading(false);
      });
  }, []);

  const openAddModal = () => {
    setForm({ name: "", description: "", price: "" });
    setEditId(null);
    setModalType("add");
    setModalOpen(true);
  };

  const openEditModal = (product: any) => {
    setEditId(product._id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
    });
    setModalType("edit");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setForm({ name: "", description: "", price: "" });
    setEditId(null);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Gagal menghapus produk");

      setProducts(products.filter((p: any) => p._id !== id));
      setShowDeleteAlert(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    const body = { ...form, price: Number(form.price) };

    if (modalType === "edit" && editId) {
      await fetch(`/api/products/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }
    closeModal();
    location.reload();
  };

  if (loading) return <div className="p-8 text-gray-500">Loading...</div>;

  // Columns
  const columns = [
    {
      accessorKey: "name",
      header: "Nama Produk",
    },
    {
      accessorKey: "description",
      header: "Deskripsi",
    },
    {
      accessorKey: "price",
      header: "Harga",
      cell: (info: any) => `Rp ${Number(info.getValue()).toLocaleString()}`,
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }: any) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 hover:bg-blue-50"
            onClick={() => openEditModal(row.original)}
          >
            <Edit className="h-4 w-4 text-blue-500" /> Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 hover:bg-red-50"
            onClick={() => {
              setDeleteId(row.original._id);
              setShowDeleteAlert(true);
            }}
          >
            <Trash2 className="h-4 w-4 text-red-500" /> Hapus
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            🛍️ Manajemen Produk
          </h1>
          <Button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition"
          >
            <Plus className="h-4 w-4" /> Tambah Produk
          </Button>
        </div>

        <Card className="border-none shadow-md bg-white/70 backdrop-blur rounded-2xl transition-all hover:shadow-lg">
          <CardHeader>
            <h2 className="font-semibold text-lg text-slate-700">
              Daftar Produk
            </h2>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={products} />
          </CardContent>
        </Card>
      </div>

      {/* Dialog Add/Edit */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md bg-white/90 backdrop-blur border-none shadow-xl rounded-xl">
          <DialogTitle className="text-xl font-bold mb-2">
            {modalType === "add" ? "Tambah Produk" : "Edit Produk"}
          </DialogTitle>
          <div className="space-y-4">
            <div>
              <Label>Nama Produk</Label>
              <Input
                placeholder="Nama produk..."
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>Deskripsi</Label>
              <Input
                placeholder="Deskripsi..."
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>Harga</Label>
              <Input
                type="number"
                placeholder="0"
                value={form.price}
                onChange={(e) =>
                  setForm((f) => ({ ...f, price: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={closeModal}>
              Batal
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              {modalType === "add" ? "Tambah" : "Simpan"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Alert Delete */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent className="bg-white/90 backdrop-blur border-none rounded-xl shadow-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Produk?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Produk akan dihapus secara
              permanen dari sistem.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteAlert(false)}>
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => deleteId && handleDelete(deleteId)}
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
