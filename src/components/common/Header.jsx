import React from 'react'
import {Globe,
  LockKeyhole,
  Headset,
  BadgeCheck,
  LogIn,}
  from 'lucide-react'
import ThemeToggle from './ThemeToggle'

function Header() {
    return (
        <div>
            {/* Header */}
            <nav className="flex flex-col sm:flex-row justify-between items-center gap-4 px-5 md:px-12 py-5  border-b">
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

              <div className='flex gap-2'>
                  <div className="flex items-center gap-3">
                    <p className="text-sm text-gray-600">Already Registered?</p>
                    <button className="flex items-center gap-2 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
                        <LogIn size={17} />
                        Log in
                    </button>
                </div>
                <ThemeToggle />
              </div>

            </nav>
        </div>
    )
}

export default Header