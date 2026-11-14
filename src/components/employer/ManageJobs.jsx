
import React, { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  Users,
  Archive,
  FolderOpen,
  Zap,
  Search,
  MapPin,
  Clock,
  Plus,
  Download,
  MoreHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  CheckCircle,
  ShieldCheck,
  Gauge,
  Headset,
  Building2,
  Truck,
  Shield,
  Store,
  Package,
  Broom,
  Sun,
  Moon,
  SlidersHorizontal,
} from "lucide-react";

// Temporary data. Replace with your API response later.
const initialJobs = [
  {
    id: 1,
    title: "Senior Cashier & Billing Staff",
    department: "Retail & Billing • POS Counter 4",
    location: "Phase 9 Industrial Area, Mohali",
    landmark: "Near Best Price Terminal",
    salary: "₹22,000 - ₹26,000",
    shift: "Morning",
    timing: "8:00 AM - 4:30 PM",
    applicants: 48,
    newApplicants: 12,
    status: "Active",
    icon: Building2,
  },
  {
    id: 2,
    title: "Warehouse Packaging & Inventory Helper",
    department: "Logistics • Inbound Section",
    location: "Phase 8B Industrial Area, Mohali",
    landmark: "Near Godown Gate 2",
    salary: "₹19,500 - ₹23,000",
    shift: "Evening",
    timing: "3:00 PM - 11:30 PM",
    applicants: 64,
    newApplicants: 16,
    status: "Active",
    icon: Package,
  },
  {
    id: 3,
    title: "Store Floor Customer Assistant",
    department: "Customer Support • Apparel & Footwear",
    location: "Elante Mall Outlet",
    landmark: "Industrial Area Phase 1, Chandigarh",
    salary: "₹20,000 - ₹25,000",
    shift: "Day",
    timing: "10:30 AM - 8:30 PM",
    applicants: 30,
    newApplicants: 5,
    status: "Active",
    icon: Store,
  },
  {
    id: 4,
    title: "Night Security & Gate Guard",
    department: "Security & Surveillance • Gate A",
    location: "Phase 9 Hub",
    landmark: "Perimeter Checkpoint",
    salary: "₹18,000 - ₹21,000",
    shift: "Night",
    timing: "10:00 PM - 6:00 AM",
    applicants: 14,
    newApplicants: 1,
    status: "Active",
    icon: Shield,
  },
  {
    id: 5,
    title: "Urgent Delivery Fleet Dispatcher",
    department: "Delivery Logistics • Hub Operations",
    location: "Sector 70, Mohali",
    landmark: "Dispatch Depot",
    salary: "₹24,000 - ₹28,000",
    shift: "Flexible",
    timing: "Rotational Shifts",
    applicants: 22,
    newApplicants: 0,
    status: "Closed",
    icon: Truck,
  },
  {
    id: 6,
    title: "Housekeeping & Facility Cleaner",
    department: "Facility Maintenance • Floor Sanitize",
    location: "Best Price Wholesale, Mohali",
    landmark: "Main Wholesale Floor",
    salary: "₹16,000 - ₹19,000",
    shift: "Morning",
    timing: "7:00 AM - 3:30 PM",
    applicants: 18,
    newApplicants: 0,
    status: "Closed",
    icon: Broom,
  },
];

const tabs = [
  "All Jobs",
  "Active",
  "Drafts",
  "Closed / Expired",
];

