import "../../styles/admin/admin-dashboard.css";

export default function ChartBox({ title, value, icon }) {
  return (
    <div className="chart-box">
      <div>
        <h4>{title}</h4>
        <h2>{value}</h2>
      </div>
      <span className="chart-icon">{icon}</span>
    </div>
  );
}
