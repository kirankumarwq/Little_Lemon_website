import React,{useState} from "react";
import { useCart } from "../onlineOrder/CartContext"; // ✅ Import CartContext
import { menuData } from "./menuData";
import "./orderOnline.css"; // ✅ Import external CSS
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

   // ✅ Define navigate
const OrderOnline = () => {
  const { cartItems, setCartItems } = useCart(); // ✅ Use global cart state
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const navigate = useNavigate();

// ✅ Filtered menu items based on category & price
const filteredMenu = menuData
.filter((category) => selectedCategory === "All" || category.category === selectedCategory)
.map((category) => ({
  ...category,
  items: category.items.filter((item) => {
    if (priceRange === "Below $10") return item.price < 10;
    if (priceRange === "$10 - $20") return item.price >= 10 && item.price <= 20;
    if (priceRange === "Above $20") return item.price > 20;
    return true; // Default: Show all
  }),
}));
  // ✅ Add item to cart (updates global state)
  const addToCart = (item) => {
    const updatedCart = [...cartItems];
    const existingItem = updatedCart.find((cartItem) => cartItem.title === item.title);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...item, quantity: 1 });
    }

    setCartItems(updatedCart); // ✅ Updates global cart
  };

  // ✅ Remove item from cart (updates global state)
  const removeFromCart = (item) => {
    const updatedCart = [...cartItems];
    const existingItem = updatedCart.find((cartItem) => cartItem.title === item.title);

    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        const index = updatedCart.indexOf(existingItem);
        updatedCart.splice(index, 1);
      }
    }

    setCartItems(updatedCart); // ✅ Updates global cart
  };

  // ✅ Get total items in cart (real-time update)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="order-container">
      <h2>Order Online</h2>
      
        {/* 🛠 Filters */}
      <div className="filters">
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="All">All Categories</option>
          {menuData.map((category, idx) => (
            <option key={idx} value={category.category}>{category.category}</option>
          ))}
        </select>

        <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
          <option value="All">All Prices</option>
          <option value="Below $10">Below $10</option>
          <option value="$10 - $20">$10 - $20</option>
          <option value="Above $20">Above $20</option>
        </select>
      </div>

      {filteredMenu.map((category, index) => (
        <div key={index} className="menu-category">
          <h3>{category.category}</h3>
          <ul>
            {category.items.map((item, idx) => (
              <li key={idx} className="menu-item">
                <div className="menu-item-details">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                  <p className="menu-price">${item.price.toFixed(2)}</p>
                </div>
                
                {/* 🛒 Add/Remove Buttons */}
                <div>
                {cartItems.find((cartItem) => cartItem.title === item.title) ? (
                  <div className="quantity-controls">
                    <button className="quantity-btn" onClick={() => removeFromCart(item)}>-</button>
                    <span className="quantity-count">{cartItems.find((cartItem) => cartItem.title === item.title)?.quantity}</span>
                    <button className="quantity-btn" onClick={() => addToCart(item)}>+</button>
                  </div>
                ) : (
                  <button className="add-btn" onClick={() => addToCart(item)}>Add to Cart</button>
                )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* 🛒 Sticky Cart Summary */}
      {totalItems > 0 && (
        <div className="cart-summary">
            <div>
          <p>🛒 {totalItems} items in cart</p>
          </div>
          <div>
          <button className="checkout-btn" onClick={() => navigate("/checkout")}> Checkout </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderOnline;
