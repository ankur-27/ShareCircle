import "../../styles/admin/admin-layout.css";

export default function AdminHeader({ title = "Dashboard" }) {
  return (
    <header className="admin-header">
      <h2>{title}</h2>

      <div className="admin-header-right">
        <input
          type="text"
          placeholder="Search..."
          className="admin-search"
        />

        <div className="admin-profile">
          <img
            src="https://via.placeholder.com/36"
            alt="Admin"
          />
          <div>
            <p className="admin-name">Admin</p>
            <span className="admin-role">Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
