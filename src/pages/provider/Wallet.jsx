import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../styles/dashboard.css";

export default function Wallet() {
  const [balance] = useState(12450);

  const transactions = [
    { date: "12 Jul 2025", amount: 1200, type: "Credit", note: "Service Payment" },
    { date: "10 Jul 2025", amount: 800, type: "Credit", note: "Service Payment" },
    { date: "05 Jul 2025", amount: 500, type: "Debit", note: "Withdrawal" }
  ];

  const [withdraw, setWithdraw] = useState({
    amount: "",
    method: "upi",
    details: ""
  });

  const handleWithdrawChange = (e) => {
    setWithdraw({ ...withdraw, [e.target.name]: e.target.value });
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard-main">
        <Header />

        {/* WALLET SUMMARY */}
        <div className="page-box">
          <h2>Wallet Overview</h2>
          <h1 className="wallet-balance">₹{balance}</h1>

          <div className="wallet-insights">
            <p>Pending Payout: <strong>₹3,200</strong></p>
            <p>Platform Fee: <strong>₹500</strong></p>
            <p>Net Earnings: <strong>₹11,950</strong></p>
          </div>
        </div>

        {/* WITHDRAW MONEY */}
        <div className="page-box">
          <h2>Withdraw Money</h2>

          <div className="withdraw-grid">
            <input
              name="amount"
              placeholder="Amount (₹)"
              value={withdraw.amount}
              onChange={handleWithdrawChange}
            />

            <select
              name="method"
              value={withdraw.method}
              onChange={handleWithdrawChange}
            >
              <option value="upi">UPI</option>
              <option value="bank">Bank Transfer</option>
              <option value="card">Debit / Credit Card</option>
            </select>

            <input
              name="details"
              placeholder="UPI ID / Bank Details"
              value={withdraw.details}
              onChange={handleWithdrawChange}
            />

            <button
              className="auth-btn"
              onClick={() => {
                setWithdraw({ amount: "", method: "upi", details: "" });
                alert("Withdrawal request submitted (demo)");
              }}
            >
              Withdraw
            </button>
          </div>
        </div>

        {/* TRANSACTION HISTORY */}
        <div className="page-box">
          <h2>Transaction History</h2>

          <table className="wallet-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Note</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((t, i) => (
                <tr key={i}>
                  <td>{t.date}</td>
                  <td>₹{t.amount}</td>
                  <td className={t.type === "Credit" ? "credit" : "debit"}>
                    {t.type}
                  </td>
                  <td>{t.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
