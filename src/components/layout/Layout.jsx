import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import BottomNav from "./BottomNav";
import { useCart } from "../../components/pages/onlineOrder/CartContext";
import { supabase } from "../../supabaseConfig";

const Layout = ({ children }) => {
  const [user, setUser] = useState(null);
  const { totalItems = 0 } = useCart(); // ✅ Provide a default value

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log("Updated Cart Count:", totalItems); // ✅ Check updates
  }, [totalItems]);

  const profilePic = user?.user_metadata?.avatar_url || 
    `https://api.dicebear.com/9.x/rings/svg?seed=${user?.id}`;

  const navLinks = [
    { name: "Home", path: "/#home", hashLink: true },
    { name: "About", path: "/#about", hashLink: true },
    { name: "Menu", path: "/menu", hashLink: true },
    { name: "Reservations", path: "/reservations", hashLink: false },
    { 
      name: `Order Online ${totalItems > 0 ? `(${totalItems})` : ""}`, // ✅ Show cart count dynamically
      path: "/orderOnline", 
      hashLink: true 
    },
  ];

  if (user) {
    navLinks.push({ name: "Profile", path: "/profile", hashLink: false, icon: profilePic });
  } else {
    navLinks.push({ name: "Login", path: "/login", hashLink: false });
  }

  const mobileNavLink = { 
    name: user ? "" : " LOGIN", 
    path: user ? "/profile" : "/login", 
    hashLink: false, 
    icon: profilePic, 
  };

  return (
    <>
      <Header navLinks={navLinks} mobileNavLink={mobileNavLink} />
      <main id="home">{children}</main>
      <Footer navLinks={navLinks} />
      <BottomNav />
    </>
  );
};

export default Layout;
