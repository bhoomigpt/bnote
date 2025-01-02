import React from "react";

const About = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: "600px",
          textAlign: "center",
          borderRadius: "12px",
        }}
      >
        <h1 className="mb-4" style={{ color: "#007BFF" }}>
          About Us
        </h1>
        <p style={{ fontSize: "1.2rem", lineHeight: "1.8" }}>
          Welcome to <strong>Bnotebook</strong>, your one-stop solution for organizing your ideas and tasks. Our platform is designed to help you take notes, stay organized, and boost your productivity.
        </p>
        <p style={{ fontSize: "1.1rem", color: "#6c757d" }}>
          Whether you're managing your personal tasks or planning a team project, <strong>Bnotebook</strong> is here to make your life easier and more efficient.
        </p>
        <div className="mt-4">
          <a
            href="#"
            className="btn btn-primary mx-2"
            style={{
              borderRadius: "8px",
              boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            Learn More
          </a>
          <a
            href="#"
            className="btn btn-outline-secondary mx-2"
            style={{
              borderRadius: "8px",
              boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
