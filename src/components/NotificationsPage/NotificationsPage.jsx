"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import { getNotifications } from "@/services/platformService";
import { getApiErrorMessage } from "@/lib/apiClient";

export default function NotificationsPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token || !user) {
      setAuthed(false);
      setLoading(false);
      return;
    }
    setAuthed(true);
    getNotifications()
      .then(setItems)
      .catch((e) => setError(getApiErrorMessage(e)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="mx-auto max-w-3xl px-6 pt-32 pb-20 md:px-16">
        <div className="mb-10 flex items-start gap-4">
          <button
            onClick={() => router.back()}
            className="mt-1 text-zinc-400 hover:text-white transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={22} />
          </button>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Notifications</h1>
            <p className="mt-1.5 text-sm text-zinc-400">
              Updates on investments, applications, and messages
            </p>
          </div>
        </div>

        {!authed && (
          <div className="rounded-2xl border border-zinc-800 bg-[#0d0d0e]/60 p-10 text-center">
            <h2 className="text-xl font-bold mb-3">Sign In Required</h2>
            <p className="text-zinc-400 text-sm mb-8">
              Please sign in to view your notifications.
            </p>
            <Link href="/login">
              <button className="w-full max-w-xs py-4 rounded-xl bg-red-600 font-bold uppercase text-xs">
                Sign in
              </button>
            </Link>
          </div>
        )}

        {authed && loading && (
          <p className="text-zinc-500 text-center py-12">Loading…</p>
        )}

        {authed && error && (
          <p className="text-red-400 text-center py-12">{error}</p>
        )}

        {authed && !loading && !error && items.length === 0 && (
          <p className="text-zinc-500 text-center py-12">No notifications yet.</p>
        )}

        {authed && !loading && items.length > 0 && (
          <ul className="space-y-3">
            {items.map((n) => (
              <li
                key={n.id}
                className="rounded-xl border border-zinc-800 bg-[#141414] px-5 py-4"
              >
                <p className="font-semibold text-white">{n.title}</p>
                {n.body ? (
                  <p className="text-sm text-zinc-400 mt-1">{n.body}</p>
                ) : null}
                {n.at ? (
                  <p className="text-xs text-zinc-600 mt-2">
                    {new Date(n.at).toLocaleString()}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
