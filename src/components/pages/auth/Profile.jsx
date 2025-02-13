import React, { useState, useEffect } from "react";
import { supabase } from "../../../supabaseConfig";
import { useNavigate } from "react-router-dom";
import { fetchUserData, updateProfileData, logoutUser } from "../../../utils/keeps";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [bookings, setBookings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [profilePic, setProfilePic] = useState("");
  const [activeTab, setActiveTab] = useState("main");

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await fetchUserData();
      if (userData) {
        setUser(userData);
        setName(userData.full_name || "Guest");
        setEmail(userData.email);
        setDob(userData.dob || "");
        setGender(userData.gender || "");
        setMobile(userData.mobile || "");
        setProfilePic(
          userData.avatar_url ||
          `https://api.dicebear.com/7.x/identicon/svg?seed=${userData.id || "default"}`
        );
      } else {
        navigate("/login");
      }
    };

    const fetchBookings = async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user?.id);
      if (!error) setBookings(data || []);
    };

    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user?.id)
        .order("order_date", { ascending: false })
        .limit(5);
      if (!error) setOrders(data || []);
    };

    fetchUser();
    fetchBookings();
    fetchOrders();
  }, [navigate, user?.id]);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  const handleProfileUpdate = async () => {
    const updatedData = { full_name: name, dob, gender, mobile };
    await updateProfileData(updatedData);
    toast.success("Profile updated successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  const upcomingBookings = bookings.filter((b) => new Date(b.date) >= new Date());
  const pastBookings = bookings.filter((b) => new Date(b.date) < new Date());

  return (
    <div className="profile-container">
      <ToastContainer />
      <div className="profile-header">
        <img src={profilePic} alt="Profile" className="profile-pic" />
        <h2>{name}</h2>
        <p>{email}</p>
      </div>

      <div className="profile-tabs">
        <button className={activeTab === "main" ? "active" : ""} onClick={() => setActiveTab("main")}>Main</button>
        <button className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>Profile</button>
        <button className={activeTab === "activities" ? "active" : ""} onClick={() => setActiveTab("activities")}>Activities</button>
        <button className={activeTab === "recent" ? "active" : ""} onClick={() => setActiveTab("recent")}>Recent</button>
      </div>

      {activeTab === "main" && (
        <div className="profile-section active">
          <h3>Upcoming Table Reservations</h3>
          {upcomingBookings.length > 0 ? (
            upcomingBookings.map((booking, index) => (
              <p key={index}>Table for {booking.guests} on {booking.date} at {booking.time}</p>
            ))
          ) : (
            <p>No upcoming reservations.</p>
          )}
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      )}

      {activeTab === "profile" && (
        <div className="profile-section active">
          <h3>Edit Profile</h3>
          <div className="input-grid">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} placeholder="Date of Birth" />
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile Number" />
          </div>
          <button className="edit-btn" onClick={handleProfileUpdate}>Save Changes</button>
        </div>
      )}

      {activeTab === "activities" && (
        <div className="profile-section active">
          <h3>Table Reservations (Past & Upcoming)</h3>
          <h4>Upcoming</h4>
          {upcomingBookings.length > 0 ? (
            upcomingBookings.map((booking, index) => (
              <p key={index}>Table for {booking.guests} on {booking.date} at {booking.time}</p>
            ))
          ) : (
            <p>No upcoming reservations.</p>
          )}
          <h4>Past</h4>
          {pastBookings.length > 0 ? (
            pastBookings.map((booking, index) => (
              <p key={index}>Table for {booking.guests} on {booking.date} at {booking.time}</p>
            ))
          ) : (
            <p>No past reservations.</p>
          )}
        </div>
      )}

      {activeTab === "recent" && (
        <div className="profile-section active">
          <h3>Recent Online Orders</h3>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <p key={index}>{order.item} - {order.quantity}</p>
            ))
          ) : (
            <p>No recent orders.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
