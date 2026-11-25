
import React, { useState } from "react";
import {
  UserRound,
  BriefcaseBusiness,
  LockKeyhole,
  Bell,
  ShieldCheck,
  Trash2,
  Camera,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Save,
  Eye,
  EyeOff,
  Plus,
  X,
  CheckCircle2,
  AlertTriangle,
  Settings,
  ChevronRight,
} from "lucide-react";

import Header from "../common/Header";
import Footer from "../common/Footer";

const initialProfile = {
  name: "Rahul Kumar",
  email: "rahul@example.com",
  phone: "+91 98765 43210",
  city: "Mohali",
  state: "Punjab",
  pincode: "160055",
  education: "12th Pass",
  experience: "Fresher",
  about:
    "I am a hardworking and responsible individual looking for an opportunity to develop my professional skills.",
  skills: ["Communication", "Teamwork", "Customer Service"],
};

const initialPreferences = {
  jobRole: "Cashier",
  salary: "18000",
  shift: "FULL_DAY",
  employmentType: "FULL_TIME",
  preferredLocation: "Mohali",
};

const menuItems = [
  { id: "profile", label: "Personal Information", icon: UserRound },
  { id: "preferences", label: "Work Preferences", icon: BriefcaseBusiness },
  { id: "security", label: "Security", icon: LockKeyhole },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy", icon: ShieldCheck },
  { id: "danger", label: "Danger Zone", icon: Trash2 },
];

