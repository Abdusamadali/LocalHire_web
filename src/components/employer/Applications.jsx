
import React, { useMemo, useState } from "react";
import {
  Search,
  Download,
  MapPin,
  BriefcaseBusiness,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  ShieldCheck,
  Zap,
  CalendarDays,
  Phone,
  UserRound,
  ChevronLeft,
  ChevronRight,
  X,
  Filter,
  Building2,
  BadgeCheck,
  Headset,
  CalendarCheck,
} from "lucide-react";

// Temporary data for UI development.
// Replace with Spring Boot API data later.


//dummy data 
const initialApplicants = [
  {
    id: 1,
    name: "Simranjeet Kaur",
    location: "Sector 70, Mohali",
    distance: "1.2 km",
    job: "Senior Cashier & Billing Staff",
    salary: 22000,
    experience: "2.5 yrs POS Billing experience",
    skills: ["Hindi & Punjabi Fluent", "Morning Shift"],
    applied: "2 hours ago",
    phone: "+91 98721-XXXXX",
    status: "New",
    verified: true,
    immediate: false,
    image: "SK",
  },
  {
    id: 2,
    name: "Vikas Sandhu",
    location: "Phase 5, Mohali",
    distance: "2.5 km",
    job: "Warehouse Packaging Helper",
    salary: 18500,
    experience: "Heavy Lifting (30kg) Capable",
    skills: ["Barcode Scanner Proficient", "Full Day"],
    applied: "5 hours ago",
    phone: "+91 98144-XXXXX",
    status: "In Review",
    verified: true,
    immediate: true,
    image: "VS",
  },
  {
    id: 3,
    name: "Pooja Verma",
    location: "Sector 68, Mohali",
    distance: "3.1 km",
    job: "Store Floor Customer Assistant",
    salary: 19000,
    experience: "3 yrs Retail Customer Handling",
    skills: ["English Basics Known", "Morning Shift"],
    applied: "Walk-in Tomorrow",
    phone: "+91 98123-XXXXX",
    status: "Interview Scheduled",
    verified: true,
    immediate: true,
    interview: "Tomorrow, 11:30 AM",
    image: "PV",
  },
  {
    id: 4,
    name: "Manpreet Singh",
    location: "Kumbra, Mohali",
    distance: "1.8 km",
    job: "Warehouse Packaging Helper",
    salary: 17500,
    experience: "Inventory Stacking",
    skills: ["Night Shift Ready", "Join within 24 Hours"],
    applied: "Yesterday, 4:15 PM",
    phone: "+91 97800-XXXXX",
    status: "New",
    verified: true,
    immediate: true,
    image: "MS",
  },
  {
    id: 5,
    name: "Rajesh Sharma",
    location: "Sector 59, Mohali",
    distance: "4.0 km",
    job: "Senior Cashier & Billing Staff",
    salary: 24000,
    experience: "5 yrs Tally ERP & Marg POS",
    skills: ["Cash Counter Reconcile", "Full Day"],
    applied: "1 day ago",
    phone: "+91 94172-XXXXX",
    status: "Shortlisted",
    verified: true,
    immediate: false,
    image: "RS",
  },
  {
    id: 6,
    name: "Kavita Rani",
    location: "Sector 71, Mohali",
    distance: "0.9 km",
    job: "Store Floor Customer Assistant",
    salary: 18000,
    experience: "Retail Stock Merchandising",
    skills: ["Local Resident", "Morning Shift"],
    applied: "3 hours ago",
    phone: "+91 99882-XXXXX",
    status: "New",
    verified: true,
    immediate: false,
    image: "KR",
  },
];


const jobRoles = [
  "All Active Roles",
  "Senior Cashier & Billing Staff",
  "Warehouse Packaging Helper",
  "Store Floor Customer Assistant",
];

const statusTabs = [
  "All",
  "New / In Review",
  "Shortlisted / Accepted",
  "Interview Scheduled",
  "Rejected / Archived",
];


