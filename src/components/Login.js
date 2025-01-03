import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // For button state
  const [error, setError] = useState(""); // For displaying error messages

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Start the loading state

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false); // Stop the loading state

      if (response.ok) {
        localStorage.setItem("token", data.token); // Save token in localStorage
        alert("Login successful! Redirecting to dashboard...");
        window.location.href = "/"; // Redirect to home or dashboard
      } else {
        setError(data.error || "Invalid email or password.");
      }
    } catch (err) {
      setLoading(false);
      setError("Unable to connect to the server. Please try again later.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Login to Your Account</h3>

        {/* Error Message */}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Email Address Input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="rememberMe"
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember Me
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading} // Disable the button during loading
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        {/* Additional Links */}
        <div className="mt-3 text-center">
          <p className="mb-1">
            <a href="/forgot-password" className="text-decoration-none">
              Forgot Password?
            </a>
          </p>
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="text-decoration-none">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
