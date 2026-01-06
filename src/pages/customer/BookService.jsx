import { useEffect, useState } from "react";
import CustomerSidebar from "../../components/CustomerSidebar";
import CustomerHeader from "../../components/CustomerHeader";
import "../../styles/customer-dashboard.css";

export default function BookService() {
  const [service, setService] = useState(null);
  const [form, setForm] = useState({
    date: "",
    time: "",
    address: ""
  });

  // Load selected service
  useEffect(() => {
    const selected =
      JSON.parse(localStorage.getItem("selectedService"));
    if (selected) setService(selected);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const confirmBooking = () => {
    if (!form.date || !form.time || !form.address) {
      alert("Please fill all fields");
      return;
    }

    const existing =
      JSON.parse(localStorage.getItem("customerBookings")) || [];

    const newBooking = {
      id: Date.now(),
      service: service.service,
      provider: service.provider,
      date: form.date,
      time: form.time,
      address: form.address,
      status: "Pending"
    };

    localStorage.setItem(
      "customerBookings",
      JSON.stringify([newBooking, ...existing])
    );

    alert("Booking request sent to provider");
    window.location.href = "/customer/bookings";
  };

  if (!service) return <p>Loading...</p>;

  return (
    <div className="customer-layout">
      <CustomerSidebar />

      <main className="customer-main">
        <CustomerHeader />

        <div className="card" style={{ maxWidth: 500, margin: "30px" }}>
          <h2>Book Service</h2>

          <p>
            <strong>{service.service}</strong>
            <br />
            By {service.provider}
          </p>

          <label>Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />

          <label>Time</label>
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
          />

          <label>Service Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
          />

          <button
            className="primary-btn"
            style={{ marginTop: 15 }}
            onClick={confirmBooking}
          >
            Confirm Booking
          </button>
        </div>
      </main>
    </div>
  );
}
