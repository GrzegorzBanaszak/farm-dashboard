import { Outlet } from "react-router-dom";
import HomeNavbar from "../components/HomeNavbar";

const HomeLayout = () => {
  return (
    <div className="min-h-screen h-1">
      <HomeNavbar />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
