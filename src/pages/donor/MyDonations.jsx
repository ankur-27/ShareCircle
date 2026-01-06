import { useEffect, useState } from "react";
import axios from "../../services/api";
import DonorSidebar from "../../components/DonorSidebar";
import "../../styles/donor-dashboard.css";

export default function MyDonations() {
  const [donations, setDonations] = useState([]);

  /* =========================
     LOAD DONATIONS
  ========================= */
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axios.get("/donor/my-donations");
        setDonations(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to load donations", err);
        setDonations([]);
      }
    };

    fetchDonations();
  }, []);

  /* =========================
     EXPIRY TIMER
  ========================= */
  const getExpiryTime = (expiry) => {
    if (!expiry) return "—";
    const diff = new Date(expiry) - new Date();
    if (diff <= 0) return "Expired";

    const hrs = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    return `${hrs}h ${mins}m`;
  };

  return (
    <div className="dashboard">
      <DonorSidebar />

      <main className="dashboard-main">
        <h1 className="welcome-text">My Donations 📦</h1>

        {donations.length === 0 ? (
          <p>No donations found</p>
        ) : (
          <div className="donation-list">
            {donations.map(d => (
              <div key={d._id} className="donation-card">
                <div>
                  <h4>{d.foodName}</h4>
                  <p>{d.quantity}</p>
                  <small>📍 {d.address}</small>
                </div>

                <span className={`status ${d.status.toLowerCase()}`}>
                  {d.status}
                </span>

                {d.status === "Available" && (
                  <span className="timer">
                    ⏳ {getExpiryTime(d.expiry)}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
