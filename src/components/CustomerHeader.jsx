import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/customer-header.css";

export default function CustomerHeader() {
  const [name, setName] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get("/customer/profile");
        setName(res.data.name);
      } catch (err) {
        console.error("Profile load failed");
      }
    };

    loadProfile();
  }, []);

  return (
    <header className="customer-header">
      <h2>
        Welcome, <span>{name || "Customer"}</span> 👋
      </h2>
    </header>
  );
}
<p style={{ color: "red" }}>{name}</p>
