import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import StatCard from "../../components/admin/StatCard";
import "../../styles/admin/admin-dashboard.css";

export default function Reports() {
  return (
    <div>
      <AdminSidebar />

      <main className="admin-main">
        <AdminHeader title="Reports & Analytics" />

        <div className="admin-stats-grid">
          <StatCard title="Bookings Today" value="76" icon="📦" />
          <StatCard title="Monthly Revenue" value="₹1,25,000" icon="💰" />
          <StatCard title="Food Donated" value="540 Items" icon="🍱" />
          <StatCard title="New Users" value="112" icon="👥" />
        </div>

        <div style={{ marginTop: "20px" }}>
          <button className="small-btn">Download Daily Report</button>
          <button className="small-btn" style={{ marginLeft: "10px" }}>
            Download Monthly Report
          </button>
        </div>
      </main>
    </div>
  );
}
