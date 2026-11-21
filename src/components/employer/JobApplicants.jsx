
import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Users,
  Search,
  MapPin,
  Clock,
  Mail,
  Phone,
  UserRound,
  BriefcaseBusiness,
  GraduationCap,
  ArrowLeft,
  Eye,
  X,
  CheckCircle2,
  CalendarDays,
  Filter,
  SlidersHorizontal,
  ShieldCheck,
  Headset,
} from "lucide-react";

// ========================================
// DUMMY JOB DATA
// ========================================

const jobs = [
  {
    id: 1,
    title: "Senior Cashier & Billing Staff",
    location: "Phase 9 Industrial Area, Mohali",
    salary: "₹22,000 - ₹26,000",
    shift: "Morning",
  },
  {
    id: 2,
    title: "Warehouse Packaging & Inventory Helper",
    location: "Phase 8B Industrial Area, Mohali",
    salary: "₹19,500 - ₹23,000",
    shift: "Evening",
  },
  {
    id: 3,
    title: "Store Floor Customer Assistant",
    location: "Elante Mall, Chandigarh",
    salary: "₹20,000 - ₹25,000",
    shift: "Day",
  },
  {
    id: 4,
    title: "Night Security & Gate Guard",
    location: "Phase 9 Hub, Mohali",
    salary: "₹18,000 - ₹21,000",
    shift: "Night",
  },
];

// ========================================
// DUMMY APPLICATION DATA
// ========================================

const initialApplicants = [
  {
    id: 101,
    jobId: 2,
    name: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    phone: "+91 98765 43210",
    location: "Phase 7, Mohali",
    experience: "1 Year",
    education: "12th Pass",
    skills: ["Inventory Management", "Packaging", "Teamwork"],
    appliedOn: "2026-11-15",
    isNew: true,
    status: "APPLIED",
    about:
      "Hardworking candidate with experience in warehouse operations, packaging and inventory handling. Comfortable working in shifts.",
  },
  {
    id: 102,
    jobId: 2,
    name: "Aman Kumar",
    email: "aman.kumar@gmail.com",
    phone: "+91 98765 12345",
    location: "Sector 68, Mohali",
    experience: "Fresher",
    education: "10th Pass",
    skills: ["Packaging", "Communication", "Physical Work"],
    appliedOn: "2026-11-15",
    isNew: true,
    status: "APPLIED",
    about:
      "Motivated fresher looking for an opportunity in warehouse and logistics operations. Quick learner and comfortable with physical tasks.",
  },
  {
    id: 103,
    jobId: 2,
    name: "Vikram Singh",
    email: "vikram.singh@gmail.com",
    phone: "+91 98123 45678",
    location: "Kharar, Punjab",
    experience: "2 Years",
    education: "12th Pass",
    skills: ["Warehouse Operations", "Stock Handling", "Loading"],
    appliedOn: "2026-11-14",
    isNew: true,
    status: "APPLIED",
    about:
      "Two years of experience in warehouse management and stock handling. Familiar with inventory processes.",
  },
  {
    id: 104,
    jobId: 2,
    name: "Rohit Verma",
    email: "rohit.verma@gmail.com",
    phone: "+91 98712 34567",
    location: "Landran, Mohali",
    experience: "6 Months",
    education: "Graduate",
    skills: ["Data Entry", "Packaging", "Computer Basics"],
    appliedOn: "2026-11-12",
    isNew: false,
    status: "APPLIED",
    about:
      "Graduate with six months of experience in warehouse support and basic computer operations.",
  },
  {
    id: 105,
    jobId: 2,
    name: "Sandeep Kumar",
    email: "sandeep.kumar@gmail.com",
    phone: "+91 98987 65432",
    location: "Sector 70, Mohali",
    experience: "3 Years",
    education: "10th Pass",
    skills: ["Inventory", "Loading", "Warehouse Management"],
    appliedOn: "2026-11-10",
    isNew: false,
    status: "APPLIED",
    about:
      "Experienced warehouse worker with three years of experience in inventory handling and logistics support.",
  },
  {
    id: 106,
    jobId: 2,
    name: "Deepak Yadav",
    email: "deepak.yadav@gmail.com",
    phone: "+91 98765 67890",
    location: "Kurali, Punjab",
    experience: "Fresher",
    education: "12th Pass",
    skills: ["Teamwork", "Packaging", "Communication"],
    appliedOn: "2026-11-09",
    isNew: false,
    status: "APPLIED",
    about:
      "Seeking an entry-level warehouse position. Responsible, punctual and eager to learn.",
  },
];

