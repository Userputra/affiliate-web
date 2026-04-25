"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Product {
  id: number | string;
  name: string;
  category: string;
  source_marketplace: string;
  image_url: string;
  price_original: number;
  price_discount: number;
  affiliate_link: string;
}

export default function ProductDetail() {
  const { id } = useParams();
  const productId = Array.isArray(id) ? id[0] : id;
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      fetch(`${API_URL}/products`)
        .then((res) => res.json())
        .then((data: Product[]) => {
          // Mencari produk yang spesifik berdasarkan ID
          const found = data.find((p) => p.id.toString() === productId);
          setProduct(found ?? null);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [productId, API_URL]);

  if (loading) return <div className="p-10 text-center">Memuat detail produk...</div>;
  if (!product) return <div className="p-10 text-center">Produk tidak ditemukan.</div>;

  return (
    <div className="min-h-screen bg-white p-4 md:p-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Bagian Kiri: Gambar */}
        <div className="rounded-2xl overflow-hidden bg-gray-100">
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="w-full h-full object-contain aspect-square"
          />
        </div>

        {/* Bagian Kanan: Info */}
        <div className="flex flex-col justify-center">
          <nav className="text-sm text-gray-500 mb-4 uppercase tracking-widest">
            {product.category} | {product.source_marketplace}
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="bg-orange-50 p-6 rounded-2xl mb-6">
            <p className="text-gray-500 line-through text-lg">
              Rp {Number(product.price_original).toLocaleString('id-ID')}
            </p>
            <p className="text-4xl font-black text-orange-600">
              Rp {Number(product.price_discount).toLocaleString('id-ID')}
            </p>
            <p className="text-sm text-orange-400 mt-1 font-medium">
              Hemat Rp {(product.price_original - product.price_discount).toLocaleString('id-ID')}!
            </p>
          </div>

          <a 
            href={product.affiliate_link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 hover:bg-orange-600 text-white text-center py-4 rounded-xl text-xl font-bold transition-transform active:scale-95 shadow-lg shadow-orange-200"
          >
            Beli Sekarang di {product.source_marketplace}
          </a>
          
          <p className="text-gray-400 text-xs mt-4 text-center">
            *Anda akan diarahkan ke aplikasi {product.source_marketplace} melalui link affiliate.
          </p>
        </div>
      </div>
    </div>
  );
}
