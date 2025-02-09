import React, { useState } from "react";
import { supabase } from "../../../supabaseConfig";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); //  Use navigate for redirection

  const handleSignup = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
    if (error) {
        setMessage(error.message);
      } else {
        setMessage("Account created successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000); // ✅ Redirect after 3 seconds
      }
    };

  return (
    <div className="auth-container">
      <h2>Create an Account</h2>
      
      <form onSubmit={handleSignup} className="signup-form">
        <input type="text" placeholder="Full Name" onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        {message && <p className="message">{message}</p>}
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Signup;
