
import React, { useState } from "react";
import {
  BriefcaseBusiness,
  MapPin,
  IndianRupee,
  Clock3,
  Eye,
  Send,
} from "lucide-react";

const initialForm = {
  category: "HELPER",
  shift: "MORNING",
  description: "",
  minSalary: "",
  maxSalary: "",
  area: "",
  city: "",
  state: "Punjab",
  pincode: "",
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
  { value: "MORNING", label: "Morning" },
  { value: "EVENING", label: "Evening" },
  { value: "NIGHT", label: "Night" },
  { value: "FULL_DAY", label: "Full Day" },
];

const inputClass =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15";

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-foreground">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {children}

      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}

function Section({ icon: Icon, title, children }) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-3 border-b border-border pb-4">
        <div className="rounded-xl bg-brand-500/10 p-2.5 text-brand-500">
          <Icon size={20} />
        </div>
        <h2 className="font-semibold text-foreground">{title}</h2>
      </div>

      {children}
    </section>
  );
}

function PostJob() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.description.trim()) {
      newErrors.description = "Job description is required";
    }

    if (!form.minSalary || Number(form.minSalary) <= 0) {
      newErrors.minSalary = "Enter a valid minimum salary";
    }

    if (
      !form.maxSalary ||
      Number(form.maxSalary) < Number(form.minSalary)
    ) {
      newErrors.maxSalary =
        "Maximum salary must be at least the minimum salary";
    }

    if (!form.area.trim()) {
      newErrors.area = "Area is required";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!form.pincode || !/^\d{6}$/.test(form.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit PIN code";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const getPayload = () => ({
    jobType: form.category,
    shiftType: form.shift,
    description: form.description.trim(),
    minSalary: Number(form.minSalary),
    maxSalary: Number(form.maxSalary),
    location: {
      area: form.area.trim(),
      city: form.city.trim(),
      state: form.state,
      pincode: form.pincode,
    },
  });

  const handlePublish = () => {
    if (!validate()) return;

    const payload = getPayload();

    // We will connect this to the Redux async thunk next.
    console.log("Publish job:", payload);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Page heading */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-brand-500">
              <BriefcaseBusiness size={17} />
              Employer Portal
            </div>

            <h1 className="text-2xl font-bold sm:text-3xl">
              Post a Job
            </h1>

            <p className="mt-2 text-sm text-muted">
              Provide the job details to find suitable local workers.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-semibold hover:bg-background"
          >
            <Eye size={17} />
            {showPreview ? "Hide Preview" : "Preview Job"}
          </button>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">

          {/* Form */}
          <div className="space-y-6">

            {/* Job information */}
            <Section
              icon={BriefcaseBusiness}
              title="Job Information"
            >
              <div className="grid gap-5 sm:grid-cols-2">

                <Field label="Job Category" required>
                  <select
                    className={inputClass}
                    value={form.category}
                    onChange={(e) =>
                      updateField("category", e.target.value)
                    }
                  >
                    {jobCategories.map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0) +
                          category.slice(1).toLowerCase()}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Work Shift" required>
                  <select
                    className={inputClass}
                    value={form.shift}
                    onChange={(e) =>
                      updateField("shift", e.target.value)
                    }
                  >
                    {shifts.map((shift) => (
                      <option key={shift.value} value={shift.value}>
                        {shift.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <div className="sm:col-span-2">
                  <Field
                    label="Job Description"
                    required
                    error={errors.description}
                  >
                    <textarea
                      className={`${inputClass} min-h-36 resize-y`}
                      placeholder="Describe the work, responsibilities and expectations..."
                      value={form.description}
                      onChange={(e) =>
                        updateField("description", e.target.value)
                      }
                      maxLength={2000}
                    />

                    <p className="mt-1 text-right text-xs text-muted">
                      {form.description.length}/2000
                    </p>
                  </Field>
                </div>
              </div>
            </Section>

            {/* Salary */}
            <Section
              icon={IndianRupee}
              title="Salary Details"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Minimum Monthly Salary (₹)"
                  required
                  error={errors.minSalary}
                >
                  <input
                    type="number"
                    min="1"
                    className={inputClass}
                    placeholder="e.g. 12000"
                    value={form.minSalary}
                    onChange={(e) =>
                      updateField("minSalary", e.target.value)
                    }
                  />
                </Field>

                <Field
                  label="Maximum Monthly Salary (₹)"
                  required
                  error={errors.maxSalary}
                >
                  <input
                    type="number"
                    min="1"
                    className={inputClass}
                    placeholder="e.g. 18000"
                    value={form.maxSalary}
                    onChange={(e) =>
                      updateField("maxSalary", e.target.value)
                    }
                  />
                </Field>
              </div>
            </Section>

            {/* Location */}
            <Section
              icon={MapPin}
              title="Job Location"
            >
              <div className="grid gap-5 sm:grid-cols-2">

                <div className="sm:col-span-2">
                  <Field
                    label="Area / Street Address"
                    required
                    error={errors.area}
                  >
                    <input
                      className={inputClass}
                      placeholder="e.g. Sector 22"
                      value={form.area}
                      onChange={(e) =>
                        updateField("area", e.target.value)
                      }
                    />
                  </Field>
                </div>

                <Field
                  label="City"
                  required
                  error={errors.city}
                >
                  <input
                    className={inputClass}
                    placeholder="e.g. Chandigarh"
                    value={form.city}
                    onChange={(e) =>
                      updateField("city", e.target.value)
                    }
                  />
                </Field>

                <Field label="State" required>
                  <select
                    className={inputClass}
                    value={form.state}
                    onChange={(e) =>
                      updateField("state", e.target.value)
                    }
                  >
                    <option value="Punjab">Punjab</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">
                      Himachal Pradesh
                    </option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Other">Other</option>
                  </select>
                </Field>

                <Field
                  label="PIN Code"
                  required
                  error={errors.pincode}
                >
                  <input
                    className={inputClass}
                    placeholder="6-digit PIN code"
                    maxLength={6}
                    inputMode="numeric"
                    value={form.pincode}
                    onChange={(e) =>
                      updateField(
                        "pincode",
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                  />
                </Field>
              </div>
            </Section>

            {/* Publish */}
            <div className="flex justify-end rounded-2xl border border-border bg-surface p-5">
              <button
                type="button"
                onClick={handlePublish}
                className="flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
              >
                <Send size={17} />
                Publish Job
              </button>
            </div>
          </div>

          {/* Preview */}
          {showPreview && (
            <aside className="rounded-2xl border border-border bg-surface p-5 lg:sticky lg:top-24">
              <h2 className="mb-5 font-semibold">
                Job Preview
              </h2>

              <p className="text-lg font-bold">
                {form.category}
              </p>

              <p className="mt-1 text-xs text-muted">
                {shifts.find((s) => s.value === form.shift)?.label}
              </p>

              <p className="mt-4 font-bold text-green-600">
                ₹{Number(form.minSalary || 0).toLocaleString("en-IN")}
                {" - "}
                ₹{Number(form.maxSalary || 0).toLocaleString("en-IN")}
                <span className="font-normal text-muted"> / month</span>
              </p>

              <div className="my-5 space-y-3 border-y border-border py-4 text-sm text-muted">
                <p className="flex items-center gap-2">
                  <MapPin size={16} />
                  {[form.area, form.city, form.state]
                    .filter(Boolean)
                    .join(", ") || "Job location"}
                </p>

                <p className="flex items-center gap-2">
                  <Clock3 size={16} />
                  {shifts.find((s) => s.value === form.shift)?.label}
                </p>
              </div>

              <h3 className="mb-2 text-sm font-semibold">
                Description
              </h3>

              <p className="whitespace-pre-wrap text-sm leading-6 text-muted">
                {form.description || "Job description will appear here."}
              </p>
            </aside>
          )}
        </div>
      </main>
    </div>
  );
}

export default PostJob;
