import React from 'react';
import {LockKeyhole} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

import EmployeeNavbar from '../employee/EmployeeNavbar';
import EmployerNavbar from '../employer/EmployerNavbar';

function Header() {

    // const role = localStorage.getItem("role");

    // const role = "EMPLOYEE";
    const role = "EMPLOYER"

    return (
        <div>
            <nav className="flex flex-col sm:flex-row justify-between items-center gap-4 px-5 md:px-12 py-5 border-b">

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <LockKeyhole className="size-12 bg-primary text-foreground p-2 rounded-xl" />

                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl md:text-3xl font-bold text-primary">
                                LocalHire
                            </h1>

                            <span className="text-xs bg-blue-badge-bg text-primary px-2 py-1 rounded-md">
                                Punjab-Tricity
                            </span>
                        </div>

                        <p className="text-xs text-gray-500">
                            Connecting local workers & verified employers
                        </p>
                    </div>
                </div>

                {/* Dynamic Navbar */}
                <div className="flex items-center gap-3">

                    {role === "EMPLOYEE" && <EmployeeNavbar />}

                    {role === "EMPLOYER" && <EmployerNavbar />}

                    <ThemeToggle />

                </div>

            </nav>
        </div>
    );
}

export default Header;