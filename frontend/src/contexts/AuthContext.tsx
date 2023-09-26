/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  PropsWithChildren,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";

type LoginParams = {
  name: string;
  password: string;
};

interface AuthContext {
  login: (params: LoginParams) => void;
  logout: () => void;
  redirectToLogin: () => void;
  status: "Authorized" | "Unauthorized" | "Authorizing";
  error?: string;
}

const authContext = createContext({} as AuthContext);

export function AuthProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();

  const [error, setError] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<
    "Authorized" | "Unauthorized" | "Authorizing"
  >("Authorizing");

  const handleAuthorizationByLocalStorage = useCallback(() => {
    const isAuth = localStorage.getItem("isAuthenticated");

    if (Number(isAuth) === 1) {
      setStatus("Authorized");
      navigate("/home");
    } else {
      setStatus("Unauthorized");
    }
  }, []);

  useEffect(() => {
    handleAuthorizationByLocalStorage();
  }, [handleAuthorizationByLocalStorage]);

  const redirectToLogin = () => {
    setStatus("Unauthorized");
    navigate("/login");
  };

  const login = ({ password, name }: LoginParams) => {
    const userName = import.meta.env.VITE_USER;
    const userPassword = import.meta.env.VITE_PASSWORD;

    if (name === userName && password === userPassword) {
      localStorage.setItem("isAuthenticated", "1");
      setStatus("Authorized");
      navigate("/home");
      setError(undefined);

      return;
    }

    setError("Usuário ou senha inválidos");
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    redirectToLogin();
  };

  return (
    <authContext.Provider
      value={{ status, login, logout, redirectToLogin, error }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(authContext);
  if (!context) throw new Error("Contexto não encontrado");

  return context;
}

export function AuthGuard({
  fallback,
  entry,
}: {
  fallback: JSX.Element;
  entry: JSX.Element;
}) {
  const { status } = useAuthContext();

  if (status === "Authorizing") return <h2>Loading...</h2>;

  if (status === "Unauthorized") return fallback;

  return entry;
}

export function LoginRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
