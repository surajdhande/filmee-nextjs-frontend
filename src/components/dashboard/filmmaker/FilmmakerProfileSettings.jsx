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
  Camera,
  Plus,
  Save,
} from "lucide-react";
import {
  getMyProfile,
  updateMyProfile,
  uploadProfileImage,
} from "@/services/investorService";

/* ─────────────────────────────────────────
   MOCK DATA FOR FILMMAKER
   ───────────────────────────────────────── */
const MOCK_PROFILE = {
  full_name: "Mervin Filmmaker",
  role: "Filmmaker",
  rating: 4.9,
  reviews: 127,
  location: "Los Angeles, CA",
  experience: "10+ years experience",
  email: "mervin.filmmaker@gmail.com",
  phone: "+1 (555) 123-4567",
  website: "www.example.com",
  bio: "Award-winning filmmaker specializing in independent cinema and documentary storytelling.",
  skills: ["Directing", "Screenwriting", "Film Production"],
  avatar: null,
  achievements: [
    "Sundance Film Festival Winner 2023",
    "Best Director - Independent Film Awards",
    "Over $10M in successful film projects",
  ],
};

const MOCK_PORTFOLIO = [
  {
    id: 1,
    title: "The Night Walker",
    year: 2023,
    role: "Director",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Silent Echo",
    year: 2022,
    role: "Writer / Director",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "Urban Legends",
    year: 2021,
    role: "Producer",
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
function ProfileTab({
  profile,
  isEditing,
  editFormData,
  onChange,
  onImageChange,
  skillInput,
  setSkillInput,
  onAddSkill,
  onRemoveSkill,
  achievementInput,
  setAchievementInput,
  onAddAchievement,
  onRemoveAchievement,
}) {
  return (
    <div className="flex flex-col gap-5">
      {/* Top row */}
      <div className="flex flex-col md:flex-row gap-5">
        {/* Avatar card */}
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-[#171717] border border-zinc-800 p-8 w-full md:w-56 shrink-0">
          <div className="relative h-24 w-24">
            <div className="h-full w-full rounded-full overflow-hidden bg-zinc-700 ring-2 ring-zinc-600">
              {isEditing ? (
                editFormData.avatarPreview ? (
                  <img
                    src={editFormData.avatarPreview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.full_name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-zinc-350 bg-zinc-800">
                    {editFormData.full_name?.[0] || "F"}
                  </div>
                )
              ) : profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.full_name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-zinc-350 bg-zinc-800">
                  {profile.full_name?.[0] ?? "F"}
                </div>
              )}
            </div>
            {isEditing && (
              <label className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center cursor-pointer border border-[#171717] shadow-[0_0_10px_rgba(220,38,38,0.4)] transition-transform hover:scale-110">
                <Camera size={14} className="text-white" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onImageChange}
                />
              </label>
            )}
          </div>
          <div className="text-center">
            <p className="text-[15px] font-bold text-white leading-tight">
              {isEditing ? editFormData.full_name : profile.full_name}
            </p>
            <p className="text-xs text-[#E50914] mt-0.5">{profile.role}</p>
          </div>
          <StarRating value={profile.rating} />
          <p className="text-xs text-zinc-400">
            {profile.rating} ({profile.reviews} reviews)
          </p>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <MapPin size={11} className="text-zinc-500" />
            <span>{isEditing ? editFormData.location : profile.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <Calendar size={11} className="text-zinc-500" />
            <span>
              {isEditing
                ? `${editFormData.years_of_experience}+ years experience`
                : profile.experience}
            </span>
          </div>
        </div>

        {/* Profile Information */}
        <div className="flex-1 rounded-2xl bg-[#171717] border border-zinc-800 p-6">
          <p className="text-[13px] font-semibold text-zinc-300 mb-5 border-b border-zinc-800/50 pb-2">
            Profile Information
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-[11px] text-zinc-500 mb-1.5 font-bold uppercase tracking-wider">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  required
                  className="w-full rounded-lg border border-zinc-800 bg-[#111] px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50"
                  value={editFormData.full_name}
                  onChange={(e) => onChange("full_name", e.target.value)}
                />
              ) : (
                <div className="rounded-lg border border-zinc-700 bg-[#111] px-3.5 py-2 text-sm text-zinc-200 min-h-[38px] flex items-center">
                  {profile.full_name}
                </div>
              )}
            </div>
            {/* Email */}
            <div>
              <label className="block text-[11px] text-zinc-500 mb-1.5 font-bold uppercase tracking-wider">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  required
                  className="w-full rounded-lg border border-zinc-800 bg-[#111] px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50"
                  value={editFormData.email}
                  onChange={(e) => onChange("email", e.target.value)}
                />
              ) : (
                <div className="rounded-lg border border-zinc-700 bg-[#111] px-3.5 py-2 text-sm text-zinc-200 min-h-[38px] flex items-center">
                  {profile.email}
                </div>
              )}
            </div>
            {/* Phone */}
            <div>
              <label className="block text-[11px] text-zinc-500 mb-1.5 font-bold uppercase tracking-wider">
                Phone
              </label>
              {isEditing ? (
                <input
                  type="text"
                  required
                  className="w-full rounded-lg border border-zinc-800 bg-[#111] px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50"
                  value={editFormData.phone}
                  onChange={(e) => onChange("phone", e.target.value)}
                />
              ) : (
                <div className="rounded-lg border border-zinc-700 bg-[#111] px-3.5 py-2 text-sm text-zinc-200 min-h-[38px] flex items-center">
                  {profile.phone}
                </div>
              )}
            </div>
            {/* Location */}
            <div>
              <label className="block text-[11px] text-zinc-500 mb-1.5 font-bold uppercase tracking-wider">
                Location
              </label>
              {isEditing ? (
                <input
                  type="text"
                  className="w-full rounded-lg border border-zinc-800 bg-[#111] px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50"
                  value={editFormData.location}
                  onChange={(e) => onChange("location", e.target.value)}
                />
              ) : (
                <div className="rounded-lg border border-zinc-700 bg-[#111] px-3.5 py-2 text-sm text-zinc-200 min-h-[38px] flex items-center">
                  {profile.location}
                </div>
              )}
            </div>
            {/* Website */}
            <div className="md:col-span-2">
              <label className="block text-[11px] text-zinc-500 mb-1.5 font-bold uppercase tracking-wider">
                Website
              </label>
              {isEditing ? (
                <input
                  type="text"
                  className="w-full rounded-lg border border-zinc-800 bg-[#111] px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50"
                  value={editFormData.website}
                  onChange={(e) => onChange("website", e.target.value)}
                />
              ) : (
                <div className="rounded-lg border border-zinc-700 bg-[#111] px-3.5 py-2 text-sm text-zinc-200 min-h-[38px] flex items-center">
                  {profile.website}
                </div>
              )}
            </div>
            {/* Bio */}
            <div className="md:col-span-2">
              <label className="block text-[11px] text-zinc-500 mb-1.5 font-bold uppercase tracking-wider">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  className="w-full rounded-lg border border-zinc-800 bg-[#111] px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 min-h-[80px]"
                  value={editFormData.bio}
                  onChange={(e) => onChange("bio", e.target.value)}
                />
              ) : (
                <div className="rounded-lg border border-zinc-700 bg-[#111] px-3.5 py-2.5 text-sm text-zinc-350 leading-relaxed min-h-[58px]">
                  {profile.bio}
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="mt-5">
            <p className="text-[11px] text-zinc-500 mb-2 font-bold uppercase tracking-wider">
              Skills &amp; Expertise
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {(isEditing ? editFormData.skills : profile.skills).map(
                (skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-[#E50914] px-3.5 py-1 text-[11px] font-black text-white uppercase tracking-wider flex items-center gap-1.5"
                  >
                    {skill}
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => onRemoveSkill(skill)}
                        className="hover:text-zinc-300 font-bold ml-0.5 text-sm leading-none focus:outline-none cursor-pointer"
                      >
                        &times;
                      </button>
                    )}
                  </span>
                )
              )}
            </div>
            {isEditing && (
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Add a skill"
                  className="rounded-lg border border-zinc-800 bg-[#111] px-3.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#E50914] w-48"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), onAddSkill())
                  }
                />
                <button
                  type="button"
                  onClick={onAddSkill}
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-[#E50914] hover:bg-[#c0070f] text-white cursor-pointer shadow-[0_0_8px_rgba(220,38,38,0.3)] transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            )}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {profile.achievements.map((ach, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center gap-2 rounded-xl bg-[#111] border border-zinc-800 p-5 text-center group"
              >
                <Trophy size={22} className="text-[#E50914]" />
                <p className="text-[11px] text-zinc-400 leading-snug">{ach}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-zinc-500">
            <Trophy size={24} className="text-zinc-650 mb-2" />
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {items.map((film) => (
          <div key={film.id} className="flex flex-col gap-2 group cursor-pointer">
            <div className="aspect-[16/9] rounded-xl overflow-hidden bg-zinc-800 border border-zinc-800">
              <img
                src={film.image}
                alt={film.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="text-[13px] font-semibold text-white group-hover:text-red-500 transition-colors">
              {film.title}
            </p>
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
            onClick={() => {
              console.log("Download data requested");
            }}
            className="rounded-full border border-[#E50914] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#E50914] hover:bg-[#E50914]/10 transition-all duration-200 cursor-pointer"
          >
            Download My Data
          </button>
          <button
            onClick={() => {
              console.log("Delete account requested");
            }}
            className="rounded-full border border-[#E50914] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#E50914] hover:bg-[#E50914]/10 transition-all duration-200 cursor-pointer"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────── */
export default function FilmmakerProfileSettings() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Profile");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Profile state
  const [profile, setProfile] = useState(MOCK_PROFILE);

  // Unsaved editing form data state
  const [editFormData, setEditFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    bio: "",
    years_of_experience: 10,
    skills: [],
    achievements: [],
    avatarPreview: null,
  });

  const [skillInput, setSkillInput] = useState("");
  const [achievementInput, setAchievementInput] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // Portfolio state
  const [portfolio, setPortfolio] = useState(MOCK_PORTFOLIO);

  // Notification settings state
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  // Privacy settings state
  const [privacy, setPrivacy] = useState(MOCK_PRIVACY);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      let prof = null;
      try {
        prof = await getMyProfile();
      } catch (apiErr) {
        console.warn(
          "Backend API getMyProfile failed, falling back to mock data:",
          apiErr
        );
      }

      if (prof) {
        const full =
          prof.full_name ||
          `${prof.first_name} ${prof.last_name}`.trim() ||
          "Mervin Filmmaker";
        setProfile({
          full_name: full,
          first_name: prof.first_name,
          last_name: prof.last_name,
          role: prof.user_role || "Filmmaker",
          rating: 4.9,
          reviews: 127,
          location: prof.location || "Los Angeles, CA",
          experience: prof.years_of_experience
            ? `${prof.years_of_experience}+ years experience`
            : "10+ years experience",
          years_of_experience: prof.years_of_experience,
          email: prof.email || "mervin.filmmaker@gmail.com",
          phone: prof.phone_number || "+1 (555) 123-4567",
          website: prof.website_portfolio_url || "www.example.com",
          bio:
            prof.bio ||
            "Award-winning filmmaker specializing in independent cinema and documentary storytelling.",
          skills:
            prof.skills && prof.skills.length > 0
              ? prof.skills
              : ["Directing", "Screenwriting", "Film Production"],
          avatar: prof.profile_image_url || null,
          achievements:
            prof.achievements && prof.achievements.length > 0
              ? prof.achievements
              : [
                  "Sundance Film Festival Winner 2023",
                  "Best Director - Independent Film Awards",
                  "Over $10M in successful film projects",
                ],
        });
      } else {
        setProfile(MOCK_PROFILE);
      }
    } catch (err) {
      console.error("Failed to load profile data:", err);
      setProfile(MOCK_PROFILE);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStartEdit = () => {
    setEditFormData({
      full_name: profile.full_name,
      email: profile.email,
      phone: profile.phone,
      location: profile.location,
      website: profile.website,
      bio: profile.bio,
      years_of_experience: profile.years_of_experience || 10,
      skills: [...profile.skills],
      achievements: [...profile.achievements],
      avatarPreview: null,
    });
    setImageFile(null);
    setIsEditing(true);
    setActiveTab("Profile");
    setError(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setImageFile(null);
    setError(null);
  };

  const handleFieldChange = (key, val) => {
    setEditFormData((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditFormData((prev) => ({
          ...prev,
          avatarPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSkill = () => {
    if (
      skillInput.trim() &&
      !editFormData.skills.includes(skillInput.trim())
    ) {
      setEditFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skill) => {
    setEditFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleAddAchievement = () => {
    if (
      achievementInput.trim() &&
      !editFormData.achievements.includes(achievementInput.trim())
    ) {
      setEditFormData((prev) => ({
        ...prev,
        achievements: [...prev.achievements, achievementInput.trim()],
      }));
      setAchievementInput("");
    }
  };

  const handleRemoveAchievement = (ach) => {
    setEditFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((a) => a !== ach),
    }));
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    setError(null);
    try {
      if (imageFile) {
        await uploadProfileImage(imageFile);
      }
      const names = editFormData.full_name.trim().split(" ");
      const first_name = names[0] || "";
      const last_name = names.slice(1).join(" ") || "";

      await updateMyProfile({
        first_name,
        last_name,
        phone_number: editFormData.phone,
        location: editFormData.location,
        website_portfolio_url: editFormData.website,
        bio: editFormData.bio,
        years_of_experience: editFormData.years_of_experience,
        skills: editFormData.skills,
        achievements: editFormData.achievements,
      });

      await loadData();
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to update profile changes"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleNotificationChange = (key, val) => {
    setNotifications((prev) => ({ ...prev, [key]: val }));
  };

  const handlePrivacyChange = (key, val) => {
    setPrivacy((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0a0a0a] text-white">
      {/* ── Top Header Bar ── */}
      <header className="w-full shrink-0 border-b border-zinc-800 bg-[#111111] h-16 flex items-center px-4 sm:px-8 justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="flex flex-col leading-none">
            <span className="text-[8px] tracking-[0.3em] font-extrabold text-zinc-400">
              THE
            </span>
            <span className="text-sm tracking-[0.1em] font-black text-white">
              FILMEE
            </span>
            <span className="text-[9px] tracking-[0.2em] font-bold text-red-500">
              GRID
            </span>
          </div>
          <div className="border-l border-zinc-800 pl-3 ml-1 hidden xs:block">
            <h1 className="text-sm font-black text-white tracking-tight">
              Filmmaker Dashboard
            </h1>
            <p className="text-[10px] text-zinc-500">
              Profile &amp; Settings
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => router.push("/dashboard/filmmaker/subscription")}
            className="flex items-center gap-1.5 sm:gap-2 border border-red-700 rounded-full px-3 sm:px-4 py-1.5 text-xs font-black text-white hover:bg-red-950/30 transition-colors"
          >
            <Crown size={13} className="text-red-500" />
            <span className="hidden sm:inline">FREE</span>
          </button>
          <button
            onClick={() => router.push("/dashboard/filmmaker/settings")}
            className="flex items-center gap-1.5 sm:gap-2 border border-red-700 bg-red-950/30 rounded-full px-3 sm:px-4 py-1.5 text-xs font-black text-white transition-colors"
          >
            <Settings size={13} className="text-red-500" />
            <span className="hidden sm:inline">SETTINGS</span>
          </button>
          <button
            onClick={() => router.push("/dashboard/filmmaker")}
            className="text-xs font-black text-zinc-400 hover:text-white uppercase tracking-wider px-1 sm:px-2"
          >
            Dashboard
          </button>
        </div>
      </header>

      {/* ── Page Content ── */}
      <main className="flex-1 overflow-y-auto bg-black">
        <div className="mx-auto max-w-5xl px-4 sm:px-8 py-6 sm:py-8">
          {/* Page sub-header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/dashboard/filmmaker")}
                className="flex items-center justify-center h-8 w-8 rounded-full bg-zinc-900 hover:bg-zinc-800 transition-colors border border-zinc-800 cursor-pointer"
              >
                <ArrowLeft size={15} className="text-zinc-300" />
              </button>
              <div>
                <h2 className="text-[20px] font-black text-white tracking-tight leading-none">
                  Profile Settings
                </h2>
                <p className="text-xs text-zinc-500 mt-1">
                  Manage your profile and preferences
                </p>
              </div>
            </div>

            {isEditing ? (
              <div className="flex items-center gap-2.5 sm:gap-3">
                <button
                  onClick={handleCancelEdit}
                  className="border border-red-700/60 hover:bg-red-955/20 text-red-500 px-4 sm:px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleSaveChanges}
                  disabled={saving}
                  className="bg-red-650 hover:bg-red-550 disabled:opacity-50 text-white px-4 sm:px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all duration-200 cursor-pointer shadow-[0_0_12px_rgba(220,38,38,0.3)]"
                >
                  <Save size={14} />
                  {saving ? "SAVING..." : "SAVE CHANGES"}
                </button>
              </div>
            ) : (
              <button
                onClick={handleStartEdit}
                className="flex items-center gap-2 rounded-full bg-red-600 hover:bg-red-500 px-5 py-2.5 text-[11px] font-black uppercase tracking-widest text-white transition-colors duration-200 cursor-pointer shadow-[0_0_12px_rgba(220,38,38,0.3)] w-fit"
              >
                <Pencil size={12} />
                Edit Profile
              </button>
            )}
          </div>

          {/* Error Message banner */}
          {error && (
            <div className="mb-6 p-4 bg-red-950/30 border border-red-900 rounded-2xl text-xs text-red-400 font-bold uppercase tracking-wider flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="text-red-500 hover:text-white font-extrabold text-sm ml-4"
              >
                &times;
              </button>
            </div>
          )}

          {/* Tab bar */}
          <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-2 border-b border-zinc-800/40">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-[12px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-zinc-800 text-white border border-zinc-700"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex items-center justify-center py-20 text-zinc-500 text-xs font-bold uppercase tracking-wider">
              <span className="animate-spin mr-2">⏳</span> Loading profile
              settings...
            </div>
          ) : (
            <>
              {/* Tab content */}
              {activeTab === "Profile" && (
                <ProfileTab
                  profile={profile}
                  isEditing={isEditing}
                  editFormData={editFormData}
                  onChange={handleFieldChange}
                  onImageChange={handleImageChange}
                  skillInput={skillInput}
                  setSkillInput={setSkillInput}
                  onAddSkill={handleAddSkill}
                  onRemoveSkill={handleRemoveSkill}
                  achievementInput={achievementInput}
                  setAchievementInput={setAchievementInput}
                  onAddAchievement={handleAddAchievement}
                  onRemoveAchievement={handleRemoveAchievement}
                />
              )}
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
    </div>
  );
}
