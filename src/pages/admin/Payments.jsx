import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import DataTable from "../../components/admin/DataTable";
import "../../styles/admin/admin-table.css";

export default function Payments() {
  const payments = [
    {
      User: "Raj Kumar",
      Type: "Service Booking",
      Method: "UPI",
      Amount: "₹500",
      Status: "Success"
    },
    {
      User: "Neha Paul",
      Type: "Food Purchase",
      Method: "Card",
      Amount: "₹120",
      Status: "Success"
    },
    {
      User: "Ravi Singh",
      Type: "Service Booking",
      Method: "Cash",
      Amount: "₹800",
      Status: "Pending"
    }
  ];

  return (
    <div>
      <AdminSidebar />

      <main className="admin-main">
        <AdminHeader title="Payments" />

        <DataTable
          title="Payment Transactions"
          columns={["User", "Type", "Method", "Amount", "Status"]}
          data={payments}
        />
      </main>
    </div>
  );
}
