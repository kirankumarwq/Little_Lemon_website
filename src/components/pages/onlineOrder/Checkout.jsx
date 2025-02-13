import React, { useState } from "react";
import { useCart } from "../onlineOrder/CartContext"; // ✅ Import Cart Context
import { useNavigate } from "react-router-dom";
import "./checkout.css"; // ✅ Import external CSS

const Checkout = () => {
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("COD"); // Default to COD

  // ✅ Update item quantity
  const updateQuantity = (item, amount) => {
    const updatedCart = cartItems.map((cartItem) =>
      cartItem.title === item.title
        ? { ...cartItem, quantity: Math.max(1, cartItem.quantity + amount) }
        : cartItem
    );
    setCartItems(updatedCart);
  };

  // ✅ Remove item from cart
  const removeItem = (item) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.title !== item.title);
    setCartItems(updatedCart);
  };

  // ✅ Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + tax;

  // ✅ Handle Payment Process
  const handlePayment = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    navigate("/OrderConfirmation", {
      state: { cartItems, total, paymentMethod }, // ✅ Pass cart items, total & payment method
    });

    if (paymentMethod === "Online") {
      // Simulate Online Payment
      setTimeout(() => {
        alert("Payment Successful! Redirecting...");
        finalizeOrder();
      }, 2000);
    } else {
      // COD - Directly finalize order
      finalizeOrder();
    }
  };

  // ✅ Finalize Order (Clear Cart & Redirect)
  const finalizeOrder = () => {
    setCartItems([]); // Clear cart after order
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {/* 🛒 Show Cart Items */}
      {cartItems.length > 0 ? (
        <div className="checkout-items">
          {cartItems.map((item, index) => (
            <div key={index} className="checkout-item">
              <div className="item-details">
                <h4>{item.title}</h4>
                <p>${item.price.toFixed(2)} x {item.quantity}</p>
              </div>

              {/* Quantity Controls */}
              <div className="item-controls">
                <button onClick={() => updateQuantity(item, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item, 1)}>+</button>
              </div>

              {/* Remove Button */}
              <button className="remove-btn" onClick={() => removeItem(item)}>Remove</button>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}

      {/* 🛒 Order Summary */}
      {cartItems.length > 0 && (
        <div className="order-summary">
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>Tax (10%): ${tax.toFixed(2)}</p>
          <h3>Total: ${total.toFixed(2)}</h3>

          {/* Payment Selection */}
          <div className="payment-options">
            <h3>Select Payment Method:</h3>
            <label>
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />
              Cash on Delivery (COD)
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="Online"
                checked={paymentMethod === "Online"}
                onChange={() => setPaymentMethod("Online")}
              />
              Online Payment
            </label>
          </div>

          {/* Payment Button */}
          <button className="payment-btn" onClick={handlePayment}>
            {paymentMethod === "Online" ? "Proceed to Payment" : "Place Order"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
