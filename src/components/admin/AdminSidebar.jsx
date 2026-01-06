import { NavLink } from "react-router-dom";
import "../../styles/admin/admin-sidebar.css";

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">
        Share<span>Circle</span>
      </div>

      <nav className="admin-menu">
        <NavLink to="/admin/dashboard">Dashboard</NavLink>

        <p className="menu-title">Users</p>
        <NavLink to="/admin/providers">Providers</NavLink>
        <NavLink to="/admin/customers">Customers</NavLink>
        <NavLink to="/admin/donors">Donors</NavLink>

        <p className="menu-title">Management</p>
        <NavLink to="/admin/services">Services</NavLink>
        <NavLink to="/admin/food">Food Donations</NavLink>
        <NavLink to="/admin/bookings">Bookings</NavLink>
        <NavLink to="/admin/ratings">Ratings</NavLink>
        <NavLink to="/admin/kyc">KYC</NavLink>

        <p className="menu-title">Finance</p>
        <NavLink to="/admin/payments">Payments</NavLink>
        <NavLink to="/admin/reports">Reports</NavLink>

        <p className="menu-title">System</p>
        <NavLink to="/admin/support">Support</NavLink>
        <NavLink to="/admin/settings">Settings</NavLink>

        <button className="logout-btn">Logout</button>
      </nav>
    </aside>
  );
}
