"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

import ApplicationsFilters from "./ApplicationsFilters";
import EmptyApplications from "./EmptyApplications";

export default function ApplicationsPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
    
    // Fetch applications
    fetchApplications(token);
  }, [router]);

  async function fetchApplications(token) {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://127.0.0.1:5000/api/v1/application/filmmaker/applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Use investor applications specifically
        setApplications(response.data.investor_applications || []);
      } else {
        setError("Failed to load applications");
      }
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError(err.response?.data?.message || "Failed to load applications");
    } finally {
      setLoading(false);
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
              Investor Applications
            </h1>

            <p className="mt-2 text-gray-400">
              Review offers, negotiate terms, and reach agreements
            </p>

          </div>

          <div className="rounded-full border border-[#E50914] px-4 py-1 text-sm font-semibold text-[#E50914]">
            {applications.length} total
          </div>

        </div>

        <ApplicationsFilters />

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

          {!loading && !error && applications.length === 0 && <EmptyApplications />}

          {!loading && !error && applications.length > 0 && (
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.application_id}
                  className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">
                        {app.first_name} {app.last_name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">{app.email}</p>
                      <p className="text-sm text-gray-400 mb-2">
                        Project: <span className="text-white font-semibold">{app.project_title}</span>
                      </p>
                      {app.proposed_funding_amount && (
                        <p className="text-lg font-bold text-[#E50914] mb-2">
                          Investment: ${Number(app.proposed_funding_amount).toLocaleString()}
                        </p>
                      )}
                      {app.cover_letter_notes && (
                        <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                          {app.cover_letter_notes}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          app.status === "PENDING"
                            ? "bg-yellow-500/10 text-yellow-500"
                            : app.status === "ACCEPTED"
                            ? "bg-green-500/10 text-green-500"
                            : app.status === "DECLINED"
                            ? "bg-red-500/10 text-red-500"
                            : "bg-blue-500/10 text-blue-500"
                        }`}
                      >
                        {app.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(app.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  {app.status === "PENDING" && (
                    <div className="flex gap-3 mt-4 pt-4 border-t border-[#2A2A2A]">
                      <button className="flex-1 bg-[#E50914] text-white font-bold py-2 rounded-lg hover:bg-[#B3070F] transition">
                        Accept
                      </button>
                      <button className="flex-1 border border-gray-600 text-gray-300 font-bold py-2 rounded-lg hover:bg-gray-800 transition">
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}