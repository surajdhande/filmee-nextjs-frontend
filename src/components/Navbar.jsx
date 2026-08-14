"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, Bell, Menu, X } from "lucide-react";
import AuthButton from "./AuthButton";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-[999] w-full border-b border-zinc-800 bg-black/95 backdrop-blur-md">
      <div className="flex h-16 sm:h-20 w-full items-center justify-between px-4 sm:px-8 lg:px-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/logo.png"
            alt="Filmee Logo"
            width={44}
            height={44}
            className="sm:w-[60px] sm:h-[60px]"
            priority
          />
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-none">
            <span className="text-white">Fil</span>
            <span className="text-red-500">m</span>
            <span className="text-white">ee</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-12 text-[15px] font-semibold text-white">
          <Link href="/" className="transition duration-300 hover:text-red-500">Home</Link>
          <Link href="/project-overview" className="transition duration-300 hover:text-red-500">Projects</Link>
          <Link href="/talent-overview" className="transition duration-300 hover:text-red-500">Talent</Link>
          <Link href="/investors" className="transition duration-300 hover:text-red-500">Investors</Link>
          <Link href="/pricing" className="transition duration-300 hover:text-red-500">Pricing</Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <Link href="/search">
            <Search size={20} className="cursor-pointer text-white transition duration-300 hover:text-red-500" />
          </Link>
          <Link href="/notifications">
            <Bell size={20} className="cursor-pointer text-white transition duration-300 hover:text-red-500" />
          </Link>

          {/* Desktop auth buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link href="/login">
              <AuthButton variant="outline">SIGN IN</AuthButton>
            </Link>
            <Link href="/signup">
              <AuthButton>JOIN NOW</AuthButton>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-1 text-white"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}