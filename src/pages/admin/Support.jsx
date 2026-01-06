import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import DataTable from "../../components/admin/DataTable";
import "../../styles/admin/admin-table.css";

export default function Support() {
  const issues = [
    {
      User: "Raj Kumar",
      Issue: "Payment not reflected",
      Status: "Open"
    },
    {
      User: "Neha Paul",
      Issue: "Provider late arrival",
      Status: "Resolved"
    },
    {
      User: "Ravi Singh",
      Issue: "Food pickup delay",
      Status: "Open"
    }
  ];

  return (
    <div>
      <AdminSidebar />

      <main className="admin-main">
        <AdminHeader title="Support & Issues" />

        <DataTable
          title="Support Tickets"
          columns={["User", "Issue", "Status"]}
          data={issues}
        />
      </main>
    </div>
  );
}
