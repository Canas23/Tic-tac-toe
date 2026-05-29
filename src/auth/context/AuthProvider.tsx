import { useCallback, useMemo, useState, type ReactNode } from "react";
import { AuthContext, type AuthUser } from "./AuthContext";
import {
  clearStoredSession,
  getStoredSession,
  loginWithLocalAccount,
  registerLocalAccount,
} from "../services/localAuthService";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredSession());
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const session = loginWithLocalAccount(email, password);
      setUser(session);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      setIsLoading(true);

      try {
        const session = registerLocalAccount(name, email, password);
        setUser(session);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    clearStoredSession();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      login,
      register,
      logout,
    }),
    [isLoading, login, logout, register, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
