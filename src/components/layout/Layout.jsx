import Header from "./Header";
import Footer from "./Footer";
import { supabase } from "../../supabaseConfig";
import { useState, useEffect } from "react";
import BottomNav from "./BottomNav";


const Layout = ({ children }) => {
  const [user, setUser] = useState(null);

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

  // ✅ Use user profile pic if available, otherwise generate a random UI avatar
  const profilePic = user?.user_metadata?.avatar_url || `https://api.dicebear.com/9.x/rings/svg?seed=${user?.id }`;

  const navLinks = [
    { name: "Home", path: "/#home", hashLink: true },
    { name: "About", path: "/#about", hashLink: true },
    { name: "Menu", path: "/menu", hashLink: true },
    { name: "Reservations", path: "/reservations", hashLink: false },
    { name: "Order Online", path: "/orderOnline", hashLink: false },
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
    icon: profilePic,  // ✅ Always provides a valid avatar
  };

  return (
    <>
      <Header navLinks={navLinks} mobileNavLink={mobileNavLink} />
      <main id="home">{children}</main>
      <Footer navLinks={navLinks} />
      <BottomNav/>
    </>
  );
};

export default Layout;
