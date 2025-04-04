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
import MagazynPage from "./pages/DashboardPages/MagazynPages";
import Login from "./pages/Login/Login";
import ProtectionRoute from "./components/ProtectionRoute";
import RegisterPage from "./pages/Register/RegisterPage";
import PolaDetailPage from "./pages/DashboardPages/PolaPages/PolaDetailPage";
import PoleEditPage from "./pages/DashboardPages/PolaPages/PoleEditPage";
import PoleAddPage from "./pages/DashboardPages/PolaPages/PoleAddPage";
import ZwierzetaDetailPage from "./pages/DashboardPages/ZwierzetaPages/ZwierzetaDetailPage";
import ZwierzetaAddPage from "./pages/DashboardPages/ZwierzetaPages/ZwierzetaAddPage";
import ZwierzetaEditPage from "./pages/DashboardPages/ZwierzetaPages/ZwierzetaEditPage";
import MaszynyAddPage from "./pages/DashboardPages/MaszynyPages/MaszynyAddPage";
import MaszynyEditPage from "./pages/DashboardPages/MaszynyPages/MaszynyEditPage";
import MaszynyDetailPage from "./pages/DashboardPages/MaszynyPages/MaszynyDetailPage";
import UprawaDetailPage from "./pages/DashboardPages/UprawyPages/UprawaDetailPage";
import UprawaAddPage from "./pages/DashboardPages/UprawyPages/UprawaAddPage";
import UprawaEditPage from "./pages/DashboardPages/UprawyPages/UprawaEditPage";

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
        <Route
          path="/dashboard"
          element={
            <ProtectionRoute>
              <DashboardLayout />
            </ProtectionRoute>
          }
        >
          <Route path="/dashboard/szczegoly" element={<DashboardDetails />} />
          <Route path="/dashboard/uprawy">
            <Route index element={<UprawyPages />} />
            <Route path=":itemId" element={<UprawaDetailPage />} />
            <Route path="add" element={<UprawaAddPage />} />
            <Route path=":itemId/edit" element={<UprawaEditPage />} />
          </Route>
          <Route path="/dashboard/pola">
            <Route index element={<PolaPages />} />
            <Route path="add" element={<PoleAddPage />} />
            <Route path=":itemId" element={<PolaDetailPage />} />
            <Route path=":itemId/edit" element={<PoleEditPage />} />
          </Route>
          <Route path="/dashboard/maszyny">
            <Route index element={<MaszynyPages />} />
            <Route path="add" element={<MaszynyAddPage />} />
            <Route path=":itemId" element={<MaszynyDetailPage />} />
            <Route path=":itemId/edit" element={<MaszynyEditPage />} />
          </Route>
          <Route path="/dashboard/magazyny" element={<MagazynPage />} />
          <Route path="/dashboard/zwierzeta">
            <Route index element={<ZwierzetaPages />} />
            <Route path=":itemId" element={<ZwierzetaDetailPage />} />
            <Route path="add" element={<ZwierzetaAddPage />} />
            <Route path=":itemId/edit" element={<ZwierzetaEditPage />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
