import { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import StatusBadge from "../../components/admin/StatusBadge";
import ConfirmModal from "../../components/admin/ConfirmModal";
import "../../styles/admin/admin-table.css";

export default function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: "Raj Kumar", role: "provider", status: "active" },
    { id: 2, name: "Anita Das", role: "customer", status: "blocked" }
  ]);

  const [confirm, setConfirm] = useState(null);

  const toggleStatus = (id) => {
    setUsers(users.map(u =>
      u.id === id
        ? { ...u, status: u.status === "active" ? "blocked" : "active" }
        : u
    ));
    setConfirm(null);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <AdminHeader title="Users Management" />

        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td><StatusBadge status={user.status} /></td>
                <td>
                  <button
                    className="admin-btn danger"
                    onClick={() => setConfirm(user)}
                  >
                    Toggle Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {confirm && (
          <ConfirmModal
            title="Confirm Action"
            message={`Change status of ${confirm.name}?`}
            onConfirm={() => toggleStatus(confirm.id)}
            onCancel={() => setConfirm(null)}
          />
        )}
      </main>
    </div>
  );
}