// ========================================
// REUSABLE STAT CARD
// ========================================

function StatCard({ title, value, subtitle, icon: Icon, iconColor }) {
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
        <h2 className="text-3xl font-bold tracking-tight">{value}</h2>
        <span className="text-xs font-medium text-muted">{subtitle}</span>
      </div>
    </div>
  );
}

// ========================================
// APPLICANT STATUS BADGE
// ========================================

function StatusBadge({ status }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-warning/10 px-3 py-1.5 text-xs font-semibold text-warning">
      <span className="h-1.5 w-1.5 rounded-full bg-warning" />
      {status}
    </span>
  );
}

// ========================================
// APPLICANT CARD
// ========================================

function ApplicantCard({ applicant, onView }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-sm transition hover:border-primary/30 hover:shadow-md">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <UserRound size={23} />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-foreground">
                {applicant.name}
              </h3>

              {applicant.isNew && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                  NEW
                </span>
              )}
            </div>

            <div className="mt-2 flex flex-col gap-2 text-xs text-muted sm:flex-row sm:gap-4">
              <span className="flex items-center gap-1.5">
                <Mail size={14} />
                {applicant.email}
              </span>

              <span className="flex items-center gap-1.5">
                <Phone size={14} />
                {applicant.phone}
              </span>
            </div>
          </div>
        </div>

        <StatusBadge status={applicant.status} />
      </div>

      <div className="my-4 border-t border-border" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-2 text-sm text-foreground-secondary">
          <MapPin size={16} className="shrink-0 text-muted" />
          {applicant.location}
        </div>

        <div className="flex items-center gap-2 text-sm text-foreground-secondary">
          <BriefcaseBusiness size={16} className="shrink-0 text-muted" />
          {applicant.experience} Experience
        </div>

        <div className="flex items-center gap-2 text-sm text-foreground-secondary">
          <GraduationCap size={17} className="shrink-0 text-muted" />
          {applicant.education}
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-2 text-xs font-semibold text-foreground-secondary">
          SKILLS
        </p>

        <div className="flex flex-wrap gap-2">
          {applicant.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-md bg-surface-secondary px-2.5 py-1.5 text-xs font-medium text-foreground-secondary"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-col justify-between gap-3 border-t border-border pt-4 sm:flex-row sm:items-center">
        <p className="flex items-center gap-1.5 text-xs text-muted">
          <CalendarDays size={14} />
          Applied on{" "}
          {new Date(applicant.appliedOn).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>

        <button
          onClick={() => onView(applicant)}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2.5 text-xs font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
        >
          <Eye size={15} />
          View Applicant
        </button>
      </div>
    </div>
  );
}

// ========================================
// APPLICANT DETAILS MODAL
// ========================================

