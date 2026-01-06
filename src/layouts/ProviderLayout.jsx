import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function ProviderLayout() {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}
