import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../styles/dashboard.css";

export default function Bookings() {
  const [bookings, setBookings] = useState([
    {
      customer: "Amit Kumar",
      service: "Plumbing",
      address: "Kolkata",
      day: "Mon",
      status: "Pending"
    },
    {
      customer: "Rohit Das",
      service: "Electrical Repair",
      address: "Barasat",
      day: "Wed",
      status: "Approved"
    }
  ]);

  const [plans, setPlans] = useState({});
  const [selectedDay, setSelectedDay] = useState("");
  const [planText, setPlanText] = useState("");
  const [note, setNote] = useState("");
  const [proof, setProof] = useState(null);

  const updateStatus = (index, newStatus) => {
    const updated = [...bookings];
    updated[index].status = newStatus;
    setBookings(updated);
  };

  const addPlan = () => {
    if (!selectedDay || !planText) return;

    setPlans({
      ...plans,
      [selectedDay]: [...(plans[selectedDay] || []), planText]
    });

    setPlanText("");
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard-main">
        <Header />

        {/* BOOKINGS TABLE */}
        <div className="page-box">
          <h2>Customer Bookings</h2>

          <table className="booking-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Service</th>
                <th>Address</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b, i) => (
                <tr key={i}>
                  <td>{b.customer}</td>
                  <td>{b.service}</td>
                  <td>{b.address}</td>
                  <td className={b.status.toLowerCase()}>
                    {b.status}
                  </td>

                  <td>
                    {b.status === "Pending" && (
                      <>
                        <button
                          className="approve-btn"
                          onClick={() => updateStatus(i, "Approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() => updateStatus(i, "Rejected")}
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {b.status === "Approved" && (
                      <button
                        className="start-btn"
                        onClick={() => updateStatus(i, "In Progress")}
                      >
                        Start
                      </button>
                    )}

                    {b.status === "In Progress" && (
                      <button
                        className="complete-btn"
                        onClick={() => updateStatus(i, "Completed")}
                      >
                        Complete
                      </button>
                    )}

                    {b.status === "Completed" && (
                      <button className="auth-btn">
                        Generate Invoice
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* WEEKLY CALENDAR */}
        <div className="page-box">
          <h2>Weekly Booking Planner</h2>

          <div className="calendar-grid">
            {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(day => (
              <div
                key={day}
                className={`calendar-box ${selectedDay === day ? "selected" : ""}`}
                onClick={() => setSelectedDay(day)}
              >
                <strong>{day}</strong>

                {/* Bookings */}
                {bookings
                  .filter(b => b.day === day)
                  .map((b, i) => (
                    <p key={i} className="booking-item">
                      📌 {b.customer}
                    </p>
                  ))}

                {/* Plans */}
                {(plans[day] || []).map((p, i) => (
                  <p key={i} className="plan-item">
                    🗓 {p}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* ADD PLAN */}
          <div className="plan-input">
            <h4>Add Plan for: {selectedDay || "Select a day"}</h4>

            <input
              placeholder="Example: Emergency repair (10AM–12PM)"
              value={planText}
              onChange={(e) => setPlanText(e.target.value)}
              disabled={!selectedDay}
            />

            <button
              className="auth-btn"
              onClick={addPlan}
              disabled={!selectedDay}
            >
              Add Plan
            </button>
          </div>
        </div>

        {/* SERVICE COMPLETION PROOF */}
        <div className="page-box">
          <h2>Service Completion Proof</h2>

          <input
            type="file"
            onChange={(e) => setProof(e.target.files[0])}
          />

          <textarea
            placeholder="Completion note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <button
            className="auth-btn"
            onClick={() => {
              setNote("");
              setProof(null);
              alert("Service proof submitted (demo)");
            }}
          >
            Submit Proof
          </button>
        </div>
      </main>
    </div>
  );
}
