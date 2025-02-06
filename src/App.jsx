import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/pages/Home/Home";
import Menu from "./components/pages/Menu/menu";
import Reservations from "./components/pages/Reservations/Reservations";
import ConfirmedReservation from "./components/pages/Reservations/confirmedReservation"; // This component
import NotFound from "./components/pages/NotFound/NotFound";

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route
            path="/confirmedReservation"
            element={<ConfirmedReservation />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
