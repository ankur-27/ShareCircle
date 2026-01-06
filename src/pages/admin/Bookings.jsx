import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import DataTable from "../../components/admin/DataTable";
import "../../styles/admin/admin-table.css";

export default function Bookings() {
  const bookings = [
    {
      Customer: "Raj Kumar",
      Provider: "Amit Das",
      Service: "Plumber",
      Status: "Pending"
    },
    {
      Customer: "Neha Paul",
      Provider: "Suman Roy",
      Service: "Tutor",
      Status: "Completed"
    },
    {
      Customer: "Ravi Singh",
      Provider: "Raj Kumar",
      Service: "Electrician",
      Status: "Approved"
    }
  ];

  return (
    <div>
      <AdminSidebar />

      <main className="admin-main">
        <AdminHeader title="Bookings" />

        <DataTable
          title="All Service Bookings"
          columns={["Customer", "Provider", "Service", "Status"]}
          data={bookings}
        />
      </main>
    </div>
  );
}
