import { useAppDispatch } from "@/app/hooks";
import { authThunk } from "@/features/auth/authThunk";
import { LogInIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LogoutSidebar = () => {
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const logoutHandler = async () => {
    await dispatch(authThunk.logout());
    nav("/login");
  };
  return (
    <div className="flex group cursor-pointer" onClick={logoutHandler}>
      <div
        className={
          "bg-white group-hover:bg-gray-100 w-1 h-auto rounded-r-md mr-2  block "
        }
      ></div>
      <div
        className={
          "bg-white text-primary-text group-hover:bg-gray-100 flex-1 flex items-center px-4 py-4 rounded-md"
        }
      >
        <div className="flex items-center gap-2 ">
          <LogInIcon />
          Wyloguj
        </div>
      </div>
    </div>
  );
};

export default LogoutSidebar;
