import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import StatCard from "../../components/admin/StatCard";
import DataTable from "../../components/admin/DataTable";

export default function Dashboard() {
  const recentBookings = [
    { Customer: "Raj Kumar", Service: "Electrician", Status: "Pending" },
    { Customer: "Amit Das", Service: "Plumber", Status: "Completed" },
    { Customer: "Suman Roy", Service: "Tutor", Status: "Approved" }
  ];

  const recentFood = [
    { Donor: "Neha", Food: "Rice", Status: "Available" },
    { Donor: "Rahul", Food: "Curry", Status: "Collected" }
  ];

  return (
    <div>
      <AdminSidebar />

      <main className="admin-main">
        <AdminHeader title="Admin Dashboard" />

        {/* STATS */}
        <div className="admin-stats-grid">
          <StatCard title="Total Users" value="1,254" icon="👥" />
          <StatCard title="Active Providers" value="342" icon="🛠" />
          <StatCard title="Bookings Today" value="76" icon="📦" />
          <StatCard title="Food Donations" value="128" icon="🍱" />
          <StatCard title="Total Revenue" value="₹3,45,200" icon="💰" />
        </div>

        {/* TABLES */}
        <DataTable
          title="Recent Bookings"
          columns={["Customer", "Service", "Status"]}
          data={recentBookings}
        />

        <DataTable
          title="Recent Food Donations"
          columns={["Donor", "Food", "Status"]}
          data={recentFood}
        />
      </main>
    </div>
  );
}
