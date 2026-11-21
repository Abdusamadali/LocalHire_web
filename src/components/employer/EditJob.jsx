
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    BriefcaseBusiness,
    MapPin,
    IndianRupee,
    Clock,
    FileText,
    Save,
    RotateCcw
} from "lucide-react";

const jobTypes = [
    "HELPER",
    "CASHIER",
    "LOADER",
    "SALES",
    "CLEANING",
    "SECURITY",
    "DELIVERY",
    "OTHER"
];

const shiftTypes = [
    "MORNING",
    "EVENING",
    "NIGHT",
    "FULL_DAY"
];

// Replace these options with your actual JobStatus enum values.
const jobStatuses = [
    "ACTIVE",
    "CLOSED"
];

const dummyJobs = {
    1: {
        id: 1,
        status: "ACTIVE",
        jobType: "HELPER",
        salary: 12000,
        shiftType: "FULL_DAY",
        location: {
            area: "Phase 7",
            city: "Mohali",
            state: "Punjab",
            pincode: "160062"
        },
        description:
            "Looking for a hardworking store helper to assist with daily store operations."
    },
    2: {
        id: 2,
        status: "ACTIVE",
        jobType: "CASHIER",
        salary: 15000,
        shiftType: "MORNING",
        location: {
            area: "Sector 22",
            city: "Chandigarh",
            state: "Punjab",
            pincode: "160022"
        },
        description:
            "Looking for an experienced cashier to manage billing and customer payments."
    }
};

function EditJob() {
    const { jobId } = useParams();
    const navigate = useNavigate();

    const job = dummyJobs[jobId];

    const [formData, setFormData] = useState(() => {
        if (!job) return null;

        return {
            status: job.status,
            jobType: job.jobType,
            salary: job.salary,
            shiftType: job.shiftType,
            location: { ...job.location },
            description: job.description
        };
    });

    const [saved, setSaved] = useState(false);

    if (!job || !formData) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-6">
                <div className="bg-surface border border-border rounded-2xl p-8 text-center max-w-md w-full">
                    <h2 className="text-xl font-bold text-foreground">
                        Job not found
                    </h2>
                    <p className="text-muted mt-2">
                        No demo job exists with ID {jobId}.
                    </p>
                    <button
                        onClick={() => navigate("/employer/dashboard")}
                        className="mt-5 bg-primary text-white px-5 py-2.5 rounded-xl"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setSaved(false);

        if (name.startsWith("location.")) {
            const field = name.split(".")[1];

            setFormData(prev => ({
                ...prev,
                location: {
                    ...prev.location,
                    [field]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: name === "salary" ? Number(value) : value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Demo only: no API call is made.
        setSaved(true);

        console.log("Updated job data:", {
            ...formData,
            salary: Number(formData.salary)
        });
    };

    const handleReset = () => {
        setFormData({
            status: job.status,
            jobType: job.jobType,
            salary: job.salary,
            shiftType: job.shiftType,
            location: { ...job.location },
            description: job.description
        });

        setSaved(false);
    };

    const inputClass =
        "w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition";

    const labelClass =
        "block text-sm font-semibold text-foreground mb-2";

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">

                    <div>
                        <button
                            onClick={() => navigate("/employer/dashboard")}
                            className="flex items-center gap-2 text-muted hover:text-foreground text-sm mb-4 transition"
                        >
                            <ArrowLeft size={17} />
                            Back to Jobs
                        </button>

                        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                            Edit Job
                        </h1>

                        <p className="text-muted mt-2">
                            Update your job posting details.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted bg-surface border border-border rounded-xl px-4 py-3">
                        <BriefcaseBusiness size={17} />
                        Job ID: #{job.id}
                    </div>
                </div>

                {/* Demo Save Message */}
                {saved && (
                    <div className="mb-6 p-4 rounded-xl border border-green-500/30 bg-green-500/10 text-green-600">
                        Demo changes saved locally. No backend update was performed.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Job Information */}
                    <section className="bg-surface border border-border rounded-2xl p-5 sm:p-7">

                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                                <BriefcaseBusiness size={21} />
                            </div>

                            <div>
                                <h2 className="font-bold text-lg text-foreground">
                                    Job Information
                                </h2>
                                <p className="text-sm text-muted">
                                    Update the basic job details.
                                </p>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">

                            <div>
                                <label className={labelClass}>
                                    Job Type
                                </label>

                                <select
                                    name="jobType"
                                    value={formData.jobType}
                                    onChange={handleChange}
                                    className={inputClass}
                                >
                                    {jobTypes.map(type => (
                                        <option key={type} value={type}>
                                            {type.replace("_", " ")}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Job Status
                                </label>

                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className={inputClass}
                                >
                                    {jobStatuses.map(status => (
                                        <option key={status} value={status}>
                                            {status.replace("_", " ")}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Monthly Salary (₹)
                                </label>

                                <div className="relative">
                                    <IndianRupee
                                        size={17}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                                    />

                                    <input
                                        type="number"
                                        name="salary"
                                        min="1"
                                        required
                                        value={formData.salary}
                                        onChange={handleChange}
                                        className={`${inputClass} pl-11`}
                                        placeholder="Enter salary"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Shift Type
                                </label>

                                <select
                                    name="shiftType"
                                    value={formData.shiftType}
                                    onChange={handleChange}
                                    className={inputClass}
                                >
                                    {shiftTypes.map(shift => (
                                        <option key={shift} value={shift}>
                                            {shift.replace("_", " ")}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Location */}
                    <section className="bg-surface border border-border rounded-2xl p-5 sm:p-7">

                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                                <MapPin size={21} />
                            </div>

                            <div>
                                <h2 className="font-bold text-lg text-foreground">
                                    Job Location
                                </h2>
                                <p className="text-sm text-muted">
                                    Where will the employee work?
                                </p>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">

                            {[
                                ["area", "Area / Locality"],
                                ["city", "City"],
                                ["state", "State"],
                                ["pincode", "PIN Code"]
                            ].map(([field, label]) => (
                                <div key={field}>
                                    <label className={labelClass}>
                                        {label}
                                    </label>

                                    <input
                                        type="text"
                                        name={`location.${field}`}
                                        value={formData.location[field] || ""}
                                        onChange={handleChange}
                                        required
                                        className={inputClass}
                                        placeholder={`Enter ${label.toLowerCase()}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Description */}
                    <section className="bg-surface border border-border rounded-2xl p-5 sm:p-7">

                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                                <FileText size={21} />
                            </div>

                            <div>
                                <h2 className="font-bold text-lg text-foreground">
                                    Job Description
                                </h2>
                                <p className="text-sm text-muted">
                                    Describe the responsibilities and requirements.
                                </p>
                            </div>
                        </div>

                        <textarea
                            name="description"
                            rows={6}
                            required
                            value={formData.description}
                            onChange={handleChange}
                            className={`${inputClass} resize-y`}
                            placeholder="Describe the job..."
                        />
                    </section>

                    {/* Actions */}
                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">

                        <button
                            type="button"
                            onClick={handleReset}
                            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border text-foreground hover:bg-background transition"
                        >
                            <RotateCcw size={17} />
                            Reset Changes
                        </button>

                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition"
                        >
                            <Save size={17} />
                            Save Changes
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default EditJob;
