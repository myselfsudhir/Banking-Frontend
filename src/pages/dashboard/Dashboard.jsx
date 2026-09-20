import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AccountOverview from "../accounts/AccountOverview";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { username, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-page">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <div className="brand-icon">S</div>

          <div>
            <h1>Sudhir's Bank</h1>
            <span>Digital Banking</span>
          </div>
        </div>

        <div className="dashboard-user">
          <div className="user-info">
            <span className="user-name">{username}</span>
            <span className="user-role">Customer</span>
          </div>

          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <nav className="sidebar-nav">
            <button
              className="sidebar-item active"
              onClick={() => navigate("/dashboard")}
            >
              <span>▦</span>
              Dashboard
            </button>

            <button
              className="sidebar-item"
              onClick={() => navigate("/accounts")}
            >
              <span>▣</span>
              Accounts
            </button>

            <button
              className="sidebar-item"
              onClick={() => navigate("/transactions")}
            >
              <span>⇄</span>
              Transfer Money
            </button>

            <button
              className="sidebar-item"
              onClick={() => navigate("/payments")}
            >
              <span>₹</span>
              Payments
            </button>

            <button
              className="sidebar-item"
              onClick={() => navigate("/transactions/history")}
            >
              <span>◷</span>
              Transactions
            </button>

            <button
              className="sidebar-item"
              onClick={() => navigate("/profile")}
            >
              <span>◎</span>
              Profile
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="dashboard-content">
          <div className="dashboard-welcome">
            <div>
              <h2>Welcome back, {username} 👋</h2>
              <p>Here's an overview of your banking activity.</p>
            </div>
          </div>

          <AccountOverview />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
