import { useState } from "react";
import DonorSidebar from "../../components/DonorSidebar";
import "../../styles/donor-dashboard.css";

export default function Support() {
  const [ticket, setTicket] = useState({
    category: "General",
    message: ""
  });

  const [tickets, setTickets] = useState([
    {
      id: 1,
      category: "Pickup Issue",
      message: "Customer did not arrive on time.",
      status: "Open",
      date: "2025-08-08"
    },
    {
      id: 2,
      category: "Profile",
      message: "Unable to update phone number.",
      status: "Resolved",
      date: "2025-08-06"
    }
  ]);

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const submitTicket = (e) => {
    e.preventDefault();
    if (!ticket.message) return;

    const newTicket = {
      id: tickets.length + 1,
      category: ticket.category,
      message: ticket.message,
      status: "Open",
      date: new Date().toISOString().split("T")[0]
    };

    setTickets([newTicket, ...tickets]);
    setTicket({ category: "General", message: "" });
  };

  return (
    <div className="dashboard">
      <DonorSidebar />

      <main className="dashboard-main">
        <h1 className="welcome-text">Support & Help 📞</h1>

        {/* NEW TICKET */}
        <form className="donation-form" onSubmit={submitTicket}>
          <label>Category</label>
          <select
            name="category"
            value={ticket.category}
            onChange={handleChange}
          >
            <option>General</option>
            <option>Pickup Issue</option>
            <option>Profile</option>
            <option>Technical</option>
          </select>

          <label>Message</label>
          <textarea
            name="message"
            value={ticket.message}
            onChange={handleChange}
            placeholder="Describe your issue..."
            required
          />

          <button className="auth-btn small-btn" type="submit">
            Submit Ticket
          </button>
        </form>

        {/* TICKET LIST */}
        <h2 className="section-title">Your Tickets</h2>

        <div className="donation-list">
          {tickets.map(t => (
            <div key={t.id} className="donation-card">
              <div>
                <h4>{t.category}</h4>
                <p>{t.message}</p>
                <small>📅 {t.date}</small>
              </div>
              <div className={`status ${t.status.toLowerCase()}`}>
                {t.status}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
