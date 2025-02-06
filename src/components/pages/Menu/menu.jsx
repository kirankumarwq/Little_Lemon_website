import React from "react";
import "./menu.css";

// Menu Data with realistic prices in USD ($)
const menuData = [
  {
    category: "APPETIZERS",
    items: [
      { title: "ROMAINE SALAD", price: 9.99, desc: "Romaine, scallions, dill, red-wine vinaigrette" },
      { title: "BEET SALAD", price: 10.99, desc: "Beets, arugula, walnuts, manouri, red-wine-vinaigrette" },
      { title: "VILLAGE SALAD", price: 12.99, desc: "Tomato, red onion, green pepper, cucumber, kalamata olives, feta, olive oil" },
      { title: "OCTOPUS", price: 18.99, desc: "Octopus, red wine, onions, bell peppers, capers, fava puree" },
      { title: "CALAMARI", price: 16.99, desc: "Calamari, arugula, lemon, olive oil" },
      { title: "SALMON TARTARE", price: 19.99, desc: "Salmon, shredded phyllo, horseradish, lemon, shallots, chives, yogurt, dill" },
    ],
  },
  {
    category: "KEBABS",
    items: [
      { title: "GRILLED SWORDFISH", price: 24.99, desc: "Grilled swordfish, pita, mixed lettuce, parsley, spiced yogurt, sumac, onions, zhoug" },
      { title: "GRILLED SHRIMP", price: 20.99, desc: "Grilled shrimp, garlic, pita, parsley, spiced yogurt, sumac, onions" },
      { title: "NIMAN RANCH SIRLOIN STEAK", price: 27.99, desc: "Sirloin steak, jalapeno, pita, red peppers, spiced yogurt, sumac, onions" },
      { title: "GRILLED LAMB", price: 22.99, desc: "Grilled lamb, garlic, jalapeno, pita, parsley, spiced yogurt, sumac, onions" },
    ],
  },
  {
    category: "VEGETARIAN TAPAS",
    items: [
      { title: "SAUTEED HALLOUMI CHEESE", price: 14.99, desc: "Chilis, tomato, coriander, over white polenta" },
      { title: "ROASTED CAULIFLOWER", price: 12.99, desc: "Maghreb spices, lemon tahini" },
      { title: "FRIED ARTICHOKE", price: 15.99, desc: "Shaved manchego, herb mayo, marinara sauce" },
      { title: "RICOTTA GNOCCHI", price: 16.99, desc: "Truffle cream sauce" },
    ],
  },
  {
    category: "ENTREES",
    items: [
      { title: "SEAFOOD GRILL", price: 32.99, desc: "Salmon kebab, sea scallops, mini spicy tuna burger, shrimp, hummus, basmati rice, green charmoula" },
      { title: "MEME COUSCOUS", price: 29.99, desc: "Lamb, merguez, chicken, vegetables, chickpeas, cooked in bouillon over couscous with harissa" },
      { title: "MUSHROOM RAVIOLI", price: 22.99, desc: "Portobello mushroom, walnuts, parmesan, truffle oil" },
      { title: "SEAFOOD LINGUINE", price: 24.99, desc: "Scallops, shrimp, mussels, fresh tomato, garlic, basil, jalapeno" },
      { title: "FISH EN PAPILLOTE", price: 36.99, desc: "Chef’s fish selection, seasonal vegetables, garlic-potato dip, lemon, olive oil" },
    ],
  },
];

// Reusable Menu Section Component
const MenuSection = ({ category, items }) => (
  <article>
    <h2 className="article-title">{category}</h2>
    {items.map((item, index) => (
      <div className="menu-entry" key={index}>
        <h3>
          <span className="title">{item.title}</span>
          <span className="price">${item.price.toFixed(2)}</span>
        </h3>
        <p>{item.desc}</p>
      </div>
    ))}
  </article>
);

// Main Menu Component
const Menu = () => {
  return (
    <section id="menu">
      <h2 id="menu-title">
        <b>
          COMPLETE MENU
        </b>
      </h2>

      <section id="menu-sections">
        {menuData.map((section, index) => (
          <MenuSection key={index} category={section.category} items={section.items} />
        ))}
      </section>
    </section>
  );
};

export default Menu;
