import { Outlet, createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { AuthGuard, LoginRedirect } from "./contexts/AuthContext";

const Router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <Login />,
        index: true,
      },
      {
        element: <AuthGuard fallback={<LoginRedirect />} entry={<Outlet />} />,
        children: [
          {
            element: <Home />,
            path: "/home",
          },
        ],
      },
    ],
  },
]);

export default Router;
