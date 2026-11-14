
import React, { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Bookmark,
  BriefcaseBusiness,
  Clock,
  CheckCircle,
  ShieldCheck,
  Zap,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Building2,
  Store,
  Package,
  Truck,
  Shield,
  Headset,
  Bell,
  UserRound,
  ArrowUpDown,
  Wallet,
  CalendarDays,
  Navigation,
  Heart,
} from "lucide-react";

// Mock jobs for frontend development.
// Replace this array with your Spring Boot API response.

const initialJobs = [
  {
    id: 1,
    title: "Senior Store Cashier & POS Specialist",
    company: "Vishal Mega Mart",
    location: "Phase 5, Mohali",
    city: "Mohali",
    distance: 1.8,
    minSalary: 22000,
    maxSalary: 26000,
    shift: "Morning",
    timing: "8:00 AM - 4:30 PM",
    type: "Full-time",
    category: "Cashier",
    posted: "2 hours ago",
    hoursAgo: 2,
    urgent: true,
    verified: true,
    immediate: true,
    icon: Store,
    benefits: [
      "Aadhaar Verified",
      "PF + ESI Included",
      "Weekly Off",
      "Performance Bonus",
    ],
    description:
      "We are looking for an experienced cashier to manage POS billing, customer transactions and daily cash reconciliation.",
    requirements: [
      "Basic POS billing knowledge",
      "Good communication skills",
      "Previous retail experience preferred",
    ],
  },
  {
    id: 2,
    title: "Warehouse Packing & Inventory Helper",
    company: "BigBasket Fulfillment",
    location: "Industrial Area Phase 8B",
    city: "Mohali",
    distance: 3.2,
    minSalary: 19500,
    maxSalary: 23000,
    shift: "Evening",
    timing: "3:00 PM - 11:30 PM",
    type: "Full-time",
    category: "Helper",
    posted: "5 hours ago",
    hoursAgo: 5,
    urgent: false,
    verified: true,
    immediate: true,
    icon: Package,
    benefits: [
      "Overtime ₹120/hr",
      "Attendance Bonus ₹2,000",
      "Free Canteen Meal",
    ],
    description:
      "Assist with packaging, inventory management, barcode scanning and warehouse operations.",
    requirements: [
      "Ability to handle physical work",
      "Basic inventory knowledge",
      "Ability to work in a team",
    ],
  },
  {
    id: 3,
    title: "Retail Sales Associate (Fashion)",
    company: "Pantaloons",
    location: "Elante Mall, Chandigarh",
    city: "Chandigarh",
    distance: 4.5,
    minSalary: 20000,
    maxSalary: 25000,
    shift: "Day",
    timing: "10:30 AM - 8:30 PM",
    type: "Full-time",
    category: "Sales",
    posted: "1 day ago",
    hoursAgo: 24,
    urgent: false,
    verified: true,
    immediate: false,
    icon: BriefcaseBusiness,
    benefits: [
      "Store Discount 30%",
      "Incentives up to ₹6k/mo",
      "AC Showroom",
    ],
    description:
      "Help customers choose products, maintain store displays and support daily sales operations.",
    requirements: [
      "Customer handling skills",
      "Basic English or Hindi",
      "Retail experience preferred",
    ],
  },
  {
    id: 4,
    title: "On-Demand Grocery Delivery Partner",
    company: "Blinkit Hub",
    location: "Sector 70 Hub, Mohali",
    city: "Mohali",
    distance: 1.2,
    minSalary: 24000,
    maxSalary: 30000,
    shift: "Flexible",
    timing: "Any 6-8 hours",
    type: "Part-time",
    category: "Delivery",
    posted: "3 hours ago",
    hoursAgo: 3,
    urgent: false,
    verified: true,
    immediate: true,
    icon: Truck,
    benefits: [
      "₹3,000 Joining Bonus",
      "Fuel Allowance ₹3.5/km",
      "Accident Insurance",
    ],
    description:
      "Deliver grocery orders to customers within your assigned local delivery zone.",
    requirements: [
      "Valid driving licence",
      "Two-wheeler required",
      "Smartphone required",
    ],
  },
  {
    id: 5,
    title: "Facilities Cleaning Supervisor",
    company: "Max Super Speciality",
    location: "Sector 56, Mohali",
    city: "Mohali",
    distance: 2.4,
    minSalary: 17000,
    maxSalary: 20000,
    shift: "Morning",
    timing: "7:00 AM - 3:30 PM",
    type: "Full-time",
    category: "Cleaning",
    posted: "2 days ago",
    hoursAgo: 48,
    urgent: false,
    verified: true,
    immediate: false,
    icon: Building2,
    benefits: [
      "Hospital Medical Cover",
      "Uniform Provided",
      "ESI Included",
    ],
    description:
      "Supervise housekeeping activities and maintain hygiene standards throughout the facility.",
    requirements: [
      "Previous housekeeping experience",
      "Team management skills",
      "Basic communication skills",
    ],
  },
  {
    id: 6,
    title: "Gate Security Officer",
    company: "Homeland Regalia",
    location: "Sector 77, Mohali",
    city: "Mohali",
    distance: 2.9,
    minSalary: 18000,
    maxSalary: 21000,
    shift: "Day",
    timing: "8:00 AM - 8:00 PM",
    type: "Full-time",
    category: "Security",
    posted: "1 day ago",
    hoursAgo: 30,
    urgent: false,
    verified: false,
    immediate: false,
    icon: Shield,
    benefits: [
      "Accommodation Facility",
      "Tea & Snacks Provided",
      "ESI & PF",
    ],
    description:
      "Monitor entry and exit points, verify visitors and maintain security at the premises.",
    requirements: [
      "Good observation skills",
      "Basic communication skills",
      "Previous security experience preferred",
    ],
  },
];

