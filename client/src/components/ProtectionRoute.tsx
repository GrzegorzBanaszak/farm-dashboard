import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { authThunk } from "@/features/auth/authThunk";
import LoadingState from "@/types/LoadingState";

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
  const { getUserState, loginState } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authThunk.getUser());
  }, []);

  useEffect(() => {
    if (getUserState.loading === LoadingState.SUCCEEDED) {
      nav(pathTo);
    }
  }, [getUserState.loading]);

  useEffect(() => {
    if (loginState.loading === LoadingState.SUCCEEDED) {
      nav(pathTo);
    }
  }, [loginState.loading]);

  return <> {children}</>;
};

export default ProtectionRoute;
