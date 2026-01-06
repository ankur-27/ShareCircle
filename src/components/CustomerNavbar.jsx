import { NavLink, useNavigate } from "react-router-dom";
import "../styles/customer-navbar.css";

export default function CustomerNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="customer-navbar">
      <h2 className="logo">ShareCircle</h2>

      <nav>
        <NavLink to="/customer/dashboard">Dashboard</NavLink>
        <NavLink to="/customer/services">Services</NavLink>
        <NavLink to="/customer/food">Food</NavLink>
        <NavLink to="/customer/bookings">Bookings</NavLink>
        <NavLink to="/customer/profile">Profile</NavLink>
      </nav>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </header>
  );
}
