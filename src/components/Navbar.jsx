"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, Bell } from "lucide-react";
import AuthButton from "./AuthButton";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-[999] w-full border-b border-zinc-800 bg-black/95 backdrop-blur-md">
      <div className="flex h-20 w-full items-center justify-between px-16">

        {/* Logo */}
        <Link
            href="/"
            className="flex items-center gap-3"
            >
            <Image
                src="/logo.png"
                alt="Filmee Logo"
                width={60}
                height={60}
                priority
            />

            <div className="text-3xl font-extrabold tracking-tight leading-none">
                <span className="text-white">Fil</span>
                <span className="text-red-500">m</span>
                <span className="text-white">ee</span>
                </div>
            </Link>

        {/* Navigation */}
        <div className="hidden lg:flex items-center gap-12 text-[15px] font-semibold text-white">
          <Link
            href="/"
            className="transition duration-300 hover:text-red-500"
          >
            Home
          </Link>

          <Link
            href="/project-overview"
            className="transition duration-300 hover:text-red-500"
          >
            Projects
          </Link>

          <Link
            href="/talent-overview"
            className="transition duration-300 hover:text-red-500"
          >
            Talent
          </Link>

          <Link
            href="/"
            className="transition duration-300 hover:text-red-500"
          >
            Investors
          </Link>

          <Link
            href="/pricing"
            className="transition duration-300 hover:text-red-500"
          >
            Pricing
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <Link href="/search">
            <Search
              size={22}
              className="cursor-pointer text-white transition duration-300 hover:text-red-500"
            />
          </Link>

          <Link href="/notifications">
            <Bell
              size={22}
              className="cursor-pointer text-white transition duration-300 hover:text-red-500"
            />
          </Link>

          <Link href="/login">
            <AuthButton variant="outline">
              SIGN IN
            </AuthButton>
          </Link>

          <Link href="/signup">
            <AuthButton>
              JOIN NOW
            </AuthButton>
          </Link>

        </div>
      </div>
    </nav>
  );
}