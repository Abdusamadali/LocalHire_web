
import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    PlusCircle,
    ClipboardList,
    Users,
    LogOut
} from "lucide-react";

function EmployerNavbar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    const linkStyle = ({ isActive }) =>
        `flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
            isActive
                ? "bg-brand-700/80 text-white"
                : "text-muted hover:text-foreground hover:bg-surface-secondary"
        }`;

    return (
        <div className="flex items-center gap-1.5 p-2 rounded-xl bg-surface border border-border">

            <NavLink
                to="/employer/dashboard"
                className={linkStyle}
            >
                <LayoutDashboard size={17} />
                <span>Dashboard</span>
            </NavLink>

            <NavLink
                to="/employer/post-job"
                className={linkStyle}
            >
                <PlusCircle size={17} />
                <span>Post Job</span>
            </NavLink>

            <NavLink
                to="/employer/my-jobs"
                className={linkStyle}
            >
                <ClipboardList size={17} />
                <span>My Jobs</span>
            </NavLink>

            <NavLink
                to="/employer/applications"
                className={linkStyle}
            >
                <Users size={17} />
                <span>Applicants</span>
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

export default EmployerNavbar;
