import { Outlet, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const ProtectedRoute = () => {
  const [cookies] = useCookies(["token"]);

  return cookies.token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
