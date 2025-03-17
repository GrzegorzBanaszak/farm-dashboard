import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { authThunk } from "@/features/auth/authThunk";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectionRouteProps {
  children: React.ReactNode;
  pathTo: string;
}

const ProtectionRoute: React.FC<ProtectionRouteProps> = ({
  children,
  pathTo,
}) => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const checkUser = async () => {
    await dispatch(authThunk.getUser());
    if (user) {
      nav(pathTo);
    }
  };

  useEffect(() => {
    if (user) {
      nav(pathTo);
      return;
    }
    checkUser();
  }, [user]);
  return <> {children}</>;
};

export default ProtectionRoute;
