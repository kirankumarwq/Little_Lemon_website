import { useEffect, useState } from "react";
import { supabase } from "./supabaseConfig";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/pages/Home/Home";
import Menu from "./components/pages/Menu/menu";
import Reservations from "./components/pages/Reservations/Reservations";
import ConfirmedReservation from "./components/pages/Reservations/confirmedReservation"; // This component
import NotFound from "./components/pages/NotFound/NotFound";
import Login from "./components/pages/auth/Login";
import Signup from "./components/pages/auth/Signup";
import Profile from "./components/pages/auth/Profile";
import OrderOnline from "./components/pages/onlineOrder/OrderOnline";
import Checkout from "./components/pages/onlineOrder/Checkout";
import { CartProvider } from "./components/pages/onlineOrder/CartContext";
import OrderConfirmation from "./components/pages/onlineOrder/OrderConfirmation";
const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (!error) setUser(data);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <CartProvider>
    <>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orderOnline" element={<OrderOnline />} />
          <Route path="/orderConfirmation" element={<OrderConfirmation />} />
          <Route
            path="/confirmedReservation"
            element={<ConfirmedReservation />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
    </CartProvider>
  );
};
export default App;