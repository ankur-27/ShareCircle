import { NavLink, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  /* ✅ LOGOUT FUNCTION */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <h2 className="logo">ShareCircle</h2>

      <nav>
        <NavLink to="/provider/dashboard">Dashboard</NavLink>
        <NavLink to="/provider/services">Services</NavLink>
        <NavLink to="/provider/bookings">Bookings</NavLink>
        <NavLink to="/provider/wallet">Wallet</NavLink>
        <NavLink to="/provider/ratings">Ratings</NavLink>
        <NavLink to="/provider/kyc">KYC</NavLink>
        <NavLink to="/provider/profile">Profile</NavLink>
        <NavLink to="/provider/availability">Availability</NavLink>
        <NavLink to="/provider/support">Support</NavLink>
      </nav>

      {/* 🔴 LOGOUT BUTTON (ADDED ONLY) */}
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </aside>
  );
}