function ApplicantModal({ applicant, onClose }) {
  if (!applicant) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-border bg-surface shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border p-5">
          <div>
            <h2 className="text-lg font-bold">Applicant Details</h2>
            <p className="mt-1 text-xs text-muted">
              Review candidate information
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted transition hover:bg-surface-secondary hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5 p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <UserRound size={30} />
            </div>

            <div>
              <h3 className="text-xl font-bold">{applicant.name}</h3>
              <p className="mt-1 text-sm text-muted">
                {applicant.location}
              </p>
              <div className="mt-2">
                <StatusBadge status={applicant.status} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border p-4">
            <h4 className="mb-3 text-sm font-semibold">Contact Information</h4>

            <div className="space-y-3 text-sm text-foreground-secondary">
              <a
                href={`mailto:${applicant.email}`}
                className="flex items-center gap-3 hover:text-primary"
              >
                <Mail size={17} className="text-muted" />
                {applicant.email}
              </a>

              <a
                href={`tel:${applicant.phone}`}
                className="flex items-center gap-3 hover:text-primary"
              >
                <Phone size={17} className="text-muted" />
                {applicant.phone}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-surface-secondary p-4">
              <p className="text-xs text-muted">Experience</p>
              <p className="mt-2 font-semibold">{applicant.experience}</p>
            </div>

            <div className="rounded-xl bg-surface-secondary p-4">
              <p className="text-xs text-muted">Education</p>
              <p className="mt-2 font-semibold">{applicant.education}</p>
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold">About Applicant</h4>
            <p className="text-sm leading-6 text-foreground-secondary">
              {applicant.about}
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {applicant.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-primary/10 px-3 py-2 text-xs font-medium text-primary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <p className="text-xs text-muted">
              Application ID: #{applicant.id}
            </p>
            <p className="mt-1 text-xs text-muted">
              Applied on{" "}
              {new Date(applicant.appliedOn).toLocaleDateString("en-IN")}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <a
              href={`mailto:${applicant.email}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
            >
              <Mail size={16} />
              Contact Applicant
            </a>

            <button
              onClick={onClose}
              className="rounded-lg border border-border px-5 py-3 text-sm font-semibold hover:bg-surface-secondary"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// MAIN PAGE
// ========================================

function JobApplicants() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [applicants] = useState(initialApplicants);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All Applicants");
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  // Find the selected job using the route parameter.
  const selectedJob = jobs.find(
    (job) => job.id === Number(jobId)
  );

  // Filter applicants for the selected job.
  const jobApplicants = useMemo(
    () =>
      applicants.filter(
        (applicant) => applicant.jobId === Number(jobId)
      ),
    [applicants, jobId]
  );

  const newApplicants = jobApplicants.filter(
    (applicant) => applicant.isNew
  ).length;

  // Search and tab filtering.
  const filteredApplicants = useMemo(() => {
    let result = [...jobApplicants];

    if (activeTab === "New Applicants") {
      result = result.filter((applicant) => applicant.isNew);
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (applicant) =>
          applicant.name.toLowerCase().includes(query) ||
          applicant.email.toLowerCase().includes(query) ||
          applicant.phone.includes(query) ||
          applicant.location.toLowerCase().includes(query)
      );
    }

    return result;
  }, [jobApplicants, activeTab, search]);

  const tabs = ["All Applicants", "New Applicants"];

  return (
    <div className="min-h-screen bg-background text-foreground">

      <main className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">

        {/* BREADCRUMB */}
        <div className="mb-6 flex items-center gap-2 text-xs text-muted">
          <span>Employer Portal</span>
          <span>/</span>
          <button
            onClick={() => navigate("/employer/jobs/manage")}
            className="hover:text-primary"
          >
            Manage Jobs
          </button>
          <span>/</span>
          <span className="font-semibold text-primary">
            Applicants
          </span>
        </div>

        {/* PAGE HEADING */}
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Job Applicants
            </h1>

            <p className="mt-2 text-sm text-muted">
              Review candidates who have applied for your job posting.
            </p>
          </div>

          <button
            onClick={() => navigate("/employer/jobs/manage")}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium transition hover:bg-surface-secondary"
          >
            <ArrowLeft size={17} />
            Back to Jobs
          </button>
        </div>

        {/* SELECTED JOB DETAILS */}
        {selectedJob ? (
          <section className="mb-6 rounded-xl border border-border bg-surface p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-primary">
                  <BriefcaseBusiness size={15} />
                  SELECTED JOB POSTING
                </div>

                <h2 className="text-lg font-bold">
                  {selectedJob.title}
                </h2>

                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    {selectedJob.location}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {selectedJob.shift} Shift
                  </span>
                </div>
              </div>

              <div className="md:text-right">
                <p className="text-xs text-muted">Monthly Salary</p>
                <p className="mt-1 text-lg font-bold text-success">
                  {selectedJob.salary}
                </p>
              </div>
            </div>
          </section>
        ) : (
          <div className="mb-6 rounded-xl border border-warning/30 bg-warning/5 p-5">
            <p className="text-sm font-semibold">
              Demo job not found
            </p>
            <p className="mt-1 text-xs text-muted">
              This job ID is not present in the dummy jobs array.
            </p>
          </div>
        )}

        {/* STATISTICS */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            title="Total Applicants"
            value={jobApplicants.length}
            subtitle="Candidates"
            icon={Users}
            iconColor="text-primary bg-primary/10"
          />

          <StatCard
            title="New Applicants"
            value={newApplicants}
            subtitle="Recently applied"
            icon={Clock}
            iconColor="text-warning bg-warning/10"
          />

          <StatCard
            title="Applications Received"
            value={jobApplicants.length}
            subtitle="For this job"
            icon={CheckCircle2}
            iconColor="text-success bg-success/10"
          />
        </div>

        {/* FILTER SECTION */}
        <section className="mb-5 rounded-xl border border-border bg-surface p-4 shadow-sm">

          <div className="flex flex-wrap items-center gap-2 border-b border-border pb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "bg-surface-secondary text-foreground-secondary hover:bg-border"
                }`}
              >
                {tab} (
                {tab === "All Applicants"
                  ? jobApplicants.length
                  : newApplicants}
                )
              </button>
            ))}

            <span className="ml-auto hidden items-center gap-2 text-xs text-muted sm:flex">
              <SlidersHorizontal size={15} />
              Filter Applicants
            </span>
          </div>

          <div className="pt-4">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by applicant name, email, phone or location..."
                className="w-full rounded-lg border border-input bg-background py-3 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </section>

        {/* APPLICANTS LIST */}
        <section>
          <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold">
                Applicants List
              </h2>

              <p className="mt-1 text-xs text-muted">
                Showing {filteredApplicants.length} of {jobApplicants.length} applicants
              </p>
            </div>
          </div>

          {filteredApplicants.length > 0 ? (
            <div className="space-y-4">
              {filteredApplicants.map((applicant) => (
                <ApplicantCard
                  key={applicant.id}
                  applicant={applicant}
                  onView={setSelectedApplicant}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface p-8 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">
                <Users size={30} />
              </div>

              <h3 className="font-semibold">
                No applicants found
              </h3>

              <p className="mt-2 max-w-sm text-sm text-muted">
                {jobApplicants.length === 0
                  ? "Candidates who apply for this job will appear here."
                  : "Try changing your search or selected filter."}
              </p>
            </div>
          )}
        </section>

        {/* SUPPORT CARDS */}
        <div className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <InfoCard
            icon={ShieldCheck}
            title="Direct Hiring, No Middlemen"
            description="Connect directly with candidates and build your local workforce through LocalHire."
            color="text-success bg-success/10"
          />

          <InfoCard
            icon={Headset}
            title="Need Hiring Support?"
            description="Our support team can help you with your recruitment process."
            color="text-primary bg-primary/10"
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

      {/* APPLICANT DETAILS MODAL */}
      <ApplicantModal
        applicant={selectedApplicant}
        onClose={() => setSelectedApplicant(null)}
      />

    </div>
  );
}

// ========================================
// REUSABLE INFORMATION CARD
// ========================================

function InfoCard({ icon: Icon, title, description, color }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
      <div className={`rounded-lg p-2 ${color}`}>
        <Icon size={19} />
      </div>

      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          {description}
        </p>
      </div>
    </div>
  );
}

export default JobApplicants;
