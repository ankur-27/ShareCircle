import { useEffect, useState } from "react";
import CustomerSidebar from "../../components/CustomerSidebar";
import CustomerHeader from "../../components/CustomerHeader";
import "../../styles/customer-dashboard.css";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    photo: ""
  });

  const [preview, setPreview] = useState("");
  const [saved, setSaved] = useState(false);

  // 🔹 Load profile from storage (login/register data)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || {
      name: "Customer",
      email: "customer@sharecircle.com"
    };

    const storedProfile =
      JSON.parse(localStorage.getItem("customerProfile")) || {};

    setProfile({
      name: user.name,
      email: user.email,
      phone: storedProfile.phone || "",
      address: storedProfile.address || "",
      photo: storedProfile.photo || ""
    });

    setPreview(storedProfile.photo || "");
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);
    setPreview(imageURL);
    setProfile({ ...profile, photo: imageURL });
    setSaved(false);
  };

  const saveProfile = () => {
    localStorage.setItem(
      "customerProfile",
      JSON.stringify({
        phone: profile.phone,
        address: profile.address,
        photo: profile.photo
      })
    );
    setSaved(true);
  };

  return (
    <div className="customer-layout">
      <CustomerSidebar />

      <main className="customer-main">
        <CustomerHeader />

        <div className="card" style={{ maxWidth: 600, margin: 30 }}>
          <h2>My Profile</h2>

          {/* PROFILE IMAGE */}
          <div style={{ marginBottom: 20 }}>
            <img
              src={
                preview ||
                "https://via.placeholder.com/120?text=Profile"
              }
              alt="Profile"
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                objectFit: "cover"
              }}
            />
            <br />
            <input type="file" onChange={handlePhoto} />
          </div>

          {/* DETAILS */}
          <label>Full Name</label>
          <input value={profile.name} disabled />

          <label>Email</label>
          <input value={profile.email} disabled />

          <label>Phone</label>
          <input
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />

          <label>Address</label>
          <textarea
            name="address"
            value={profile.address}
            onChange={handleChange}
            placeholder="Enter your address"
          />

          <button
            className="primary-btn"
            style={{ marginTop: 15 }}
            onClick={saveProfile}
          >
            Save Changes
          </button>

          {saved && (
            <p style={{ color: "green", marginTop: 10 }}>
              ✅ Profile updated successfully
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
