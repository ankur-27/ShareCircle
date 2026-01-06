import { NavLink, useNavigate } from "react-router-dom";
import "../styles/donor-sidebar.css";

export default function DonorSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <aside className="donor-sidebar">
      <h2 className="donor-logo">ShareCircle</h2>

      <nav>
        <NavLink to="/donor/dashboard">🏠 Dashboard</NavLink>
        <NavLink to="/donor/donate">➕ Donate Food</NavLink>
        <NavLink to="/donor/my-donations">📦 My Donations</NavLink>
        <NavLink to="/donor/history">🕒 History</NavLink>
        <NavLink to="/donor/profile">👤 Profile</NavLink>
        <NavLink to="/donor/ratings">⭐ Ratings</NavLink>
        <NavLink to="/donor/kyc">🪪 KYC</NavLink>
        <NavLink to="/donor/support">📞 Support</NavLink>
      </nav>

      <button className="logout-btn" onClick={logout}>
        🚪 Logout
      </button>
    </aside>
  );
}
