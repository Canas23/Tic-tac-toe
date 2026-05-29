import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const AuthHeader = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (!user) {
    return null;
  }

  return (
    <header className="auth-header">
      <span>{user.name}</span>
      <button className="button button--secondary" onClick={handleLogout} type="button">
        Cerrar sesion
      </button>
    </header>
  );
};
