"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";
import Toast from "@/components/ui/Toast";

const LoginPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // { message, type }

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

      const role = response.user.role;
      if (role) {
        localStorage.setItem(`${role.toLowerCase()}_token`, response.token);
        localStorage.setItem(`${role.toLowerCase()}_user`, JSON.stringify(response.user));
      }

      setToast({ message: response.message || "Login successful", type: "success" });

      // Navigate after a short delay so the user sees the toast
      setTimeout(() => {
        if (role === "FILMMAKER") {
          router.push("/dashboard/filmmaker");
        } else if (role === "INVESTOR") {
          router.push("/dashboard/investor");
        } else if (role === "TALENT") {
          router.push("/dashboard/talent");
        } else {
          router.push("/");
        }
      }, 1000);

    } catch (error) {
      console.error(error);

      setToast({
        message: error?.response?.data?.message || "Login failed",
        type: "error",
      });
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

      {/* Toast notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950/90 p-6 sm:p-10 backdrop-blur-md shadow-[0_25px_80px_rgba(0,0,0,0.8)]">

        <h1 className="mb-2 text-center text-2xl sm:text-3xl font-bold text-white">
          Welcome Back
        </h1>

        <p className="mb-6 sm:mb-8 text-center text-sm sm:text-base text-zinc-400">
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
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-red-500 transition-all duration-300 focus:ring-2 focus:ring-red-500/20"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-red-500 transition-all duration-300 focus:ring-2 focus:ring-red-500/20"
          />

          <div className="text-right">
            <button
              type="button"
              className="text-xs sm:text-sm text-red-500 hover:text-red-400 font-medium"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-red-700 to-red-500 py-3.5 text-base font-semibold text-white transition hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 hover:shadow-[0_0_20px_rgba(239,68,68,0.25)]"
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