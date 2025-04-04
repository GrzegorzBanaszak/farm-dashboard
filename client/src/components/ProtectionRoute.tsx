import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { authThunk } from "@/features/auth/authThunk";
import LoadingState from "@/types/LoadingState";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
interface ProtectionRouteProps {
  children: React.ReactNode;
}

const ProtectionRoute: React.FC<ProtectionRouteProps> = ({ children }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { globalState, isAuthenticated } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (globalState.loading === LoadingState.IDLE) {
      dispatch(authThunk.getUser());
    }
  }, [globalState.loading]);

  if (globalState.loading === LoadingState.PENDING) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <> {children}</>;
};

export default ProtectionRoute;
