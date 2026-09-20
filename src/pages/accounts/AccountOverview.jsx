import { useState } from "react";
import { getAccount } from "../../api/accountApi";
import "./AccountOverview.css";

const AccountOverview = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!accountNumber.trim()) {
      setError("Please enter an account number.");
      return;
    }

    setLoading(true);
    setError("");
    setAccount(null);

    try {
      const response = await getAccount(accountNumber.trim());
      setAccount(response.data);
    } catch (error) {
      console.error("Failed to fetch account:", error);

      setError(
        error.response?.data?.message ||
          "Unable to find the account. Please check the account number.",
      );
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) {
      return "₹ 0";
    }

    return `₹ ${Number(amount).toLocaleString("en-IN")}`;
  };

  return (
    <div className="accounts-page">
      <div className="page-header">
        <div>
          <h1>Accounts</h1>
          <p>View your bank account details and available balance.</p>
        </div>
      </div>

      <div className="account-search-card">
        <div className="section-title">
          <h2>Find Account</h2>
          <p>Enter your account number to view account details.</p>
        </div>

        <form onSubmit={handleSearch} className="account-search-form">
          <div className="input-group">
            <label htmlFor="accountNumber">Account Number</label>

            <input
              id="accountNumber"
              type="text"
              value={accountNumber}
              onChange={(event) => setAccountNumber(event.target.value)}
              placeholder="Enter account number"
            />
          </div>

          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? "Loading..." : "View Account"}
          </button>
        </form>

        {error && <div className="account-error">{error}</div>}
      </div>

      {account && (
        <div className="account-details-card">
          <div className="account-card-header">
            <div>
              <span className="card-label">Account Number</span>

              <h2>{account.accountNumber}</h2>
            </div>

            <span
              className={`status-badge ${account.accountStatus?.toLowerCase()}`}
            >
              {account.accountStatus}
            </span>
          </div>

          <div className="balance-section">
            <span className="card-label">Available Balance</span>

            <div className="balance">{formatCurrency(account.balance)}</div>
          </div>

          <div className="account-info-grid">
            <div className="info-item">
              <span className="card-label">Account Holder</span>

              <strong>{account.accountHolderName}</strong>
            </div>

            <div className="info-item">
              <span className="card-label">Email</span>

              <strong>{account.email}</strong>
            </div>

            <div className="info-item">
              <span className="card-label">Phone</span>

              <strong>{account.phone}</strong>
            </div>

            <div className="info-item">
              <span className="card-label">Account Type</span>

              <strong>{account.accountType}</strong>
            </div>

            <div className="info-item">
              <span className="card-label">Daily Transaction Limit</span>

              <strong>{formatCurrency(account.dailyTransactionLimit)}</strong>
            </div>

            <div className="info-item">
              <span className="card-label">Created At</span>

              <strong>
                {account.createdAt
                  ? new Date(account.createdAt).toLocaleDateString("en-IN")
                  : "-"}
              </strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountOverview;
