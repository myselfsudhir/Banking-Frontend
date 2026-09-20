import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAccount } from "../../api/accountApi";
import "./CreateAccount.css";

const CreateAccount = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    accountHolderName: "",
    email: "",
    phone: "",
    accountType: "SAVINGS",
    initialDeposit: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [createdAccount, setCreatedAccount] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const request = {
        accountHolderName: formData.accountHolderName,
        email: formData.email,
        phone: formData.phone,
        accountType: formData.accountType,
        initialDeposit: Number(formData.initialDeposit),
      };

      const response = await createAccount(request);

      setCreatedAccount(response.data);
    } catch (error) {
      console.error("Account creation failed:", error);

      setError(
        error.response?.data?.message ||
          error.response?.data ||
          "Unable to create account. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (createdAccount) {
    return (
      <div className="page-container create-account-page">
        <div className="success-card card">
          <div className="success-icon">✓</div>

          <h1>Account Created Successfully</h1>

          <p className="success-subtitle">
            Your new bank account has been created.
          </p>

          <div className="account-summary">
            <div className="summary-row">
              <span>Account Number</span>
              <strong>{createdAccount.accountNumber}</strong>
            </div>

            <div className="summary-row">
              <span>Account Holder</span>
              <strong>{createdAccount.accountHolderName}</strong>
            </div>

            <div className="summary-row">
              <span>Account Type</span>
              <strong>{createdAccount.accountType}</strong>
            </div>

            <div className="summary-row">
              <span>Opening Balance</span>
              <strong>₹ {createdAccount.balance}</strong>
            </div>

            <div className="summary-row">
              <span>Status</span>
              <strong className="status-active">
                {createdAccount.accountStatus}
              </strong>
            </div>
          </div>

          <div className="success-actions">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => setCreatedAccount(null)}
            >
              Create Another Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container create-account-page">
      <div className="page-header">
        <h1>Create Bank Account</h1>
        <p>Open a new account securely with Sudhir's Bank.</p>
      </div>

      <div className="create-account-layout">
        <div className="card create-account-card">
          <div className="card-header">
            <h2>Account Details</h2>
          </div>

          <div className="card-body">
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="accountHolderName">Account Holder Name</label>

                <input
                  id="accountHolderName"
                  name="accountHolderName"
                  type="text"
                  className="form-control"
                  placeholder="Enter full name"
                  value={formData.accountHolderName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="form-control"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="accountType">Account Type</label>

                <select
                  id="accountType"
                  name="accountType"
                  className="form-control"
                  value={formData.accountType}
                  onChange={handleChange}
                >
                  <option value="SAVINGS">Savings Account</option>

                  <option value="CURRENT">Current Account</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="initialDeposit">Initial Deposit</label>

                <div className="amount-input">
                  <span>₹</span>

                  <input
                    id="initialDeposit"
                    name="initialDeposit"
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.initialDeposit}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/dashboard")}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="card account-info-card">
          <div className="card-body">
            <div className="account-icon">🏦</div>

            <h3>Banking Made Simple</h3>

            <p>
              Create your account and start managing your finances securely.
            </p>

            <div className="info-item">
              <span>✓</span>
              Secure account creation
            </div>

            <div className="info-item">
              <span>✓</span>
              Real-time balance tracking
            </div>

            <div className="info-item">
              <span>✓</span>
              Secure transactions
            </div>

            <div className="info-item">
              <span>✓</span>
              24/7 account access
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
