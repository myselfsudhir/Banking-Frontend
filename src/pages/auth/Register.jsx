import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register as registerApi } from "../../api/authApi";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await registerApi({
        username: formData.username,
        password: formData.password,
        role: "USER",
      });

      setSuccess("Registration successful. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Registration failed:", error);

      setError(
        error.response?.data || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container register-container">
        {/* Left panel */}
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
              Your money.
              <br />
              Your control.
            </h2>

            <p>
              Open your digital bank account and manage your finances securely
              from anywhere.
            </p>
          </div>

          <div className="auth-security">
            <span>✓</span>
            Secure & protected banking
          </div>
        </div>

        {/* Right panel */}
        <div className="auth-form-panel">
          <div className="auth-form-container">
            <div className="auth-heading">
              <h2>Create your account</h2>

              <p>Enter your details to get started with Sudhir's Bank.</p>
            </div>

            {error && <div className="auth-error">{error}</div>}

            {success && (
              <div className="auth-success">
                <span>✓</span>
                {success}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>

                <input
                  id="username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  autoComplete="username"
                  required
                />

                <span className="field-hint">
                  This will be used to sign in to your account.
                </span>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>

                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>

                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  required
                />
              </div>

              <button type="submit" className="auth-submit" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <div className="auth-divider">
              <span>Already have an account?</span>
            </div>

            <Link to="/login" className="auth-register-link">
              Sign in to your account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
