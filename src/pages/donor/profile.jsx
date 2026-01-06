import { useState } from "react";
import DonorSidebar from "../../components/DonorSidebar";
import "../../styles/donor-profile.css";

export default function Profile() {
  // 🔹 Registration data (later from backend)
  const [profile, setProfile] = useState({
    name: "Raj",
    email: "donor@sharecircle.com",
    phone: "",
    address: "",
    area: "",
    showPhone: true
  });

  const [preview, setPreview] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile({
      ...profile,
      [name]: type === "checkbox" ? checked : value
    });
    setSaved(false);
  };

  const handleImage = (e) => {
    if (!e.target.files[0]) return;
    setPreview(URL.createObjectURL(e.target.files[0]));
    setSaved(false);
  };

  const saveProfile = () => {
    console.log("Donor Profile Saved:", profile);
    setSaved(true);
  };

  return (
    <div className="dashboard">
      <DonorSidebar />

      <main className="dashboard-main">
        <h1 className="welcome-text">Manage Profile 👤</h1>

        {/* PROFILE IMAGE */}
        <div className="profile-image-box">
          <img
            src={preview || "https://via.placeholder.com/120"}
            alt="Profile"
            className="profile-img"
          />
          <input type="file" onChange={handleImage} />
        </div>

        {/* PROFILE FORM */}
        <div className="profile-form">
          <label>Full Name</label>
          <input value={profile.name} disabled />

          <label>Email</label>
          <input value={profile.email} disabled />

          <label>Phone Number</label>
          <input
            name="phone"
            value={profile.phone}
            onChange={handleChange}
          />

          <label>Address</label>
          <textarea
            name="address"
            value={profile.address}
            onChange={handleChange}
          />

          <label>Area</label>
          <input
            name="area"
            value={profile.area}
            onChange={handleChange}
          />

          <label className="checkbox">
            <input
              type="checkbox"
              name="showPhone"
              checked={profile.showPhone}
              onChange={handleChange}
            />
            Show phone number to customers
          </label>

          <button className="auth-btn small-btn" onClick={saveProfile}>
            Save Changes
          </button>

          {saved && (
            <p className="success-msg">✅ Profile updated successfully</p>
          )}
        </div>
      </main>
    </div>
  );
}
