import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ======================
     FETCH CUSTOMERS
  ====================== */
  const fetchCustomers = async () => {
    try {
      const res = await api.get("/admin/users/role/customer");
      setCustomers(res.data);
    } catch (err) {
      console.error("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  /* ======================
     BLOCK / UNBLOCK
  ====================== */
  const toggleStatus = async (id) => {
    if (!window.confirm("Change user status?")) return;

    try {
      await api.patch(`/admin/users/${id}/status`);
      fetchCustomers(); // refresh list
    } catch {
      alert("Action failed");
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <AdminHeader title="Customers" />

        <div className="admin-card">
          <h3>Customers List</h3>

          {loading ? (
            <p>Loading customers...</p>
          ) : customers.length === 0 ? (
            <p>No customers found</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Bookings</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((c) => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.bookings?.length || 0}</td>
                    <td>
                      <span
                        className={
                          c.status === "active"
                            ? "status-active"
                            : "status-blocked"
                        }
                      >
                        {c.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className={
                          c.status === "active"
                            ? "btn-danger"
                            : "btn-success"
                        }
                        onClick={() => toggleStatus(c._id)}
                      >
                        {c.status === "active" ? "Block" : "Unblock"}
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
