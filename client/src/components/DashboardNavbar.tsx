import { useAppSelector } from "@/app/hooks";
import { Menu, User } from "lucide-react";

type DashboardNavbarProps = {
  toggleSidebar: () => void;
};

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ toggleSidebar }) => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center">
          <button
            className="mr-2 p-2 rounded-md lg:hidden"
            onClick={toggleSidebar}
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center">
            <h1 className="text-lg font-bold">
              <span className="text-blue-800">Farm </span> Dashboard
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div>{user?.email}</div>
          <div className="relative">
            <button className="cursor-pointer flex items-center p-2 rounded-full bg-gray-200">
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
