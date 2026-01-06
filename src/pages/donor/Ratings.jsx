import DonorSidebar from "../../components/DonorSidebar";
import "../../styles/donor-dashboard.css";

export default function Ratings() {
  const reviews = [
    {
      id: 1,
      customer: "Rahul",
      rating: 5,
      comment: "Very kind donor, food was fresh!",
      date: "2025-08-08"
    },
    {
      id: 2,
      customer: "Anita",
      rating: 4,
      comment: "Good quality food, thank you.",
      date: "2025-08-07"
    },
    {
      id: 3,
      customer: "Sourav",
      rating: 5,
      comment: "Helped a lot, appreciate it 🙏",
      date: "2025-08-05"
    }
  ];

  const average =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const renderStars = (count) => {
    return "⭐".repeat(count);
  };

  return (
    <div className="dashboard">
      <DonorSidebar />

      <main className="dashboard-main">
        <h1 className="welcome-text">Ratings & Feedback ⭐</h1>

        {/* OVERVIEW */}
        <div className="donor-stats">
          <div className="stat-card">
            ⭐ Average Rating
            <br />
            <strong>{average.toFixed(1)}</strong>
          </div>
          <div className="stat-card">
            🗣 Total Reviews
            <br />
            <strong>{reviews.length}</strong>
          </div>
        </div>

        {/* REVIEWS */}
        <div className="donation-list">
          {reviews.map(r => (
            <div key={r.id} className="donation-card">
              <div>
                <h4>{r.customer}</h4>
                <p>{renderStars(r.rating)}</p>
                <small>{r.comment}</small>
              </div>
              <small>📅 {r.date}</small>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
