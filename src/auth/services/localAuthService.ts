import { type AuthUser } from "../context/AuthContext";

interface StoredUser extends AuthUser {
  password: string;
}

const USERS_STORAGE_KEY = "tic-tac-toe-auth-users";
const SESSION_STORAGE_KEY = "tic-tac-toe-auth-session";

const createUserId = () => {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const readStoredUsers = (): StoredUser[] => {
  const rawUsers = localStorage.getItem(USERS_STORAGE_KEY);

  if (!rawUsers) {
    return [];
  }

  try {
    const users = JSON.parse(rawUsers);
    return Array.isArray(users) ? users : [];
  } catch {
    return [];
  }
};

const saveStoredUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

const publicUser = ({ uid, name, email }: StoredUser): AuthUser => ({
  uid,
  name,
  email,
});

export const getStoredSession = (): AuthUser | null => {
  const rawSession = localStorage.getItem(SESSION_STORAGE_KEY);

  if (!rawSession) {
    return null;
  }

  try {
    const session = JSON.parse(rawSession) as AuthUser;
    return session.uid && session.email && session.name ? session : null;
  } catch {
    return null;
  }
};

export const loginWithLocalAccount = (
  email: string,
  password: string
): AuthUser => {
  const normalizedEmail = email.trim().toLowerCase();
  const user = readStoredUsers().find(
    (storedUser) => storedUser.email === normalizedEmail
  );

  if (!user || user.password !== password) {
    throw new Error("El correo o la contraseña no son correctos.");
  }

  const session = publicUser(user);
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  return session;
};

export const registerLocalAccount = (
  name: string,
  email: string,
  password: string
): AuthUser => {
  const normalizedEmail = email.trim().toLowerCase();
  const trimmedName = name.trim();
  const users = readStoredUsers();
  const userExists = users.some((user) => user.email === normalizedEmail);

  if (userExists) {
    throw new Error("Ya existe una cuenta registrada con ese correo.");
  }

  const newUser: StoredUser = {
    uid: createUserId(),
    name: trimmedName,
    email: normalizedEmail,
    password,
  };

  saveStoredUsers([...users, newUser]);

  const session = publicUser(newUser);
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  return session;
};

export const clearStoredSession = () => {
  localStorage.removeItem(SESSION_STORAGE_KEY);
};
