import { LayoutDashboardIcon } from "lucide-react";
import DashboardSidebarListElement, {
  DashboardSidebarListElementProps,
} from "./DashboardSidebarListElement";
import UprawyIcon from "../icons/UprawyIcon";
import PoleIcon from "../icons/PoleIcon";
import MaszynyIcon from "../icons/MaszynyIcon";
import MagazynIcon from "../icons/MagazynIcon";
import ZwierzetaIcon from "../icons/ZwierzetaIcon";
import LogoutSidebar from "./LogoutSidebar";

const listElements: Array<DashboardSidebarListElementProps> = [
  {
    title: "Szczegóły",
    icon: <LayoutDashboardIcon />,
    path: "/dashboard/szczegoly",
  },
  {
    title: "Uprawy",
    icon: <UprawyIcon />,
    path: "/dashboard/uprawy",
  },
  {
    title: "Pola",
    icon: <PoleIcon />,
    path: "/dashboard/pola",
  },
  {
    title: "Maszyny",
    icon: <MaszynyIcon />,
    path: "/dashboard/maszyny",
  },
  {
    title: "Magazyny",
    icon: <MagazynIcon />,
    path: "/dashboard/magazyny",
  },
  {
    title: "Zwierzęta",
    icon: <ZwierzetaIcon />,
    path: "/dashboard/zwierzeta",
  },
];

const DashboradSidebarList = () => {
  return (
    <>
      {listElements.map((element, index) => (
        <DashboardSidebarListElement
          key={index}
          title={element.title}
          icon={element.icon}
          path={element.path}
        />
      ))}
      <LogoutSidebar />
    </>
  );
};

export default DashboradSidebarList;
