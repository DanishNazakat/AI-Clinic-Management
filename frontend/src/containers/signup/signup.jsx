import React, { useState, useEffect } from "react";
import { Signup } from "../../services/auth/auth";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaKey } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./SignupForm.css";

const SignupForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Message handle karne ke liye state
  const [msg, setMsg] = useState({ text: "", type: "" });
  
  const navigate = useNavigate();

  // Message ko 3 second baad hatane ke liye
  useEffect(() => {
    if (msg.text) {
      const timer = setTimeout(() => setMsg({ text: "", type: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const data = await Signup(fname, email, password);
      
      if (data.status === 200) {
        setMsg({ text: "Signup Successful! Redirecting...", type: "success" });
        setTimeout(() => navigate('/'), 2000);
      } else {
        setMsg({ text: data.message || "Signup Failed!", type: "error" });
      }
    } catch (err) {
      setMsg({ text: "Server error! Please try again.", type: "error" });
    }
  };

  return (
    <div className="auth-page">
      {/* Alert Div replacement */}
      {msg.text && (
        <div className={`message-box ${msg.type}`}>
          {msg.text}
        </div>
      )}

      <div className="auth-card">
        {/* SIGNUP SECTION */}
        <div className={`form-box ${!isLogin ? 'active' : ''}`}>
          <h2>Sign Up</h2>
          <p>Create new Account</p>
          <form onSubmit={handleSignup}>
            <div className="input-group">
              <FaUser className="input-icon-react" />
              <input 
                type="text" 
                placeholder="Full Name" 
                value={fname} 
                onChange={(e) => setFname(e.target.value)} 
                required 
              />
            </div>
            <div className="input-group">
              <FaEnvelope className="input-icon-react" />
              <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="input-group">
              <FaLock className="input-icon-react" />
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="auth-btn">Register Now</button>
          </form>
          <div className="toggle-text">
            Already have an account? <Link to="/login"><span>Login</span></Link>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default SignupForm;