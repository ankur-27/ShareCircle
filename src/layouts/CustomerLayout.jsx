import { Outlet } from "react-router-dom";
import CustomerSidebar from "../components/CustomerSidebar";

export default function CustomerLayout() {
  return (
    <div className="dashboard">
      <CustomerSidebar />
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}
