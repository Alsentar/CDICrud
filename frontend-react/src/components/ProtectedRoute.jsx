
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("employeeAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/taller/login" replace />;
  }

  return children;
}