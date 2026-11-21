
import React, { useState } from "react";
import {
  BriefcaseBusiness,
  MapPin,
  IndianRupee,
  Clock3,
  Users,
  FileText,
  Plus,
  X,
  Eye,
  Save,
  Send,
  CheckCircle2,
  Info,
  Building2,
  ArrowLeft,
} from "lucide-react";



import Header from "../common/Header";
import Footer from "../common/Footer";

const initialForm = {
  title: "",
  category: "HELPER",
  jobType: "FULL_TIME",
  shift: "MORNING",
  description: "",
  minSalary: "",
  maxSalary: "",
  openings: "1",
  experience: "FRESHER",
  area: "",
  city: "",
  state: "Punjab",
  pincode: "",
  requirements: [],
  benefits: [],
};

const jobCategories = [
  "HELPER",
  "CASHIER",
  "LOADER",
  "SALES",
  "CLEANING",
  "SECURITY",
  "DELIVERY",
  "OTHER",
];

const shifts = [
  { value: "MORNING", label: "Morning Shift" },
  { value: "EVENING", label: "Evening Shift" },
  { value: "NIGHT", label: "Night Shift" },
  { value: "FULL_DAY", label: "Full Day" },
];

const inputClass =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15";

const labelClass =
  "mb-2 block text-sm font-semibold text-foreground";

