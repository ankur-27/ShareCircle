import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../styles/dashboard.css";

export default function Ratings() {
  const reviews = [
    {
      customer: "Amit Kumar",
      rating: 5,
      comment: "Very professional and quick service",
      date: "15 Jul 2025"
    },
    {
      customer: "Rohit Das",
      rating: 4,
      comment: "Good work but arrived late",
      date: "10 Jul 2025"
    },
    {
      customer: "Sneha Paul",
      rating: 5,
      comment: "Excellent experience!",
      date: "05 Jul 2025"
    }
  ];

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard-main">
        <Header />

        <div className="page-box">
          <h2>Overall Rating</h2>
          <h1 className="rating-score">4.7 ⭐</h1>
          <p>Based on {reviews.length} reviews</p>
        </div>

        <div className="page-box">
          <h2>Customer Feedback</h2>

          {reviews.map((r, i) => (
            <div key={i} className="review-card">
              <div className="review-header">
                <strong>{r.customer}</strong>
                <span>{r.date}</span>
              </div>

              <div className="review-stars">
                {"⭐".repeat(r.rating)}
              </div>

              <p>{r.comment}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
