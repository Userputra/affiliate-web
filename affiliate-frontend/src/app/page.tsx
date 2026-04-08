"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar"; // Pastikan alias @/ bekerja
import Sidebar from "@/components/Sidebar";

interface Product {
  id: string | number;
  name: string;
  category: string;
  image_url: string;
  price_discount: number | string;
}

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
          setFilteredProducts(data); // Default: tampilkan semua
        }
        setIsLoading(false); // Matikan loading jika data sudah sampai
      })
      .catch((err) => {
        console.error("Gagal:", err);
        setIsLoading(false);
      });
  }, []);

 // Logika Filter gabungan (Kategori + Search)
  useEffect(() => {
    let result = products;

    if (activeCategory !== "Semua") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery) {
      result = result.filter((p) => 
        p.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [searchQuery, activeCategory, products]);

  // Ambil list kategori unik dari data produk
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map((p) => p.category))).filter(Boolean);
    return ["Semua", ...uniqueCategories];
  }, [products]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Navbar onSearch={(query) => setSearchQuery(query)} onMenuClick={() => setIsSidebarOpen(true)} />
       <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      /> 
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Katalog Produk</h1>

        {/* TAB FILTER KATEGORI */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full border transition-all ${
                activeCategory === cat 
                ? "bg-orange-500 text-white border-orange-500" 
                : "bg-white text-gray-600 border-gray-200 hover:border-orange-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {isLoading ? (
            // TAMPILKAN SKELETON JIKA SEDANG LOADING
            [...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                {/* Kotak Gambar Abu-abu */}
                <div className="w-full h-40 bg-gray-200 animate-pulse rounded-lg mb-4"></div>
                {/* Baris Judul Abu-abu */}
                <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mb-2"></div>
                {/* Baris Harga Abu-abu */}
                <div className="h-6 bg-gray-200 animate-pulse rounded w-1/2"></div>
              </div>
            ))
          ) : (
            // TAMPILKAN PRODUK ASLI JIKA LOADING SUDAH SELESAI
            filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 p-4">
                <img src={product.image_url} className="w-full h-40 object-cover rounded-lg" alt={product.name} />
                <h2 className="font-semibold mt-3 text-gray-800 line-clamp-1">{product.name}</h2>
                <p className="text-orange-600 font-bold mt-1">Rp {Number(product.price_discount).toLocaleString('id-ID')}</p>
                <Link href={`/product/${product.id}`}>
                  <button className="w-full bg-orange-500 text-white mt-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition-colors">Lihat Detail</button>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}