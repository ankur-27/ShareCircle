import { useEffect, useState } from "react";
import CustomerSidebar from "../../components/CustomerSidebar";
import CustomerHeader from "../../components/CustomerHeader";
import "../../styles/customer-cards.css";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  // Load customer bookings
  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("customerBookings")) || [];
    setBookings(saved);
  }, []);

  const cancelBooking = (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    localStorage.setItem("customerBookings", JSON.stringify(updated));
  };

  return (
    <div className="customer-layout">
      <CustomerSidebar />

      <main className="customer-main">
        <CustomerHeader />

        <div className="page-title">
          <h2>My Bookings 📋</h2>
          <p>Track and manage your service bookings</p>
        </div>

        {bookings.length === 0 ? (
          <p className="empty-text">No bookings yet.</p>
        ) : (
          <div className="card-grid">
            {bookings.map(b => (
              <div key={b.id} className="food-card">
                <h3>{b.service}</h3>

                <p className="muted">Provider: {b.provider}</p>
                <p>📅 {b.date} ⏰ {b.time}</p>
                <p className="muted">📍 {b.address}</p>

                <span className={`badge ${b.status.toLowerCase()}`}>
                  {b.status}
                </span>

                {b.status === "Pending" && (
                  <button
                    className="small-btn danger"
                    onClick={() => cancelBooking(b.id)}
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
