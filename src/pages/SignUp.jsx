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
  Globe,
  LockKeyhole,
  Headset,
  BadgeCheck,
  LogIn,
  CircleDollarSign
} from "lucide-react";
import Footer from "./Footer";



function SignUp() {
  const [accountType, setAccountType] = useState("job-seeker");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">

      {/* Navbar */}
      <nav className="flex flex-col sm:flex-row justify-between items-center gap-4 px-5 md:px-12 py-5 bg-white border-b">
        <div className="flex items-center gap-3">
          <LockKeyhole className="size-12 bg-blue-600 text-white p-2 rounded-xl" />

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-blue-600">
                LocalHire
              </h1>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md">
                Punjab-Tricity
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Connecting local workers & verified employers
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-600">Already Registered?</p>
          <button className="flex items-center gap-2 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
            <LogIn size={17} />
            Log in
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-12">

        {/* Page Heading */}
        <header className="text-center mb-10">
          <p className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-5">
            <BadgeCheck size={18} />
            Official Regional Operational Gateway
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Create Your LocalHire Account
          </h1>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Join 45,000+ verified job seekers and 4,200+ local businesses
            across Mohali, Chandigarh, and North Indian hubs.
          </p>
        </header>

        {/* Signup Card */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md border border-gray-200 p-5 md:p-8">

          {/* Account Type */}
          <h2 className="text-lg font-bold mb-5">
            Select your Account Type
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">

            {/* Job Seeker */}
            <div
              onClick={() => setAccountType("job-seeker")}
              className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all ${accountType === "job-seeker"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-gray-400"
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
                <div className="bg-blue-600 text-white p-3 rounded-xl h-fit">
                  <User size={22} />
                </div>

                <div>
                  <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                    Free for Workers
                  </span>

                  <h3 className="font-bold mt-2">
                    Looking for a Job
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    Candidate / Operational Employee
                  </p>

                  <ul className="mt-4 space-y-2 text-xs text-gray-600">
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
              className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all ${accountType === "employer"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-gray-400"
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
                <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl h-fit">
                  <Briefcase size={22} />
                </div>

                <div>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
                    Verified Businesses
                  </span>

                  <h3 className="font-bold mt-2">
                    Want to Hire Workers
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    Employer / Shop / Factory / Fleet
                  </p>

                  <ul className="mt-4 space-y-2 text-xs text-gray-600">
                    <li className="flex gap-2">
                      <CheckCircle size={15} className="text-blue-600 shrink-0" />
                      Post operational jobs quickly
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle size={15} className="text-blue-600 shrink-0" />
                      Access verified candidates
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle size={15} className="text-blue-600 shrink-0" />
                      Direct walk-in scheduling
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Signup Form */}
          <div className="border-t pt-7">

            <h2 className="text-xl font-bold mb-1">
              {accountType === "job-seeker"
                ? "Create Your Job Seeker Account"
                : "Create Your Employer Account"}
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Enter your details to get started with LocalHire.
            </p>

            <form className="space-y-5">

              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={19} />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    required
                    className="w-full border border-gray-300 rounded-lg py-3 pl-11 pr-4 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={19} />
                  <input
                    type="email"
                    placeholder="example@email.com"
                    required
                    className="w-full border border-gray-300 rounded-lg py-3 pl-11 pr-4 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-400" size={19} />
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                    className="w-full border border-gray-300 rounded-lg py-3 pl-11 pr-4 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={19} />
                  <input
                    type="text"
                    placeholder="Enter your city"
                    required
                    className="w-full border border-gray-300 rounded-lg py-3 pl-11 pr-4 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={19} />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    required

                    className="w-full border border-gray-300 rounded-lg py-3 pl-11 pr-12 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={19} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    required
                    className="w-full border border-gray-300 rounded-lg py-3 pl-11 pr-12 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400"
                  >
                    {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <input type="checkbox" required className="mt-1 accent-blue-600" />
                <p>
                  I agree to the{" "}
                  <a href="#" className="text-blue-600 font-semibold">
                    Terms & Conditions
                  </a>{" "}
                  and Privacy Policy.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all shadow-sm"
              >
                Create Account
              </button>

            </form>
          </div>
        </div>
        {/* 
        <p className="text-center text-sm text-gray-400 mt-8">
          © 2026 LocalHire. All rights reserved.
        </p> */}
        {/* bottom section */}
        <div className="flex my-8 gap-10">
          <div className="flex gap-2 border-2 w-75
         rounded-2xl p-4 items-center justify-center">
            <CircleDollarSign className="bg-green-400 p-2 rounded-2xl size-12" />
            <div className="">
              <h1 className="font-bold">100% Free for workers</h1>
              <p className="text-gray-500">Zero hidden cost and wage deduction free</p>
            </div>
          </div>
          <div className="flex gap-2 border-2 w-75
         rounded-2xl p-4 items-center justify-center">
            <CircleDollarSign className="bg-green-400 p-2 rounded-2xl size-12" />
            <div >
              <h1 className="font-bold">UIDAI Adhar Verified </h1>
              <p className="text-gray-500">Direct e-KYC complience for safe hiring </p>
            </div>
          </div>
          <div className="flex gap-2 border-2 w-75
         rounded-2xl p-4 items-center justify-center">
            <CircleDollarSign className="bg-green-400 p-2 rounded-2xl size-12" />
            <div className="">
              <h1 className="font-bold">100% Free for workers</h1>
              <p className="text-gray-500">Zero hidden cost and wage deduction free</p>
            </div>
          </div>
        </div>

        <div className="flex bg-blue-50 p-5 px-6 rounded-2xl justify-between">
          <div className="flex gap-3  items-center">
            <Headset className="size-8.5 bg-blue-200 p-1 rounded-lg" />
            <div>
              <h1 className="font-bold">Need assistence setting up your profile</h1>
              <p>Hindi, punjabi, and English telephone support available 8 AM - 8PM </p>
            </div>
          </div>
          <div className="flex gap-1 items-center bg-white border-2 rounded-2xl px-5 ">
            <Phone className="text-green-500 size-5" />
            <span>1800-245-6677 (toll-free)</span>

          </div>
        </div>
      </main>


      <Footer/>
      {/* <FooterBoottom/> */}
    </div>
  );
}

export default SignUp;
