"use client";
import { useState, useEffect, useCallback } from "react";

interface Product {
  id: number;
  name: string;
  price_discount: number | string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    name: "", price_original: "", price_discount: "",
    image_url: "", affiliate_link: "", category: "", source_marketplace: "Shopee"
  });

  const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY; // Sesuaikan dengan .env backend
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

  

  // Load produk untuk daftar hapus
  const fetchProducts = useCallback(() => {
    fetch(`${API_URL}/products`).then(res => res.json()).then(setProducts);
  }, [API_URL]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": ADMIN_KEY as string },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Produk berhasil ditambah!");
      setForm({ name: "", price_original: "", price_discount: "", image_url: "", affiliate_link: "", category: "", source_marketplace: "Shopee" });
      fetchProducts();
    }
  };

  const handleDelete = async (id: number) => {

    if (confirm("Yakin hapus produk ini?")) {
      await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
        headers: { "x-api-key": ADMIN_KEY as string },
      });
      fetchProducts();
    }

    
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* FORM TAMBAH PRODUK */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-10 grid grid-cols-2 gap-4">
        <h2 className="col-span-2 text-xl font-semibold border-b pb-2">Tambah Produk Baru</h2>
        <input type="text" placeholder="Nama Produk" className="border p-2 rounded" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
        <input type="text" placeholder="Kategori" className="border p-2 rounded" value={form.category} onChange={e => setForm({...form, category: e.target.value})} required />
        <input type="number" placeholder="Harga Asli" className="border p-2 rounded" value={form.price_original} onChange={e => setForm({...form, price_original: e.target.value})} required />
        <input type="number" placeholder="Harga Diskon" className="border p-2 rounded" value={form.price_discount} onChange={e => setForm({...form, price_discount: e.target.value})} required />
        <input type="text" placeholder="URL Gambar" className="border p-2 rounded" value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} required />
        <input type="text" placeholder="Link Affiliate" className="border p-2 rounded" value={form.affiliate_link} onChange={e => setForm({...form, affiliate_link: e.target.value})} required />
        <select className="border p-2 rounded" value={form.source_marketplace} onChange={e => setForm({...form, source_marketplace: e.target.value})}>
          <option value="Shopee">Shopee</option>
          <option value="Tokopedia">Tokopedia</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700">Simpan Produk</button>
      </form>

      {/* DAFTAR PRODUK (UNTUK DELETE) */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Nama Produk</th>
              <th className="p-4">Harga</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-4 truncate max-w-[200px]">{p.name}</td>
                <td className="p-4 text-orange-600 font-bold">Rp {Number(p.price_discount).toLocaleString()}</td>
                <td className="p-4">
                  <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:underline">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
