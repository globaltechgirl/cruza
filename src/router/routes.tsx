import { createBrowserRouter, Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";

import PrivateLayout from "@/component/layout/privateLayout";
import Login from "@/pages/auth/login";
import AuthGuard from "@/router/authGuard";
import { ROUTES } from "@/utils/constants";
import Overview from "@/pages/overview";
import Home from "@/pages/home";
import Ride from "@/pages/ride";
import Activity from "@/pages/activity";
import Driver from "@/pages/driver";
import Booking from "@/pages/booking";
import Notify from "@/pages/notify";
import Offers from "@/component/ride/offers";
import Chat from "@/pages/chat";
import Register from "@/pages/auth/register";

const routes: RouteObject[] = [
  {
    path: ROUTES.OVERVIEW,
    element: <Overview />,
  },
  {
    path: ROUTES.REGISTER,
    element: <Register />,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },

  {
    path: ROUTES.ROOT,
    element: <AuthGuard />,
    children: [
      {
        element: <PrivateLayout />,
        children: [
          { path: "", element: <Navigate to={ROUTES.HOME} replace /> },
          { path: "home", element: <Home /> },
          { path: "activity", element: <Activity /> },
          { path: "ride", element: <Ride /> },
          { path: "driver", element: <Driver /> },
          { path: "booking", element: <Booking /> },
          { path: "notify", element: <Notify /> },
          { path: "offers", element: <Offers /> },
          { path: "chat", element: <Chat /> },
        ],
      },
    ],
  },

  // --- FALLBACK WILDCARD ---
  {
    path: "*",
    // Safely fallback to overview if an invalid route is supplied
    element: <Navigate to={ROUTES.OVERVIEW} replace />,
  },
];

const router = createBrowserRouter(routes);

export default router;
