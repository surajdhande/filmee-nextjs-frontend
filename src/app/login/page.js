"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";

const LoginPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", response.token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );

      alert(response.message || "Login successful");

      const role = response.user.role;

      if (role === "FILMMAKER") {
        router.push("/dashboard/filmmaker");
      } else if (role === "INVESTOR") {
        router.push("/dashboard/investor");
      } else if (role === "TALENT") {
        router.push("/dashboard/talent");
      } else {
        router.push("/");
      }

    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
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

      <div className="relative z-10 w-full max-w-lg rounded-3xl border border-white/10 bg-zinc-950/90 p-10 backdrop-blur-md shadow-[0_25px_80px_rgba(0,0,0,0.8)]">

        <h1 className="mb-2 text-center text-3xl font-bold text-white">
          Welcome Back
        </h1>

        <p className="mb-8 text-center text-zinc-400">
          Sign in to your Filmee account
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white outline-none focus:border-red-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white outline-none focus:border-red-500"
          />

          <div className="text-right">
            <button
              type="button"
              className="text-sm text-red-500 hover:text-red-400"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-red-700 to-red-500 py-3 font-semibold text-white transition hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <div className="text-center text-sm text-zinc-400">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-red-500 hover:text-red-400"
            >
              Create Account
            </Link>
          </div>

        </form>

      </div>

    </div>
  );
}

export default LoginPage;