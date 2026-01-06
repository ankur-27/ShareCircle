import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import "../../styles/admin/admin-settings.css";

export default function Settings() {
  const navigate = useNavigate();

  /* ======================
     ADMIN LOGOUT
  ====================== */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login", { replace: true });
  };

  return (
    <div>
      <AdminSidebar />

      <main className="admin-main">
        <AdminHeader title="Admin Settings" />

        <div className="settings-box">
          <h3>Platform Controls</h3>

          <label className="setting-item">
            <input type="checkbox" defaultChecked />
            Enable Provider Registration
          </label>

          <label className="setting-item">
            <input type="checkbox" defaultChecked />
            Enable Food Donations
          </label>

          <label className="setting-item">
            <input type="checkbox" />
            Maintenance Mode
          </label>
        </div>

        <div className="settings-box">
          <h3>System Info</h3>
          <p><strong>Platform:</strong> ShareCircle</p>
          <p><strong>Version:</strong> 1.0.0</p>
          <p><strong>Status:</strong> Running</p>
        </div>

        <div className="settings-box danger-zone">
          <h3>Danger Zone</h3>
          <button className="danger-btn" onClick={handleLogout}>
            Logout Admin
          </button>
        </div>
      </main>
    </div>
  );
}
