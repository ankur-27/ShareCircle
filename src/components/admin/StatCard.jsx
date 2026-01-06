import "../../styles/admin/admin-dashboard.css";

export default function StatCard({ title, value, icon }) {
  return (
    <div className="admin-stat-card">
      <div>
        <p className="stat-title">{title}</p>
        <h3>{value}</h3>
      </div>
      <span className="stat-icon">{icon}</span>
    </div>
  );
}
