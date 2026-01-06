import { useState } from "react";
import axios from "../../services/api";
import DonorSidebar from "../../components/DonorSidebar";
import "../../styles/donor-dashboard.css";

export default function DonateFood() {
  const [food, setFood] = useState({
    foodName: "",
    quantity: "",
    type: "Veg",
    expiry: "",
    address: "",
    phone: "",
    note: ""
  });

  const handleChange = (e) => {
    setFood({ ...food, [e.target.name]: e.target.value });
  };

  const donateFood = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/donor/donate", {
        foodName: food.foodName,
        quantity: food.quantity,
        foodType: food.type,   // ✅ FIX HERE
        expiry: food.expiry,
        address: food.address,
        phone: food.phone,
        note: food.note
      });

      alert("Food donated successfully");

      setFood({
        foodName: "",
        quantity: "",
        type: "Veg",
        expiry: "",
        address: "",
        phone: "",
        note: ""
      });
    } catch (error) {
      console.error("Donate Food Error:", error.response?.data || error);
      alert("Donation failed. Check console.");
    }
  };

  return (
    <div className="dashboard">
      <DonorSidebar />

      <main className="dashboard-main">
        <h1 className="welcome-text">Donate Food 🍱</h1>

        <form className="donation-form" onSubmit={donateFood}>
          <label>Food Name</label>
          <input
            name="foodName"
            value={food.foodName}
            onChange={handleChange}
            required
          />

          <label>Quantity</label>
          <input
            name="quantity"
            value={food.quantity}
            onChange={handleChange}
            placeholder="e.g. 5 plates"
            required
          />

          <label>Food Type</label>
          <select name="type" value={food.type} onChange={handleChange}>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>

          <label>Expiry Date & Time</label>
          <input
            type="datetime-local"
            name="expiry"
            value={food.expiry}
            onChange={handleChange}
            required
          />

          <label>Pickup Address</label>
          <textarea
            name="address"
            value={food.address}
            onChange={handleChange}
            required
          />

          <label>Phone Number</label>
          <input
            name="phone"
            value={food.phone}
            onChange={handleChange}
            required
          />

          <label>Additional Notes (optional)</label>
          <textarea
            name="note"
            value={food.note}
            onChange={handleChange}
          />

          <p className="free-note">
            ⚠️ Food donations are <strong>always FREE</strong>. No payment involved.
          </p>

          <button className="auth-btn small-btn" type="submit">
            Donate Food
          </button>
        </form>
      </main>
    </div>
  );
}
