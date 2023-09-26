import { useLayoutEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import GlobalStyle from "./styles/globalStyles";
import { QueryClient, QueryClientProvider } from "react-query";
import { TermProvider } from "./contexts/TermContext";
import { AuthProvider } from "./contexts/AuthContext";

export function App() {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate("/login");
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => redirectToLogin, []);

  const queryClient = new QueryClient();

  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TermProvider>
            <Outlet />
          </TermProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
