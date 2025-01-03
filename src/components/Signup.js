import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // For button state
  const [error, setError] = useState(""); // For displaying error messages
  const [success, setSuccess] = useState(false); // For displaying success messages

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setSuccess(false); // Clear previous success messages
    setLoading(true); // Start the loading state

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false); // Stop the loading state

      if (response.ok) {
        setSuccess(true);
        alert("Signup successful! Redirecting to login...");
        window.location.href = "/login"; // Redirect to login page
      } else {
        setError(data.error || "Something went wrong! Please try again.");
      }
    } catch (err) {
      setLoading(false);
      setError("Unable to connect to the server. Please try again later.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Create Your Account</h3>

        {/* Error Message */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Success Message */}
        {success && (
          <div className="alert alert-success">
            Account created successfully! Redirecting to login...
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Full Name Input */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading} // Disable the button during loading
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Additional Links */}
        <div className="mt-3 text-center">
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-decoration-none">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