/// Main function
function Applicants() {
  const [applicants, setApplicants] = useState(initialApplicants);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedJob, setSelectedJob] = useState("All Active Roles");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [immediateOnly, setImmediateOnly] = useState(false);
  const [notification, setNotification] = useState(
    "Application Accepted! Interview invitation sent to candidate."
  );
  const [selectedApplicant, setSelectedApplicant] = useState(null);


  //counts by action like:new shortlisted
  const counts = {
    all: applicants.length,
    new: applicants.filter(a =>
      ["New", "In Review"].includes(a.status)
    ).length,
    shortlisted: applicants.filter(a =>
      ["Shortlisted", "Accepted"].includes(a.status)
    ).length,
    interview: applicants.filter(a =>
      a.status === "Interview Scheduled"
    ).length,
    rejected: applicants.filter(a =>
      ["Rejected", "Archived"].includes(a.status)
    ).length,
  };

  const filteredApplicants = useMemo(() => {
    let result = [...applicants];

    if (selectedJob !== "All Active Roles") {
      result = result.filter(a => a.job === selectedJob);
    }

    if (activeTab === "New / In Review") {
      result = result.filter(a =>
        ["New", "In Review"].includes(a.status)
      );
    } else if (activeTab === "Shortlisted / Accepted") {
      result = result.filter(a =>
        ["Shortlisted", "Accepted"].includes(a.status)
      );
    } else if (activeTab === "Interview Scheduled") {
      result = result.filter(a =>
        a.status === "Interview Scheduled"
      );
    } else if (activeTab === "Rejected / Archived") {
      result = result.filter(a =>
        ["Rejected", "Archived"].includes(a.status)
      ); 
    }

    if (search.trim()) {
      const q = search.toLowerCase();

      result = result.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.phone.toLowerCase().includes(q) ||
        a.experience.toLowerCase().includes(q) ||
        a.skills.some(skill => skill.toLowerCase().includes(q))
      );
    }

    if (verifiedOnly) {
      result = result.filter(a => a.verified);
    }

    if (immediateOnly) {
      result = result.filter(a => a.immediate);
    }

    result.sort((a, b) =>
      sortOrder === "newest"
        ? a.id - b.id
        : b.id - a.id
    );

    return result;
  }, [
    applicants,
    selectedJob,
    activeTab,
    search,
    verifiedOnly,
    immediateOnly,
    sortOrder,
  ]);

  const updateStatus = (id, status) => {
    setApplicants(prev =>
      prev.map(a =>
        a.id === id ? { ...a, status } : a
      )
    );

    const candidate = applicants.find(a => a.id === id);

    setNotification(
      `${candidate?.name}: Application ${status}.`
    );
  };

  const exportCandidates = () => {
    const headers = [
      "Name",
      "Location",
      "Job",
      "Salary",
      "Experience",
      "Phone",
      "Status",
      "Verified",
    ];

    const rows = filteredApplicants.map(a => [
      a.name,
      a.location,
      a.job,
      a.salary,
      a.experience,
      a.phone,
      a.status,
      a.verified ? "Yes" : "No",
    ]);
 
    const csv = [headers, ...rows]
      .map(row =>
        row.map(v =>
          `"${String(v).replace(/"/g, '""')}"`
        ).join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "localhire-applicants.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const getCount = (tab) => {
    if (tab === "All") return counts.all;
    if (tab === "New / In Review") return counts.new;
    if (tab === "Shortlisted / Accepted") return counts.shortlisted;
    if (tab === "Interview Scheduled") return counts.interview;
    return counts.rejected;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      <main className="mx-auto max-w-[1600px] px-4 py-7 sm:px-6 lg:px-8">

        {/* PAGE HEADING */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted">
              <span>Employer Portal</span>
              <span>›</span>
              <span className="font-semibold text-foreground">
                Applicants
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold sm:text-3xl">
                Applicants
              </h1>

              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <span className="mr-1 text-success">●</span>
                {applicants.length} Total Candidates
              </span>
            </div>

            <p className="mt-2 text-sm text-muted">
              Review and manage people applying for your jobs.
            </p>
          </div>

          <button
            onClick={exportCandidates}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-3 text-sm font-semibold transition hover:bg-surface-secondary"
          >
            <Download size={17} />
            Export Candidate List
          </button>

        </div>

        {/* NOTIFICATION */}
        {notification && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-success/40 bg-success/5 p-4">

            <div className="rounded-full bg-success/15 p-2 text-success">
              <CheckCircle size={19} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-success">
                {notification.split(":")[0]}
              </p>
              <p className="mt-1 text-xs text-foreground-secondary">
                {notification.includes("Interview invitation")
                  ? notification
                  : notification}
              </p>
            </div>

            <button
              onClick={() => setNotification("")}
              className="text-muted hover:text-foreground"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* FILTER PANEL */}
        <section className="mb-6 rounded-xl border border-border bg-surface p-4 shadow-sm">

          <div className="grid grid-cols-1 gap-4 border-b border-border pb-4 lg:grid-cols-[1fr_1.2fr_0.8fr]">

            <div>
              <label className="mb-2 block text-xs font-semibold text-foreground-secondary">
                Select Job Role
              </label>

              <select
                value={selectedJob}
                onChange={e => setSelectedJob(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-3 text-sm outline-none focus:border-primary"
              >
                {jobRoles.map(role => (
                  <option key={role} value={role}>
                    {role === "All Active Roles"
                      ? `All Active Roles (${counts.all})`
                      : role}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-foreground-secondary">
                Search Candidate
              </label>

              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search applicant name, phone, or skill..."
                  className="w-full rounded-lg border border-input bg-background py-3 pl-10 pr-3 text-sm outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-foreground-secondary">
                Sort Order
              </label>

              <select
                value={sortOrder}
                onChange={e => setSortOrder(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-3 text-sm outline-none focus:border-primary"
              >
                <option value="newest">Application Date: Newest First</option>
                <option value="oldest">Application Date: Oldest First</option>
              </select>
            </div>

          </div>

          {/* STATUS TABS */}
          <div className="flex flex-wrap items-center gap-2 pt-4">

            {statusTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                  activeTab === tab
                    ? "bg-primary text-white"
                    : "bg-surface-secondary text-foreground-secondary hover:bg-border"
                }`}
              >
                {tab} ({getCount(tab)})
              </button>
            ))}

          </div>

          {/* EXTRA FILTERS */}
          <div className="mt-4 flex flex-wrap gap-3">

            <label className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition ${
              verifiedOnly
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-background text-foreground-secondary"
            }`}>
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={e => setVerifiedOnly(e.target.checked)}
                className="accent-primary"
              />
              <ShieldCheck size={15} />
              Aadhaar e-KYC Verified
            </label>

            <label className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition ${
              immediateOnly
                ? "border-warning bg-warning/10 text-warning"
                : "border-border bg-background text-foreground-secondary"
            }`}>
              <input
                type="checkbox"
                checked={immediateOnly}
                onChange={e => setImmediateOnly(e.target.checked)}
                className="accent-warning"
              />
              <Zap size={15} />
              Immediate Joiner (48h)
            </label>

          </div>

        </section>

        {/* APPLICANT CARDS */}
        <section>

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold">
              Candidate Applications
            </h2>

            <span className="text-xs text-muted">
              {filteredApplicants.length} candidates found
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

            {filteredApplicants.map(candidate => (

              <article
                key={candidate.id}
                className={`rounded-xl border bg-surface p-4 shadow-sm transition hover:shadow-md ${
                  candidate.status === "Interview Scheduled"
                    ? "border-success/50"
                    : "border-border"
                }`}
              >

                {/* CANDIDATE HEADER */}
                <div className="flex items-start justify-between gap-3">

                  <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                      {candidate.image}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold">
                          {candidate.name}
                        </h3>

                        {candidate.verified && (
                          <BadgeCheck
                            size={17}
                            className="text-success"
                            title="Verified"
                          />
                        )}
                      </div>

                      <p className="mt-1 flex flex-wrap items-center gap-1 text-xs text-muted">
                        <MapPin size={13} />
                        {candidate.location}
                        <span className="text-primary">
                          ({candidate.distance} away)
                        </span>
                      </p>
                    </div>

                  </div>

                  <StatusBadge status={candidate.status} />

                </div>

                {/* JOB DETAILS */}
                <div className="mt-4 rounded-lg bg-surface-secondary p-3">

                  <div className="flex items-start gap-2">
                    <BriefcaseBusiness
                      size={16}
                      className="mt-0.5 shrink-0 text-primary"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">
                        {candidate.job}
                      </p>

                      <p className="mt-2 flex items-center gap-1 text-xs text-muted">
                        <Clock size={13} />
                        Applied {candidate.applied}
                      </p>
                    </div>

                    <p className="whitespace-nowrap text-sm font-bold text-success">
                      ₹{candidate.salary.toLocaleString("en-IN")}
                      <span className="text-xs font-normal text-muted">
                        /mo
                      </span>
                    </p>
                  </div>

                </div>

                {/* EXPERIENCE AND SKILLS */}
                <div className="mt-3">
                  <div className="flex flex-wrap gap-2">

                    <span className="rounded-md border border-border px-2 py-1 text-xs font-medium">
                      {candidate.experience}
                    </span>

                    {candidate.skills.map(skill => (
                      <span
                        key={skill}
                        className={`rounded-md border px-2 py-1 text-xs font-medium ${
                          skill.includes("Join")
                            ? "border-warning/40 bg-warning/10 text-warning"
                            : "border-border bg-background text-foreground-secondary"
                        }`}
                      >
                        {skill}
                      </span>
                    ))}

                  </div>
                </div>

                {/* INTERVIEW DETAILS */}
                {candidate.status === "Interview Scheduled" && (
                  <div className="mt-3 rounded-lg border border-success/30 bg-success/5 p-3">

                    <div className="flex items-center gap-2 text-sm font-semibold text-success">
                      <CalendarCheck size={16} />
                      Interview Scheduled: {candidate.interview}
                    </div>

                    <p className="mt-1 text-xs text-muted">
                      Invitation sent to candidate.
                    </p>

                  </div>
                )}

                {/* ACTIONS */}
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">

                  <button
                    onClick={() => setSelectedApplicant(candidate)}
                    className="mr-auto inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    <UserRound size={15} />
                    View Profile
                  </button>

                  {candidate.status === "Interview Scheduled" ? (
                    <>
                      <button
                        onClick={() => setSelectedApplicant(candidate)}
                        className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:bg-surface-secondary"
                      >
                        <CalendarDays size={15} />
                        Reschedule
                      </button>

                      <button
                        onClick={() => setSelectedApplicant(candidate)}
                        className="inline-flex items-center gap-2 rounded-lg bg-success px-3 py-2 text-xs font-semibold text-white hover:opacity-90"
                      >
                        <Phone size={15} />
                        Direct Call
                      </button>
                    </>
                  ) : candidate.status === "Rejected" ||
                    candidate.status === "Archived" ? (
                    <span className="text-xs text-muted">
                      Application closed
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => updateStatus(candidate.id, "Accepted")}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-success px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                      >
                        <CheckCircle size={15} />
                        Accept / Invite
                      </button>

                      <button
                        onClick={() => updateStatus(candidate.id, "Rejected")}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-danger/40 px-3 py-2 text-xs font-semibold text-danger transition hover:bg-danger/10"
                      >
                        <XCircle size={15} />
                        Reject
                      </button>
                    </>
                  )}

                  {candidate.status === "Accepted" && (
                    <button
                      onClick={() => setSelectedApplicant(candidate)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white"
                    >
                      <CalendarDays size={15} />
                      Schedule Interview
                    </button>
                  )}

                </div>

                {/* CONTACT */}
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 text-primary">
                    <Phone size={13} />
                    {candidate.phone}
                  </span>

                  <span className="text-muted">
                    LocalHire Candidate
                  </span>
                </div>

              </article>

            ))}

          </div>

          {filteredApplicants.length === 0 && (
            <div className="rounded-xl border border-border bg-surface py-16 text-center">
              <Users size={36} className="mx-auto mb-3 text-muted" />

              <h3 className="font-semibold">
                No applicants found
              </h3>

              <p className="mt-2 text-sm text-muted">
                Try changing your search or filters.
              </p>
            </div>
          )}

        </section>

        {/* PAGINATION */}
        <div className="mt-6 flex flex-col justify-between gap-4 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center">

          <p className="text-sm text-muted">
            Showing {filteredApplicants.length} of {applicants.length} total applicants
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled
              className="rounded-lg border border-border p-2 text-muted disabled:opacity-40"
            >
              <ChevronLeft size={17} />
            </button>

            <button className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white">
              1
            </button>

            <button className="rounded-lg border border-border px-3 py-2 text-sm">
              2
            </button>

            <button className="rounded-lg border border-border px-3 py-2 text-sm">
              3
            </button>

            <span className="px-1 text-muted">...</span>

            <button className="rounded-lg border border-border px-3 py-2 text-sm">
              Next
            </button>
          </div>

        </div>

        {/* SUPPORT */}
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">

          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <Headset size={22} />
          </div>

          <div>
            <h3 className="text-sm font-semibold">
              Need help with candidate verification?
            </h3>

            <p className="mt-1 text-xs text-muted">
              Contact your LocalHire regional hiring support team for assistance.
            </p>
          </div>

        </div>

      </main>

      {/* PROFILE MODAL */}
      {selectedApplicant && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelectedApplicant(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-border bg-surface p-6 shadow-xl"
            onClick={e => e.stopPropagation()}
          >

            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">
                Candidate Profile
              </h2>

              <button
                onClick={() => setSelectedApplicant(null)}
                className="rounded-lg p-2 text-muted hover:bg-surface-secondary"
              >
                <X size={19} />
              </button>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 font-bold text-primary">
                {selectedApplicant.image}
              </div>

              <div>
                <h3 className="font-bold">
                  {selectedApplicant.name}
                </h3>

                <p className="mt-1 text-xs text-muted">
                  {selectedApplicant.location}
                </p>

                {selectedApplicant.verified && (
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-success">
                    <ShieldCheck size={13} />
                    Aadhaar Verified
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6 space-y-4">

              <ProfileField
                label="Applied Position"
                value={selectedApplicant.job}
              />

              <ProfileField
                label="Experience"
                value={selectedApplicant.experience}
              />

              <ProfileField
                label="Expected Salary"
                value={`₹${selectedApplicant.salary.toLocaleString("en-IN")}/month`}
              />

              <ProfileField
                label="Contact"
                value={selectedApplicant.phone}
              />

              <ProfileField
                label="Application Status"
                value={selectedApplicant.status}
              />

            </div>

            <button
              onClick={() => setSelectedApplicant(null)}
              className="mt-6 w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-primary-hover"
            >
              Close Profile
            </button>

          </div>
        </div>
      )}

    </div>
  );
}


// STATUS BADGE
function StatusBadge({ status }) {
  const styles = {
    "New": "bg-primary/10 text-primary",
    "In Review": "bg-warning/10 text-warning",
    "Shortlisted": "bg-success/10 text-success",
    "Accepted": "bg-success/10 text-success",
    "Interview Scheduled": "bg-success/10 text-success",
    "Rejected": "bg-danger/10 text-danger",
    "Archived": "bg-surface-secondary text-muted",
  };

  return (
    <span className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${styles[status] || "bg-surface-secondary text-muted"}`}>
      {status}
    </span>
  );
}


// PROFILE FIELD
function ProfileField({ label, value }) {
  return (
    <div className="border-b border-border pb-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

export default Applicants;
