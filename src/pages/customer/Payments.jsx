import CustomerSidebar from "../../components/CustomerSidebar";
import CustomerHeader from "../../components/CustomerHeader";
import "../../styles/customer-cards.css";

export default function Payments() {
  const transactions = [
    { id: 1, title: "House Cleaning", amount: -800, date: "12 Sep 2025" },
    { id: 2, title: "Refund - Plumbing", amount: 500, date: "10 Sep 2025" }
  ];

  return (
    <div className="customer-layout">
      <CustomerSidebar />
      <main className="customer-main">
        <CustomerHeader />

        <div className="page-title">
          <h2>Payments 💳</h2>
          <p>View your transaction history</p>
        </div>

        <div className="card" style={{ margin: 20 }}>
          <h3>Recent Transactions</h3>

          {transactions.map(t => (
            <div key={t.id} className="list-item">
              <div>
                <strong>{t.title}</strong>
                <p className="muted">{t.date}</p>
              </div>
              <span
                style={{
                  color: t.amount < 0 ? "#e74c3c" : "#2ecc71",
                  fontWeight: 600
                }}
              >
                ₹ {t.amount}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
