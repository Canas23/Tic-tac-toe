import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";
import { useAuth } from "../hooks/useAuth";

interface LocationState {
  from?: {
    pathname?: string;
  };
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, login, user } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const state = location.state as LocationState | null;
  const destination = state?.from?.pathname ?? "/";

  const handleSubmit = async ({
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    setErrorMessage("");

    try {
      await login(email, password);
      navigate(destination, { replace: true });
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "No se pudo iniciar sesion. Intentalo nuevamente."
      );
    }
  };

  if (user) {
    return <Navigate replace to="/" />;
  }

  return (
    <main className="page-shell">
      <section className="panel auth-panel">
        <p className="eyebrow">Acceso</p>
        <h1>Iniciar sesion</h1>
        <p className="lead">
          Entra con tu cuenta para jugar y mantener tu progreso listo para la
          integracion con Firebase.
        </p>

        <AuthForm
          errorMessage={errorMessage}
          isLoading={isLoading}
          mode="login"
          onSubmit={handleSubmit}
        />

        <p className="auth-switch">
          No tienes cuenta? <Link to="/register">Crear cuenta</Link>
        </p>
      </section>
    </main>
  );
};
