import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import DataTable from "../../components/admin/DataTable";
import "../../styles/admin/admin-table.css";

export default function FoodDonations() {
  const donations = [
    {
      Donor: "Anjali Roy",
      Food: "Rice & Dal",
      Location: "Barasat",
      Status: "Available"
    },
    {
      Donor: "Rohit Sharma",
      Food: "Vegetable Curry",
      Location: "Madhyamgram",
      Status: "Collected"
    },
    {
      Donor: "Kunal Das",
      Food: "Bread Packets",
      Location: "Dum Dum",
      Status: "Expired"
    }
  ];

  return (
    <div>
      <AdminSidebar />

      <main className="admin-main">
        <AdminHeader title="Food Donations" />

        <DataTable
          title="Food Donation Listings"
          columns={["Donor", "Food", "Location", "Status"]}
          data={donations}
        />
      </main>
    </div>
  );
}
