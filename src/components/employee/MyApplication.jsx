
import React, { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  XCircle,
  Search,
  MapPin,
  IndianRupee,
  Building2,
  Eye,
  MessageCircle,
  Phone,
  Download,
  ArrowRight,
  FileText,
  Headset,
  Lightbulb,
  Bookmark,
  ChevronDown,
  RefreshCw,
  AlertCircle,
  CalendarCheck,
} from "lucide-react";

import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

// Demo data. Replace this with applications fetched from your backend.
const initialApplications = [
  {
    id: 1,
    jobTitle: "Senior Store Cashier & POS Specialist",
    company: "Vishal Mega Mart",
    location: "Phase 5, Mohali",
    appliedDate: "2026-11-12",
    salary: "₹22,000 - ₹26,000",
    shift: "Morning Shift",
    timing: "8:00 AM - 4:30 PM",
    employmentType: "Full-time",
    status: "ACCEPTED",
    message:
      "Walk-in interview scheduled. Please visit the store tomorrow at 11:30 AM.",
    actionLabel: "View Interview Details",
    icon: Building2,
  },
  {
    id: 2,
    jobTitle: "Warehouse Packing & Inventory Helper",
    company: "BigBasket Fulfillment Hub",
    location: "Phase 8B, Mohali",
    appliedDate: "2026-11-11",
    salary: "₹19,500 - ₹23,000",
    shift: "Evening Shift",
    timing: "3:00 PM - 11:30 PM",
    employmentType: "Full-time",
    status: "APPLIED",
    message:
      "Your application is under review by the employer.",
    actionLabel: "Track Status",
    icon: BriefcaseBusiness,
  },
  {
    id: 3,
    jobTitle: "Retail Sales Associate",
    company: "Pantaloons",
    location: "Elante Mall, Chandigarh",
    appliedDate: "2026-11-09",
    salary: "₹20,000 - ₹25,000",
    shift: "Day Shift",
    timing: "10:30 AM - 8:30 PM",
    employmentType: "Full-time",
    status: "SHORTLISTED",
    message:
      "You have been shortlisted. The employer may contact you for the next round.",
    actionLabel: "View Details",
    icon: Building2,
  },
  {
    id: 4,
    jobTitle: "Delivery Fleet Partner",
    company: "Blinkit Dark Store",
    location: "Sector 70, Mohali",
    appliedDate: "2026-11-08",
    salary: "₹24,000 - ₹30,000",
    shift: "Flexible Shift",
    timing: "Flexible hours",
    employmentType: "Part-time",
    status: "ACCEPTED",
    message:
      "Your application has been accepted. Contact the store manager for onboarding.",
    actionLabel: "View Details",
    icon: BriefcaseBusiness,
  },
  {
    id: 5,
    jobTitle: "Facilities Cleaning Supervisor",
    company: "Max Super Speciality Hospital",
    location: "Sector 56, Mohali",
    appliedDate: "2026-11-06",
    salary: "₹17,000 - ₹20,000",
    shift: "Morning Shift",
    timing: "7:00 AM - 3:30 PM",
    employmentType: "Full-time",
    status: "APPLIED",
    message: "Your application has been viewed by the employer.",
    actionLabel: "View Details",
    icon: Building2,
  },
  {
    id: 6,
    jobTitle: "Gate Security Officer",
    company: "Homeland Regalia",
    location: "Sector 77, Mohali",
    appliedDate: "2026-11-04",
    salary: "₹18,000 - ₹21,000",
    shift: "Day Shift",
    timing: "8:00 AM - 8:00 PM",
    employmentType: "Full-time",
    status: "REJECTED",
    message:
      "The position has been filled by another candidate.",
    actionLabel: "View Similar Jobs",
    icon: BriefcaseBusiness,
  },
];

