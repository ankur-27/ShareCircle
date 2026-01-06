import CustomerSidebar from "../../components/CustomerSidebar";
import CustomerHeader from "../../components/CustomerHeader";
import "../../styles/customer-cards.css";

export default function Messages() {
  const messages = [
    {
      id: 1,
      from: "Raj Electrician",
      text: "I will arrive at 10 AM",
      date: "Today"
    },
    {
      id: 2,
      from: "Food Donor",
      text: "Pickup available till 8 PM",
      date: "Yesterday"
    }
  ];

  return (
    <div className="customer-layout">
      <CustomerSidebar />
      <main className="customer-main">
        <CustomerHeader />

        <div className="page-title">
          <h2>Messages 💬</h2>
          <p>Your conversations</p>
        </div>

        <div className="card" style={{ margin: 20 }}>
          {messages.map(m => (
            <div key={m.id} className="list-item">
              <div>
                <strong>{m.from}</strong>
                <p className="muted">{m.text}</p>
              </div>
              <small>{m.date}</small>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
