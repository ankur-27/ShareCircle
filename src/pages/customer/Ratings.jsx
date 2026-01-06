import { useEffect, useState } from "react";
import CustomerSidebar from "../../components/CustomerSidebar";
import CustomerHeader from "../../components/CustomerHeader";
import "../../styles/customer-cards.css";

export default function Ratings() {
  const [ratings, setRatings] = useState([]);
  const [form, setForm] = useState({
    target: "provider", // provider | donor
    name: "",
    stars: 5,
    review: ""
  });

  // Load previous ratings
  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("customerRatings")) || [];
    setRatings(saved);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitRating = () => {
    if (!form.name || !form.review) {
      alert("Please fill all fields");
      return;
    }

    const newRating = {
      id: Date.now(),
      target: form.target,
      name: form.name,
      stars: form.stars,
      review: form.review,
      date: new Date().toLocaleDateString()
    };

    const updated = [newRating, ...ratings];
    setRatings(updated);
    localStorage.setItem(
      "customerRatings",
      JSON.stringify(updated)
    );

    setForm({
      target: "provider",
      name: "",
      stars: 5,
      review: ""
    });
  };

  return (
    <div className="customer-layout">
      <CustomerSidebar />

      <main className="customer-main">
        <CustomerHeader />

        <div className="page-title">
          <h2>Ratings & Feedback ⭐</h2>
          <p>Share your experience with providers and donors</p>
        </div>

        {/* ADD RATING */}
        <div className="card" style={{ maxWidth: 600, margin: 20 }}>
          <h3>Leave a Review</h3>

          <label>Rate</label>
          <select
            name="target"
            value={form.target}
            onChange={handleChange}
          >
            <option value="provider">Service Provider</option>
            <option value="donor">Food Donor</option>
          </select>

          <label>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Provider / Donor name"
          />

          <label>Stars</label>
          <select
            name="stars"
            value={form.stars}
            onChange={handleChange}
          >
            {[5, 4, 3, 2, 1].map(s => (
              <option key={s} value={s}>
                {s} ⭐
              </option>
            ))}
          </select>

          <label>Review</label>
          <textarea
            name="review"
            value={form.review}
            onChange={handleChange}
            placeholder="Write your experience"
          />

          <button
            className="primary-btn"
            style={{ marginTop: 10 }}
            onClick={submitRating}
          >
            Submit Review
          </button>
        </div>

        {/* RATINGS LIST */}
        <div className="card" style={{ margin: 20 }}>
          <h3>Your Reviews</h3>

          {ratings.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            ratings.map(r => (
              <div
                key={r.id}
                className="list-item"
                style={{ borderBottom: "1px solid #eee" }}
              >
                <div>
                  <strong>
                    {r.name} ({r.target})
                  </strong>
                  <p>{"⭐".repeat(r.stars)}</p>
                  <p className="muted">{r.review}</p>
                  <small>{r.date}</small>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
