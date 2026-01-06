import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../styles/dashboard.css";

export default function Availability() {
  const [available, setAvailable] = useState(true);

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard-main">
        <Header />

        <div className="page-box">
          <h2>Service Availability</h2>

          <div className="availability-box">
            <div>
              <h3>
                Status:{" "}
                <span className={available ? "online" : "offline"}>
                  {available ? "ONLINE" : "OFFLINE"}
                </span>
              </h3>
              <p>
                {available
                  ? "Customers can find and book you."
                  : "You are hidden from customer search."}
              </p>
            </div>

            <button
              className={available ? "stop-btn" : "start-btn"}
              onClick={() => setAvailable(!available)}
            >
              {available ? "Stop Service" : "Start Service"}
            </button>
          </div>

          <p className="availability-note">
            ⚠️ When OFFLINE, customers cannot book your services.
          </p>
        </div>
      </main>
    </div>
  );
}
