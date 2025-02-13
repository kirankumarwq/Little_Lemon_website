import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./confirmation.css"; // Ensure styles are applied

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, total } = location.state || { cartItems: [], total: 0 }; // ✅ Get passed data

  return (
    <div className="confirmation-container">
      <h2>Order Confirmed! 🎉</h2>
      <p>Thank you for your order. Here are the details:</p>

      {/* ✅ Show Ordered Items */}
      <div className="order-items">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className="order-item">
              <h4>{item.title}</h4>
              <p>
                {item.quantity} x ${item.price.toFixed(2)}
              </p>
            </div>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>

      {/* ✅ Show Total Price */}
      <h3>Total: ${total.toFixed(2)}</h3>

      {/* ✅ Go Back to Order Page */}
      <button className="back-btn" onClick={() => navigate("/order-online")}>
        Back to Menu
      </button>
    </div>
  );
};

export default OrderConfirmation;
