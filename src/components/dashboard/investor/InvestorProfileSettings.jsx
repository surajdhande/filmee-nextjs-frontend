"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Pencil,
  MapPin,
  Calendar,
  Star,
  Trophy,
  Crown,
  Settings,
} from "lucide-react";
import Image from "next/image";

/* ─────────────────────────────────────────
   API ENDPOINTS (ready for future wiring)
   ─────────────────────────────────────────
   GET    /api/v1/investors/profile
   PUT    /api/v1/investors/profile
   GET    /api/v1/investors/portfolio
   GET    /api/v1/investors/settings/notifications
   PUT    /api/v1/investors/settings/notifications
   GET    /api/v1/investors/settings/privacy
   PUT    /api/v1/investors/settings/privacy
   POST   /api/v1/investors/data/download
   DELETE /api/v1/investors/account
*/

/* ─────────────────────────────────────────
   MOCK DATA
   ───────────────────────────────────────── */
const MOCK_PROFILE = {
  full_name: "Mervin Consultant",
  role: "Investor",
  rating: 4.9,
  reviews: 127,
  location: "Los Angeles, CA",
  experience: "15+ years experience",
  email: "mervin.consultant@gmail.com",
  phone: "+1 (555) 123-4567",
  website: "www.example.com",
  bio: "Experienced film investor focused on independent cinema and emerging talent.",
  skills: ["Film Analysis", "Market Research", "Risk Assessment"],
  avatar: null,
};

const MOCK_PORTFOLIO = [
  {
    id: 1,
    title: "The Night Walker",
    year: 2023,
    role: "Executive Producer",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Silent Echo",
    year: 2022,
    role: "Investor",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "Urban Legends",
    year: 2021,
    role: "Lead Investor",
    image:
      "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=600&q=80",
  },
];

const MOCK_NOTIFICATIONS = {
  email_notifications: true,
  push_notifications: true,
  marketing_communications: false,
  product_updates: true,
};

const MOCK_PRIVACY = {
  profile_visibility: true,
  show_contact_information: false,
  project_history_visibility: true,
};

const ACHIEVEMENTS = [
  { id: 1, label: "Sundance Film Festival Winner 2023" },
  { id: 2, label: "Best Director - Independent Film Awards" },
  { id: 3, label: "Over $10M in successful film investments" },
];

const TABS = ["Profile", "Portfolio", "Settings", "Privacy"];

/* ─────────────────────────────────────────
   TOGGLE SWITCH
   ───────────────────────────────────────── */
