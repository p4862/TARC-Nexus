import { Navigate, Outlet, useLocation } from "react-router-dom";

import { RouteLoadingState } from "@/features/auth/components/RouteLoadingState";
import { useAuth } from "@/features/auth/contexts/AuthContext";

export function RequireAuth() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <RouteLoadingState />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
