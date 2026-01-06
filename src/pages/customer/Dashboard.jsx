import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import CustomerSidebar from "../../components/CustomerSidebar";
import CustomerHeader from "../../components/CustomerHeader";
import "../../styles/customer-dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const [foodClaims, setFoodClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  /* 🔴 LOGOUT FUNCTION */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  /* LOAD FOOD DONATIONS FROM MONGODB */
  useEffect(() => {
    const loadFood = async () => {
      try {
        const res = await api.get("/customer/food-feed");

        if (Array.isArray(res.data)) {
          // ✅ LAST ADDED FIRST + LIMIT 10
          setFoodClaims(res.data.slice(-10).reverse());
        } else {
          setFoodClaims([]);
        }
      } catch (err) {
        console.error("Food feed error:", err);
        setFoodClaims([]);
      } finally {
        setLoading(false);
      }
    };

    loadFood();
  }, []);

  return (
    <div className="customer-layout">
      <CustomerSidebar />

      <main className="customer-main">
        <CustomerHeader />

        {/* 🔴 LOGOUT BUTTON */}
        <div style={{ textAlign: "right", marginBottom: "15px" }}>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>

        {/* FIND SERVICE */}
        <div className="find-service-card">
          <div>
            <h2>Find your next local service</h2>
            <p>Browse and book services from trusted providers.</p>
          </div>
          <button
            className="primary-btn"
            onClick={() => navigate("/customer/services")}
          >
            Find a New Service
          </button>
        </div>

        <div className="dashboard-grid">
          {/* RECENT FOOD DONATIONS */}
          <div className="card">
            <h3>Recent Food Donations</h3>

            {loading ? (
              <p className="muted">Loading food donations...</p>
            ) : foodClaims.length === 0 ? (
              <p className="muted">No food available right now.</p>
            ) : (
              /* 🔥 SCROLLABLE CONTAINER */
              <div
                style={{
                  maxHeight: "320px",
                  overflowY: "auto",
                  paddingRight: "6px"
                }}
              >
                {foodClaims.map(food => (
                  <div key={food._id} className="list-item">
                    <div>
                      <strong>{food.foodName}</strong>
                      <p>{food.quantity}</p>
                      <small>{food.address}</small>
                    </div>
                    <span className="badge available">
                      {food.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PLACEHOLDER */}
          <div className="card">
            <h3>Your Bookings</h3>
            <p className="muted">Booking system coming soon.</p>
          </div>

          <div className="card">
            <h3>Payments</h3>
            <p className="muted">Wallet integration coming soon.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
