import { Outlet } from "react-router-dom";
import GlobalStyle from "./styles/globalStyles";
import { QueryClient, QueryClientProvider } from "react-query";
import { TermProvider } from "./contexts/TermContext";
import { AuthProvider } from "./contexts/AuthContext";

export function App() {
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
