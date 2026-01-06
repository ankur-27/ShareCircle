import { useEffect, useState } from "react";
import CustomerSidebar from "../../components/CustomerSidebar";
import CustomerHeader from "../../components/CustomerHeader";
import "../../styles/customer-dashboard.css";

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: "English",
    location: "",
    showPhone: true,
    showAddress: true
  });

  // ✅ LOAD SETTINGS ON PAGE LOAD
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("customerSettings"));
    if (saved) {
      setSettings(saved);

      // apply dark mode on reload
      if (saved.darkMode) {
        document.body.classList.add("dark-mode");
      }
    }
  }, []);

  const updateSetting = (e) => {
    const { name, value, type, checked } = e.target;

    const updated = {
      ...settings,
      [name]: type === "checkbox" ? checked : value
    };

    setSettings(updated);
    localStorage.setItem(
      "customerSettings",
      JSON.stringify(updated)
    );

    // ✅ APPLY DARK MODE INSTANTLY
    if (name === "darkMode") {
      if (checked) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    }
  };

  return (
    <div className="customer-layout">
      <CustomerSidebar />
      <main className="customer-main">
        <CustomerHeader />

        <div className="card" style={{ maxWidth: 600, margin: 30 }}>
          <h2>Settings ⚙️</h2>

          <label>
            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={updateSetting}
            />{" "}
            Enable Notifications
          </label>

          <label>
            <input
              type="checkbox"
              name="darkMode"
              checked={settings.darkMode}
              onChange={updateSetting}
            />{" "}
            Dark Mode
          </label>

          <label>Language</label>
          <select
            name="language"
            value={settings.language}
            onChange={updateSetting}
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Bengali</option>
          </select>

          <label>Preferred Location</label>
          <input
            name="location"
            value={settings.location}
            onChange={updateSetting}
            placeholder="City / Area"
          />

          <label>
            <input
              type="checkbox"
              name="showPhone"
              checked={settings.showPhone}
              onChange={updateSetting}
            />{" "}
            Show phone number
          </label>

          <label>
            <input
              type="checkbox"
              name="showAddress"
              checked={settings.showAddress}
              onChange={updateSetting}
            />{" "}
            Show address
          </label>

          <p className="muted" style={{ marginTop: 10 }}>
            Settings are saved automatically.
          </p>
        </div>
      </main>
    </div>
  );
}
