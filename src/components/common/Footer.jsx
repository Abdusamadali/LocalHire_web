import React from "react";

function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-6 border-t-2 p-5 px-8">
      <div className="flex items-center gap-6">
        <h1 className="text-lg font-bold text-blue-600">LocalHire</h1>
        <p className="text-gray-400">
          © 2026 LocalHire Technologies Private Limited · All rights reserved.
        </p>
      </div>

      <div className="flex flex-wrap gap-6">
        <p>Privacy Policy</p>
        <p>Terms Of Service</p>
        <p>Fair Wages Charter</p>
        <p>Security & e-KYC</p>
        <p>Contact Support</p>
      </div>
    </footer>
  );
}

export default Footer;