import { useState } from "react";

import "../../styles/dashboard.css";

export default function KYC() {
  const [status, setStatus] = useState("Pending");

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard-main">
        <Header />

        <div className="page-box">
          <h2>KYC Verification</h2>

          <p>
            Status:
            <span className={`kyc-status ${status.toLowerCase()}`}>
              {status}
            </span>
          </p>

          <div className="kyc-form">
            <label>Government ID (Aadhaar / PAN)</label>
            <input type="file" />

            <label>Address Proof</label>
            <input type="file" />

            <label>Profile Photo</label>
            <input type="file" />

            <button className="auth-btn">
              Submit for Verification
            </button>
          </div>

          <p className="kyc-note">
            ⚠️ Your documents will be reviewed by admin.  
            You cannot receive bookings until KYC is approved.
          </p>
        </div>
      </main>
    </div>
  );
}