const popularRoles = [
  "Cashier",
  "Helper",
  "Delivery",
  "Sales",
  "Cleaning",
  "Security",
  "Warehouse",
];

const cities = [
  "Mohali",
  "Chandigarh",
  "Panchkula",
  "Ludhiana",
];

const salaryRanges = [
  { label: "₹12,000 - ₹18,000", min: 12000, max: 18000 },
  { label: "₹18,000 - ₹25,000", min: 18000, max: 25000 },
  { label: "₹25,000 - ₹35,000", min: 25000, max: 35000 },
  { label: "₹35,000+", min: 35000, max: Infinity },
];

const shifts = [
  { name: "Morning", time: "8 AM - 4 PM" },
  { name: "Evening", time: "2 PM - 10 PM" },
  { name: "Night", time: "9 PM - 5 AM" },
  { name: "Day", time: "10 AM - 8 PM" },
  { name: "Flexible", time: "Flexible hours" },
];

function JobDiscovery() {
  const [jobs] = useState(initialJobs);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("Mohali");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedCity, setSelectedCity] = useState("Mohali");

  const [radius, setRadius] = useState(5);
  const [selectedSalaries, setSelectedSalaries] = useState([]);
  const [selectedShifts, setSelectedShifts] = useState([]);

  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [immediateOnly, setImmediateOnly] = useState(false);

  const [sortBy, setSortBy] = useState("Best Match");

  const [savedJobs, setSavedJobs] = useState([]);
  const [activeTab, setActiveTab] = useState("Explore Jobs");
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);

  // FILTERING AND SORTING
  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.category.toLowerCase().includes(query) ||
        job.benefits.some(b => b.toLowerCase().includes(query))
      );
    }

    if (selectedRole) {
      result = result.filter(job =>
        job.category.toLowerCase().includes(selectedRole.toLowerCase()) ||
        job.title.toLowerCase().includes(selectedRole.toLowerCase())
      );
    }

    if (location.trim()) {
      const query = location.toLowerCase();

      result = result.filter(job =>
        job.location.toLowerCase().includes(query) ||
        job.city.toLowerCase().includes(query)
      );
    }

    if (selectedCity !== "All") {
      result = result.filter(job => job.city === selectedCity);
    }

    result = result.filter(job => job.distance <= radius);

    if (selectedSalaries.length > 0) {
      result = result.filter(job =>
        selectedSalaries.some(index => {
          const range = salaryRanges[index];

          return (
            job.maxSalary >= range.min &&
            job.minSalary <= range.max
          );
        })
      );
    }

    if (selectedShifts.length > 0) {
      result = result.filter(job =>
        selectedShifts.includes(job.shift)
      );
    }

    if (verifiedOnly) {
      result = result.filter(job => job.verified);
    }

    if (immediateOnly) {
      result = result.filter(job => job.immediate);
    }

    if (activeTab === "Saved Jobs") {
      result = result.filter(job => savedJobs.includes(job.id));
    }

    if (activeTab === "My Applications") {
      result = result.filter(job => appliedJobs.includes(job.id));
    }

    if (sortBy === "Highest Pay") {
      result.sort((a, b) => b.maxSalary - a.maxSalary);
    } else if (sortBy === "Nearest First") {
      result.sort((a, b) => a.distance - b.distance);
    } else if (sortBy === "Most Recent") {
      result.sort((a, b) => a.hoursAgo - b.hoursAgo);
    }

    return result;
  }, [
    jobs,
    search,
    location,
    selectedRole,
    selectedCity,
    radius,
    selectedSalaries,
    selectedShifts,
    verifiedOnly,
    immediateOnly,
    sortBy,
    activeTab,
    savedJobs,
    appliedJobs,
  ]);

  const toggleSalary = (index) => {
    setSelectedSalaries(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const toggleShift = (shift) => {
    setSelectedShifts(prev =>
      prev.includes(shift)
        ? prev.filter(item => item !== shift)
        : [...prev, shift]
    );
  };

  const toggleSaved = (id) => {
    setSavedJobs(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const resetFilters = () => {
    setSearch("");
    setLocation("");
    setSelectedRole("");
    setSelectedCity("All");
    setRadius(15);
    setSelectedSalaries([]);
    setSelectedShifts([]);
    setVerifiedOnly(false);
    setImmediateOnly(false);
    setSortBy("Best Match");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSelectedRole("");
  };

  const applyForJob = (id) => {
    setAppliedJobs(prev =>
      prev.includes(id) ? prev : [...prev, id]
    );

    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* EMPLOYEE HEADER */}
      <header className="sticky top-0 z-40 border-b border-border bg-surface shadow-sm">

        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">

          <a href="/employee/jobs" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
              <BriefcaseBusiness size={21} />
            </div>

            <span className="text-xl font-extrabold tracking-tight text-primary">
              Local<span className="text-brand-500">Hire</span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 md:flex">

            {["Home", "Explore Jobs", "My Applications"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(
                  tab === "Home" ? "Explore Jobs" : tab
                )}
                className={`flex items-center gap-2 border-b-2 py-5 text-sm font-semibold transition ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted hover:text-foreground"
                }`}
              >
                {tab}

                {tab === "My Applications" && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
                    {appliedJobs.length}
                  </span>
                )}
              </button>
            ))}

            <a
              href="/employer"
              className="text-sm font-medium text-muted transition hover:text-primary"
            >
              Switch to Employer
            </a>

          </nav>

          <div className="flex items-center gap-3">

            <button
              title="Notifications"
              className="relative rounded-lg p-2 text-muted hover:bg-surface-secondary hover:text-foreground"
            >
              <Bell size={20} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger" />
            </button>

            <button
              onClick={() => setActiveTab("Saved Jobs")}
              title="Saved Jobs"
              className="rounded-lg p-2 text-muted hover:bg-surface-secondary hover:text-primary"
            >
              <Bookmark size={20} />
            </button>

            <div className="hidden items-center gap-2 border-l border-border pl-3 sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                RV
              </div>

              <div className="hidden lg:block">
                <p className="text-xs font-bold">Rohan Verma</p>
                <p className="text-[11px] text-success">
                  Verified Worker
                </p>
              </div>

              <ChevronDown size={16} className="text-muted" />
            </div>

          </div>

        </div>

        {/* MOBILE NAV */}
        <div className="flex gap-5 overflow-x-auto border-t border-border px-4 py-3 md:hidden">
          {["Explore Jobs", "My Applications", "Saved Jobs"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap text-xs font-semibold ${
                activeTab === tab ? "text-primary" : "text-muted"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

      </header>

      {/* HERO SEARCH SECTION */}
      <section className="border-b border-border bg-surface py-9">

        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">

          <div className="mb-6 max-w-3xl">

            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-success/20 bg-success/10 px-3 py-1.5 text-xs font-semibold text-success">
              <CheckCircle size={14} />
              Find verified local opportunities near you
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Find your next opportunity.
            </h1>

            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              Discover trusted frontline jobs and opportunities
              around your neighborhood.
            </p>

          </div>

          {/* SEARCH FORM */}
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 gap-2 rounded-xl border border-input bg-background p-2 shadow-sm md:grid-cols-[1fr_1fr_auto]"
          >

            <div className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-surface-secondary">

              <Search size={22} className="shrink-0 text-muted" />

              <div className="min-w-0 flex-1">
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted">
                  Role or Skill
                </label>

                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Cashier, helper, delivery..."
                  className="w-full border-0 bg-transparent p-0 text-sm font-semibold outline-none placeholder:font-normal placeholder:text-muted focus:ring-0"
                />
              </div>

            </div>

            <div className="flex items-center gap-3 rounded-lg border-t border-border px-3 py-2 hover:bg-surface-secondary md:border-l md:border-t-0">

              <MapPin size={22} className="shrink-0 text-primary" />

              <div className="min-w-0 flex-1">
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted">
                  Locality or Sector
                </label>

                <input
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="Enter your area or city..."
                  className="w-full border-0 bg-transparent p-0 text-sm font-semibold outline-none placeholder:font-normal placeholder:text-muted focus:ring-0"
                />
              </div>

            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary-hover"
            >
              <Search size={18} />
              Search Jobs
            </button>

          </form>

          {/* POPULAR ROLES */}
          <div className="mt-5 flex flex-wrap items-center gap-2">

            <span className="mr-1 text-xs font-semibold text-muted">
              Popular Roles:
            </span>

            {popularRoles.map(role => (
              <button
                key={role}
                onClick={() => {
                  setSelectedRole(
                    selectedRole === role ? "" : role
                  );
                  setActiveTab("Explore Jobs");
                }}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  selectedRole === role
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-background text-foreground-secondary hover:border-primary hover:text-primary"
                }`}
              >
                {role}
              </button>
            ))}

          </div>

        </div>

      </section>

      {/* MAIN DISCOVERY CONTENT */}
      <main className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">

          {/* FILTER SIDEBAR */}
          <aside className="rounded-xl border border-border bg-surface p-5 shadow-sm lg:sticky lg:top-24 lg:col-span-4 xl:col-span-3">

            <div className="flex items-center justify-between border-b border-border pb-4">

              <div className="flex items-center gap-2">
                <SlidersHorizontal size={19} className="text-primary" />

                <h2 className="font-bold">
                  Filters
                </h2>
              </div>

              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Reset All
              </button>

            </div>

            <div className="space-y-6 pt-5">

              {/* CITY */}
              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wide">
                  City & Location
                </h3>

                <div className="grid grid-cols-2 gap-2">

                  {cities.map(city => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setLocation("");
                      }}
                      className={`rounded-lg border px-2 py-2 text-xs font-semibold transition ${
                        selectedCity === city
                          ? "border-primary bg-primary text-white"
                          : "border-border bg-background text-foreground-secondary hover:border-primary"
                      }`}
                    >
                      {city}
                    </button>
                  ))}

                  <button
                    onClick={() => {
                      setSelectedCity("All");
                      setLocation("");
                    }}
                    className={`rounded-lg border px-2 py-2 text-xs font-semibold transition ${
                      selectedCity === "All"
                        ? "border-primary bg-primary text-white"
                        : "border-border bg-background text-foreground-secondary hover:border-primary"
                    }`}
                  >
                    All Cities
                  </button>

                </div>

                <p className="mt-3 flex items-center gap-2 text-xs text-muted">
                  <MapPin size={14} />
                  Choose where you want to work
                </p>
              </div>

              {/* DISTANCE */}
              <div className="border-t border-border pt-5">

                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wide">
                    Commute Radius
                  </h3>

                  <span className="text-xs font-bold text-primary">
                    {radius} km
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-1.5">

                  {[2, 5, 10, 15].map(value => (
                    <button
                      key={value}
                      onClick={() => setRadius(value)}
                      className={`rounded-lg border py-2 text-xs font-semibold transition ${
                        radius === value
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-foreground-secondary hover:border-primary"
                      }`}
                    >
                      {value} km
                    </button>
                  ))}

                </div>

                <p className="mt-2 text-[11px] text-muted">
                  Distance values are demo data until location-based search is connected.
                </p>

              </div>

              {/* SALARY */}
              <div className="border-t border-border pt-5">

                <h3 className="mb-3 text-xs font-bold uppercase tracking-wide">
                  Monthly Salary
                </h3>

                <div className="space-y-3">

                  {salaryRanges.map((range, index) => (
                    <label
                      key={range.label}
                      className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground-secondary"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSalaries.includes(index)}
                        onChange={() => toggleSalary(index)}
                        className="h-4 w-4 rounded accent-primary"
                      />

                      <span>{range.label}</span>
                    </label>
                  ))}

                </div>

              </div>

              {/* SHIFTS */}
              <div className="border-t border-border pt-5">

                <h3 className="mb-3 text-xs font-bold uppercase tracking-wide">
                  Shift Timings
                </h3>

                <div className="space-y-3">

                  {shifts.map(shift => (
                    <label
                      key={shift.name}
                      className="flex cursor-pointer items-start gap-2.5"
                    >
                      <input
                        type="checkbox"
                        checked={selectedShifts.includes(shift.name)}
                        onChange={() => toggleShift(shift.name)}
                        className="mt-0.5 h-4 w-4 rounded accent-primary"
                      />

                      <div>
                        <p className="text-sm font-medium">
                          {shift.name} Shift
                        </p>

                        <p className="text-xs text-muted">
                          {shift.time}
                        </p>
                      </div>
                    </label>
                  ))}

                </div>

              </div>

              {/* TRUST FILTERS */}
              <div className="space-y-3 border-t border-border pt-5">

                <label className="flex cursor-pointer items-center gap-2.5 text-sm font-semibold">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={e => setVerifiedOnly(e.target.checked)}
                    className="h-4 w-4 accent-primary"
                  />

                  <ShieldCheck size={17} className="text-success" />
                  Verified Employers Only
                </label>

                <label className="flex cursor-pointer items-center gap-2.5 text-sm font-semibold">
                  <input
                    type="checkbox"
                    checked={immediateOnly}
                    onChange={e => setImmediateOnly(e.target.checked)}
                    className="h-4 w-4 accent-primary"
                  />

                  <Zap size={17} className="text-warning" />
                  Immediate Joining
                </label>

              </div>

            </div>

          </aside>

          {/* JOB RESULTS */}
          <section className="min-w-0 lg:col-span-8 xl:col-span-9">

            {/* RESULTS HEADER */}
            <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div>
                <div className="flex flex-wrap items-center gap-2">

                  <h2 className="text-xl font-bold">
                    {activeTab === "Explore Jobs"
                      ? "Recommended Jobs"
                      : activeTab}
                  </h2>

                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                    {filteredJobs.length} Found
                  </span>

                </div>

                <p className="mt-1 text-xs text-muted sm:text-sm">
                  Opportunities matching your selected preferences.
                </p>
              </div>

              <div className="flex items-center gap-2">

                <span className="whitespace-nowrap text-xs text-muted">
                  Sort by:
                </span>

                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="rounded-lg border border-input bg-surface px-3 py-2 text-xs font-semibold outline-none focus:border-primary"
                >
                  <option>Best Match</option>
                  <option>Highest Pay</option>
                  <option>Nearest First</option>
                  <option>Most Recent</option>
                </select>

              </div>

            </div>

            {/* JOB CARDS */}
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

              {filteredJobs.map(job => {

                const JobIcon = job.icon;
                const isSaved = savedJobs.includes(job.id);
                const isApplied = appliedJobs.includes(job.id);

                return (
                  <article
                    key={job.id}
                    className="group flex flex-col justify-between rounded-xl border border-border bg-surface p-5 shadow-sm transition hover:border-primary/40 hover:shadow-md"
                  >

                    <div>

                      {/* COMPANY AND JOB TITLE */}
                      <div className="mb-4 flex items-start justify-between gap-3">

                        <div className="flex min-w-0 items-start gap-3">

                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <JobIcon size={23} />
                          </div>

                          <div className="min-w-0">

                            <h3 className="line-clamp-2 text-sm font-bold leading-5 transition group-hover:text-primary sm:text-base">
                              {job.title}
                            </h3>

                            <p className="mt-1 flex flex-wrap items-center gap-1 text-xs text-foreground-secondary">
                              <span className="font-semibold text-foreground">
                                {job.company}
                              </span>

                              {job.verified && (
                                <ShieldCheck
                                  size={14}
                                  className="text-success"
                                />
                              )}
                            </p>

                            <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                              <MapPin size={13} />
                              {job.location}
                              <span className="text-primary">
                                ({job.distance} km)
                              </span>
                            </p>

                          </div>

                        </div>

                        <button
                          onClick={() => toggleSaved(job.id)}
                          title={isSaved ? "Remove saved job" : "Save job"}
                          className={`shrink-0 rounded-lg p-2 transition ${
                            isSaved
                              ? "bg-primary/10 text-primary"
                              : "text-muted hover:bg-surface-secondary hover:text-primary"
                          }`}
                        >
                          <Bookmark
                            size={19}
                            fill={isSaved ? "currentColor" : "none"}
                          />
                        </button>

                      </div>

                      {/* SALARY AND TAGS */}
                      <div className="mb-4 flex flex-wrap items-center gap-2">

                        <span className="rounded-lg border border-success/20 bg-success/10 px-2.5 py-1.5 text-sm font-bold text-success">
                          ₹{job.minSalary.toLocaleString("en-IN")} - ₹{job.maxSalary.toLocaleString("en-IN")}
                          <span className="ml-1 text-[10px] font-medium">
                            / month
                          </span>
                        </span>

                        <span className="rounded-full bg-warning/10 px-3 py-1.5 text-xs font-semibold text-warning">
                          {job.shift} Shift
                        </span>

                        {job.urgent && (
                          <span className="rounded-full bg-danger/10 px-3 py-1.5 text-xs font-semibold text-danger">
                            Urgent Hiring
                          </span>
                        )}

                      </div>

                      {/* JOB METADATA */}
                      <div className="mb-4 flex flex-wrap gap-2">

                        <MetaChip>
                          <Clock size={12} />
                          {job.timing}
                        </MetaChip>

                        <MetaChip>
                          <BriefcaseBusiness size={12} />
                          {job.type}
                        </MetaChip>

                        {job.verified && (
                          <MetaChip>
                            <ShieldCheck size={12} className="text-success" />
                            Verified Employer
                          </MetaChip>
                        )}

                        {job.benefits.map(benefit => (
                          <MetaChip key={benefit}>
                            {benefit}
                          </MetaChip>
                        ))}

                      </div>

                    </div>

                    {/* CARD FOOTER */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">

                      <span className="flex items-center gap-1 text-[11px] text-muted">
                        <Clock size={13} />
                        Posted {job.posted}
                      </span>

                      <div className="flex items-center gap-2">

                        <button
                          onClick={() => setSelectedJob(job)}
                          className="rounded-lg border border-border px-3 py-2 text-xs font-semibold transition hover:bg-surface-secondary"
                        >
                          View Details
                        </button>

                        <button
                          onClick={() => setSelectedJob(job)}
                          disabled={isApplied}
                          className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isApplied ? "Applied" : "Apply Now"}
                        </button>

                      </div>

                    </div>

                  </article>

                );
              })}

            </div>

            {/* EMPTY STATE */}
            {filteredJobs.length === 0 && (
              <div className="rounded-xl border border-border bg-surface px-4 py-16 text-center">

                <BriefcaseBusiness
                  size={40}
                  className="mx-auto mb-4 text-muted"
                />

                <h3 className="font-bold">
                  No matching jobs found
                </h3>

                <p className="mt-2 text-sm text-muted">
                  Try adjusting your search or removing some filters.
                </p>

                <button
                  onClick={resetFilters}
                  className="mt-5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Reset Filters
                </button>

              </div>
            )}

            {/* PAGINATION PLACEHOLDER */}
            {filteredJobs.length > 0 && (
              <div className="mt-6 flex items-center justify-between rounded-xl border border-border bg-surface p-4">

                <p className="text-xs text-muted">
                  Showing {filteredJobs.length} jobs
                </p>

                <div className="flex items-center gap-2">

                  <button disabled className="rounded-lg border border-border p-2 text-muted opacity-40">
                    <ChevronLeft size={16} />
                  </button>

                  <span className="rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white">
                    1
                  </span>

                  <button disabled className="rounded-lg border border-border p-2 text-muted opacity-40">
                    <ChevronRight size={16} />
                  </button>

                </div>

              </div>
            )}

          </section>

        </div>

        {/* SUPPORT */}
        <div className="mt-8 flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">

          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <Headset size={22} />
          </div>

          <div>
            <h3 className="text-sm font-bold">
              Need help finding the right job?
            </h3>

            <p className="mt-1 text-xs text-muted">
              Our LocalHire support team is here to help you find verified opportunities.
            </p>
          </div>

        </div>

      </main>

      {/* JOB DETAILS MODAL */}
      {selectedJob && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4"
          onClick={() => setSelectedJob(null)}
        >

          <div
            className="my-auto w-full max-w-2xl rounded-2xl border border-border bg-surface p-5 shadow-2xl sm:p-7"
            onClick={e => e.stopPropagation()}
          >

            <div className="flex items-start justify-between gap-3">

              <div className="flex items-start gap-3">

                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <BriefcaseBusiness size={25} />
                </div>

                <div>
                  <h2 className="text-lg font-bold">
                    {selectedJob.title}
                  </h2>

                  <p className="mt-1 text-sm text-muted">
                    {selectedJob.company}
                  </p>
                </div>

              </div>

              <button
                onClick={() => setSelectedJob(null)}
                className="rounded-lg p-2 text-muted hover:bg-surface-secondary"
              >
                <X size={20} />
              </button>

            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <MetaChip>
                <MapPin size={13} />
                {selectedJob.location}
              </MetaChip>

              <MetaChip>
                <Clock size={13} />
                {selectedJob.shift}
              </MetaChip>

              <MetaChip>
                <BriefcaseBusiness size={13} />
                {selectedJob.type}
              </MetaChip>
            </div>

            <div className="mt-5 rounded-xl bg-success/10 p-4">
              <p className="text-xs font-semibold text-success">
                Monthly Salary
              </p>

              <p className="mt-1 text-2xl font-extrabold text-success">
                ₹{selectedJob.minSalary.toLocaleString("en-IN")} - ₹{selectedJob.maxSalary.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-bold">
                Job Description
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                {selectedJob.description}
              </p>
            </div>

            <div className="mt-5">
              <h3 className="font-bold">
                Requirements
              </h3>

              <ul className="mt-3 space-y-2">
                {selectedJob.requirements.map(item => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-foreground-secondary"
                  >
                    <CheckCircle
                      size={16}
                      className="mt-0.5 shrink-0 text-success"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <h3 className="font-bold">
                Benefits
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {selectedJob.benefits.map(item => (
                  <MetaChip key={item}>
                    {item}
                  </MetaChip>
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3 border-t border-border pt-5">

              <button
                onClick={() => toggleSaved(selectedJob.id)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-semibold hover:bg-surface-secondary"
              >
                <Bookmark size={17} />
                {savedJobs.includes(selectedJob.id)
                  ? "Saved"
                  : "Save Job"}
              </button>

              <button
                onClick={() => applyForJob(selectedJob.id)}
                disabled={appliedJobs.includes(selectedJob.id)}
                className="flex-1 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white hover:bg-primary-hover disabled:opacity-50"
              >
                {appliedJobs.includes(selectedJob.id)
                  ? "Already Applied"
                  : "Apply for this Job"}
              </button>

            </div>

          </div>

        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-border bg-surface px-4 py-6">

        <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-4 text-xs text-muted sm:flex-row sm:items-center">

          <div className="flex items-center gap-2">
            <BriefcaseBusiness size={18} className="text-primary" />
            <span className="font-bold text-foreground">
              LocalHire Technologies
            </span>
            <span>•</span>
            <span>Connecting local talent with local businesses</span>
          </div>

          <div className="flex flex-wrap gap-5">
            <a href="#" className="hover:text-primary">Help Center</a>
            <a href="#" className="hover:text-primary">Safety Guidelines</a>
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms</a>
          </div>

        </div>

      </footer>

    </div>
  );
}


// REUSABLE METADATA CHIP
function MetaChip({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-[11px] font-medium text-foreground-secondary">
      {children}
    </span>
  );
}

export default JobDiscovery;
