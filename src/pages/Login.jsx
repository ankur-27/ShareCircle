import { useState } from "react";
import axios from "../services/api";
import "../styles/auth.css";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "customer"
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      const res = await axios.post("/auth/login", form);

      // ✅ SAVE EVERYTHING
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem(
  "user",
  JSON.stringify({
    name: res.data.name,
    email: res.data.email,
    role: res.data.role
  })
);
      // 🔥 THIS WAS MISSING
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // 🔁 ROLE BASED REDIRECT
      if (res.data.role === "customer") {
        window.location.href = "/customer/dashboard";
      } else if (res.data.role === "provider") {
        window.location.href = "/provider/dashboard";
      } else if (res.data.role === "donor") {
        window.location.href = "/donor/dashboard";
      } else if (res.data.role === "seller") {
        window.location.href = "/seller/dashboard";
      } else if (res.data.role === "admin") {
        window.location.href = "/admin/dashboard";
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth">
      <div className="auth-left">
        <div className="logo">ShareCircle</div>
        <h1>Your Community, Connected.</h1>
        <p>
          Welcome back! Log in to continue sharing services, food,
          and support with your community.
        </p>
      </div>

      <div className="auth-right">
        <div className="auth-tabs">
          <a className="active">Log In</a>
          <a href="/register">Create Account</a>
        </div>

        <div className="auth-form">
          <h2>Welcome Back!</h2>

          {error && <div className="auth-error">{error}</div>}

          <label>Email</label>
          <input name="email" onChange={handleChange} />

          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} />

          <label>Select Role</label>
          <select name="role" onChange={handleChange}>
            <option value="customer">Customer</option>
            <option value="provider">Service Provider</option>
            <option value="donor">Food Donor</option>
            <option value="seller">Food Store Seller</option>
            <option value="admin">Admin</option>
          </select>

          <button className="auth-btn" onClick={submit}>
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
