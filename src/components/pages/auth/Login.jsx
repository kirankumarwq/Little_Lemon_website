import React, { useState, useEffect } from "react";
import { supabase } from "../../../supabaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaGoogle } from "react-icons/fa";
import "./auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        showSuccessPopup();
      }
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
    } else {
      showSuccessPopup();
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  const showSuccessPopup = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      navigate("/profile");
    }, 3000);
  };

  return (
    <div className="auth-container">
      <h2>Welcome to Little Lemon Restaurant</h2>
      <h3 className="typing-text"></h3>
      <div className="auth-buttons">
        {!showLoginForm ? (
          <>
            <button className="google-btn" onClick={handleGoogleLogin}>
              <FaGoogle className="google-icon" /> Continue with Google
            </button>
            <button className="auth-btn" onClick={() => navigate("/signup")}>Sign Up</button>
            <button className="auth-btn" onClick={() => setShowLoginForm(true)}>Login</button>
          </>
        ) : (
          <>
            <form onSubmit={handleLogin} className="login-form">
              <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
              <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
              <button type="submit">Login</button>
              <button className="back-btn" onClick={() => setShowLoginForm(false)}>Back</button>
            </form>
          </>
        )}
      </div>
      {showPopup && (
        <div className="popup">
          <FaCheckCircle className="check-icon" />
          <p>Successfully Logged In!</p>
        </div>
      )}
    </div>
  );
};

export default Login;
