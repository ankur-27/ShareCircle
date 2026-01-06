import { useEffect, useState } from "react";
import CustomerSidebar from "../../components/CustomerSidebar";
import CustomerHeader from "../../components/CustomerHeader";
import "../../styles/customer-cards.css";

export default function MyFoodClaims() {
  const [claims, setClaims] = useState([]);

  // Load food donations and filter claimed by customer
  useEffect(() => {
    const foods =
      JSON.parse(localStorage.getItem("donations")) || [];

    // Only show food that is claimed or collected
    const myClaims = foods.filter(
      f => f.status === "Claimed" || f.status === "Collected"
    );

    setClaims(myClaims);
  }, []);

  return (
    <div className="customer-layout">
      <CustomerSidebar />

      <main className="customer-main">
        <CustomerHeader />

        <div className="page-title">
          <h2>My Food Requests 🍱</h2>
          <p>Track food pickups you have requested</p>
        </div>

        {claims.length === 0 ? (
          <p className="empty-text">
            You haven’t requested any food yet.
          </p>
        ) : (
          <div className="card-grid">
            {claims.map(food => (
              <div key={food.id} className="food-card">
                <h3>{food.foodName}</h3>
                <p className="qty">{food.quantity}</p>

                <p className="muted">📍 {food.address}</p>
                <p className="muted">
                  ⏰ {new Date(food.expiry).toLocaleString()}
                </p>

                <span className={`badge ${food.status.toLowerCase()}`}>
                  {food.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
