import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import DataTable from "../../components/admin/DataTable";
import "../../styles/admin/admin-table.css";

export default function Services() {
  const services = [
    { Service: "Electrical Repair", Provider: "Raj Kumar", Status: "Active" },
    { Service: "Plumbing Work", Provider: "Amit Das", Status: "Active" },
    { Service: "Home Tutor", Provider: "Suman Roy", Status: "Disabled" }
  ];

  return (
    <div>
      <AdminSidebar />

      <main className="admin-main">
        <AdminHeader title="Services" />

        <DataTable
          title="Service Listings"
          columns={["Service", "Provider", "Status"]}
          data={services}
        />
      </main>
    </div>
  );
}