function Section({ icon: Icon, title, subtitle, children }) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <div className="mb-6 flex items-start gap-3 border-b border-border pb-4">
        <div className="rounded-xl bg-brand-500/10 p-2.5 text-brand-500">
          <Icon size={20} />
        </div>
        <div>
          <h2 className="font-semibold text-foreground">{title}</h2>
          <p className="mt-1 text-xs text-muted">{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function Field({ label, required, hint, children }) {
  return (
    <div>
      <label className={labelClass}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
    </div>
  );
}

function PostJob() {
  const [form, setForm] = useState(initialForm);
  const [requirementInput, setRequirementInput] = useState("");
  const [benefitInput, setBenefitInput] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const addItem = (field, value, clearInput) => {
    const trimmed = value.trim();

    if (!trimmed) return;

    setForm((prev) => ({
      ...prev,
      [field]: [...prev[field], trimmed],
    }));

    clearInput("");
  };

  const removeItem = (field, index) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = "Job title is required";
    if (!form.description.trim())
      newErrors.description = "Please describe the job";
    if (!form.minSalary || Number(form.minSalary) <= 0)
      newErrors.minSalary = "Enter a valid minimum salary";
    if (
      !form.maxSalary ||
      Number(form.maxSalary) < Number(form.minSalary)
    ) {
      newErrors.maxSalary = "Maximum salary must be at least the minimum";
    }
    if (!form.area.trim()) newErrors.area = "Area is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!/^\d{6}$/.test(form.pincode))
      newErrors.pincode = "Enter a valid 6-digit PIN code";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPayload = () => ({
    title: form.title.trim(),
    category: form.category,
    jobType: form.jobType,
    shift: form.shift,
    description: form.description.trim(),
    minSalary: Number(form.minSalary),
    maxSalary: Number(form.maxSalary),
    openings: Number(form.openings),
    experience: form.experience,
    location: {
      area: form.area.trim(),
      city: form.city.trim(),
      state: form.state,
      pincode: form.pincode,
    },
    requirements: form.requirements,
    benefits: form.benefits,
  });

  const handlePublish = () => {
    if (!validate()) return;

    const payload = getPayload();

    // Connect this payload to your create-job API.
    console.log("Publish job:", payload);

    alert("Job details validated! Connect your API to publish.");
  };

  const handleDraft = () => {
    // Connect this to your draft API or local draft storage.
    console.log("Save draft:", getPayload());
    alert("Draft details ready to save!");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* <Header /> */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-muted">
          <span>Employer Portal</span>
          <span>/</span>
          <span>Manage Jobs</span>
          <span>/</span>
          <span className="font-semibold text-brand-500">Post a Job</span>
        </div>

        {/* Page heading */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-brand-500">
              <BriefcaseBusiness size={17} />
              Employer Hiring Portal
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Post a New Job
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Find the right local talent. Add your job details and start
              receiving applications from nearby candidates.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-semibold transition hover:bg-surface-elevated"
          >
            <Eye size={17} />
            {showPreview ? "Hide Preview" : "Preview Job"}
          </button>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">

          {/* Main form */}
          <div className="space-y-6">

            {/* 1. Basic information */}
            <Section
              icon={BriefcaseBusiness}
              title="Basic Job Information"
              subtitle="Tell candidates what position you are hiring for."
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Field label="Job Title" required hint="Example: Store Helper, Cashier, Warehouse Loader">
                    <input
                      className={inputClass}
                      placeholder="Enter job title"
                      value={form.title}
                      onChange={(e) => updateField("title", e.target.value)}
                      maxLength={100}
                    />
                    {errors.title && (
                      <p className="mt-1 text-xs text-red-500">{errors.title}</p>
                    )}
                  </Field>
                </div>

                <Field label="Job Category" required>
                  <select
                    className={inputClass}
                    value={form.category}
                    onChange={(e) => updateField("category", e.target.value)}
                  >
                    {jobCategories.map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0) + category.slice(1).toLowerCase()}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Employment Type">
                  <select
                    className={inputClass}
                    value={form.jobType}
                    onChange={(e) => updateField("jobType", e.target.value)}
                  >
                    <option value="FULL_TIME">Full Time</option>
                    <option value="PART_TIME">Part Time</option>
                    <option value="CONTRACT">Contract</option>
                    <option value="TEMPORARY">Temporary</option>
                  </select>
                </Field>

                <div className="sm:col-span-2">
                  <Field label="Job Description" required hint="Describe daily responsibilities, duties and expectations.">
                    <textarea
                      className={`${inputClass} min-h-36 resize-y`}
                      placeholder="What will the employee do on a typical working day?"
                      value={form.description}
                      onChange={(e) =>
                        updateField("description", e.target.value)
                      }
                      maxLength={2000}
                    />
                    <div className="mt-1 flex justify-between">
                      {errors.description ? (
                        <p className="text-xs text-red-500">{errors.description}</p>
                      ) : <span />}
                      <span className="text-xs text-muted">
                        {form.description.length}/2000
                      </span>
                    </div>
                  </Field>
                </div>
              </div>
            </Section>

            {/* 2. Salary and shift */}
            <Section
              icon={IndianRupee}
              title="Salary & Working Hours"
              subtitle="Be transparent about compensation and working conditions."
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Minimum Monthly Salary (₹)" required>
                  <input
                    type="number"
                    min="1"
                    className={inputClass}
                    placeholder="e.g. 15000"
                    value={form.minSalary}
                    onChange={(e) => updateField("minSalary", e.target.value)}
                  />
                  {errors.minSalary && (
                    <p className="mt-1 text-xs text-red-500">{errors.minSalary}</p>
                  )}
                </Field>

                <Field label="Maximum Monthly Salary (₹)" required>
                  <input
                    type="number"
                    min="1"
                    className={inputClass}
                    placeholder="e.g. 22000"
                    value={form.maxSalary}
                    onChange={(e) => updateField("maxSalary", e.target.value)}
                  />
                  {errors.maxSalary && (
                    <p className="mt-1 text-xs text-red-500">{errors.maxSalary}</p>
                  )}
                </Field>

                <Field label="Work Shift" required>
                  <select
                    className={inputClass}
                    value={form.shift}
                    onChange={(e) => updateField("shift", e.target.value)}
                  >
                    {shifts.map((shift) => (
                      <option key={shift.value} value={shift.value}>
                        {shift.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Number of Openings" required>
                  <input
                    type="number"
                    min="1"
                    max="999"
                    className={inputClass}
                    value={form.openings}
                    onChange={(e) => updateField("openings", e.target.value)}
                  />
                </Field>

                <div className="sm:col-span-2">
                  <Field label="Experience Required">
                    <select
                      className={inputClass}
                      value={form.experience}
                      onChange={(e) => updateField("experience", e.target.value)}
                    >
                      <option value="FRESHER">Fresher / No Experience</option>
                      <option value="0-1">0-1 Years</option>
                      <option value="1-2">1-2 Years</option>
                      <option value="2-5">2-5 Years</option>
                      <option value="5+">5+ Years</option>
                    </select>
                  </Field>
                </div>
              </div>
            </Section>

            {/* 3. Location */}
            <Section
              icon={MapPin}
              title="Job Location"
              subtitle="Help candidates find your workplace easily."
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Field label="Area / Street Address" required>
                    <input
                      className={inputClass}
                      placeholder="e.g. Phase 9 Industrial Area"
                      value={form.area}
                      onChange={(e) => updateField("area", e.target.value)}
                    />
                    {errors.area && (
                      <p className="mt-1 text-xs text-red-500">{errors.area}</p>
                    )}
                  </Field>
                </div>

                <Field label="City" required>
                  <input
                    className={inputClass}
                    placeholder="e.g. Mohali"
                    value={form.city}
                    onChange={(e) => updateField("city", e.target.value)}
                  />
                  {errors.city && (
                    <p className="mt-1 text-xs text-red-500">{errors.city}</p>
                  )}
                </Field>

                <Field label="State" required>
                  <select
                    className={inputClass}
                    value={form.state}
                    onChange={(e) => updateField("state", e.target.value)}
                  >
                    <option value="Punjab">Punjab</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Other">Other</option>
                  </select>
                </Field>

                <Field label="PIN Code" required>
                  <input
                    className={inputClass}
                    placeholder="6-digit PIN code"
                    maxLength={6}
                    inputMode="numeric"
                    value={form.pincode}
                    onChange={(e) =>
                      updateField("pincode", e.target.value.replace(/\D/g, ""))
                    }
                  />
                  {errors.pincode && (
                    <p className="mt-1 text-xs text-red-500">{errors.pincode}</p>
                  )}
                </Field>
              </div>
            </Section>

            {/* 4. Requirements */}
            <Section
              icon={FileText}
              title="Requirements & Benefits"
              subtitle="Help candidates understand what you expect and offer."
            >
              <div className="space-y-6">
                <Field label="Job Requirements" hint="Add skills, qualifications or other requirements.">
                  <div className="flex gap-2">
                    <input
                      className={inputClass}
                      placeholder="e.g. Basic communication skills"
                      value={requirementInput}
                      onChange={(e) => setRequirementInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addItem("requirements", requirementInput, setRequirementInput);
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        addItem("requirements", requirementInput, setRequirementInput)
                      }
                      className="rounded-xl bg-brand-500 px-4 text-white hover:bg-brand-600"
                    >
                      <Plus size={20} />
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {form.requirements.map((item, index) => (
                      <span
                        key={`${item}-${index}`}
                        className="flex items-center gap-2 rounded-lg bg-brand-500/10 px-3 py-2 text-xs font-medium text-brand-500"
                      >
                        {item}
                        <button type="button" onClick={() => removeItem("requirements", index)}>
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </Field>

                <Field label="Employee Benefits" hint="Mention perks such as meals, transport, weekly offs or incentives.">
                  <div className="flex gap-2">
                    <input
                      className={inputClass}
                      placeholder="e.g. Free meals"
                      value={benefitInput}
                      onChange={(e) => setBenefitInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addItem("benefits", benefitInput, setBenefitInput);
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        addItem("benefits", benefitInput, setBenefitInput)
                      }
                      className="rounded-xl bg-brand-500 px-4 text-white hover:bg-brand-600"
                    >
                      <Plus size={20} />
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {form.benefits.map((item, index) => (
                      <span
                        key={`${item}-${index}`}
                        className="flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-2 text-xs font-medium text-green-600"
                      >
                        {item}
                        <button type="button" onClick={() => removeItem("benefits", index)}>
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </Field>
              </div>
            </Section>

            {/* Form actions */}
            <div className="flex flex-col-reverse justify-between gap-3 rounded-2xl border border-border bg-surface p-5 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={handleDraft}
                className="flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-background"
              >
                <Save size={17} />
                Save as Draft
              </button>

              <button
                type="button"
                onClick={handlePublish}
                className="flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600"
              >
                <Send size={17} />
                Publish Job
              </button>
            </div>
          </div>

          {/* Right side panel */}
          <aside className="space-y-5 lg:sticky lg:top-24">
            {showPreview ? (
              <div className="overflow-hidden rounded-2xl border border-border bg-surface">
                <div className="flex items-center justify-between border-b border-border p-4">
                  <h3 className="font-semibold">Candidate Preview</h3>
                  <span className="rounded-full bg-brand-500/10 px-2.5 py-1 text-xs text-brand-500">
                    Preview
                  </span>
                </div>
                <div className="space-y-4 p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-brand-500/10 p-3 text-brand-500">
                      <Building2 size={23} />
                    </div>
                    <div>
                      <p className="font-semibold">Your Business</p>
                      <p className="text-xs text-muted">Verified Employer</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold">
                      {form.title || "Your job title"}
                    </h3>
                    <p className="mt-1 text-xs text-muted">
                      {form.category} · {form.jobType.replace("_", " ")}
                    </p>
                  </div>

                  <p className="text-sm font-bold text-green-600">
                    ₹{Number(form.minSalary || 0).toLocaleString("en-IN")} -
                    ₹{Number(form.maxSalary || 0).toLocaleString("en-IN")}
                    <span className="font-normal text-muted"> / month</span>
                  </p>

                  <div className="space-y-3 text-xs text-muted">
                    <p className="flex items-center gap-2">
                      <MapPin size={15} />
                      {[form.area, form.city, form.state].filter(Boolean).join(", ") || "Job location"}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock3 size={15} />
                      {shifts.find((s) => s.value === form.shift)?.label}
                    </p>
                    <p className="flex items-center gap-2">
                      <Users size={15} />
                      {form.openings} opening(s)
                    </p>
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="mb-2 text-sm font-semibold">Job Description</p>
                    <p className="whitespace-pre-wrap text-sm leading-6 text-muted">
                      {form.description || "Your job description will appear here."}
                    </p>
                  </div>

                  {form.benefits.length > 0 && (
                    <div>
                      <p className="mb-2 text-sm font-semibold">Benefits</p>
                      <div className="flex flex-wrap gap-2">
                        {form.benefits.map((b, i) => (
                          <span key={i} className="rounded-lg bg-green-500/10 px-2 py-1 text-xs text-green-600">
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-border bg-surface p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Info className="text-brand-500" size={19} />
                  <h3 className="font-semibold">Posting Guidelines</h3>
                </div>
                <ul className="space-y-3 text-sm text-muted">
                  <li className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-green-500" size={16} />
                    Use a clear and specific job title.
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-green-500" size={16} />
                    Mention the actual monthly salary.
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-green-500" size={16} />
                    Provide an accurate workplace address.
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-green-500" size={16} />
                    Clearly explain daily responsibilities.
                  </li>
                </ul>
              </div>
            )}

            <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5">
              <div className="mb-3 flex items-center gap-2 text-green-600">
                <CheckCircle2 size={20} />
                <h3 className="font-semibold">LocalHire Trust Promise</h3>
              </div>
              <p className="text-sm leading-6 text-muted">
                Connect directly with local workers. No middlemen, no hidden
                recruitment charges, and transparent salary information.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-5">
              <div className="mb-2 flex items-center gap-2">
                <Users size={19} className="text-brand-500" />
                <h3 className="font-semibold">Need Hiring Support?</h3>
              </div>
              <p className="text-sm text-muted">
                Our support team can help you create effective job listings.
              </p>
              <button
                type="button"
                className="mt-4 w-full rounded-xl border border-border px-4 py-2.5 text-sm font-semibold hover:bg-background"
              >
                Contact Support
              </button>
            </div>
          </aside>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}

export default PostJob;
