import { useEffect, useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import DashboardSidebar from "../components/DashboardSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { authThunk } from "@/features/auth/authThunk";
import LoadingState from "@/types/LoadingState";

const DashboardLayout = () => {
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const { getUserState } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const checkUser = async () => {
    if (!user) {
      await dispatch(authThunk.getUser());
      if (getUserState.loading === LoadingState.FAILED) {
        nav("/login");
      }
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div className="font-nunito flex flex-col h-screen bg-gray-100 ">
      {/* Górny pasek */}
      <DashboardNavbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar
          toggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />

        {/* Główna zawartość */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
