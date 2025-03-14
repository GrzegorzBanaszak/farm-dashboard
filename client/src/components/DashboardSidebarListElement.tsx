import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
export type DashboardSidebarListElementProps = {
  title: string;
  icon: React.ReactNode;
  path: string;
};

const DashboardSidebarListElement: React.FC<
  DashboardSidebarListElementProps
> = ({ title, icon, path }) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(path === location.pathname);

  useEffect(() => {
    if (location.pathname.startsWith(path)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [location.pathname]);
  return (
    <div className="flex group">
      <div
        className={`${
          isActive
            ? "bg-primary-blue group-hover:bg-primary-blue/80"
            : "bg-white group-hover:bg-gray-100"
        } w-1 h-auto rounded-r-md mr-2  block `}
      ></div>
      <Link
        to={path}
        className={`${
          isActive
            ? "bg-primary-blue text-white group-hover:bg-primary-blue/80"
            : "bg-white text-primary-text group-hover:bg-gray-100"
        } flex-1 flex items-center px-4 py-4 rounded-md  `}
      >
        <div className="flex items-center gap-2">
          {icon} {title}
        </div>
      </Link>
    </div>
  );
};

export default DashboardSidebarListElement;
