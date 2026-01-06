import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import DataTable from "../../components/admin/DataTable";
import "../../styles/admin/admin-table.css";

export default function KYC() {
  const kycRequests = [
    {
      Name: "Raj Kumar",
      Role: "Provider",
      Document: "Aadhar Card",
      Status: "Pending"
    },
    {
      Name: "Anjali Roy",
      Role: "Donor",
      Document: "Voter ID",
      Status: "Approved"
    },
    {
      Name: "Amit Das",
      Role: "Provider",
      Document: "Driving License",
      Status: "Rejected"
    }
  ];

  return (
    <div>
      <AdminSidebar />

      <main className="admin-main">
        <AdminHeader title="KYC Verification" />

        <DataTable
          title="KYC Requests"
          columns={["Name", "Role", "Document", "Status"]}
          data={kycRequests}
        />
      </main>
    </div>
  );
}
