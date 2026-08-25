import { Navigate, Outlet } from "react-router-dom";

import { RouteLoadingState } from "@/features/auth/components/RouteLoadingState";
import { useAuth } from "@/features/auth/contexts/AuthContext";

export function RequireRole({ roles }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <RouteLoadingState />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
}
