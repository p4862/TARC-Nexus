import { Navigate, Outlet } from "react-router-dom";

import { RouteLoadingState } from "@/features/auth/components/RouteLoadingState";
import { useAuth } from "@/features/auth/contexts/AuthContext";

export function RequireGuest() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <RouteLoadingState />;
  }

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
}
