"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  MapPin,
  BriefcaseBusiness,
  Star,
  ArrowLeft,
  Award,
  X
} from "lucide-react";

export default function FilmmakerProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [newSkill, setNewSkill] = useState("");
  const [newAchievement, setNewAchievement] = useState("");

  const handleAddSkill = () => {
    const skill = newSkill.trim();
    if (!skill) return;
    const currentSkills = formData.skills || [];
    if (!currentSkills.includes(skill)) {
      setFormData({
        ...formData,
        skills: [...currentSkills, skill]
      });
    }
    setNewSkill("");
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: (formData.skills || []).filter((s) => s !== skillToRemove)
    });
  };

  const handleAddAchievement = () => {
    const achievement = newAchievement.trim();
    if (!achievement) return;
    const currentAchievements = formData.achievements || [];
    if (!currentAchievements.includes(achievement)) {
      setFormData({
        ...formData,
        achievements: [...currentAchievements, achievement]
      });
    }
    setNewAchievement("");
  };

  const handleRemoveAchievement = (achievementToRemove) => {
    setFormData({
      ...formData,
      achievements: (formData.achievements || []).filter((a) => a !== achievementToRemove)
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/v1/profile/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setProfile(data.profile);
      setFormData(data.profile);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSave = async () => {
  try {
    const token = localStorage.getItem("token");

    const names = (formData.full_name || "").trim().split(/\s+/);

    const first_name = names[0] || "";
    const last_name = names.slice(1).join(" ") || "";

    const response = await fetch(
      "http://localhost:5000/api/v1/profile/me",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          first_name,
          last_name,
          phone_number: formData.phone_number,
          bio: formData.bio,
          location: formData.location,
          website_portfolio_url: formData.website_portfolio_url,
          years_of_experience: formData.years_of_experience,
          skills: formData.skills || [],
          achievements: formData.achievements || [],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to update profile");
      return;
    }

    await loadProfile();

    setEditMode(false);

    alert("Profile updated successfully!");

  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  }
};

  if (!profile) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0B0B0B] text-white">
        Loading...
      </div>
    );
  }

  return (
    <DashboardLayout role="FILMMAKER">
  <div className="min-h-screen bg-[#0B0B0B] text-white">

    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#2B2B2B] px-4 sm:px-6 md:px-10 py-6 gap-4">

      <div className="flex items-start gap-3 sm:gap-5">

        <button
          onClick={() => router.back()}
          className="mt-1 rounded-full p-2 hover:bg-[#1B1B1B]"
        >
          <ArrowLeft size={22} />
        </button>

        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Profile Settings
          </h1>

          <p className="mt-1 text-xs sm:text-sm text-gray-400">
            Manage your profile and preferences
          </p>
        </div>

      </div>

      <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto justify-end">

        {editMode && (
          <button
            onClick={() => {
              setFormData(profile);
              setEditMode(false);
            }}
            className="flex-1 md:flex-none text-center rounded-full border border-[#2A2A2A] px-5 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold hover:bg-[#1B1B1B] text-white"
          >
            CANCEL
          </button>
        )}

        <button
          onClick={() => {
            if (editMode) {
              handleSave();
            } else {
              setEditMode(true);
            }
          }}
          className="flex-1 md:flex-none text-center rounded-full bg-[#E50914] px-5 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition hover:bg-red-700 text-white"
        >
          {editMode ? "SAVE PROFILE" : "EDIT PROFILE"}
        </button>

      </div>

    </div>
        {/* Tabs */}
        <div className="px-4 sm:px-6 md:px-10 py-6 sm:py-8 overflow-x-auto whitespace-nowrap scrollbar-none">
          <div className="inline-flex rounded-full border border-[#2A2A2A] bg-[#171717] p-1 whitespace-nowrap">
            <button className="rounded-full bg-[#2B2B2B] px-5 py-2 text-sm font-semibold text-white">
              Profile
            </button>
            <button className="px-5 py-2 text-sm text-gray-300">
              Portfolio
            </button>
            <button className="px-5 py-2 text-sm text-gray-300">
              Settings
            </button>
            <button className="px-5 py-2 text-sm text-gray-300">
              Privacy
            </button>
          </div>
        </div>

        {/* Main Section */}
        <div className="px-4 sm:px-6 md:px-10 pb-10">
          <div className="grid grid-cols-12 items-start gap-6">

            {/* Left Profile Card */}
            <div className="col-span-12 lg:col-span-4">
              <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-8">
                <div className="flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="h-32 w-32 overflow-hidden rounded-full border-2 border-[#2D2D2D] bg-[#232323]">
                    <img
                      src="/images/default-avatar.png"
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Name */}
                  <h2 className="mt-6 text-[28px] font-bold tracking-tight text-white">
                    {profile.full_name}
                  </h2>

                  {/* Role */}
                  <p className="mt-1 text-[16px] text-[#A8A8A8] capitalize">
                    {profile.user_role}
                  </p>

                  {/* Rating */}
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={16} fill="#FFD43B" stroke="#FFD43B" />
                      ))}
                    </div>
                    <span className="text-[14px] text-[#A8A8A8]">
                      4.9 (127 reviews)
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="my-8 h-px w-full bg-[#2A2A2A]" />

                  {/* Location & Experience */}
                  <div className="flex w-full flex-col gap-5">
                    <div className="flex items-center gap-4 text-[#A8A8A8]">
                      <MapPin size={20} className="text-[#A8A8A8]" />
                      <span className="text-[15px]">
                        {profile.location || "Location Not available"}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-[#A8A8A8]">
                      <BriefcaseBusiness size={20} className="text-[#A8A8A8]" />
                      <span className="text-[15px]">
                        {profile.years_of_experience || 0}+ Years Experience
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Information */}
            <div className="col-span-12 lg:col-span-8">
              <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-8">
                <h2 className="mb-8 text-[20px] font-semibold text-white">
                  Profile Information
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Full Name */}
                  <div>
                    <label className="text-[13px] font-medium text-[#A8A8A8]">Full Name</label>
                    {editMode ? (
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name || ""}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-xl border border-[#2A2A2A] bg-[#1B1B1B] px-4 py-3 text-[14px] outline-none focus:border-gray-500"
                      />
                    ) : (
                      <div className="mt-2 rounded-xl border border-[#2A2A2A] bg-[#1B1B1B] px-4 py-3 text-[14px] text-gray-300">
                        {profile.full_name}
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-[13px] font-medium text-[#A8A8A8]">Email</label>
                    <div className="mt-2 rounded-xl border border-[#2A2A2A] bg-[#1B1B1B] px-4 py-3 text-[14px] text-gray-300">
                      {profile.email}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-[13px] font-medium text-[#A8A8A8]">Phone</label>
                    {editMode ? (
                      <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number || ""}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-xl border border-[#2A2A2A] bg-[#1B1B1B] px-4 py-3 text-[14px] outline-none focus:border-gray-500"
                      />
                    ) : (
                      <div className="mt-2 rounded-xl border border-[#2A2A2A] bg-[#1B1B1B] px-4 py-3 text-[14px] text-gray-300">
                        {profile.phone_number}
                      </div>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <label className="text-[13px] font-medium text-[#A8A8A8]">Location</label>
                    {editMode ? (
                      <input
                        type="text"
                        name="location"
                        value={formData.location || ""}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-xl border border-[#2A2A2A] bg-[#1B1B1B] px-4 py-3 text-[14px] outline-none focus:border-gray-500"
                      />
                    ) : (
                      <div className="mt-2 rounded-xl border border-[#2A2A2A] bg-[#1B1B1B] px-4 py-3 text-[14px] text-gray-300">
                        {profile.location || "Not available"}
                      </div>
                    )}
                  </div>
                </div>

                {/* Website */}
                <div className="mt-6">
                  <label className="text-[13px] font-medium text-[#A8A8A8]">Website</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="website_portfolio_url"
                      value={formData.website_portfolio_url || ""}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border border-[#2A2A2A] bg-[#1B1B1B] px-4 py-3 text-[14px] outline-none focus:border-gray-500"
                    />
                  ) : (
                    <div className="mt-2 rounded-xl border border-[#2A2A2A] bg-[#1B1B1B] px-4 py-3 text-[14px] text-gray-300">
                      {profile.website_portfolio_url || "Not available"}
                    </div>
                  )}
                </div>

                {/* Bio */}
                <div className="mt-6">
                  <label className="text-[13px] font-medium text-[#A8A8A8]">Bio</label>
                  {editMode ? (
                    <textarea
                      rows={4}
                      name="bio"
                      value={formData.bio || ""}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border border-[#2A2A2A] bg-[#1B1B1B] p-4 text-[14px] outline-none focus:border-gray-500"
                    />
                  ) : (
                    <div className="mt-2 min-h-[100px] rounded-xl border border-[#2A2A2A] bg-[#1B1B1B] p-4 text-[14px] text-gray-300">
                      {profile.bio || "No bio added yet."}
                    </div>
                  )}
                </div>

                {/* Skills */}
                <div className="mt-6">
                  <label className="text-[13px] font-medium text-[#A8A8A8]">Skills & Expertise</label>
                  {editMode ? (
                    <>
                      <div className="mt-2 flex gap-3">
                        <input
                          type="text"
                          placeholder="Enter a skill"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') handleAddSkill(); }}
                          className="w-full rounded-xl border border-[#2A2A2A] bg-[#1B1B1B] px-4 py-3 text-[14px] outline-none focus:border-gray-500"
                        />
                        <button
                          onClick={handleAddSkill}
                          className="whitespace-nowrap rounded-xl bg-[#2A2A2A] px-6 py-3 text-[14px] font-medium text-white transition hover:bg-[#3A3A3A]"
                        >
                          Add Skill
                        </button>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-3">
                        {formData.skills && formData.skills.length > 0 ? (
                          formData.skills.map((skill, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 rounded-full border border-[#2A2A2A] bg-[#1B1B1B] px-4 py-1.5 text-[13px] font-medium text-white"
                            >
                              <span>{skill}</span>
                              <button
                                onClick={() => handleRemoveSkill(skill)}
                                className="text-gray-400 hover:text-white"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ))
                        ) : null}
                      </div>
                    </>
                  ) : (
                    <div className="mt-3 flex flex-wrap gap-3">
                      {profile.skills && profile.skills.length > 0 ? (
                        profile.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-[#E50914] px-4 py-1.5 text-[13px] font-medium text-white"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-[14px] text-gray-500">No skills added yet</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Achievements Card (Now correctly spans all 12 columns) */}
            <div className="col-span-12">
              <div className="rounded-[24px] border border-[#2A2A2A] bg-[#141414] p-8">
                <div className="mb-8 flex items-center gap-3">
                  <Award className="text-white" size={20} />
                  <h2 className="text-[20px] font-semibold text-white">Achievements & Awards</h2>
                </div>
                
                {editMode ? (
                  <>
                    <div className="mb-6 flex gap-3">
                      <input
                        type="text"
                        placeholder="Enter achievement"
                        value={newAchievement}
                        onChange={(e) => setNewAchievement(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleAddAchievement(); }}
                        className="w-full rounded-xl border border-[#2A2A2A] bg-[#1B1B1B] px-4 py-3 text-[14px] outline-none focus:border-gray-500"
                      />
                      <button
                        onClick={handleAddAchievement}
                        className="whitespace-nowrap rounded-xl bg-[#2A2A2A] px-6 py-3 text-[14px] font-medium text-white transition hover:bg-[#3A3A3A]"
                      >
                        Add Achievement
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      {formData.achievements && formData.achievements.length > 0 ? (
                        formData.achievements.map((achievement, index) => (
                          <div
                            key={index}
                            className="relative flex h-[140px] flex-col items-center justify-center gap-4 rounded-[20px] bg-[#1A1A1A] p-6 text-center"
                          >
                            <button
                              onClick={() => handleRemoveAchievement(achievement)}
                              className="absolute right-4 top-4 text-gray-400 hover:text-white"
                            >
                              <X size={18} />
                            </button>
                            <Award className="text-[#E50914]" size={32} strokeWidth={1.5} />
                            <span className="text-[14px] font-medium text-white">
                              {achievement}
                            </span>
                          </div>
                        ))
                      ) : null}
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {profile.achievements && profile.achievements.length > 0 ? (
                      profile.achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className="flex h-[140px] flex-col items-center justify-center gap-4 rounded-[20px] bg-[#1A1A1A] p-6 text-center"
                        >
                          <Award className="text-[#E50914]" size={32} strokeWidth={1.5} />
                          <span className="text-[14px] font-medium text-white">
                            {achievement}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="flex h-[140px] flex-col items-center justify-center gap-4 rounded-[20px] bg-[#1A1A1A] p-6 text-center">
                        <Award className="text-[#E50914]" size={32} strokeWidth={1.5} />
                        <span className="text-[14px] font-medium text-white">
                          No Achievement Added
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}