import "../styles/header.css";

export default function Header() {
  return (
    <header className="header">
      <div>
        <h3>Welcome back, Provider 👋</h3>
        <p>Here is your service overview</p>
      </div>

      <div className="header-right">
        <span className="wallet">₹12,450</span>

        <div className="profile">
          <div className="avatar">P</div>
          <span>Provider</span>
        </div>

        <button className="logout">Logout</button>
      </div>
    </header>
  );
}
