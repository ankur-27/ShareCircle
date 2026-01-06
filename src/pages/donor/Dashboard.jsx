import { useEffect, useState } from "react";
import DonorSidebar from "../../components/DonorSidebar";
import "../../styles/donor-dashboard.css";

export default function Dashboard() {
  const donorName = "Raj"; // later from backend

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    expired: 0,
    collected: 0
  });

  const [recent, setRecent] = useState([]); // ✅ ALWAYS ARRAY

  /* 🔹 Load & calculate dashboard data */
  const loadDashboard = () => {
    const donations = JSON.parse(localStorage.getItem("donations")) || [];

    const total = donations.length;
    const active = donations.filter(d => d.status === "Available").length;
    const expired = donations.filter(d => d.status === "Expired").length;
    const collected = donations.filter(d => d.status === "Collected").length;

    setStats({ total, active, expired, collected });

    // Latest 5 donations (safe)
    setRecent(Array.isArray(donations) ? donations.slice(0, 5) : []);
  };

  /* 🔹 Load on page load */
  useEffect(() => {
    loadDashboard();
  }, []);

  /* 🔹 Refresh dashboard every minute */
  useEffect(() => {
    const interval = setInterval(loadDashboard, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <DonorSidebar />

      <main className="dashboard-main">
        <h1 className="welcome-text">
          Welcome back, <span>{donorName}</span> 👋
        </h1>

        {/* OVERVIEW CARDS */}
        <div className="donor-stats">
          <div className="stat-card">
            🍱 Total Donated <br />
            <strong>{stats.total}</strong>
          </div>

          <div className="stat-card">
            🟢 Active <br />
            <strong>{stats.active}</strong>
          </div>

          <div className="stat-card">
            📦 Collected <br />
            <strong>{stats.collected}</strong>
          </div>

          <div className="stat-card">
            ⛔ Expired <br />
            <strong>{stats.expired}</strong>
          </div>

          <div className="stat-card">
            ⭐ Rating <br />
            <strong>4.8</strong>
          </div>
        </div>

        {/* RECENT DONATIONS */}
        <h2 className="section-title">Recent Food Donations</h2>

        {recent.length === 0 ? (
          <p>No donations yet.</p>
        ) : (
          <div className="donation-list">
            {recent.map(d => (
              <div key={d._id || Math.random()} className="donation-card">
                <div>
                  <h4>{d.foodName || "Food Item"}</h4>
                  <p>{d.quantity || "-"}</p>
                </div>

                <div className={`status ${(d.status || "available").toLowerCase()}`}>
                  {d.status || "Available"}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
