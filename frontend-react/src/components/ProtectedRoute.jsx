
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          setStatus("ok");
        } else {
          setStatus("denied");
        }
      } catch (error) {
        setStatus("denied");
      }
    }

    checkAuth();
  }, []);

  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  if (status === "denied") {
    return <Navigate to="/taller/login" replace />;
  }

  return children;
}