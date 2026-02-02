import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import App from "./App.jsx";
import Roots from "./Layouts/Roots.jsx";
import Home from "./pages/Home.jsx";
import PetSupply from "./pages/PetSupply.jsx";
import AddList from "./pages/AddList.jsx";
import MyOrder from "./pages/MyOrder.jsx";
import MyList from "./pages/MyList.jsx";
import { AuthProvider } from "./providers/AuthProvider.jsx";
import PrivateRoute from "./privateRoute/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Roots,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/petSupply",
        element: <PetSupply></PetSupply>,
      },
      {
        path: "/addList",
        element: (
          <PrivateRoute>
            <AddList></AddList>
          </PrivateRoute>
        ),
      },
      {
        path: "/myList",
        element: (
          <PrivateRoute>
            <MyList></MyList>
          </PrivateRoute>
        ),
      },
      {
        path: "/myOrder",
        element: (
          <PrivateRoute>
            <MyOrder></MyOrder>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