function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors duration-300 focus:outline-none ${
        checked ? "bg-[#E50914]" : "bg-zinc-600"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-300 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

/* ─────────────────────────────────────────
   STAR RATING
   ───────────────────────────────────────── */
function StarRating({ value }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={13}
          className={
            i <= Math.floor(value)
              ? "text-yellow-400 fill-yellow-400"
              : "text-zinc-600"
          }
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   TAB: PROFILE
   ───────────────────────────────────────── */
function ProfileTab({ profile }) {
  return (
    <div className="flex flex-col gap-5">
      {/* Top row */}
      <div className="flex gap-5">
        {/* Avatar card */}
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-[#171717] border border-zinc-800 p-8 w-56 shrink-0">
          <div className="h-24 w-24 rounded-full overflow-hidden bg-zinc-700 ring-2 ring-zinc-600">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.full_name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-zinc-300">
                {profile.full_name?.[0] ?? "M"}
              </div>
            )}
          </div>
          <div className="text-center">
            <p className="text-[15px] font-bold text-white leading-tight">
              {profile.full_name}
            </p>
            <p className="text-xs text-[#E50914] mt-0.5">{profile.role}</p>
          </div>
          <StarRating value={profile.rating} />
          <p className="text-xs text-zinc-400">
            {profile.rating} ({profile.reviews} reviews)
          </p>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <MapPin size={11} />
            <span>{profile.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <Calendar size={11} />
            <span>{profile.experience}</span>
          </div>
        </div>

        {/* Profile Information */}
        <div className="flex-1 rounded-2xl bg-[#171717] border border-zinc-800 p-6">
          <p className="text-[13px] font-semibold text-zinc-300 mb-5">
            Profile Information
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-[11px] text-zinc-500 mb-1.5">
                Full Name
              </label>
              <div className="rounded-lg border border-zinc-700 bg-[#111] px-3 py-2 text-sm text-zinc-200">
                {profile.full_name}
              </div>
            </div>
            {/* Email */}
            <div>
              <label className="block text-[11px] text-zinc-500 mb-1.5">
                Email
              </label>
              <div className="rounded-lg border border-zinc-700 bg-[#111] px-3 py-2 text-sm text-zinc-200">
                {profile.email}
              </div>
            </div>
            {/* Phone */}
            <div>
              <label className="block text-[11px] text-zinc-500 mb-1.5">
                Phone
              </label>
              <div className="rounded-lg border border-zinc-700 bg-[#111] px-3 py-2 text-sm text-zinc-200">
                {profile.phone}
              </div>
            </div>
            {/* Location */}
            <div>
              <label className="block text-[11px] text-zinc-500 mb-1.5">
                Location
              </label>
              <div className="rounded-lg border border-zinc-700 bg-[#111] px-3 py-2 text-sm text-zinc-200">
                {profile.location}
              </div>
            </div>
            {/* Website */}
            <div className="col-span-2">
              <label className="block text-[11px] text-zinc-500 mb-1.5">
                Website
              </label>
              <div className="rounded-lg border border-zinc-700 bg-[#111] px-3 py-2 text-sm text-zinc-200">
                {profile.website}
              </div>
            </div>
            {/* Bio */}
            <div className="col-span-2">
              <label className="block text-[11px] text-zinc-500 mb-1.5">
                Bio
              </label>
              <div className="rounded-lg border border-zinc-700 bg-[#111] px-3 py-2 text-sm text-zinc-400 leading-relaxed min-h-[58px]">
                {profile.bio}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-5">
            <p className="text-[11px] text-zinc-500 mb-2">
              Skills &amp; Expertise
            </p>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-[#E50914] px-3 py-1 text-[11px] font-semibold text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="rounded-2xl bg-[#171717] border border-zinc-800 p-6">
        <div className="flex items-center gap-2 mb-5">
          <Trophy size={14} className="text-zinc-400" />
          <p className="text-[13px] font-semibold text-zinc-300">
            Achievements &amp; Awards
          </p>
        </div>
        {profile.achievements && profile.achievements.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {profile.achievements.map((ach, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 rounded-xl bg-[#111] border border-zinc-800 p-5 text-center"
              >
                <Trophy size={22} className="text-[#E50914]" />
                <p className="text-[11px] text-zinc-400 leading-snug">{ach}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-zinc-500">
            <Trophy size={24} className="text-zinc-600 mb-2" />
            <p className="text-xs">No achievements listed yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   TAB: PORTFOLIO
   ───────────────────────────────────────── */
function PortfolioTab({ items }) {
  return (
    <div className="rounded-2xl bg-[#171717] border border-zinc-800 p-6">
      <p className="text-[13px] font-semibold text-zinc-300 mb-5">Portfolio</p>
      <div className="grid grid-cols-3 gap-5">
        {items.map((film) => (
          <div key={film.id} className="flex flex-col gap-2">
            <div className="aspect-[16/9] rounded-xl overflow-hidden bg-zinc-800">
              <img
                src={film.image}
                alt={film.title}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <p className="text-[13px] font-semibold text-white">{film.title}</p>
            <p className="text-[11px] text-zinc-500">
              {film.year} &bull; {film.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   TAB: SETTINGS (notifications)
   ───────────────────────────────────────── */
function SettingsTab({ notifications, onChange }) {
  const items = [
    {
      key: "email_notifications",
      label: "Email Notifications",
      desc: "Receive updates via email",
    },
    {
      key: "push_notifications",
      label: "Push Notifications",
      desc: "Receive push notifications in browser",
    },
    {
      key: "marketing_communications",
      label: "Marketing Communications",
      desc: "Receive marketing emails and updates",
    },
    {
      key: "product_updates",
      label: "Product Updates",
      desc: "Get notified about new features and updates",
    },
  ];

  return (
    <div className="rounded-2xl bg-[#171717] border border-zinc-800 p-6">
      <p className="text-[13px] font-semibold text-zinc-300 mb-5">
        Notification Preferences
      </p>
      <div className="flex flex-col divide-y divide-zinc-800">
        {items.map(({ key, label, desc }) => (
          <div
            key={key}
            className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
          >
            <div>
              <p className="text-sm font-medium text-white">{label}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{desc}</p>
            </div>
            <Toggle
              checked={notifications[key]}
              onChange={(val) => onChange(key, val)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   TAB: PRIVACY
   ───────────────────────────────────────── */
function PrivacyTab({ privacy, onChange }) {
  const items = [
    {
      key: "profile_visibility",
      label: "Profile Visibility",
      desc: "Make your profile visible to other users",
    },
    {
      key: "show_contact_information",
      label: "Show Contact Information",
      desc: "Allow others to see your contact details",
    },
    {
      key: "project_history_visibility",
      label: "Project History Visibility",
      desc: "Show your project history to potential collaborators",
    },
  ];

  return (
    <div className="rounded-2xl bg-[#171717] border border-zinc-800 p-6">
      <p className="text-[13px] font-semibold text-zinc-300 mb-5">
        Privacy Settings
      </p>
      <div className="flex flex-col divide-y divide-zinc-800">
        {items.map(({ key, label, desc }) => (
          <div
            key={key}
            className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
          >
            <div>
              <p className="text-sm font-medium text-white">{label}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{desc}</p>
            </div>
            <Toggle
              checked={privacy[key]}
              onChange={(val) => onChange(key, val)}
            />
          </div>
        ))}
      </div>

      {/* Data Management */}
      <div className="mt-6 pt-5 border-t border-zinc-800">
        <p className="text-sm font-semibold text-white mb-4">Data Management</p>
        <div className="flex gap-3">
          <button
            id="download-data-btn"
            onClick={() => {
              /* TODO: POST /api/v1/investors/data/download */
              console.log("Download data requested");
            }}
            className="rounded-full border border-[#E50914] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#E50914] hover:bg-[#E50914]/10 transition-all duration-200"
          >
            Download My Data
          </button>
          <button
            id="delete-account-btn"
            onClick={() => {
              /* TODO: DELETE /api/v1/investors/account */
              console.log("Delete account requested");
            }}
            className="rounded-full border border-[#E50914] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#E50914] hover:bg-[#E50914]/10 transition-all duration-200"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

import { getMyProfile, updateMyProfile, uploadProfileImage, getMyInvestments } from "@/services/investorService";

/* ─────────────────────────────────────────
   EDIT PROFILE MODAL
   ───────────────────────────────────────── */
function EditProfileModal({ isOpen, onClose, profile, onSave }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    location: "",
    website_portfolio_url: "",
    bio: "",
    years_of_experience: 0,
    skills: [],
    achievements: []
  });

  const [skillInput, setSkillInput] = useState("");
  const [achievementInput, setAchievementInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (profile) {
      const names = profile.full_name ? profile.full_name.split(" ") : ["", ""];
      setFormData({
        first_name: profile.first_name || names[0] || "",
        last_name: profile.last_name || names.slice(1).join(" ") || "",
        phone_number: profile.phone_number || profile.phone || "",
        location: profile.location || "",
        website_portfolio_url: profile.website_portfolio_url || profile.website || "",
        bio: profile.bio || "",
        years_of_experience: profile.years_of_experience || 0,
        skills: profile.skills || [],
        achievements: profile.achievements || []
      });
    }
  }, [profile, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (imageFile) {
        await uploadProfileImage(imageFile);
      }
      await updateMyProfile(formData);
      onSave();
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleAddAchievement = () => {
    if (achievementInput.trim() && !formData.achievements.includes(achievementInput.trim())) {
      setFormData(prev => ({
        ...prev,
        achievements: [...prev.achievements, achievementInput.trim()]
      }));
      setAchievementInput("");
    }
  };

  const handleRemoveAchievement = (ach) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter(a => a !== ach)
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
      <div className="w-full max-w-2xl rounded-2xl border border-zinc-800 bg-[#171717] p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        <h3 className="text-[18px] font-bold text-white mb-4">Edit Profile</h3>
        {error && <p className="text-xs text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] text-zinc-500 mb-1">First Name</label>
              <input
                type="text"
                required
                className="w-full rounded-lg border border-zinc-700 bg-[#111] px-3 py-2 text-sm text-white focus:outline-none focus:border-[#E50914]"
                value={formData.first_name}
                onChange={e => setFormData({ ...formData, first_name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[11px] text-zinc-500 mb-1">Last Name</label>
              <input
                type="text"
                required
                className="w-full rounded-lg border border-zinc-700 bg-[#111] px-3 py-2 text-sm text-white focus:outline-none focus:border-[#E50914]"
                value={formData.last_name}
                onChange={e => setFormData({ ...formData, last_name: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] text-zinc-500 mb-1">Phone Number</label>
              <input
                type="text"
                required
                className="w-full rounded-lg border border-zinc-700 bg-[#111] px-3 py-2 text-sm text-white focus:outline-none focus:border-[#E50914]"
                value={formData.phone_number}
                onChange={e => setFormData({ ...formData, phone_number: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[11px] text-zinc-500 mb-1">Location</label>
              <input
                type="text"
                className="w-full rounded-lg border border-zinc-700 bg-[#111] px-3 py-2 text-sm text-white focus:outline-none focus:border-[#E50914]"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] text-zinc-500 mb-1">Website URL</label>
              <input
                type="text"
                className="w-full rounded-lg border border-zinc-700 bg-[#111] px-3 py-2 text-sm text-white focus:outline-none focus:border-[#E50914]"
                value={formData.website_portfolio_url}
                onChange={e => setFormData({ ...formData, website_portfolio_url: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[11px] text-zinc-500 mb-1">Years of Experience</label>
              <input
                type="number"
                className="w-full rounded-lg border border-zinc-700 bg-[#111] px-3 py-2 text-sm text-white focus:outline-none focus:border-[#E50914]"
                value={formData.years_of_experience}
                onChange={e => setFormData({ ...formData, years_of_experience: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-zinc-500 mb-1">Bio</label>
            <textarea
              className="w-full rounded-lg border border-zinc-700 bg-[#111] px-3 py-2 text-sm text-white focus:outline-none focus:border-[#E50914] min-h-[80px]"
              value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-[11px] text-zinc-500 mb-1">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#E50914] file:text-white hover:file:bg-[#c0070f]"
              onChange={e => setImageFile(e.target.files[0])}
            />
          </div>

          {/* Skills Tag Input */}
          <div>
            <label className="block text-[11px] text-zinc-500 mb-1">Skills & Expertise</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Add skill..."
                className="flex-1 rounded-lg border border-zinc-700 bg-[#111] px-3 py-1.5 text-xs text-white focus:outline-none"
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="rounded-lg bg-[#E50914] px-4 py-1.5 text-xs font-bold text-white"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {formData.skills.map(skill => (
                <span key={skill} className="inline-flex items-center gap-1 rounded-full bg-zinc-800 px-2.5 py-1 text-[10px] text-white">
                  {skill}
                  <button type="button" onClick={() => handleRemoveSkill(skill)} className="text-zinc-500 hover:text-white">&times;</button>
                </span>
              ))}
            </div>
          </div>

          {/* Achievements Input */}
          <div>
            <label className="block text-[11px] text-zinc-500 mb-1">Achievements & Awards</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Add achievement..."
                className="flex-1 rounded-lg border border-zinc-700 bg-[#111] px-3 py-1.5 text-xs text-white focus:outline-none"
                value={achievementInput}
                onChange={e => setAchievementInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && (e.preventDefault(), handleAddAchievement())}
              />
              <button
                type="button"
                onClick={handleAddAchievement}
                className="rounded-lg bg-[#E50914] px-4 py-1.5 text-xs font-bold text-white"
              >
                Add
              </button>
            </div>
            <div className="space-y-1">
              {formData.achievements.map(ach => (
                <div key={ach} className="flex items-center justify-between rounded-lg bg-zinc-800/50 px-3 py-1 text-[11px] text-zinc-300">
                  <span>{ach}</span>
                  <button type="button" onClick={() => handleRemoveAchievement(ach)} className="text-zinc-500 hover:text-white">&times;</button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-zinc-600 px-5 py-2 text-xs font-bold text-zinc-400 hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-[#E50914] px-5 py-2 text-xs font-bold text-white disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────── */
export default function InvestorProfileSettings() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Profile");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Profile state
  const [profile, setProfile] = useState(MOCK_PROFILE);

  // Portfolio state
  const [portfolio, setPortfolio] = useState(MOCK_PORTFOLIO);

  // Notification settings state
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  // Privacy settings state
  const [privacy, setPrivacy] = useState(MOCK_PRIVACY);

  const loadData = async () => {
    try {
      setLoading(true);
      const prof = await getMyProfile();
      if (prof) {
        setProfile({
          full_name: prof.full_name || `${prof.first_name} ${prof.last_name}`.trim() || "Mervin Consultant",
          first_name: prof.first_name,
          last_name: prof.last_name,
          role: prof.user_role || "Investor",
          rating: 4.9, // Mock rating as not in DB schema yet
          reviews: 127, // Mock reviews
          location: prof.location || "Los Angeles, CA",
          experience: prof.years_of_experience ? `${prof.years_of_experience}+ years experience` : "15+ years experience",
          years_of_experience: prof.years_of_experience,
          email: prof.email || "mervin.consultant@gmail.com",
          phone: prof.phone_number || "+1 (555) 123-4567",
          website: prof.website_portfolio_url || "www.example.com",
          bio: prof.bio || "Experienced film investor focused on independent cinema and emerging talent.",
          skills: prof.skills && prof.skills.length > 0 ? prof.skills : ["Film Analysis", "Market Research", "Risk Assessment"],
          avatar: prof.profile_image_url || null,
          achievements: prof.achievements && prof.achievements.length > 0 ? prof.achievements : []
        });
      }

      const myInv = await getMyInvestments();
      if (myInv && myInv.length > 0) {
        const mappedPort = myInv.map((inv, index) => ({
          id: inv.investment_id || index,
          title: inv.title,
          year: inv.created_at ? new Date(inv.created_at).getFullYear() : 2023,
          role: "Investor",
          image: inv.lookbook_url || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80"
        }));
        setPortfolio(mappedPort);
      }
    } catch (err) {
      console.error("Failed to load profile data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEditProfile = () => {
    setIsEditOpen(true);
  };

  const handleNotificationChange = (key, val) => {
    setNotifications((prev) => ({ ...prev, [key]: val }));
  };

  const handlePrivacyChange = (key, val) => {
    setPrivacy((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0B0B0B] text-white">
      {/* ── Top Header Bar (same style as investor dashboard, no sidebar) ── */}
      <header className="w-full shrink-0 border-b border-[#262626] bg-[#0E0E0E]">
        <div className="flex items-center justify-between px-6 py-4 gap-2">
          {/* Left */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Filmee Logo"
              width={36}
              height={36}
              className="rounded-lg object-contain"
            />
            <div>
              <h1 className="text-[18px] font-bold leading-none text-white tracking-tight">
                Investor Dashboard
              </h1>
              <p className="mt-1.5 text-xs text-zinc-400">
                Profile &amp; Settings
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-1.5 rounded-full border border-[#E50914]/50 px-4 py-1.5 hover:bg-[#E50914]/10 transition-all duration-300">
              <Crown size={13} className="text-[#E50914]" />
              <span className="text-[15px] font-bold uppercase tracking-wider text-[#E50914]">
                Professional
              </span>
            </button>

            <button
              onClick={() => router.push("/dashboard/investor/settings")}
              className="flex items-center gap-1.5 rounded-full border border-[#E50914]/50 px-4 py-1.5 hover:bg-[#E50914]/10 transition-all duration-300"
            >
              <Settings size={13} className="text-[#E50914]" />
              <span className="text-[15px] font-bold uppercase tracking-wider text-[#E50914]">
                Settings
              </span>
            </button>

            <button
              onClick={() => router.back()}
              className="text-s font-semibold text-zinc-400 hover:text-white transition duration-300 uppercase px-2"
            >
              Back
            </button>
          </div>
        </div>
      </header>

      {/* ── Page Content (scrollable, no sidebar) ── */}
      <main className="flex-1 overflow-y-auto bg-black">
        <div className="mx-auto max-w-[70%] px-8 py-8">
          {/* Page sub-header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                id="back-btn"
                onClick={() => router.back()}
                className="flex items-center justify-center h-8 w-8 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
              >
                <ArrowLeft size={15} className="text-zinc-300" />
              </button>
              <div>
                <h2 className="text-[20px] font-bold text-white tracking-tight leading-none">
                  Profile Settings
                </h2>
                <p className="text-xs text-zinc-500 mt-1">
                  Manage your profile and preferences
                </p>
              </div>
            </div>

            <button
              id="edit-profile-btn"
              onClick={handleEditProfile}
              className="flex items-center gap-2 rounded-full bg-[#E50914] px-5 py-2 text-[12px] font-bold uppercase tracking-widest text-white hover:bg-[#c0070f] transition-colors duration-200"
            >
              <Pencil size={12} />
              Edit Profile
            </button>
          </div>

          {/* Tab bar */}
          <div className="flex items-center gap-1 mb-6">
            {TABS.map((tab) => (
              <button
                key={tab}
                id={`tab-${tab.toLowerCase()}`}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-[#262626] text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex items-center justify-center py-20 text-zinc-500">
              <span className="animate-spin mr-2">⏳</span> Loading profile settings...
            </div>
          ) : (
            <>
              {/* Tab content */}
              {activeTab === "Profile" && <ProfileTab profile={profile} />}
              {activeTab === "Portfolio" && <PortfolioTab items={portfolio} />}
              {activeTab === "Settings" && (
                <SettingsTab
                  notifications={notifications}
                  onChange={handleNotificationChange}
                />
              )}
              {activeTab === "Privacy" && (
                <PrivacyTab privacy={privacy} onChange={handlePrivacyChange} />
              )}
            </>
          )}
        </div>
      </main>

      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        profile={profile}
        onSave={loadData}
      />
    </div>
  );
}
