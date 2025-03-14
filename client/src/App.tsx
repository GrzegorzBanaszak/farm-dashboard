import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import Home from "./pages/HomePages/Home";
import AboutUs from "./pages/HomePages/AboutUs";
import Features from "./pages/HomePages/Features";
import Pricing from "./pages/HomePages/Pricing";
import Contact from "./pages/HomePages/Contact";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
