import { X } from "lucide-react";
import DashboradSidebarList from "./DashboradSidebarList";
type DashboardNavbarProps = {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
};

const DashboardSidebar: React.FC<DashboardNavbarProps> = ({
  toggleSidebar,
  sidebarOpen,
}) => {
  return (
    <>
      {/* Pasek boczny - mobilny */}
      <div
        className={`fixed inset-0 z-20 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full w-64 bg-white">
          <div className="flex justify-between items-center px-4 py-3 border-b border-[#E0E0E0]">
            <h2 className="text-lg font-bold">Menu</h2>
            <button onClick={toggleSidebar} className="p-2">
              <X size={20} />
            </button>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {/* Elementy menu */}
            <DashboradSidebarList />
          </nav>
        </div>
        <div
          className="flex-shrink-0 w-full h-full bg-black bg-opacity-50"
          onClick={toggleSidebar}
        ></div>
      </div>

      {/* Pasek boczny - desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 ">
          <div className="flex-1 flex flex-col overflow-y-auto bg-white">
            <div className="px-4 py-3 border-b border-[#E0E0E0]">
              <h2 className="text-lg font-bold">Menu</h2>
            </div>
            <nav className="flex-1 py-4 space-y-3 pr-2">
              {/* Elementy menu */}
              <DashboradSidebarList />
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
