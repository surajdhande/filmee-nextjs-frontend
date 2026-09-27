"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Search,
  Bell,
  FileText,
  Users,
  DollarSign,
  Upload,
  CheckCircle2,
} from "lucide-react";

const STEPS = [
  {
    step: 1,
    icon: FileText,
    title: "Project Basics",
    description:
      "Define your title, genre, funding target, logline, and synopsis so investors grasp your story quickly.",
  },
  {
    step: 2,
    icon: Users,
    title: "Production Plan",
    description:
      "Set timeline, locations, audience, and the cast and crew roles you need to execute the shoot.",
  },
  {
    step: 3,
    icon: DollarSign,
    title: "Funding Strategy",
    description:
      "Break down use of funds, expected ROI, and distribution plans to build investor confidence.",
  },
  {
    step: 4,
    icon: Upload,
    title: "Pitch Materials",
    description:
      "Upload your pitch deck, trailer, storyboard, and lookbook to showcase your creative vision.",
  },
];

const BENEFITS = [
  "Reach verified investors actively browsing Filmee projects",
  "Receive structured offers and manage escrow in one place",
  "Attract talent with detailed role requirements",
  "Share a polished public project page when you are ready to launch",
];

function createProjectPath() {
  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (token && user?.role === "FILMMAKER") {
      return "/dashboard/filmmaker/create-project";
    }
  } catch {
    /* ignore */
  }
  return "/signup?role=FILMMAKER";
}

export default function CreateProjectOverviewPage() {
  const router = useRouter();

  const handleStartCreating = () => {
    router.push(createProjectPath());
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="fixed top-0 left-0 z-[999] w-full border-b border-zinc-800 bg-black/95 backdrop-blur-md">
        <div className="flex h-16 sm:h-20 w-full items-center justify-between px-4 sm:px-8 lg:px-16">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/logo.png"
              alt="Filmee Logo"
              width={40}
              height={40}
              className="sm:h-[60px] sm:w-[60px]"
              priority
            />
            <div className="text-xl font-extrabold leading-none tracking-tight sm:text-3xl">
              <span className="text-white">Fil</span>
              <span className="text-red-500">m</span>
              <span className="text-white">ee</span>
            </div>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/search">
              <Search
                size={20}
                className="cursor-pointer text-white transition duration-300 hover:text-red-500"
              />
            </Link>
            <Link href="/notifications">
              <Bell
                size={20}
                className="cursor-pointer text-white transition duration-300 hover:text-red-500"
              />
            </Link>
            <Link href="/login">
              <button
                type="button"
                className="group relative overflow-hidden rounded-full border border-red-600 px-4 py-2 text-xs font-semibold text-red-500 transition-all duration-300 hover:scale-105 sm:px-8 sm:py-3 sm:text-sm"
              >
                <span className="absolute inset-0 -translate-x-full bg-red-600 transition-transform duration-300 group-hover:translate-x-0" />
                <span className="relative z-10 group-hover:text-white">SIGN IN</span>
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-4 pb-20 pt-24 sm:px-8 sm:pt-28 lg:px-16">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm text-zinc-400 transition-colors duration-200 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          Create Your{" "}
          <span className="text-red-500">Film Project</span>
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          Turn your vision into reality. Connect with investors, find talented crew members, and
          bring your story to the world through Filmee&apos;s guided four-step flow.
        </p>

        <button
          type="button"
          onClick={handleStartCreating}
          className="mt-8 rounded-full bg-gradient-to-r from-red-700 to-red-500 px-8 py-3 text-sm font-bold text-white transition-all duration-200 hover:scale-105 hover:brightness-110"
        >
          Start Creating
        </button>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="rounded-2xl border border-zinc-800 bg-[#111111] p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-sm font-bold">
                    {item.step}
                  </span>
                  <Icon size={20} className="text-red-500" />
                </div>
                <h2 className="text-lg font-bold text-white">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-14 rounded-2xl border border-zinc-800 bg-[#111111] p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white">Why list on Filmee?</h2>
          <ul className="mt-6 space-y-4">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-sm text-zinc-300">
                <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-red-500" />
                {benefit}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-zinc-500">
            Already have a filmmaker account?{" "}
            <Link href="/login" className="text-red-400 hover:text-red-300">
              Sign in
            </Link>{" "}
            to continue your draft.
          </p>
        </div>
      </main>
    </div>
  );
}
