"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getFilmmakerTalentApplications,
  updateApplicationStatus,
} from "@/services/applicationService";
import { getApiErrorMessage } from "@/lib/apiClient";

function normalizeStatus(status) {
  return (status || "PENDING").toUpperCase();
}

export default function FilmmakerTalentApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeStatus, setActiveStatus] = useState("All");
  const [selectedProjectId, setSelectedProjectId] = useState("all");
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const loadApplications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getFilmmakerTalentApplications();
      setApplications(data.applications || []);
    } catch (err) {
      setError(getApiErrorMessage(err));
      setApplications([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  const projectOptions = useMemo(() => {
    const map = new Map();
    applications.forEach((app) => {
      if (!map.has(app.project_id)) {
        map.set(app.project_id, app.project_title);
      }
    });
    return Array.from(map.entries()).map(([id, title]) => ({ id, title }));
  }, [applications]);

  const filtered = useMemo(() => {
    return applications.filter((app) => {
      if (
        selectedProjectId !== "all" &&
        String(app.project_id) !== selectedProjectId
      ) {
        return false;
      }
      if (activeStatus === "All") return true;
      if (activeStatus === "Pending") {
        return normalizeStatus(app.status) === "PENDING";
      }
      if (activeStatus === "Accepted") {
        return normalizeStatus(app.status) === "ACCEPTED";
      }
      if (activeStatus === "Declined") {
        return normalizeStatus(app.status) === "DECLINED";
      }
      return true;
    });
  }, [applications, activeStatus, selectedProjectId]);

  async function handleStatusUpdate(applicationId, status) {
    try {
      setActionLoadingId(applicationId);
      await updateApplicationStatus(applicationId, status);
      await loadApplications();
    } catch (err) {
      alert(getApiErrorMessage(err));
    } finally {
      setActionLoadingId(null);
    }
  }

  const statusTabs = ["All", "Pending", "Accepted", "Declined"];

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {statusTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveStatus(tab)}
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                activeStatus === tab
                  ? "bg-[#E50914] text-white"
                  : "border border-[#2A2A2A] text-zinc-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {projectOptions.length > 0 && (
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="rounded-lg border border-[#2A2A2A] bg-[#141414] px-3 py-2 text-sm text-white"
          >
            <option value="all">All projects</option>
            {projectOptions.map((p) => (
              <option key={p.id} value={String(p.id)}>
                {p.title}
              </option>
            ))}
          </select>
        )}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#E50914] border-t-transparent" />
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center py-12 text-red-400">
          {error}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] py-12 text-center text-zinc-500">
          No talent applications yet.
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="space-y-4">
          {filtered.map((app) => {
            const status = normalizeStatus(app.status);
            return (
              <div
                key={app.application_id}
                className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">
                      {app.first_name} {app.last_name}
                    </h3>
                    <p className="text-sm text-gray-400">{app.email}</p>
                    <p className="mt-2 text-sm text-gray-400">
                      Project:{" "}
                      <span className="font-semibold text-white">
                        {app.project_title}
                      </span>
                    </p>
                    <p className="mt-1 text-sm text-white">
                      Role:{" "}
                      <span className="text-[#E50914]">
                        {app.applied_role_title || "Talent"}
                      </span>
                    </p>
                    {app.cover_letter_notes && (
                      <p className="mt-3 text-sm text-zinc-400 line-clamp-3">
                        {app.cover_letter_notes}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
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
                      {new Date(app.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {status === "PENDING" && (
                  <div className="mt-4 flex gap-3 border-t border-[#2A2A2A] pt-4">
                    <button
                      type="button"
                      disabled={actionLoadingId === app.application_id}
                      onClick={() =>
                        handleStatusUpdate(app.application_id, "ACCEPTED")
                      }
                      className="flex-1 rounded-lg bg-[#E50914] py-2 font-bold text-white transition hover:bg-[#B3070F] disabled:opacity-50"
                    >
                      Accept
                    </button>
                    <button
                      type="button"
                      disabled={actionLoadingId === app.application_id}
                      onClick={() =>
                        handleStatusUpdate(app.application_id, "DECLINED")
                      }
                      className="flex-1 rounded-lg border border-gray-600 py-2 font-bold text-gray-300 transition hover:bg-gray-800 disabled:opacity-50"
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
  );
}
