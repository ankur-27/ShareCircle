import { useEffect, useState } from "react";
import api from "../../services/api";
import Sidebar from "../../components/Sidebar";

export default function CustomerServices() {
  const [foods, setFoods] = useState([]); // always array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await api.get("/customer/food-feed");
        setFoods(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Food feed error", err);
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
        <h1>Available Food Donations</h1>

        {loading ? (
          <p>Loading food...</p>
        ) : foods.length === 0 ? (
          <p>No food available right now</p>
        ) : (
          <div className="food-grid">
            {foods.map(food => (
              <div key={food._id} className="food-card">
                <h3>{food.foodName}</h3>
                <p><b>Quantity:</b> {food.quantity}</p>
                <p><b>Type:</b> {food.foodType}</p>
                <p><b>Address:</b> {food.address}</p>
                <p><b>Phone:</b> {food.phone}</p>
                <p><b>Status:</b> {food.status}</p>
                <p>
                  <b>Expiry:</b>{" "}
                  {new Date(food.expiry).toLocaleString()}
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
