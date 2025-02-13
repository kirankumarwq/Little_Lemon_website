import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./confirmation.css";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [], total = 0, paymentMethod = "Not selected" } = location.state || {};

  return (
    <div className="confirmation-container">
      <h2>🎉 Order Confirmed! 🎉</h2>
      <p>Thank you for your order.</p>

      {/* ✅ Show Ordered Items */}
      <div className="order-items">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className="order-item">
              <h4>{item.title}</h4>
              <p>{item.quantity} x ${item.price.toFixed(2)}</p>
            </div>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>

      {/* ✅ Show Total Price & Payment Method */}
      <h3>Total: ${total.toFixed(2)}</h3>
      <p><strong>Payment Method:</strong> {paymentMethod}</p>
        <p><strong>Estimated Delivery:</strong> 30-40 minutes</p>
      {/* ✅ Button to Return to Order Page */}
      <button className="back-btn" onClick={() => navigate("/orderOnline")}>
        Back to Menu
      </button>
    </div>
  );
};

export default OrderConfirmation;
