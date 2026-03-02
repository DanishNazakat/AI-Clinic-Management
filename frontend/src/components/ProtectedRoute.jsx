import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};
<button
  onClick={() => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  }}
>
  Logout
</button>
export default ProtectedRoute;