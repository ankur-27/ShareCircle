import { useState } from "react";
import axios from "../services/api";
import "../styles/auth.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    setError("");
    setSuccess(false);

    // Basic frontend validation
    if (!form.name || !form.email || !form.password || !form.role) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      // 🚫 THIS WILL FAIL IF BACKEND IS NOT RUNNING
      const res = await axios.post("/auth/register", form);

      // Only backend success reaches here
      if (res.status === 201 || res.status === 200) {
        setSuccess(true);

        // Auto redirect to login
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (err) {
      // Backend error OR no backend connection
      if (err.response) {
        setError(err.response.data.message || "Registration failed");
      } else {
        setError("Backend not connected ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      {/* LEFT PANEL */}
      <div className="auth-left">
        <div className="logo">ShareCircle</div>
        <h1>Your Community, Connected.</h1>
        <p>
          Join your neighborhood to share services, food, and support.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right">
        <div className="auth-tabs">
          <a href="/login">Log In</a>
          <a className="active">Create Account</a>
        </div>

        <div className="auth-form">
          <h2>Create Account</h2>

          {error && <div className="auth-error">{error}</div>}
          {success && (
            <div className="auth-success">
              Registration successful 🎉 Redirecting...
            </div>
          )}

          <label>Full Name</label>
          <input
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            onChange={handleChange}
          />

          <label>Select Role</label>
          <select name="role" onChange={handleChange}>
            <option value="customer">Customer</option>
            <option value="provider">Service Provider</option>
            <option value="donor">Food Donor</option>
          
          </select>

          <button
            className="auth-btn"
            onClick={submit}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
}
