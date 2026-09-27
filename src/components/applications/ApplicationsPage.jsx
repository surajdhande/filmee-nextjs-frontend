"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getFilmmakerInvestments,
  updateInvestmentStatus,
} from "@/services/investmentService";
import { getApiErrorMessage } from "@/lib/apiClient";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

import ApplicationsFilters, { statuses, STATUS_TO_API } from "./ApplicationsFilters";
import EmptyApplications from "./EmptyApplications";
import FilmmakerTalentApplications from "./FilmmakerTalentApplications";

function normalizeStatus(status) {
  return (status || "PENDING").toUpperCase();
}

export default function ApplicationsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "talent" ? "talent" : "investors";
  const [applicationTab, setApplicationTab] = useState(initialTab);

  const [user, setUser] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeStatus, setActiveStatus] = useState("All");
  const [selectedProjectId, setSelectedProjectId] = useState("all");
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const loadInvestments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getFilmmakerInvestments();
      setInvestments(data.investments || []);
    } catch (err) {
      console.error("Error fetching investments:", err);
      setError(getApiErrorMessage(err));
      setInvestments([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const tab = searchParams.get("tab") === "talent" ? "talent" : "investors";
    setApplicationTab(tab);
  }, [searchParams]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
    if (applicationTab === "investors") {
      loadInvestments();
    }
  }, [router, loadInvestments, applicationTab]);

  const switchTab = (tab) => {
    setApplicationTab(tab);
    const query = tab === "talent" ? "?tab=talent" : "";
    router.replace(`/dashboard/filmmaker/applications${query}`, { scroll: false });
  };

  const projectOptions = useMemo(() => {
    const map = new Map();
    investments.forEach((inv) => {
      if (!map.has(inv.project_id)) {
        map.set(inv.project_id, inv.project_title);
      }
    });
    return Array.from(map.entries()).map(([id, title]) => ({ id, title }));
  }, [investments]);

  const statusCounts = useMemo(() => {
    const counts = {
      All: investments.length,
      Pending: 0,
      Negotiating: 0,
      Agreed: 0,
      Declined: 0,
    };
    investments.forEach((inv) => {
      const s = normalizeStatus(inv.investment_status);
      if (s === "PENDING") counts.Pending += 1;
      else if (s === "UNDER_REVIEW") counts.Negotiating += 1;
      else if (s === "ACCEPTED") counts.Agreed += 1;
      else if (s === "DECLINED") counts.Declined += 1;
    });
    return counts;
  }, [investments]);

  const filtered = useMemo(() => {
    return investments.filter((inv) => {
      if (selectedProjectId !== "all" && String(inv.project_id) !== selectedProjectId) {
        return false;
      }
      if (activeStatus === "All") return true;
      const apiStatus = STATUS_TO_API[activeStatus];
      return normalizeStatus(inv.investment_status) === apiStatus;
    });
  }, [investments, activeStatus, selectedProjectId]);

  async function handleStatusUpdate(investmentId, status) {
    try {
      setActionLoadingId(investmentId);
      await updateInvestmentStatus(investmentId, status);
      await loadInvestments();
    } catch (err) {
      alert(getApiErrorMessage(err));
    } finally {
      setActionLoadingId(null);
    }
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <DashboardLayout
      header={
        <DashboardHeader
          username={`${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim()}
          showOverviewTitle={false}
          showAnalyticsButton={false}
          showCreateButton={false}
        />
      }
    >
      <div className="mx-auto max-w-[1080px] px-8 py-6">

        <div className="mb-8 flex items-start justify-between">

          <div>

            <h1 className="text-[28px] font-bold text-white">
              Applications
            </h1>

            <p className="mt-2 text-gray-400">
              Review investor offers and talent role applications
            </p>

          </div>

          {applicationTab === "investors" && (
            <div className="rounded-full border border-[#E50914] px-4 py-1 text-sm font-semibold text-[#E50914]">
              {investments.length} total
            </div>
          )}

        </div>

        <div className="mb-8 flex gap-2 rounded-full border border-[#2A2A2A] bg-[#141414] p-1 w-fit">
          <button
            type="button"
            onClick={() => switchTab("investors")}
            className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider ${
              applicationTab === "investors"
                ? "bg-[#E50914] text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Investors
          </button>
          <button
            type="button"
            onClick={() => switchTab("talent")}
            className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider ${
              applicationTab === "talent"
                ? "bg-[#E50914] text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Talent
          </button>
        </div>

        {applicationTab === "talent" ? (
          <FilmmakerTalentApplications />
        ) : (
          <>
        <ApplicationsFilters
          activeStatus={activeStatus}
          onStatusChange={setActiveStatus}
          statusCounts={statusCounts}
          projectOptions={projectOptions}
          selectedProjectId={selectedProjectId}
          onProjectChange={setSelectedProjectId}
        />

        <div className="mt-8">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-[#E50914] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center py-12 text-red-400">
              {error}
            </div>
          )}

          {!loading && !error && filtered.length === 0 && <EmptyApplications />}

          {!loading && !error && filtered.length > 0 && (
            <div className="space-y-4">
              {filtered.map((inv) => {
                const status = normalizeStatus(inv.investment_status);
                return (
                <div
                  key={inv.investment_id}
                  className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">
                        {inv.first_name} {inv.last_name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">{inv.email}</p>
                      <p className="text-sm text-gray-400 mb-2">
                        Project: <span className="text-white font-semibold">{inv.project_title}</span>
                      </p>
                      {inv.investment_amount != null && (
                        <p className="text-lg font-bold text-[#E50914] mb-2">
                          Investment: ${Number(inv.investment_amount).toLocaleString()}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          status === "PENDING"
                            ? "bg-yellow-500/10 text-yellow-500"
                            : status === "ACCEPTED"
                            ? "bg-green-500/10 text-green-500"
                            : status === "DECLINED"
                            ? "bg-red-500/10 text-red-500"
                            : "bg-blue-500/10 text-blue-500"
                        }`}
                      >
                        {status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(inv.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  {status === "PENDING" && (
                    <div className="flex gap-3 mt-4 pt-4 border-t border-[#2A2A2A]">
                      <button
                        type="button"
                        disabled={actionLoadingId === inv.investment_id}
                        onClick={() => handleStatusUpdate(inv.investment_id, "ACCEPTED")}
                        className="flex-1 bg-[#E50914] text-white font-bold py-2 rounded-lg hover:bg-[#B3070F] transition disabled:opacity-50"
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        disabled={actionLoadingId === inv.investment_id}
                        onClick={() => handleStatusUpdate(inv.investment_id, "DECLINED")}
                        className="flex-1 border border-gray-600 text-gray-300 font-bold py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              );
              })}
            </div>
          )}
        </div>
          </>
        )}

      </div>
    </DashboardLayout>
  );
}
