"use client";
import Link from "next/link";
import { useState } from "react";

interface NavbarProps {
  onSearch: (query: string) => void;
  onMenuClick: () => void; // Tambahkan prop baru
}

export default function Navbar({ onSearch, onMenuClick }: NavbarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Mengirim query pencarian ke halaman utama
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* Tombol Hamburger untuk Mobile */}
        <button onClick={onMenuClick} className="p-2 hover:bg-gray-100 rounded-lg md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-orange-600 flex-shrink-0">
          AFFILIATE<span className="text-gray-800">MATE</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md relative">
          <input
            type="text"
            placeholder="Cari produk impianmu..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-gray-100 border-none rounded-full py-2 px-10 focus:ring-2 focus:ring-orange-500 transition-all outline-none"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Menu Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gray-600 hover:text-orange-600 font-medium">Katalog</Link>
          <Link href="/admin" className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black transition-colors">
            Admin Panel
          </Link>
        </div>
      </div>
    </nav>
  );
}
