import { useState, type FormEvent } from "react";

interface AuthFormProps {
  mode: "login" | "register";
  isLoading: boolean;
  errorMessage: string;
  onSubmit: (values: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
}

export const AuthForm = ({
  mode,
  isLoading,
  errorMessage,
  onSubmit,
}: AuthFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isRegisterMode = mode === "register";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit({ name, email, password });
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {isRegisterMode && (
        <label>
          Nombre
          <input
            autoComplete="name"
            minLength={2}
            onChange={(event) => setName(event.target.value)}
            placeholder="Tu nombre"
            required
            type="text"
            value={name}
          />
        </label>
      )}

      <label>
        Correo electronico
        <input
          autoComplete="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="nombre@correo.com"
          required
          type="email"
          value={email}
        />
      </label>

      <label>
        Contrasena
        <input
          autoComplete={isRegisterMode ? "new-password" : "current-password"}
          minLength={6}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Minimo 6 caracteres"
          required
          type="password"
          value={password}
        />
      </label>

      {errorMessage && <p className="form-error">{errorMessage}</p>}

      <button className="button button--primary" disabled={isLoading} type="submit">
        {isLoading
          ? "Procesando..."
          : isRegisterMode
            ? "Crear cuenta"
            : "Iniciar sesion"}
      </button>
    </form>
  );
};
