import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

export default function Donors() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ======================
     FETCH DONORS FROM DB
  ====================== */
  const fetchDonors = async () => {
    try {
      const res = await api.get("/admin/users/role/donor");
      setDonors(res.data);
    } catch (err) {
      console.error("Failed to load donors", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  /* ======================
     BLOCK / UNBLOCK DONOR
  ====================== */
  const toggleStatus = async (id) => {
    if (!window.confirm("Change donor status?")) return;

    try {
      await api.patch(`/admin/users/${id}/status`);
      fetchDonors();
    } catch {
      alert("Action failed");
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <AdminHeader title="Food Donors" />

        <div className="admin-card">
          <h3>Donor List</h3>

          {loading ? (
            <p>Loading donors...</p>
          ) : donors.length === 0 ? (
            <p>No donors found</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Donations</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {donors.map((d) => (
                  <tr key={d._id}>
                    <td>{d.name}</td>
                    <td>{d.email}</td>
                    <td>{d.foodDonations?.length || 0}</td>
                    <td>
                      <span
                        className={
                          d.status === "active"
                            ? "status-active"
                            : "status-blocked"
                        }
                      >
                        {d.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className={
                          d.status === "active"
                            ? "btn-danger"
                            : "btn-success"
                        }
                        onClick={() => toggleStatus(d._id)}
                      >
                        {d.status === "active" ? "Block" : "Unblock"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