function ManageJobs() {
  const [jobs, setJobs] = useState(initialJobs);
  const [activeTab, setActiveTab] = useState("All Jobs");
  const [search, setSearch] = useState("");
  const [shiftFilter, setShiftFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedJobs, setSelectedJobs] = useState([]);

  const activeCount = jobs.filter(j => j.status === "Active").length;
  const closedCount = jobs.filter(j => j.status === "Closed").length;
  const draftCount = jobs.filter(j => j.status === "Draft").length;

  const totalApplicants = jobs.reduce(
    (sum, job) => sum + job.applicants,
    0
  );

  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    if (activeTab === "Active") {
      result = result.filter(j => j.status === "Active");
    } else if (activeTab === "Drafts") {
      result = result.filter(j => j.status === "Draft");
    } else if (activeTab === "Closed / Expired") {
      result = result.filter(j => j.status === "Closed");
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.department.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query)
      );
    }

    if (shiftFilter !== "All") {
      result = result.filter(j => j.shift === shiftFilter);
    }

    result.sort((a, b) =>
      sortOrder === "newest"
        ? b.id - a.id
        : a.id - b.id
    );

    return result;
  }, [jobs, activeTab, search, shiftFilter, sortOrder]);

  const toggleJob = (id) => {
    setSelectedJobs(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedJobs.length === filteredJobs.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(filteredJobs.map(job => job.id));
    }
  };

  const closeSelectedJobs = () => {
    setJobs(prev =>
      prev.map(job =>
        selectedJobs.includes(job.id)
          ? { ...job, status: "Closed" }
          : job
      )
    );
    setSelectedJobs([]);
  };

  const exportCSV = () => {
    const headers = [
      "Job Title",
      "Location",
      "Salary",
      "Shift",
      "Applicants",
      "Status"
    ];

    const rows = filteredJobs.map(job => [
      job.title,
      job.location,
      job.salary,
      job.shift,
      job.applicants,
      job.status
    ]);

    const csv = [headers, ...rows]
      .map(row =>
        row.map(value =>
          `"${String(value).replace(/"/g, '""')}"`
        ).join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "localhire-jobs.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const getTabCount = (tab) => {
    if (tab === "All Jobs") return jobs.length;
    if (tab === "Active") return activeCount;
    if (tab === "Drafts") return draftCount;
    return closedCount;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* MAIN CONTENT */}
      <main className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">

        {/* PAGE HEADING */}
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Manage Jobs
            </h1>

            <p className="mt-2 text-sm text-muted">
              Manage and monitor all your job postings across your retail locations.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium transition hover:bg-surface-secondary"
            >
              <Download size={17} />
              Export CSV
            </button>

            <button
              onClick={() => window.location.href = "/employer/jobs/create"}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
            >
              <Plus size={18} />
              Post New Job
            </button>
          </div>

        </div>

        {/* STATISTICS */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Total Jobs"
            value={jobs.length}
            subtitle="Total Created"
            description="Your job postings"
            icon={FolderOpen}
            iconColor="text-primary bg-primary/10"
          />

          <StatCard
            title="Active Jobs"
            value={activeCount}
            subtitle="Actively Hiring"
            description="Accepting applications"
            icon={Zap}
            iconColor="text-success bg-success/10"
          />

          <StatCard
            title="Closed / Paused"
            value={closedCount}
            subtitle="Closed / Filled"
            description="Positions successfully filled"
            icon={Archive}
            iconColor="text-muted bg-surface-secondary"
          />

          <StatCard
            title="Total Applicants"
            value={totalApplicants}
            subtitle="Candidates"
            description="Across all job postings"
            icon={Users}
            iconColor="text-primary bg-primary/10"
          />

        </div>

        {/* FILTER SECTION */}
        <section className="mb-5 rounded-xl border border-border bg-surface p-4 shadow-sm">

          {/* TABS */}
          <div className="flex flex-wrap items-center gap-2 border-b border-border pb-4">

            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSelectedJobs([]);
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "bg-surface-secondary text-foreground-secondary hover:bg-border"
                }`}
              >
                {tab} ({getTabCount(tab)})
              </button>
            ))}

            <div className="ml-auto flex items-center gap-2">
              {selectedJobs.length > 0 && (
                <button
                  onClick={closeSelectedJobs}
                  className="rounded-lg border border-danger/30 px-3 py-2 text-sm font-medium text-danger hover:bg-danger/10"
                >
                  Close Selected ({selectedJobs.length})
                </button>
              )}

              <span className="hidden text-xs text-muted sm:inline">
                {selectedJobs.length} selected
              </span>
            </div>

          </div>

          {/* SEARCH AND FILTERS */}
          <div className="grid grid-cols-1 gap-3 pt-4 md:grid-cols-3">

            <div className="relative md:col-span-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by job title, department, or location..."
                className="w-full rounded-lg border border-input bg-background py-3 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <select
              value={shiftFilter}
              onChange={e => setShiftFilter(e.target.value)}
              className="rounded-lg border border-input bg-background px-3 py-3 text-sm outline-none focus:border-primary"
            >
              <option value="All">All Shifts</option>
              <option value="Morning">Morning</option>
              <option value="Day">Day</option>
              <option value="Evening">Evening</option>
              <option value="Night">Night</option>
              <option value="Flexible">Flexible</option>
            </select>

            <button
              onClick={() =>
                setSortOrder(prev =>
                  prev === "newest" ? "oldest" : "newest"
                )
              }
              className="flex items-center justify-between gap-2 rounded-lg border border-input bg-background px-3 py-3 text-sm"
            >
              <span>
                Sorted by: Date Posted ({sortOrder === "newest" ? "Newest First" : "Oldest First"})
              </span>
              <ArrowUpDown size={16} />
            </button>

          </div>
        </section>

        {/* JOBS TABLE */}
        <section className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">

              <thead className="bg-surface-secondary text-xs font-semibold uppercase tracking-wide text-muted">
                <tr>
                  <th className="w-12 px-4 py-4">
                    <input
                      type="checkbox"
                      checked={
                        filteredJobs.length > 0 &&
                        selectedJobs.length === filteredJobs.length
                      }
                      onChange={toggleAll}
                      className="rounded border-input accent-primary"
                    />
                  </th>

                  <th className="px-4 py-4">Job Title & Department</th>
                  <th className="px-4 py-4">Location</th>
                  <th className="px-4 py-4">Compensation</th>
                  <th className="px-4 py-4">Shift Timing</th>
                  <th className="px-4 py-4">Applicants</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">

                {filteredJobs.map(job => {
                  const JobIcon = job.icon;

                  return (
                    <tr
                      key={job.id}
                      className="transition hover:bg-surface-secondary/70"
                    >

                      <td className="px-4 py-5">
                        <input
                          type="checkbox"
                          checked={selectedJobs.includes(job.id)}
                          onChange={() => toggleJob(job.id)}
                          className="rounded border-input accent-primary"
                        />
                      </td>

                      {/* JOB TITLE */}
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <JobIcon size={20} />
                          </div>

                          <div className="max-w-[220px]">
                            <p className="text-sm font-semibold text-foreground">
                              {job.title}
                            </p>

                            <p className="mt-1 text-xs text-muted">
                              {job.department}
                            </p>
                          </div>

                        </div>
                      </td>

                      {/* LOCATION */}
                      <td className="px-4 py-5">
                        <div className="flex items-start gap-1.5">
                          <MapPin
                            size={15}
                            className="mt-0.5 shrink-0 text-muted"
                          />

                          <div>
                            <p className="text-sm text-foreground">
                              {job.location}
                            </p>
                            <p className="mt-1 text-xs text-muted">
                              {job.landmark}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* SALARY */}
                      <td className="whitespace-nowrap px-4 py-5">
                        <p className="text-sm font-bold text-success">
                          {job.salary}
                        </p>
                        <p className="mt-1 text-xs text-muted">
                          / month (Gross)
                        </p>
                      </td>

                      {/* SHIFT */}
                      <td className="px-4 py-5">
                        <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-surface-secondary px-3 py-1.5 text-xs font-medium text-foreground-secondary">
                          <Clock size={13} />
                          {job.shift} ({job.timing})
                        </span>
                      </td>

                      {/* APPLICANTS */}
                      <td className="px-4 py-5">
                        <div className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs font-semibold text-primary">
                          <Users size={14} />
                          {job.applicants}

                          {job.newApplicants > 0 && (
                            <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] text-white">
                              +{job.newApplicants} New
                            </span>
                          )}
                        </div>
                      </td>

                      {/* STATUS */}
                      <td className="px-4 py-5">
                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                            job.status === "Active"
                              ? "bg-success/10 text-success"
                              : job.status === "Draft"
                                ? "bg-warning/10 text-warning"
                                : "bg-surface-secondary text-muted"
                          }`}
                        >
                          {job.status}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-4 py-5">
                        <button
                          title="Close job"
                          onClick={() => {
                            setJobs(prev =>
                              prev.map(j =>
                                j.id === job.id
                                  ? { ...j, status: "Closed" }
                                  : j
                              )
                            );
                          }}
                          disabled={job.status !== "Active"}
                          className="rounded-lg p-2 text-muted transition hover:bg-surface-secondary hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <MoreHorizontal size={19} />
                        </button>
                      </td>

                    </tr>
                  );
                })}

                {filteredJobs.length === 0 && (
                  <tr>
                    <td colSpan="8" className="px-4 py-16 text-center">
                      <BriefcaseBusiness
                        size={36}
                        className="mx-auto mb-3 text-muted"
                      />
                      <p className="font-semibold">
                        No jobs found
                      </p>
                      <p className="mt-1 text-sm text-muted">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>

          {/* TABLE FOOTER */}
          <div className="flex flex-col justify-between gap-4 border-t border-border px-4 py-4 sm:flex-row sm:items-center">

            <p className="text-sm text-muted">
              Showing {filteredJobs.length} of {jobs.length} job postings
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled
                className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm text-muted disabled:opacity-50"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              <span className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                1
              </span>

              <button
                disabled
                className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm text-muted disabled:opacity-50"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>

          </div>

        </section>

        {/* EMPLOYER SUPPORT CARDS */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">

          <InfoCard
            icon={ShieldCheck}
            title="Govt. Verified Identity Guarantee"
            description="Verified applicants help maintain a trustworthy direct hiring environment."
            color="text-success bg-success/10"
          />

          <InfoCard
            icon={Gauge}
            title="Average Response Rate: 2.4 Hours"
            description="Mohali hub workers respond faster during morning shifts."
            color="text-primary bg-primary/10"
          />

          <InfoCard
            icon={Headset}
            title="Dedicated Hiring Specialist"
            description="Need help shortlisting candidates? Contact your regional support team."
            color="text-purple-500 bg-purple-500/10"
          />

        </div>

      </main>

      {/* FOOTER */}
      <footer className="mt-16 border-t border-border bg-surface px-4 py-6">
        <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-4 text-sm text-muted md:flex-row md:items-center">

          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-xs font-bold text-white">
              LH
            </div>

            <span className="font-semibold text-foreground">
              LocalHire Technologies
            </span>

            <span>•</span>
            <span>Mohali-Chandigarh Operational Hub</span>
          </div>

          <div className="flex flex-wrap gap-5 text-xs">
            <a href="#" className="hover:text-primary">Employer Guidelines</a>
            <a href="#" className="hover:text-primary">Wage Security Standards</a>
            <a href="#" className="hover:text-primary">Direct Support Desk</a>
            <a href="#" className="hover:text-primary">Privacy & Terms</a>
          </div>

        </div>
      </footer>

    </div>
  );
}


// REUSABLE STATISTICS CARD
function StatCard({
  title,
  value,
  subtitle,
  description,
  icon: Icon,
  iconColor
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-sm transition hover:shadow-md">

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground-secondary">
          {title}
        </p>

        <div className={`rounded-lg p-2 ${iconColor}`}>
          <Icon size={19} />
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <h2 className="text-3xl font-bold tracking-tight">
          {value}
        </h2>

        <span className="text-xs font-medium text-muted">
          {subtitle}
        </span>
      </div>

      <p className="mt-2 text-xs text-muted">
        {description}
      </p>

    </div>
  );
}


// REUSABLE INFORMATION CARD
function InfoCard({ icon: Icon, title, description, color }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">

      <div className={`rounded-lg p-2 ${color}`}>
        <Icon size={19} />
      </div>

      <div>
        <h3 className="text-sm font-semibold">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-relaxed text-muted">
          {description}
        </p>
      </div>

    </div>
  );
}

export default ManageJobs;
