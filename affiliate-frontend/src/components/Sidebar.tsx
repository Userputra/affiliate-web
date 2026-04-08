"use client";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}

export default function Sidebar({ isOpen, onClose, categories, activeCategory, onSelectCategory }: SidebarProps) {
  return (
    <>
      {/* Overlay Gelap saat Sidebar terbuka */}
      <div 
        className={`fixed inset-0 bg-black/50 z-60 transition-opacity ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={onClose}
      />

      {/* Konten Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white z-70 shadow-2xl transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold">Menu</h2>
            <button onClick={onClose} className="text-gray-500">✕</button>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Navigasi</p>
              <Link href="/" onClick={onClose} className="block py-2 text-gray-700 hover:text-orange-600">🏠 Home</Link>
              <Link href="/admin" onClick={onClose} className="block py-2 text-gray-700 hover:text-orange-600">🛠 Admin Panel</Link>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Kategori</p>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { onSelectCategory(cat); onClose(); }}
                  className={`block w-full text-left py-2 px-3 rounded-lg mb-1 transition-colors ${activeCategory === cat ? "bg-orange-100 text-orange-600 font-bold" : "text-gray-600 hover:bg-gray-50"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}