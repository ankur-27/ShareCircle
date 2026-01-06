import { NavLink, useNavigate } from "react-router-dom";
import "../styles/customer-sidebar.css";

export default function CustomerSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="customer-sidebar">
      <div className="sidebar-logo">
        <h2>ShareCircle</h2>
      </div>

     <NavLink to="/customer/dashboard" className="menu-item">Dashboard</NavLink>
<NavLink to="/customer/services" className="menu-item">Services</NavLink>
<NavLink to="/customer/bookings" className="menu-item">My Bookings</NavLink>
<NavLink to="/customer/food" className="menu-item">Food Claims</NavLink>
<NavLink to="/customer/payments" className="menu-item">Payments</NavLink>
<NavLink to="/customer/message" className="menu-item">Messages</NavLink>
<NavLink to="/customer/profile" className="menu-item">Profile</NavLink>
<NavLink to="/customer/settings" className="menu-item">Settings</NavLink>


      <div className="sidebar-footer">
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </aside>
  );
}