const statusConfig = {
  APPLIED: {
    label: "Applied",
    icon: Clock3,
    classes:
      "bg-primary/10 text-primary border-primary/20",
  },
  SHORTLISTED: {
    label: "Shortlisted",
    icon: CheckCircle2,
    classes:
      "bg-success/10 text-success border-success/20",
  },
  ACCEPTED: {
    label: "Accepted",
    icon: CheckCircle2,
    classes:
      "bg-success/10 text-success border-success/20",
  },
  REJECTED: {
    label: "Rejected",
    icon: XCircle,
    classes:
      "bg-danger/10 text-danger border-danger/20",
  },
  WITHDRAWN: {
    label: "Withdrawn",
    icon: XCircle,
    classes:
      "bg-surface-secondary text-muted border-border",
  },
};

function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.APPLIED;
  const StatusIcon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${config.classes}`}
    >
      <StatusIcon size={14} />
      {config.label}
    </span>
  );
}

function SummaryCard({ title, value, description, icon: Icon, color }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-muted">{title}</p>
        <div className={`p-2.5 rounded-lg ${color}`}>
          <Icon size={21} />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-foreground">
        {value}
      </h2>

      <p className="text-xs text-muted mt-1">{description}</p>
    </div>
  );
}

function ApplicationCard({ application, onWithdraw }) {
  const [showDetails, setShowDetails] = useState(false);

  const isAccepted =
    application.status === "ACCEPTED" ||
    application.status === "SHORTLISTED";

  const isRejected = application.status === "REJECTED";
  const isWithdrawn = application.status === "WITHDRAWN";

  const CompanyIcon = application.icon;

  const formattedDate = new Date(
    application.appliedDate
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="bg-surface border border-border rounded-xl p-5 hover:border-primary/40 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <CompanyIcon size={24} />
          </div>

          <div>
            <h3 className="font-semibold text-foreground text-base">
              {application.jobTitle}
            </h3>

            <p className="text-sm text-muted mt-1">
              {application.company}
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-muted">
              <span className="flex items-center gap-1">
                <MapPin size={13} />
                {application.location}
              </span>

              <span className="flex items-center gap-1">
                <CalendarDays size={13} />
                Applied {formattedDate}
              </span>
            </div>
          </div>
        </div>

        <StatusBadge status={application.status} />
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-success/10 text-success px-3 py-1.5 text-sm font-semibold">
          <IndianRupee size={15} />
          {application.salary}
          <span className="font-normal text-xs">/ month</span>
        </span>

        <span className="rounded-lg bg-surface-secondary text-muted px-3 py-1.5 text-xs">
          {application.shift}
        </span>

        <span className="rounded-lg bg-surface-secondary text-muted px-3 py-1.5 text-xs">
          {application.employmentType}
        </span>
      </div>

      <div
        className={`mt-4 rounded-lg border p-3 flex items-start gap-2.5 ${
          isRejected
            ? "bg-danger/5 border-danger/20"
            : isAccepted
              ? "bg-success/5 border-success/20"
              : "bg-surface-secondary border-border"
        }`}
      >
        {isRejected ? (
          <AlertCircle size={18} className="text-danger shrink-0 mt-0.5" />
        ) : isAccepted ? (
          <CheckCircle2 size={18} className="text-success shrink-0 mt-0.5" />
        ) : (
          <Clock3 size={18} className="text-primary shrink-0 mt-0.5" />
        )}

        <p className="text-sm text-foreground">{application.message}</p>
      </div>

      {showDetails && (
        <div className="mt-4 rounded-lg bg-background border border-border p-4 space-y-2">
          <h4 className="font-semibold text-sm text-foreground">
            Application details
          </h4>

          <p className="text-sm text-muted">
            <span className="text-foreground font-medium">Job:</span>{" "}
            {application.jobTitle}
          </p>

          <p className="text-sm text-muted">
            <span className="text-foreground font-medium">Shift:</span>{" "}
            {application.timing}
          </p>

          <p className="text-sm text-muted">
            <span className="text-foreground font-medium">Employer:</span>{" "}
            {application.company}
          </p>

          <p className="text-sm text-muted">
            <span className="text-foreground font-medium">Application ID:</span>{" "}
            LH-{application.id.toString().padStart(5, "0")}
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-surface-secondary transition-colors"
          >
            <Eye size={16} />
            {showDetails ? "Hide Details" : application.actionLabel}
          </button>

          {!isRejected && !isWithdrawn && (
            <button
              onClick={() => onWithdraw(application.id)}
              className="px-3 py-2 text-sm text-danger hover:bg-danger/10 rounded-lg transition-colors"
            >
              Withdraw
            </button>
          )}
        </div>

        {isAccepted && (
          <button className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline">
            <MessageCircle size={16} />
            Contact Employer
          </button>
        )}
      </div>
    </article>
  );
}

export default function MyApplications() {
  const [applications, setApplications] = useState(initialApplications);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const counts = useMemo(() => {
    return {
      total: applications.length,
      applied: applications.filter(
        (app) => app.status === "APPLIED"
      ).length,
      accepted: applications.filter(
        (app) =>
          app.status === "ACCEPTED" ||
          app.status === "SHORTLISTED"
      ).length,
      rejected: applications.filter(
        (app) =>
          app.status === "REJECTED" ||
          app.status === "WITHDRAWN"
      ).length,
    };
  }, [applications]);

  const filteredApplications = useMemo(() => {
    let result = [...applications];

    if (activeFilter === "APPLIED") {
      result = result.filter((app) => app.status === "APPLIED");
    } else if (activeFilter === "ACCEPTED") {
      result = result.filter(
        (app) =>
          app.status === "ACCEPTED" ||
          app.status === "SHORTLISTED"
      );
    } else if (activeFilter === "REJECTED") {
      result = result.filter(
        (app) =>
          app.status === "REJECTED" ||
          app.status === "WITHDRAWN"
      );
    }

    const query = searchTerm.toLowerCase().trim();

    if (query) {
      result = result.filter(
        (app) =>
          app.jobTitle.toLowerCase().includes(query) ||
          app.company.toLowerCase().includes(query) ||
          app.location.toLowerCase().includes(query)
      );
    }

    if (sortBy === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.appliedDate) - new Date(a.appliedDate)
      );
    } else if (sortBy === "oldest") {
      result.sort(
        (a, b) =>
          new Date(a.appliedDate) - new Date(b.appliedDate)
      );
    } else if (sortBy === "salary") {
      result.sort(
        (a, b) =>
          Number(b.salary.match(/\d+/g)?.[1] || 0) -
          Number(a.salary.match(/\d+/g)?.[1] || 0)
      );
    }

    return result;
  }, [applications, activeFilter, searchTerm, sortBy]);

  const handleWithdraw = (applicationId) => {
    const confirmed = window.confirm(
      "Are you sure you want to withdraw this application?"
    );

    if (!confirmed) return;

    setApplications((previous) =>
      previous.map((app) =>
        app.id === applicationId
          ? { ...app, status: "WITHDRAWN" }
          : app
      )
    );
  };

  const filters = [
    { label: "All Applications", value: "ALL", count: counts.total },
    { label: "Applied / In Review", value: "APPLIED", count: counts.applied },
    { label: "Accepted / Shortlisted", value: "ACCEPTED", count: counts.accepted },
    { label: "Rejected", value: "REJECTED", count: counts.rejected },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        {/* Page heading */}
        <section className="mb-7">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted mb-2">
                Home / Employee / My Applications
              </p>

              <h1 className="text-3xl font-bold text-foreground">
                My Applications
              </h1>

              <p className="text-muted mt-2 text-sm">
                Track your job applications and stay updated on employer responses.
              </p>
            </div>

            <a
              href="/employee/jobs"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary-hover transition-colors"
            >
              <Search size={17} />
              Explore New Jobs
            </a>
          </div>
        </section>

        {/* Summary cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-7">
          <SummaryCard
            title="Total Applications"
            value={counts.total}
            description="Jobs you have applied for"
            icon={BriefcaseBusiness}
            color="bg-primary/10 text-primary"
          />

          <SummaryCard
            title="In Review"
            value={counts.applied}
            description="Waiting for employer response"
            icon={Clock3}
            color="bg-warning/10 text-warning"
          />

          <SummaryCard
            title="Accepted / Shortlisted"
            value={counts.accepted}
            description="Positive employer responses"
            icon={CheckCircle2}
            color="bg-success/10 text-success"
          />

          <SummaryCard
            title="Rejected / Withdrawn"
            value={counts.rejected}
            description="Closed applications"
            icon={XCircle}
            color="bg-danger/10 text-danger"
          />
        </section>

        {/* Filters and search */}
        <section className="bg-surface border border-border rounded-xl p-4 mb-6">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`whitespace-nowrap px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === filter.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-surface-secondary text-muted hover:text-foreground"
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search job, company or location..."
                  className="w-full h-11 pl-10 pr-4 rounded-lg border border-input bg-background text-foreground placeholder:text-muted outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div className="relative sm:w-56">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full h-11 px-3 pr-9 rounded-lg border border-input bg-background text-foreground outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="salary">Highest Salary</option>
                </select>

                <ChevronDown
                  size={17}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Applications and sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <section className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-foreground">
                Your Applications
              </h2>

              <span className="text-sm text-muted">
                {filteredApplications.length} results
              </span>
            </div>

            {filteredApplications.length > 0 ? (
              filteredApplications.map((application) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                  onWithdraw={handleWithdraw}
                />
              ))
            ) : (
              <div className="bg-surface border border-border rounded-xl p-10 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-surface-secondary flex items-center justify-center text-muted mb-4">
                  <FileText size={26} />
                </div>

                <h3 className="font-semibold text-foreground">
                  No applications found
                </h3>

                <p className="text-sm text-muted mt-2">
                  Try changing your filters or search for another job.
                </p>

                <button
                  onClick={() => {
                    setActiveFilter("ALL");
                    setSearchTerm("");
                  }}
                  className="mt-4 text-sm font-semibold text-primary hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-5">
            <div className="bg-surface border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <CalendarCheck className="text-primary" size={21} />
                <h3 className="font-semibold text-foreground">
                  Application Tips
                </h3>
              </div>

              <p className="text-sm text-muted mb-4">
                A few things to keep in mind while waiting for employer responses.
              </p>

              <ul className="space-y-3">
                {[
                  "Keep your phone available for employer calls.",
                  "Check your application status regularly.",
                  "Keep your documents ready for interviews.",
                  "Apply to multiple relevant job openings.",
                ].map((tip) => (
                  <li
                    key={tip}
                    className="flex items-start gap-2.5 text-sm text-foreground"
                  >
                    <CheckCircle2
                      size={17}
                      className="text-success shrink-0 mt-0.5"
                    />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-surface border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Headset className="text-primary" size={21} />
                <h3 className="font-semibold text-foreground">
                  Need Help?
                </h3>
              </div>

              <p className="text-sm text-muted mb-4">
                Having trouble with an application? Our support team can help.
              </p>

              <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-surface-secondary hover:bg-border text-foreground font-medium text-sm py-3 transition-colors">
                <MessageCircle size={17} />
                Contact Support
              </button>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb size={20} className="text-primary" />
                <h3 className="font-semibold text-foreground">
                  Keep Exploring
                </h3>
              </div>

              <p className="text-sm text-muted mb-4">
                Don't wait for one response. Discover more opportunities near you.
              </p>

              <a
                href="/employee/jobs"
                className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline"
              >
                Browse jobs
                <ArrowRight size={16} />
              </a>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
