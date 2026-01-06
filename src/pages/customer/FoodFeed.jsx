import { useEffect, useState } from "react";
import api from "../../services/api";
import Sidebar from "../../components/Sidebar";

export default function FoodFeed() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await api.get("/customer/food-feed");
        setFoods(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Food fetch error", err);
        setFoods([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard-main">
        <h2>Available Food Donations</h2>

        {loading ? (
          <p>Loading...</p>
        ) : foods.length === 0 ? (
          <p>No food available</p>
        ) : (
          <div className="food-grid">
            {foods.map(food => (
              <div key={food._id} className="food-card">
                <h3>{food.foodName}</h3>
                <p>Quantity: {food.quantity}</p>
                <p>Type: {food.foodType}</p>
                <p>Address: {food.address}</p>
                <p>Phone: {food.phone}</p>
                <p>Status: {food.status}</p>
                <p>
                  Expiry: {new Date(food.expiry).toLocaleString()}
                </p>

                <button disabled={food.status !== "Available"}>
                  Claim Food
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
