import { Navigate } from "react-router-dom";
import type { UserRouteProps } from "../features/auth/type";
import { useAuth } from "../features/auth/hooks/useAuth";

const AdminProtectedRoute = ({ children }:UserRouteProps) => {
  const { userData } = useAuth();
  if (!userData) return <Navigate to="/" />;
  if (userData && userData?.role !== "admin") return <Navigate to="/notFound" />;
  return children;
};

export default AdminProtectedRoute;
