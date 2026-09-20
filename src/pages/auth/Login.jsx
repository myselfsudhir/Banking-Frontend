import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      await login(formData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);

      setError(error.response?.data || "Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left side */}
        <div className="auth-brand-panel">
          <div className="auth-brand">
            <div className="auth-brand-icon">S</div>

            <div>
              <h1>Sudhir's Bank</h1>
              <span>Digital Banking</span>
            </div>
          </div>

          <div className="auth-brand-content">
            <h2>
              Banking made
              <br />
              simple.
            </h2>

            <p>
              Manage your accounts, transfer money, make payments and keep track
              of your finances from one secure place.
            </p>
          </div>

          <div className="auth-security">
            <span>✓</span>
            Secure & protected banking
          </div>
        </div>

        {/* Right side */}
        <div className="auth-form-panel">
          <div className="auth-form-container">
            <div className="auth-heading">
              <h2>Welcome back</h2>

              <p>Sign in to access your banking dashboard.</p>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>

                <input
                  id="username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  autoComplete="username"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>

                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
              </div>

              <button type="submit" className="auth-submit" disabled={loading}>
                {loading ? (
                  <span className="login-loading">Signing in...</span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span>New to Sudhir's Bank?</span>
            </div>

            <Link to="/register" className="auth-register-link">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
