import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../styles/dashboard.css";

export default function Support() {
  const [message, setMessage] = useState("");
  const [dispute, setDispute] = useState("");
  const [category, setCategory] = useState("general");

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard-main">
        <Header />

        {/* SUPPORT CONTACT */}
        <div className="page-box">
          <h2>Help & Support</h2>

          <div className="support-grid">
            <div className="support-card">
              <h3>Contact Admin</h3>
              <p>
                📧 Email: <strong>support@sharecircle.com</strong>
              </p>
              <p>
                📞 Phone: <strong>+91 98765 43210</strong>
              </p>
              <p>
                🕒 Support Hours: 9 AM – 6 PM
              </p>
            </div>

            <div className="support-card">
              <h3>Send Message to Admin</h3>

              <label>Issue Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="general">General Query</option>
                <option value="booking">Booking Issue</option>
                <option value="payment">Payment / Wallet</option>
                <option value="kyc">KYC Verification</option>
                <option value="technical">Technical Problem</option>
              </select>

              <textarea
                placeholder="Write your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <button
                className="auth-btn"
                onClick={() => {
                  setMessage("");
                  alert("Message sent to admin (demo)");
                }}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>

        {/* DISPUTE SECTION */}
        <div className="page-box">
          <h2>Raise a Dispute</h2>

          <p>
            If you face any issue with a customer or booking, raise a dispute.
            Our admin team will review it.
          </p>

          <textarea
            placeholder="Describe the dispute in detail..."
            value={dispute}
            onChange={(e) => setDispute(e.target.value)}
          />

          <input type="file" />

          <button
            className="auth-btn"
            onClick={() => {
              setDispute("");
              alert("Dispute submitted (demo)");
            }}
          >
            Submit Dispute
          </button>
        </div>

        {/* NOTES */}
        <div className="page-box">
          <p className="support-note">
            ⏳ Support usually responds within 24 hours.  
            For urgent issues, please call the support number.
          </p>
        </div>
      </main>
    </div>
  );
}
