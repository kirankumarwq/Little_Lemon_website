import React, { useState, useEffect } from "react";
import { supabase } from "../../../supabaseConfig";
import { useNavigate } from "react-router-dom";
import "./auth.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const { data: user, error } = await supabase.auth.getUser();
      if (error) setMessage(error.message);
      else {
        setUser(user);
        setName(user?.user_metadata?.full_name || "");
        setEmail(user?.email || "");
      }
    };
    fetchUser();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({
      data: { full_name: name },
      email,
    });
    if (error) setMessage(error.message);
    else setMessage("Profile updated!");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <h2>Update Profile</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleUpdateProfile}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} disabled />
        <button type="submit">Update Profile</button>
      </form>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
