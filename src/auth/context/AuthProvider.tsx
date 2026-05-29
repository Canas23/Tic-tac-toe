import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { AuthContext, type AuthUser } from "./AuthContext";
import { auth } from "../../utils/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Escuchar activamente cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email || "Usuario",
          email: firebaseUser.email || "",
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof Error) {
        const firebaseError = error as { code?: string };
        if (
          firebaseError.code === "auth/invalid-credential" ||
          firebaseError.code === "auth/wrong-password" ||
          firebaseError.code === "auth/user-not-found"
        ) {
          throw new Error("El correo o la contraseña no son correctos.");
        } else if (firebaseError.code === "auth/invalid-email") {
          throw new Error("El formato del correo electrónico no es válido.");
        }
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      setIsLoading(true);

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        
        // Actualizar el perfil en Firebase con el nombre de usuario
        await updateProfile(userCredential.user, {
          displayName: name.trim(),
        });

        // Forzar la actualización del estado local del usuario
        setUser({
          uid: userCredential.user.uid,
          name: name.trim(),
          email: userCredential.user.email || "",
        });
      } catch (error) {
        if (error instanceof Error) {
          const firebaseError = error as { code?: string };
          if (firebaseError.code === "auth/email-already-in-use") {
            throw new Error("Ya existe una cuenta registrada con ese correo.");
          } else if (firebaseError.code === "auth/weak-password") {
            throw new Error("La contraseña debe tener al menos 6 caracteres.");
          } else if (firebaseError.code === "auth/invalid-email") {
            throw new Error("El formato del correo electrónico no es válido.");
          }
        }
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
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

