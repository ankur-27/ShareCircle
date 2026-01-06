import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import DataTable from "../../components/admin/DataTable";
import "../../styles/admin/admin-table.css";

export default function Ratings() {
  const ratings = [
    {
      Customer: "Raj Kumar",
      Provider: "Amit Das",
      Rating: "5 ⭐",
      Review: "Excellent service"
    },
    {
      Customer: "Neha Paul",
      Provider: "Suman Roy",
      Rating: "4 ⭐",
      Review: "Good experience"
    },
    {
      Customer: "Ravi Singh",
      Provider: "Raj Kumar",
      Rating: "2 ⭐",
      Review: "Late arrival"
    }
  ];

  return (
    <div>
      <AdminSidebar />

      <main className="admin-main">
        <AdminHeader title="Ratings & Reviews" />

        <DataTable
          title="User Feedback"
          columns={["Customer", "Provider", "Rating", "Review"]}
          data={ratings}
        />
      </main>
    </div>
  );
}


