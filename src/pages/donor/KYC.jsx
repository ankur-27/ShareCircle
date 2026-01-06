import { useState } from "react";
import DonorSidebar from "../../components/DonorSidebar";
import "../../styles/donor-dashboard.css";

export default function KYC() {
  const [kyc, setKyc] = useState({
    documentType: "",
    documentNumber: "",
    documentFile: null,
    status: "Pending"
  });

  const handleChange = (e) => {
    setKyc({ ...kyc, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setKyc({ ...kyc, documentFile: e.target.files[0] });
  };

  const submitKYC = (e) => {
    e.preventDefault();
    console.log("KYC Submitted:", kyc);
    alert("KYC submitted for verification (demo)");
    setKyc({ ...kyc, status: "Pending" });
  };

  return (
    <div className="dashboard">
      <DonorSidebar />

      <main className="dashboard-main">
        <h1 className="welcome-text">KYC Verification 🪪</h1>

        <form className="donation-form" onSubmit={submitKYC}>
          <label>Document Type</label>
          <select
            name="documentType"
            value={kyc.documentType}
            onChange={handleChange}
            required
          >
            <option value="">Select Document</option>
            <option value="Aadhar">Aadhar Card</option>
            <option value="PAN">PAN Card</option>
            <option value="Driving License">Driving License</option>
          </select>

          <label>Document Number</label>
          <input
            name="documentNumber"
            value={kyc.documentNumber}
            onChange={handleChange}
            required
          />

          <label>Upload Document</label>
          <input type="file" onChange={handleFile} required />

          <button className="auth-btn small-btn" type="submit">
            Submit KYC
          </button>
        </form>

        {/* STATUS */}
        <div className="kyc-status">
          <p>
            Status:
            <span className={`status ${kyc.status.toLowerCase()}`}>
              {kyc.status}
            </span>
          </p>
          <small>
            KYC verification is handled by admin. This may take some time.
          </small>
        </div>
      </main>
    </div>
  );
}
