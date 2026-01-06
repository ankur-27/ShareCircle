import { useEffect, useState } from "react";
import axios from "../../services/api";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../styles/dashboard.css";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    about: "",
    state: "",
    district: "",
    area: "",
    coverageAreas: "",
    showPhone: true
  });

  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saved, setSaved] = useState(false);

  const token = localStorage.getItem("token");

  /* =========================
     LOAD PROFILE ON PAGE LOAD
  ========================= */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/provider/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProfile(prev => ({
          ...prev,
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.profile?.phone || "",
          about: res.data.profile?.about || "",
          state: res.data.profile?.state || "",
          district: res.data.profile?.district || "",
          area: res.data.profile?.area || "",
          coverageAreas: res.data.profile?.coverageAreas || "",
          showPhone: res.data.profile?.showPhone ?? true
        }));
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    if (token) fetchProfile();
  }, [token]);

  /* =========================
     HANDLE INPUT CHANGE
  ========================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProfile({
      ...profile,
      [name]: type === "checkbox" ? checked : value
    });

    setSaved(false);
  };

  /* =========================
     HANDLE IMAGE (UI ONLY)
  ========================= */
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfilePic(file);
    setPreview(URL.createObjectURL(file));
    setSaved(false);
  };

  /* =========================
     SAVE PROFILE
  ========================= */
  const saveProfile = async () => {
    try {
      await axios.put(
        "/provider/profile",
        {
          phone: profile.phone,
          about: profile.about,
          state: profile.state,
          district: profile.district,
          area: profile.area,
          coverageAreas: profile.coverageAreas,
          showPhone: profile.showPhone
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSaved(true);
    } catch (err) {
      alert("Profile update failed");
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard-main">
        <Header />

        <div className="page-box">
          <h2>Manage Profile</h2>

          {/* PROFILE IMAGE */}
          <div className="profile-image-box">
            <img
              src={preview || "https://via.placeholder.com/120?text=Profile"}
              alt="Profile"
              className="profile-img"
            />
            <input type="file" onChange={handleImage} />
          </div>

          <div className="profile-grid">
            <div>
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

              <label>About You</label>
              <textarea
                name="about"
                value={profile.about}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>State</label>
              <input
                name="state"
                value={profile.state}
                onChange={handleChange}
              />

              <label>District</label>
              <input
                name="district"
                value={profile.district}
                onChange={handleChange}
              />

              <label>Area</label>
              <input
                name="area"
                value={profile.area}
                onChange={handleChange}
              />

              <label>
                <input
                  type="checkbox"
                  name="showPhone"
                  checked={profile.showPhone}
                  onChange={handleChange}
                />{" "}
                Show phone number to customers
              </label>
            </div>
          </div>

          <label>Additional Service Areas</label>
          <textarea
            name="coverageAreas"
            value={profile.coverageAreas}
            onChange={handleChange}
            placeholder="Barasat, Madhyamgram, New Town"
          />

          <button className="auth-btn" onClick={saveProfile}>
            Save Changes
          </button>

          {saved && (
            <p className="success-msg">✅ Profile saved successfully</p>
          )}
        </div>
      </main>
    </div>
  );
}
