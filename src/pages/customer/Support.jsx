import { useEffect, useState } from "react";
import CustomerSidebar from "../../components/CustomerSidebar";
import CustomerHeader from "../../components/CustomerHeader";
import "../../styles/customer-cards.css";

export default function Support() {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({
    category: "Booking Issue",
    message: ""
  });

  // Load tickets
  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("customerSupport")) || [];
    setTickets(saved);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitTicket = () => {
    if (!form.message.trim()) {
      alert("Please enter your issue");
      return;
    }

    const newTicket = {
      id: Date.now(),
      category: form.category,
      message: form.message,
      status: "Open",
      date: new Date().toLocaleString()
    };

    const updated = [newTicket, ...tickets];
    setTickets(updated);
    localStorage.setItem(
      "customerSupport",
      JSON.stringify(updated)
    );

    setForm({ category: "Booking Issue", message: "" });
  };

  return (
    <div className="customer-layout">
      <CustomerSidebar />

      <main className="customer-main">
        <CustomerHeader />

        <div className="page-title">
          <h2>Support & Help 🛟</h2>
          <p>We’re here to help you resolve any issues</p>
        </div>

        {/* CREATE TICKET */}
        <div className="card" style={{ maxWidth: 600, margin: 20 }}>
          <h3>Raise a Ticket</h3>

          <label>Issue Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option>Booking Issue</option>
            <option>Payment Issue</option>
            <option>Food Pickup Issue</option>
            <option>Service Quality</option>
            <option>Other</option>
          </select>

          <label>Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Describe your issue"
          />

          <button
            className="primary-btn"
            style={{ marginTop: 10 }}
            onClick={submitTicket}
          >
            Submit Ticket
          </button>
        </div>

        {/* TICKET HISTORY */}
        <div className="card" style={{ margin: 20 }}>
          <h3>Your Support Tickets</h3>

          {tickets.length === 0 ? (
            <p>No support tickets yet.</p>
          ) : (
            tickets.map(t => (
              <div
                key={t.id}
                className="list-item"
                style={{ borderBottom: "1px solid #eee" }}
              >
                <div>
                  <strong>{t.category}</strong>
                  <p className="muted">{t.message}</p>
                  <small>{t.date}</small>
                </div>

                <span
                  className={`badge ${t.status.toLowerCase()}`}
                >
                  {t.status}
                </span>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
