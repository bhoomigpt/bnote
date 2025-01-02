import React from 'react';

const Login = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Login to Your Account</h3>
        <form>
          {/* Email Address Input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
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
          >
            Login
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
