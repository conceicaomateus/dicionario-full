import { Outlet } from "react-router-dom";
import GlobalStyle from "./styles/globalStyles";
import { QueryClient, QueryClientProvider } from "react-query";
import { TermProvider } from "./contexts/TermContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";

export function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <AuthProvider>
            <TermProvider>
              <Outlet />
            </TermProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
