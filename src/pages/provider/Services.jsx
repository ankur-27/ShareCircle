import { useEffect, useState } from "react";
import api from "../../services/api";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../styles/dashboard.css";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    category: "",
    price: ""
  });

  /* =========================
     FETCH SERVICES
  ========================= */
  const fetchServices = async () => {
    try {
      const res = await api.get("/provider/services");
      setServices(res.data.services || []);
    } catch (err) {
      console.error("Failed to load services");
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  /* =========================
     ADD SERVICE
  ========================= */
  const addService = async () => {
    if (!form.title || !form.category || !form.price) return;

    try {
      await api.post("/provider/services", {
        title: form.title,
        category: form.category,
        basePrice: Number(form.price)
      });

      // ✅ RELOAD AFTER ADD
      window.location.reload();
    } catch (error) {
      alert("Failed to add service");
    }
  };

  /* =========================
     DELETE SERVICE ✅
  ========================= */
  const deleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    try {
      await api.delete(`/provider/services/${id}`);

      // ✅ SIMPLE & RELIABLE
      window.location.reload();
    } catch (error) {
      alert("Failed to delete service");
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard-main">
        <Header />

        {/* ADD SERVICE */}
        <div className="page-box">
          <h2>Add New Service</h2>

          <div className="form-row">
            <input
              placeholder="Service Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            >
              <option value="">Category</option>
              <option>Electrician</option>
              <option>Plumber</option>
              <option>Tutor</option>
              <option>Mechanic</option>
            </select>

            <input
              placeholder="Price (₹)"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
            />

            <button onClick={addService}>Add</button>
          </div>
        </div>

        {/* SERVICES LIST */}
        <div className="page-box">
          <h2>My Services</h2>

          {loading ? (
            <p>Loading services...</p>
          ) : services.length === 0 ? (
            <p>No services added yet</p>
          ) : (
            <table className="service-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th> {/* ✅ ADDED */}
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s._id}>
                    <td>{s.title}</td>
                    <td>{s.category}</td>
                    <td>₹{s.basePrice}</td>
                    <td className={s.active ? "active" : "inactive"}>
                      {s.active ? "Active" : "Inactive"}
                    </td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteService(s._id)}
                      >
                        Delete
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
