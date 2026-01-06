import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import StatCard from "../../components/StatCard";
import BookingTable from "../../components/BookingTable";
import EarningsChart from "../../components/EarningChart";

import "../../styles/dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard-main">
        <Header />

        <div className="stats-grid">
          <StatCard title="Total Earnings" value="₹45,200" />
          <StatCard title="This Month" value="₹8,500" />
          <StatCard title="Active Services" value="4" />
          <StatCard title="Rating" value="4.7 ⭐" />
        </div>

        <BookingTable />
      </main>
    </div>
  );
}
