import DonorSidebar from "../../components/DonorSidebar";
import "../../styles/donor-dashboard.css";

export default function History() {
  const history = [
    {
      id: 1,
      foodName: "Vegetable Curry",
      quantity: "3 bowls",
      date: "2025-08-08",
      status: "Collected",
      collectedBy: "Rahul"
    },
    {
      id: 2,
      foodName: "Cooked Rice",
      quantity: "5 plates",
      date: "2025-08-07",
      status: "Expired",
      collectedBy: "-"
    }
  ];

  return (
    <div className="dashboard">
      <DonorSidebar />

      <main className="dashboard-main">
        <h1 className="welcome-text">Donation History 🕒</h1>

        <div className="donation-list">
          {history.map(item => (
            <div key={item.id} className="donation-card">
              <div>
                <h4>{item.foodName}</h4>
                <p>{item.quantity}</p>
                <small>📅 {item.date}</small>
              </div>

              <div className={`status ${item.status.toLowerCase()}`}>
                {item.status}
              </div>

              {item.status === "Collected" && (
                <small>👤 Collected by {item.collectedBy}</small>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
