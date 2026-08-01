"use client";

import { useState, useEffect } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { updateProject } from "@/services/projectService";

const genres = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Thriller",
  "Sci-Fi",
  "Romance",
  "Documentary",
  "Animation",
  "Musical",
  "Western",
  "Crime",
  "Other",
];

const statuses = [
  { value: "DEVELOPMENT", label: "Development" },
  { value: "PRE_PRODUCTION", label: "Pre-Production" },
  { value: "PRODUCTION", label: "Production" },
  { value: "POST_PRODUCTION", label: "Post-Production" },
  { value: "COMPLETED", label: "Completed" },
];

export default function EditProjectModal({ isOpen, onClose, project, onUpdated }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    genre: "Drama",
    funding_target: "",
    logline: "",
    synopsis: "",
    production_timeline: "",
    primary_location: "",
    target_audience: "",
    funding_goals_breakdown: "",
    expected_roi_percentage: "",
    distribution_strategy: "",
    project_status: "DEVELOPMENT",
    pitch_deck_url: "",
    lookbook_url: "",
  });

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        genre: project.genre || "Drama",
        funding_target: project.funding_target || "",
        logline: project.logline || "",
        synopsis: project.synopsis || "",
        production_timeline: project.production_timeline || "",
        primary_location: project.primary_location || "",
        target_audience: project.target_audience || "",
        funding_goals_breakdown: project.funding_goals_breakdown || "",
        expected_roi_percentage: project.expected_roi_percentage || "",
        distribution_strategy: project.distribution_strategy || "",
        project_status: project.project_status || "DEVELOPMENT",
        pitch_deck_url: project.pitch_deck_url || "",
        lookbook_url: project.lookbook_url || "",
      });
    }
  }, [project]);

  if (!isOpen || !project) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProject(project.project_id, formData);
      alert("Project updated successfully!");
      if (onUpdated) onUpdated();
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Edit Project</h2>
            <p className="text-sm text-zinc-400">Update details for "{project.title}"</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Basic Info */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-red-500">
              Basic Info
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-300">Project Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-300">Genre</label>
                <select
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none focus:border-red-500"
                >
                  {genres.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-300">Budget ($)</label>
                <input
                  type="number"
                  name="funding_target"
                  value={formData.funding_target}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-300">Project Status</label>
                <select
                  name="project_status"
                  value={formData.project_status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none focus:border-red-500"
                >
                  {statuses.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-300">Logline</label>
                <input
                  type="text"
                  name="logline"
                  value={formData.logline}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-300">Synopsis</label>
                <textarea
                  name="synopsis"
                  rows={3}
                  value={formData.synopsis}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none focus:border-red-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Production Details */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-red-500">
              Production Details
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-300">Timeline</label>
                <input
                  type="text"
                  name="production_timeline"
                  placeholder="e.g. 6 months"
                  value={formData.production_timeline}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-300">Location</label>
                <input
                  type="text"
                  name="primary_location"
                  placeholder="e.g. Los Angeles, CA"
                  value={formData.primary_location}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-300">Target Audience</label>
                <input
                  type="text"
                  name="target_audience"
                  placeholder="e.g. 18-35 Thriller Fans"
                  value={formData.target_audience}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none focus:border-red-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Financials & Strategy */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-red-500">
              Financials & Strategy
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-300">Expected ROI (%)</label>
                <input
                  type="number"
                  step="0.01"
                  name="expected_roi_percentage"
                  value={formData.expected_roi_percentage}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-300">Pitch Deck URL</label>
                <input
                  type="url"
                  name="pitch_deck_url"
                  placeholder="https://..."
                  value={formData.pitch_deck_url}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-300">Lookbook URL</label>
                <input
                  type="url"
                  name="lookbook_url"
                  placeholder="https://..."
                  value={formData.lookbook_url}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-300">Distribution Strategy</label>
                <textarea
                  name="distribution_strategy"
                  rows={2}
                  value={formData.distribution_strategy}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none focus:border-red-500"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-zinc-800 px-6 py-2.5 text-sm font-semibold text-zinc-400 hover:bg-zinc-900 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-red-700 via-red-600 to-red-500 px-7 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