function SectionHeading({ title, description }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      <p className="text-sm text-muted mt-1">{description}</p>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`w-11 h-6 rounded-full p-1 transition-colors shrink-0 ${
        checked ? "bg-primary" : "bg-surface-secondary border border-border"
      }`}
    >
      <span
        className={`block w-4 h-4 rounded-full bg-white transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export default function EmployeeAccount() {
  const [activeSection, setActiveSection] = useState("profile");

  const [profile, setProfile] = useState(initialProfile);
  const [preferences, setPreferences] = useState(initialPreferences);

  const [editing, setEditing] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  const [notifications, setNotifications] = useState({
    jobAlerts: true,
    applicationUpdates: true,
    interviewReminders: true,
    promotionalEmails: false,
    smsAlerts: true,
  });

  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showPhone: false,
  });

  const inputClass =
    "w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60 disabled:cursor-not-allowed";

  const showSuccess = (message) => {
    setSuccessMessage(message);
    window.setTimeout(() => setSuccessMessage(""), 3000);
  };

  const updateProfile = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const updatePreferences = (field, value) => {
    setPreferences((prev) => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    const skill = skillInput.trim();

    if (skill && !profile.skills.includes(skill)) {
      updateProfile("skills", [...profile.skills, skill]);
    }

    setSkillInput("");
  };

  const removeSkill = (skill) => {
    updateProfile(
      "skills",
      profile.skills.filter((item) => item !== skill)
    );
  };

  const saveProfile = () => {
    setEditing(false);
    showSuccess("Personal information saved locally.");
    // TODO: PUT updated profile to your backend.
  };

  const savePreferences = () => {
    showSuccess("Work preferences saved locally.");
    // TODO: PUT preferences to your backend.
  };

  const updatePassword = (e) => {
    e.preventDefault();

    if (passwords.next.length < 8) {
      showSuccess("Password must contain at least 8 characters.");
      return;
    }

    if (passwords.next !== passwords.confirm) {
      showSuccess("New passwords do not match.");
      return;
    }

    // TODO: Call your backend change-password endpoint.
    setPasswords({ current: "", next: "", confirm: "" });
    showSuccess("Password form validated. Backend integration pending.");
  };

  const saveNotifications = () => {
    showSuccess("Notification preferences saved locally.");
    // TODO: Persist preferences through your backend.
  };

  const savePrivacy = () => {
    showSuccess("Privacy preferences saved locally.");
    // TODO: Persist privacy settings through your backend.
  };

  const activeMenu = menuItems.find(
    (item) => item.id === activeSection
  );

  const renderProfile = () => (
    <>
      <SectionHeading
        title="Personal Information"
        description="Manage your personal details and public profile."
      />

      Profile header
      <div className="flex flex-col sm:flex-row items-center gap-5 p-5 rounded-xl bg-background border border-border mb-7">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <UserRound size={36} />
          </div>

          <button   
            type="button"
            title="Change profile photo"
            className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground border-2 border-surface"
          >
            <Camera size={14} />
          </button>
        </div>

        <div className="text-center sm:text-left">
          <h3 className="font-bold text-lg">{profile.name}</h3>
          <p className="text-sm text-muted">{profile.email}</p>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-success mt-2">
            <CheckCircle2 size={14} />
            Employee Account
          </span>
        </div>

        <div className="sm:ml-auto">
          <button
            onClick={() => setEditing(!editing)}
            className="px-4 py-2 rounded-lg border border-border text-sm font-semibold hover:bg-surface-secondary"
          >
            {editing ? "Cancel Editing" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Personal details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full Name">
          <input
            disabled={!editing}
            className={inputClass}
            value={profile.name}
            onChange={(e) => updateProfile("name", e.target.value)}
          />
        </Field>

        <Field label="Email Address">
          <input
            disabled={!editing}
            type="email"
            className={inputClass}
            value={profile.email}
            onChange={(e) => updateProfile("email", e.target.value)}
          />
        </Field>

        <Field label="Phone Number">
          <input
            disabled={!editing}
            className={inputClass}
            value={profile.phone}
            onChange={(e) => updateProfile("phone", e.target.value)}
          />
        </Field>

        <Field label="Education">
          <select
            disabled={!editing}
            className={inputClass}
            value={profile.education}
            onChange={(e) => updateProfile("education", e.target.value)}
          >
            <option>Below 10th</option>
            <option>10th Pass</option>
            <option>12th Pass</option>
            <option>Diploma</option>
            <option>Graduate</option>
            <option>Postgraduate</option>
          </select>
        </Field>

        <Field label="City">
          <input
            disabled={!editing}
            className={inputClass}
            value={profile.city}
            onChange={(e) => updateProfile("city", e.target.value)}
          />
        </Field>

        <Field label="State">
          <input
            disabled={!editing}
            className={inputClass}
            value={profile.state}
            onChange={(e) => updateProfile("state", e.target.value)}
          />
        </Field>

        <Field label="PIN Code">
          <input
            disabled={!editing}
            className={inputClass}
            value={profile.pincode}
            onChange={(e) => updateProfile("pincode", e.target.value)}
          />
        </Field>

        <Field label="Experience">
          <select
            disabled={!editing}
            className={inputClass}
            value={profile.experience}
            onChange={(e) => updateProfile("experience", e.target.value)}
          >
            <option>Fresher</option>
            <option>Less than 1 year</option>
            <option>1-2 years</option>
            <option>3-5 years</option>
            <option>5+ years</option>
          </select>
        </Field>
      </div>

      <div className="border-t border-border my-7" />

      {/* Skills */}
      <Field label="Skills">
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm"
            >
              {skill}
              {editing && (
                <button onClick={() => removeSkill(skill)}>
                  <X size={14} />
                </button>
              )}
            </span>
          ))}
        </div>

        {editing && (
          <div className="flex gap-2 mt-3">
            <input
              className={inputClass}
              placeholder="Add a skill..."
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
            />
            <button
              onClick={addSkill}
              className="px-4 rounded-lg bg-primary text-primary-foreground"
            >
              <Plus size={18} />
            </button>
          </div>
        )}
      </Field>

      <div className="mt-5">
        <Field label="About Me">
          <textarea
            disabled={!editing}
            rows={4}
            className={inputClass}
            value={profile.about}
            onChange={(e) => updateProfile("about", e.target.value)}
          />
        </Field>
      </div>

      {editing && (
        <div className="flex justify-end mt-7">
          <button
            onClick={saveProfile}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold"
          >
            <Save size={16} />
            Save Profile
          </button>
        </div>
      )}
    </>
  );

  const renderPreferences = () => (
    <>
      <SectionHeading
        title="Work Preferences"
        description="Tell employers what kind of job you are looking for."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Preferred Job Role">
          <select
            className={inputClass}
            value={preferences.jobRole}
            onChange={(e) => updatePreferences("jobRole", e.target.value)}
          >
            <option>Helper</option>
            <option>Cashier</option>
            <option>Loader</option>
            <option>Sales</option>
            <option>Cleaning</option>
            <option>Security</option>
            <option>Delivery</option>
            <option>Other</option>
          </select>
        </Field>

        <Field label="Expected Monthly Salary (₹)">
          <input
            type="number"
            className={inputClass}
            value={preferences.salary}
            onChange={(e) => updatePreferences("salary", e.target.value)}
          />
        </Field>

        <Field label="Preferred Shift">
          <select
            className={inputClass}
            value={preferences.shift}
            onChange={(e) => updatePreferences("shift", e.target.value)}
          >
            <option value="MORNING">Morning</option>
            <option value="EVENING">Evening</option>
            <option value="NIGHT">Night</option>
            <option value="FULL_DAY">Full Day</option>
          </select>
        </Field>

        <Field label="Employment Type">
          <select
            className={inputClass}
            value={preferences.employmentType}
            onChange={(e) => updatePreferences("employmentType", e.target.value)}
          >
            <option value="FULL_TIME">Full-time</option>
            <option value="PART_TIME">Part-time</option>
            <option value="CONTRACT">Contract</option>
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field label="Preferred Work Location">
            <input
              className={inputClass}
              value={preferences.preferredLocation}
              onChange={(e) =>
                updatePreferences("preferredLocation", e.target.value)
              }
              placeholder="Enter your preferred city or area"
            />
          </Field>
        </div>
      </div>

      <div className="flex justify-end mt-7">
        <button
          onClick={savePreferences}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold"
        >
          <Save size={16} />
          Save Preferences
        </button>
      </div>
    </>
  );

  const renderSecurity = () => (
    <>
      <SectionHeading
        title="Security & Password"
        description="Keep your LocalHire account safe."
      />

      <div className="p-4 rounded-xl bg-success/5 border border-success/20 mb-6">
        <div className="flex items-center gap-2 text-success font-semibold text-sm">
          <ShieldCheck size={19} />
          Account Security
        </div>
        <p className="text-sm text-muted mt-2">
          Use a strong password and never share your login credentials.
        </p>
      </div>

      <form onSubmit={updatePassword} className="space-y-5">
        {[
          { label: "Current Password", key: "current" },
          { label: "New Password", key: "next" },
          { label: "Confirm New Password", key: "confirm" },
        ].map((item) => (
          <Field key={item.key} label={item.label}>
            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                className={`${inputClass} pr-12`}
                value={passwords[item.key]}
                onChange={(e) =>
                  setPasswords((prev) => ({
                    ...prev,
                    [item.key]: e.target.value,
                  }))
                }
                placeholder={`Enter ${item.label.toLowerCase()}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </Field>
        ))}

        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold"
        >
          <LockKeyhole size={16} />
          Update Password
        </button>
      </form>

      <div className="border-t border-border my-7" />

      <h3 className="font-semibold mb-2">Login Information</h3>
      <p className="text-sm text-muted">
        Your registered email and phone number are managed through your profile.
        Changing either may require verification.
      </p>
    </>
  );

  const renderNotifications = () => (
    <>
      <SectionHeading
        title="Notification Preferences"
        description="Choose which updates LocalHire can send you."
      />

      <div className="divide-y divide-border">
        {[
          {
            key: "jobAlerts",
            title: "Job Recommendations",
            description: "Get notified about relevant job openings.",
          },
          {
            key: "applicationUpdates",
            title: "Application Updates",
            description: "Know when employers review your applications.",
          },
          {
            key: "interviewReminders",
            title: "Interview Reminders",
            description: "Receive reminders about upcoming interviews.",
          },
          {
            key: "smsAlerts",
            title: "SMS Alerts",
            description: "Receive important updates through SMS.",
          },
          {
            key: "promotionalEmails",
            title: "Promotional Emails",
            description: "Receive LocalHire news and offers.",
          },
        ].map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between gap-4 py-5"
          >
            <div>
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <p className="text-xs text-muted mt-1">{item.description}</p>
            </div>
            <Toggle
              checked={notifications[item.key]}
              onChange={() =>
                setNotifications((prev) => ({
                  ...prev,
                  [item.key]: !prev[item.key],
                }))
              }
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={saveNotifications}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold"
        >
          <Save size={16} />
          Save Notifications
        </button>
      </div>
    </>
  );

  const renderPrivacy = () => (
    <>
      <SectionHeading
        title="Privacy Settings"
        description="Choose how your information is shared with employers."
      />

      <div className="space-y-5">
        {[
          {
            key: "showProfile",
            title: "Profile Visibility",
            description:
              "Allow employers to discover your profile when searching for candidates.",
          },
          {
            key: "showPhone",
            title: "Phone Number Visibility",
            description:
              "Allow employers to see your phone number on your profile.",
          },
        ].map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between gap-4 p-4 rounded-xl border border-border"
          >
            <div>
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <p className="text-sm text-muted mt-1">{item.description}</p>
            </div>

            <Toggle
              checked={privacy[item.key]}
              onChange={() =>
                setPrivacy((prev) => ({
                  ...prev,
                  [item.key]: !prev[item.key],
                }))
              }
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={savePrivacy}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold"
        >
          <Save size={16} />
          Save Privacy Settings
        </button>
      </div>
    </>
  );

  const renderDanger = () => (
    <>
      <SectionHeading
        title="Danger Zone"
        description="Manage actions that can permanently affect your account."
      />

      <div className="p-5 rounded-xl border border-danger/30 bg-danger/5">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-lg bg-danger/10 text-danger">
            <AlertTriangle size={22} />
          </div>
          <div>
            <h3 className="font-bold text-danger">Delete Account</h3>
            <p className="text-sm text-muted">
              This action is permanent.
            </p>
          </div>
        </div>

        <p className="text-sm text-foreground leading-relaxed mb-5">
          Deleting your account may permanently remove your profile,
          applications, and associated information. Make sure you understand
          the consequences before proceeding.
        </p>

        <button
          onClick={() => {
            const confirmed = window.confirm(
              "Are you sure you want to delete your account? This action cannot be undone."
            );

            if (confirmed) {
              showSuccess("Account deletion needs backend implementation.");
            }
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-danger text-white text-sm font-semibold hover:opacity-90"
        >
          <Trash2 size={16} />
          Delete My Account
        </button>
      </div>
    </>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return renderProfile();
      case "preferences":
        return renderPreferences();
      case "security":
        return renderSecurity();
      case "notifications":
        return renderNotifications();
      case "privacy":
        return renderPrivacy();
      case "danger":
        return renderDanger();
      default:
        return renderProfile();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* <Header /> */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page heading */}
        <div className="mb-8">
          <p className="text-sm text-muted mb-2">
            Home / Employee / Account
          </p>
          <h1 className="text-3xl font-bold">My Account</h1>
          <p className="text-sm text-muted mt-2">
            Manage your profile, preferences and account settings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="bg-surface border border-border rounded-xl p-4">
              <div className="px-3 py-4 mb-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <UserRound size={23} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold truncate">{profile.name}</h3>
                    <p className="text-xs text-muted truncate">
                      Employee Account
                    </p>
                  </div>
                </div>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const active = activeSection === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        setSuccessMessage("");
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-muted hover:bg-surface-secondary hover:text-foreground"
                      }`}
                    >
                      <Icon size={18} />
                      <span className="flex-1 text-left">{item.label}</span>
                      {active && <ChevronRight size={16} />}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <section className="lg:col-span-9">
            <div className="bg-surface border border-border rounded-xl p-5 md:p-7 min-h-[600px]">
              <div className="flex items-center gap-2 text-xs text-muted mb-6">
                <Settings size={14} />
                Account Settings
                <ChevronRight size={13} />
                <span className="text-primary font-medium">
                  {activeMenu?.label}
                </span>
              </div>

              {successMessage && (
                <div className="flex items-center gap-2 p-3 mb-6 rounded-lg bg-success/10 border border-success/20 text-success text-sm">
                  <CheckCircle2 size={17} />
                  {successMessage}
                </div>
              )}

              {renderContent()}
            </div>
          </section>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}

