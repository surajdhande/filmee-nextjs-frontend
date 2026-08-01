"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { useRouter, useSearchParams } from "next/navigation";
import { signupUser } from "@/services/authService";
import {
  User,
  Mail,
  Phone,
  Lock,
  Clapperboard,
} from "lucide-react";

const SignupPageInner = () => {
const router = useRouter();
const searchParams = useSearchParams();
const selectedRole = useMemo(
  () => searchParams.get("role"),
  [searchParams]
);
const [formData, setFormData] = useState({
first_name: "",
last_name: "",
email: "",
phone_number: "",
password: "",
confirm_password: "",
user_role: "",
});

const [loading, setLoading] = useState(false);
useEffect(() => {
  if (!selectedRole) return;

  const roleUpper = selectedRole.toUpperCase();
  const allowedRoles = new Set([
    "FILMMAKER",
    "INVESTOR",
    "TALENT",
  ]);

  if (!allowedRoles.has(roleUpper)) return;

  setFormData((prev) => ({
    ...prev,
    user_role: roleUpper,
  }));

}, [selectedRole]);
const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirm_password) {
    alert("Passwords do not match");
    return;
  }

  setLoading(true);

  try {
    const payload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone_number: formData.phone_number,
      password: formData.password,
      user_role: formData.user_role,
    };

    const response = await signupUser(payload);

    alert(response.message);

    if (formData.user_role === "TALENT") {
      router.push("/talent/dashboard");
    } else {
      router.push("/login");
    }

  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Signup failed"
    );
  } finally {
    setLoading(false);
  }
};

return ( <div
  className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/80" />

  <div className="relative z-10 w-full max-w-xl rounded-3xl border border-white/10 bg-zinc-950/85 p-10 backdrop-blur-md shadow-[0_25px_80px_rgba(0,0,0,0.8)]">

  {/* Brand */}
  <div className="mb-10 text-center">

  <h2 className="text-4xl font-bold tracking-tight text-white">
    Create Your Account
  </h2>

  <p className="mt-4 text-zinc-400 leading-7">
    Join filmmakers, investors and talent on one powerful
    platform to bring creative ideas to life.
  </p>

  </div>

    <form onSubmit={handleSubmit} className="space-y-5">

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

    <input
      type="text"
      name="first_name"
      placeholder="First Name"
      value={formData.first_name}
      onChange={handleChange}
      required
      className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
    />

    <input
      type="text"
      name="last_name"
      placeholder="Last Name"
      value={formData.last_name}
      onChange={handleChange}
      required
      className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
    />

  </div>

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
      />

      <input
        type="text"
        name="phone_number"
        placeholder="Phone Number"
        value={formData.phone_number}
        onChange={handleChange}
        required
        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
      />

      <select
      name="user_role"
      value={formData.user_role}
      onChange={handleChange}
      required
      className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
    >
      <option value="" disabled>
        Choose your role
      </option>

      <option value="FILMMAKER">
        Filmmaker
      </option>

      <option value="INVESTOR">
        Investor
      </option>

      <option value="TALENT">
        Talent
      </option>
    </select>

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
      />

      <input
        type="password"
        name="confirm_password"
        placeholder="Confirm Password"
        value={formData.confirm_password}
        onChange={handleChange}
        required
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white outline-none focus:border-red-500"
      />

      <button
        type="submit"
        disabled={loading}
      className="w-full rounded-xl bg-gradient-to-r from-red-700 via-red-600 to-red-500 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(239,68,68,0.35)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      <div className="text-center text-sm text-zinc-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-red-500 hover:text-red-400"
        >
          Sign In
        </Link>
      </div>

    </form>

  </div>

</div>

);
};

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-black text-white">Loading...</div>}>
      <SignupPageInner />
    </Suspense>
  );
}
