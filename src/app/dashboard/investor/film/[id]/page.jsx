"use client";

import FilmDetailPage from "@/components/dashboard/investor/FilmDetailPage";
import { use } from "react";

export default function FilmDetailRoute({ params }) {
  // In Next.js App Router, params is a Promise in newer versions — use `use()` to unwrap.
  const { id } = use(params);

  // ── BACKEND INTEGRATION (Server-side option) ──────────────────────────────
  // If you prefer server-side data fetching, convert this to an async Server
  // Component and pass `film` as a prop to FilmDetailPage:
  //
  //   const res = await fetch(`http://127.0.0.1:5000/films/${id}`, {
  //     cache: "no-store",          // always fresh
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   const film = await res.json();
  //   return <FilmDetailPage filmId={id} film={film} />;
  //
  // For now, FilmDetailPage fetches data client-side using filmId.
  // ─────────────────────────────────────────────────────────────────────────

  return <FilmDetailPage filmId={id} />;
}
