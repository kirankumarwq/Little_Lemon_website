import React, { useState, useEffect } from "react";
import { supabase } from "../../../supabaseConfig";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (user?.user) {
        setUser(user.user);
        setName(user.user.user_metadata.full_name || "Guest");
        setEmail(user.user.email);

        // ✅ Use the same profile picture as navbar
        setProfilePic(
          user.user.user_metadata.avatar_url ||
          `https://api.dicebear.com/7.x/identicon/svg?seed=${user.user.id || "default"}`
        );
      } else {
        navigate("/login"); // Redirect if not logged in
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={profilePic} alt="Profile" className="profile-pic" />
        <h2>{name}</h2>
        <p>{email}</p>
      </div>

      <div className="profile-section">
        <h3>Table Bookings</h3>
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <p key={index}>Table for {booking.guests} on {booking.date} at {booking.time}</p>
          ))
        ) : (
          <p>No bookings yet.</p>
        )}
      </div>

      <div className="profile-section">
        <h3>Online Orders</h3>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <p key={index}>{order.item} - {order.quantity}</p>
          ))
        ) : (
          <p>No orders yet.</p>
        )}
      </div>

      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
