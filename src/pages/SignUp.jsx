
import React, { useState } from "react";
import {
  User,
  Briefcase,
  Mail,
  Phone,
  Lock,
  CheckCircle,
  Eye,
  EyeOff,
  MapPin,
  Headset,
  BadgeCheck,
  CircleDollarSign
} from "lucide-react";

import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

function SignUp() {
  const [accountType, setAccountType] = useState("job-seeker");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const inputClass =
    "w-full border border-input bg-surface text-foreground placeholder:text-muted rounded-lg py-3 pl-11 pr-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

  const labelClass =
    "block text-sm font-semibold text-foreground mb-2";

  const accountCardClass =
    "relative p-5 rounded-xl border-2 cursor-pointer transition-all";

  const selectedCardClass =
    "border-selected-border bg-selected-bg";

  const unselectedCardClass =
    "border-border bg-surface hover:border-primary";

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">

      <Header />

      <main className="max-w-5xl mx-auto px-4 py-12">

        {/* Page Heading */}
        <header className="text-center mb-10">

          <p className="inline-flex items-center gap-2 bg-blue-badge-bg text-blue-badge-text px-4 py-2 rounded-full text-sm font-medium mb-5">
            <BadgeCheck size={18} />
            Official Regional Operational Gateway
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Create Your LocalHire Account
          </h1>

          <p className="text-foreground-secondary mt-4 max-w-2xl mx-auto">
            Join 45,000+ verified job seekers and 4,200+ local businesses
            across Mohali, Chandigarh, and North Indian hubs.
          </p>

        </header>

        {/* Signup Card */}
        <div className="max-w-5xl mx-auto bg-surface rounded-2xl shadow-md border border-border p-5 md:p-8">

          {/* Account Type */}
          <h2 className="text-lg font-bold text-heading mb-5">
            Select your Account Type
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">

            {/* Job Seeker */}
            <div
              onClick={() => setAccountType("job-seeker")}
              className={`${accountCardClass} ${
                accountType === "job-seeker"
                  ? selectedCardClass
                  : unselectedCardClass
              }`}
            >

              <input
                type="radio"
                name="accountType"
                checked={accountType === "job-seeker"}
                onChange={() => setAccountType("job-seeker")}
                className="absolute top-5 right-5 accent-blue-600"
              />

              <div className="flex gap-3">

                <div className="bg-primary text-white p-3 rounded-xl h-fit">
                  <User size={22} />
                </div>

                <div>

                  <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                    Free for Workers
                  </span>

                  <h3 className="font-bold text-heading mt-2">
                    Looking for a Job
                  </h3>

                  <p className="text-xs text-muted mt-1">
                    Candidate / Operational Employee
                  </p>

                  <ul className="mt-4 space-y-2 text-xs text-foreground-secondary">

                    <li className="flex gap-2">
                      <CheckCircle size={15} className="text-green-600 shrink-0" />
                      Instant Aadhaar e-KYC verified badge
                    </li>

                    <li className="flex gap-2">
                      <CheckCircle size={15} className="text-green-600 shrink-0" />
                      Direct WhatsApp & SMS interview alerts
                    </li>

                    <li className="flex gap-2">
                      <CheckCircle size={15} className="text-green-600 shrink-0" />
                      Zero agency commission
                    </li>

                  </ul>

                </div>
              </div>
            </div>

            {/* Employer */}
            <div
              onClick={() => setAccountType("employer")}
              className={`${accountCardClass} ${
                accountType === "employer"
                  ? selectedCardClass
                  : unselectedCardClass
              }`}
            >

              <input
                type="radio"
                name="accountType"
                checked={accountType === "employer"}
                onChange={() => setAccountType("employer")}
                className="absolute top-5 right-5 accent-blue-600"
              />

              <div className="flex gap-3">

                <div className="bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 p-3 rounded-xl h-fit">
                  <Briefcase size={22} />
                </div>

                <div>

                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-950 px-2 py-1 rounded-full">
                    Verified Businesses
                  </span>

                  <h3 className="font-bold text-heading mt-2">
                    Want to Hire Workers
                  </h3>

                  <p className="text-xs text-muted mt-1">
                    Employer / Shop / Factory / Fleet
                  </p>

                  <ul className="mt-4 space-y-2 text-xs text-foreground-secondary">

                    <li className="flex gap-2">
                      <CheckCircle size={15} className="text-primary shrink-0" />
                      Post operational jobs quickly
                    </li>

                    <li className="flex gap-2">
                      <CheckCircle size={15} className="text-primary shrink-0" />
                      Access verified candidates
                    </li>

                    <li className="flex gap-2">
                      <CheckCircle size={15} className="text-primary shrink-0" />
                      Direct walk-in scheduling
                    </li>

                  </ul>

                </div>
              </div>
            </div>

          </div>

          {/* Signup Form */}
          <div className="border-t border-border pt-7">

            <h2 className="text-xl font-bold text-heading mb-1">
              {accountType === "job-seeker"
                ? "Create Your Job Seeker Account"
                : "Create Your Employer Account"}
            </h2>

            <p className="text-sm text-muted mb-6">
              Enter your details to get started with LocalHire.
            </p>

            <form className="space-y-5">

              {/* Full Name */}
              <div>
                <label className={labelClass}>
                  Full Name
                </label>

                <div className="relative">
                  <User className="absolute left-3 top-3 text-muted" size={19} />

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className={labelClass}>
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-muted" size={19} />

                  <input
                    type="email"
                    placeholder="example@email.com"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass}>
                  Phone Number
                </label>

                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-muted" size={19} />

                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className={labelClass}>
                  Location
                </label>

                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-muted" size={19} />

                  <input
                    type="text"
                    placeholder="Enter your city"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className={labelClass}>
                  Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-muted" size={19} />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    required
                    className={`${inputClass} pr-12`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className={labelClass}>
                  Confirm Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-muted" size={19} />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    required
                    className={`${inputClass} pr-12`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-muted hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2 text-sm text-foreground-secondary">

                <input
                  type="checkbox"
                  required
                  className="mt-1 accent-blue-600"
                />

                <p>
                  I agree to the{" "}
                  <a href="#" className="text-primary font-semibold">
                    Terms & Conditions
                  </a>{" "}
                  and Privacy Policy.
                </p>

              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-semibold py-3 rounded-lg transition-all shadow-sm"
              >
                Create Account
              </button>

            </form>
          </div>

        </div>

        {/* Bottom Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-8">

          <div className="flex gap-2 border border-border bg-surface rounded-2xl p-4 items-center">
            <CircleDollarSign className="bg-green-400 text-white p-2 rounded-2xl size-12 shrink-0" />

            <div>
              <h3 className="font-bold text-heading">
                100% Free for workers
              </h3>
              <p className="text-muted text-sm">
                Zero hidden cost and wage deduction free
              </p>
            </div>
          </div>

          <div className="flex gap-2 border border-border bg-surface rounded-2xl p-4 items-center">
            <BadgeCheck className="bg-blue-200 text-blue-700 p-2 rounded-2xl size-12 shrink-0" />

            <div>
              <h3 className="font-bold text-heading">
                UIDAI Aadhaar Verified
              </h3>
              <p className="text-muted text-sm">
                Direct e-KYC compliance for safe hiring
              </p>
            </div>
          </div>

          <div className="flex gap-2 border border-border bg-surface rounded-2xl p-4 items-center">
            <CheckCircle className="bg-green-400 text-white p-2 rounded-2xl size-12 shrink-0" />

            <div>
              <h3 className="font-bold text-heading">
                Direct Hiring
              </h3>
              <p className="text-muted text-sm">
                Connect directly with local employers
              </p>
            </div>
          </div>

        </div>

        {/* Support Section */}
        <div className="flex flex-col md:flex-row gap-5 bg-support-bg border border-border p-5 px-6 rounded-2xl justify-between">

          <div className="flex gap-3 items-center">
            <Headset className="size-9 bg-blue-200 dark:bg-blue-900 text-blue-700 dark:text-blue-300 p-1 rounded-lg shrink-0" />

            <div>
              <h3 className="font-bold text-heading">
                Need assistance setting up your profile?
              </h3>

              <p className="text-foreground-secondary">
                Hindi, Punjabi, and English telephone support available 8 AM - 8 PM
              </p>
            </div>
          </div>

          <div className="flex gap-2 items-center bg-surface border border-border rounded-2xl px-5 py-3">
            <Phone className="text-green-500 size-5" />
            <span className="text-foreground font-medium">
              1800-245-6677 (toll-free)
            </span>
          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default SignUp;
