import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";
import { useAuth } from "../hooks/useAuth";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { isLoading, register, user } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    setErrorMessage("");

    try {
      await register(name, email, password);
      navigate("/", { replace: true });
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "No se pudo crear la cuenta. Intentalo nuevamente."
      );
    }
  };

  if (user) {
    return <Navigate replace to="/" />;
  }

  return (
    <main className="page-shell">
      <section className="panel auth-panel">
        <p className="eyebrow">Registro</p>
        <h1>Crear cuenta</h1>
        <p className="lead">
          Registra un usuario local para probar el flujo antes de conectar
          Firebase Authentication.
        </p>

        <AuthForm
          errorMessage={errorMessage}
          isLoading={isLoading}
          mode="register"
          onSubmit={handleSubmit}
        />

        <p className="auth-switch">
          Ya tienes cuenta? <Link to="/login">Iniciar sesion</Link>
        </p>
      </section>
    </main>
  );
};
