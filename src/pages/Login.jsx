import React, { useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  BadgeCheck,
  MapPin,
  ShieldCheck,
  Users,
  Wallet,
  MessageCircle,
  LockKeyhole,
  Mail,
  Eye,
  EyeOff,
  Moon,
  Sun,
  ArrowRight,
  Phone,
  Navigation,
  MessageSquare,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { loginUser } from "../features/auth/authSlice";

function Login() {
  const [role, setRole] = useState("EMPLOYEE");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const { isDark, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Login button clicked");
    console.log("Username:", email);
    console.log("Password entered:", password.length > 0);

    try {
      const result = await dispatch(
        loginUser({
          username: email,
          password: password,
        }),
      ).unwrap();

      if (result.role === "EMPLOYER") {
        navigate("/employer/dashboard");
      } else if (result.role === "EMPLOYEE") {
        navigate("/employee/dashboard");
      }
    } catch (error) {
      const message =
        typeof error === "string"
          ? error
          : error?.message ||
            (error?.error && typeof error.error === "string"
              ? error.error
              : error?.error?.message) ||
            error?.payload ||
            "Login failed. Please try again.";

      console.error("Login error:", error);
      // alert(message);
    }
  };

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen w-full bg-slate-100 dark:bg-slate-950">
        {/* Main application container */}
        <div className="min-h-screen w-full bg-white dark:bg-slate-900 overflow-hidden">
          {/* ================= HEADER ================= */}
          <header className="h-20 w-full px-5 sm:px-8 flex items-center justify-between border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 text-white p-2 rounded-xl">
                <BriefcaseBusiness size={20} />
              </div>

              <span className="font-bold text-lg text-slate-900 dark:text-white">
                LocalHire
              </span>

              <span className="hidden sm:block text-[9px] font-bold tracking-wide text-blue-700 bg-blue-100 px-2 py-1 rounded">
                PUNJAB-TRICITY
              </span>
            </div>

            {/* Header actions */}
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="hidden sm:flex items-center gap-2 text-[10px] bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full text-slate-600 dark:text-slate-300">
                <Phone size={12} className="text-emerald-600" />
                Helpline:
                <strong className="text-slate-900 dark:text-white">
                  1800-245-6677
                </strong>
                (Toll Free)
              </div>

              <button
                type="button"
                className="hidden sm:flex items-center gap-1 text-xs text-blue-700 dark:text-blue-400"
              >
                EN / ਪੰਜਾਬੀ / हिन्दी
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={17} /> : <Moon size={17} />}
              </button>
            </div>
          </header>

          {/* ================= MAIN CONTENT ================= */}
          <main className="grid grid-cols-1 md:grid-cols-[42fr_58fr] min-h-[calc(100vh-56px)]">
            {/* ================= LEFT PANEL ================= */}
            <section className="min-w-0 bg-gradient-to-br from-blue-50 to-slate-50 dark:from-slate-800 dark:to-slate-900 px-6 sm:px-8 lg:px-10 py-8 lg:py-9 border-r border-slate-200 dark:border-slate-700 flex flex-col">
              <div className="w-full max-w-[480px] mx-auto">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-full px-3 py-1 text-[10px] font-semibold mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Official Regional Operational Gateway
                </div>

                {/* Hero */}
                <h1 className="text-3xl lg:text-[32px] font-bold tracking-tight text-slate-900 dark:text-white leading-tight mb-3">
                  Your next opportunity starts here.
                </h1>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Connect with local employers and discover opportunities closer
                  to home across Mohali, Chandigarh, and North Indian commercial
                  hubs.
                </p>

                {/* Locations */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    "Mohali Industrial Area (Phase 1-8)",
                    "Chandigarh IT Park & Retail",
                    "Panchkula & Zirakpur Logistics",
                  ].map((location) => (
                    <div
                      key={location}
                      className="flex items-center gap-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-md px-2 py-1 text-[9px] text-slate-600 dark:text-slate-300"
                    >
                      <MapPin size={11} className="text-blue-600 shrink-0" />
                      {location}
                    </div>
                  ))}
                </div>

                {/* Comparison card */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 shadow-sm mb-7">
                  <div className="grid grid-cols-[1fr_0.85fr_1fr] gap-2 items-center">
                    {/* Local Talent */}
                    <div className="bg-blue-50 dark:bg-slate-700 border border-blue-100 dark:border-slate-600 rounded-xl p-2 sm:p-3 text-center">
                      <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-2">
                        <Users size={18} />
                      </div>

                      <h3 className="text-[10px] font-bold text-slate-800 dark:text-white">
                        Local Talent
                      </h3>

                      <p className="text-[9px] text-slate-500 dark:text-slate-300 mt-1">
                        Verified Workers
                      </p>

                      <span className="inline-block mt-2 bg-emerald-100 text-emerald-700 text-[8px] px-2 py-1 rounded font-semibold">
                        e-KYC
                      </span>
                    </div>

                    {/* Direct Match */}
                    <div className="text-center min-w-0">
                      <div className="border border-slate-200 dark:border-slate-600 rounded-full px-1 py-1 text-[9px] font-bold text-slate-700 dark:text-slate-200 whitespace-nowrap">
                        <BadgeCheck
                          size={11}
                          className="inline mr-1 text-blue-600"
                        />
                        Direct Match
                      </div>

                      <p className="text-[9px] text-slate-400 mt-1">
                        Guaranteed
                      </p>

                      <Wallet
                        size={13}
                        className="mx-auto mt-1 text-emerald-600"
                      />

                      <p className="text-[9px] text-emerald-600 font-bold mt-1">
                        ₹14,500 - ₹28,000 / mo
                      </p>
                    </div>

                    {/* Local Business */}
                    <div className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl p-2 sm:p-3 text-center">
                      <div className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center mx-auto mb-2">
                        <Building2 size={18} />
                      </div>

                      <h3 className="text-[10px] font-bold text-slate-800 dark:text-white">
                        Local Business
                      </h3>

                      <p className="text-[9px] text-slate-500 dark:text-slate-300 mt-1">
                        GST Registered
                      </p>

                      <span className="inline-block mt-2 bg-blue-100 text-blue-700 text-[8px] px-2 py-1 rounded font-semibold">
                        Trusted Hub
                      </span>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="grid grid-cols-3 border-t border-slate-100 dark:border-slate-600 mt-3 pt-3 text-center">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-white">
                        1,420+
                      </h4>
                      <p className="text-[8px] text-slate-400">Active Shifts</p>
                    </div>

                    <div className="border-x border-slate-100 dark:border-slate-600">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-white">
                        &lt; 8 km
                      </h4>
                      <p className="text-[8px] text-slate-400">Avg. Commute</p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-white">
                        Same Day
                      </h4>
                      <p className="text-[8px] text-slate-400">
                        Interview Calls
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <FeatureCard
                    icon={<Navigation size={17} />}
                    title="Local Opportunities"
                    description="Verified shifts & walk-ins within 5-10 km of your residence."
                    color="blue"
                  />

                  <FeatureCard
                    icon={<MessageCircle size={17} />}
                    title="Easy Applications"
                    description="1-tap apply, zero resume friction & instant WhatsApp alerts."
                    color="green"
                  />

                  <FeatureCard
                    icon={<ShieldCheck size={17} />}
                    title="Trusted Employers"
                    description="GST & shop-act validated stores with guaranteed pay clarity."
                    color="yellow"
                  />
                </div>
              </div>

              {/* Left footer */}
              <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-wrap justify-between gap-2 text-[9px] text-slate-500 dark:text-slate-400">
                <span>Empowering North India's Operational Talent</span>
                <span>ISO 27001 Certified System</span>
              </div>
            </section>

            {/* ================= RIGHT PANEL ================= */}
            <section className="min-w-0 bg-white dark:bg-slate-900 flex items-center justify-center px-6 sm:px-10 lg:px-14 xl:px-20 py-12">
              {/* Login form container */}
              <div className="w-full max-w-[450px] mx-auto">
                {/* Heading */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Welcome back!
                  </h2>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Sign in to continue to LocalHire.
                  </p>
                </div>

                {/* Role selector */}
                <div className="grid grid-cols-2 bg-slate-100 dark:bg-slate-800 rounded-lg p-1 mb-5">
                  <button
                    type="button"
                    onClick={() => setRole("EMPLOYEE")}
                    className={`flex items-center justify-center gap-2 rounded-md py-2.5 text-[10px] font-medium transition ${
                      role === "WORKER"
                        ? "bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow-sm"
                        : "text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    <Users size={13} />
                    Worker / Job Seeker
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole("EMPLOYER")}
                    className={`flex items-center justify-center gap-2 rounded-md py-2.5 text-[10px] font-medium transition ${
                      role === "EMPLOYEE"
                        ? "bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow-sm"
                        : "text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    <Building2 size={13} />
                    Employer / Business
                  </button>
                </div>

                {/* Role information */}
                <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 mb-5">
                  <BriefcaseBusiness
                    size={13}
                    className="text-blue-600 shrink-0"
                  />

                  {role === "EMPLOYEE"
                    ? "Access your worker applications, shift offers & interviews."
                    : "Manage job postings, applications & your workforce."}
                </div>

                {/* Login form */}
                <form onSubmit={handleLogin}>
                  {/* Email */}
                  <div className="mb-4">
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-200 mb-2">
                      Email Address or Phone Number
                      <span className="text-red-500"> *</span>
                    </label>

                    <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-lg px-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900 transition">
                      <Mail size={15} className="text-slate-400 shrink-0" />

                      <input
                        type="text"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com or 10-digit mobile"
                        className="w-full min-w-0 bg-transparent outline-none px-2 py-3 text-xs text-slate-800 dark:text-white placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="mb-4">
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-200 mb-2">
                      Password
                      <span className="text-red-500"> *</span>
                    </label>

                    <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-lg px-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900 transition">
                      <LockKeyhole
                        size={15}
                        className="text-slate-400 shrink-0"
                      />

                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your security password"
                        className="w-full min-w-0 bg-transparent outline-none px-2 py-3 text-xs text-slate-800 dark:text-white placeholder:text-slate-400"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="text-slate-400 hover:text-blue-600"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? (
                          <EyeOff size={15} />
                        ) : (
                          <Eye size={15} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember me and Forgot password */}
                  <div className="flex items-center justify-between mb-5">
                    <label className="flex items-center gap-2 text-[10px] text-slate-600 dark:text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="accent-blue-600"
                      />
                      Remember me
                    </label>

                    <a
                      href="/forgot-password"
                      className="text-[10px] font-semibold text-blue-600 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>

                  {/* Login button */}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3.5 text-xs font-semibold flex items-center justify-center gap-2 transition shadow-sm"
                  >
                    Sign In to LocalHire
                    <ArrowRight size={16} />
                  </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                  <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1" />

                  <span className="text-[9px] text-slate-400 whitespace-nowrap">
                    OR QUICK ACCESS
                  </span>

                  <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1" />
                </div>

                {/* Alternative login */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className="border border-slate-200 dark:border-slate-600 rounded-lg py-3 flex items-center justify-center gap-2 text-[10px] font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                  >
                    <MessageSquare size={14} className="text-blue-600" />
                    Sign in with OTP
                  </button>

                  <button
                    type="button"
                    className="border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-lg py-3 flex items-center justify-center gap-2 text-[10px] font-medium text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition"
                  >
                    <MessageCircle size={14} />
                    WhatsApp Login
                  </button>
                </div>

                {/* Signup */}
                <div className="text-center mt-6 text-[10px] text-slate-500 dark:text-slate-400">
                  Don't have an account yet?{" "}
                  <a
                    href="/signup"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Create account
                  </a>
                </div>

                {/* Security footer */}
                <div className="border-t border-slate-100 dark:border-slate-700 mt-5 pt-4 text-center">
                  <div className="flex flex-wrap items-center justify-center gap-2 text-[9px] text-slate-500 dark:text-slate-400">
                    <LockKeyhole size={12} className="text-emerald-600" />

                    <span>256-bit Bank Grade Security</span>

                    <span>•</span>

                    <span>Zero Registration Fees for Job Seekers</span>
                  </div>

                  <p className="text-[8px] text-slate-400 mt-2">
                    Regulated under Government of Punjab Skill Development &
                    Employment Hub guidelines.
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE FEATURE CARD ================= */

function FeatureCard({ icon, title, description, color }) {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-emerald-100 text-emerald-600",
    yellow: "bg-amber-100 text-amber-600",
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 min-w-0 min-h-[120px]">
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center mb-2 ${colors[color]}`}
      >
        {icon}
      </div>

      <h4 className="text-[10px] font-bold text-slate-900 dark:text-white mb-1">
        {title}
      </h4>

      <p className="text-[9px] text-slate-500 dark:text-slate-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default Login;
