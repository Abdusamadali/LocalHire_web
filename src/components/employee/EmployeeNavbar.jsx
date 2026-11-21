import { NavLink, useNavigate } from "react-router-dom";
import { User, FileText, LogOut, BriefcaseBusiness } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

function EmployeeNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");

      dispatch(logout());
      navigate("/login");
    };
  };

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
      isActive
        ? "bg-brand-700/80 text-white"
        : "text-muted hover:text-foreground hover:bg-surface-secondary"
    }`;

  return (
    <div className="flex items-center gap-1.5 p-2 rounded-xl bg-surface border border-border">
      <NavLink to="/employee/dashboard" className={linkStyle}>
        <BriefcaseBusiness size={17} />
        <span>Find Jobs</span>
      </NavLink>

      <NavLink to="/employee/applications" className={linkStyle}>
        <FileText size={17} />
        <span>My Applications</span>
      </NavLink>

      <NavLink to="/employee/profile" className={linkStyle}>
        <User size={17} />
        <span>Profile</span>
      </NavLink>

      <div className="w-px h-7 bg-border mx-1" />

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition whitespace-nowrap"
      >
        <LogOut size={17} />
        <span>Logout</span>
      </button>
    </div>
  );
}

export default EmployeeNavbar;
