import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import Home from "./pages/HomePages/Home";
import AboutUs from "./pages/HomePages/AboutUs";
import Features from "./pages/HomePages/Features";
import Pricing from "./pages/HomePages/Pricing";
import Contact from "./pages/HomePages/Contact";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardDetails from "./pages/DashboardPages/DashboardDetails";
import UprawyPages from "./pages/DashboardPages/UprawyPages";
import PolaPages from "./pages/DashboardPages/PolaPages";
import MaszynyPages from "./pages/DashboardPages/MaszynyPages";
import ZwierzetaPages from "./pages/DashboardPages/ZwierzetaPages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="/dashboard/szczegoly" element={<DashboardDetails />} />
          <Route path="/dashboard/uprawy" element={<UprawyPages />} />
          <Route path="/dashboard/pola" element={<PolaPages />} />
          <Route path="/dashboard/maszyny" element={<MaszynyPages />} />
          <Route path="/dashboard/magazyny" element={<MaszynyPages />} />
          <Route path="/dashboard/zwierzeta" element={<ZwierzetaPages />} />
        </Route>
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
