import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/auth/login";
import { FaEnvelope, FaKey } from "react-icons/fa"; // Icons Import
import "./SignupForm.css"; // Same CSS file for consistency

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  // Message auto-hide logic (3 seconds)
  useEffect(() => {
    if (msg.text) {
      const timer = setTimeout(() => setMsg({ text: "", type: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call
      const data = await loginUser({ email, password });
      
      if (data && data.status !== "error") {
        setMsg({ text: "Login successful! Redirecting...", type: "success" });
        setEmail("");
        setPassword("");
        
        // Redirect based on role logic
        setTimeout(() => {
          if (data.user?.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/");
          }
        }, 1500);
      } else {
        setMsg({ text: data?.message || "Invalid Credentials", type: "error" });
      }
    } catch (err) {
      console.error("Login Error:", err);
      setMsg({ text: "Invalid Credentials", type: "error" });
    }
  };

  return (
    <div className="auth-page">
      {/* Notification Div */}
      {msg.text && (
        <div className={`message-box ${msg.type}`}>
          {msg.text}
        </div>
      )}

      <div className="auth-card">
        <div className="form-box active">
          <h2>Login</h2>
          <p></p>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <FaEnvelope className="input-icon-react" />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className="input-group">
              <FaKey className="input-icon-react" />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <button type="submit" className="auth-btn">Login</button>
          </form>

          <div className="toggle-text">
            Create new Account? <Link to="/signup"><span>Signup</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;