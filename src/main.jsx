import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import App from "./App.jsx";
import Roots from "./Layouts/Roots.jsx";
import Home from "./pages/Home/Home.jsx";
import PetSupply from "./pages/PetSupply/PetSupply.jsx";
import AddList from "./pages/AddList/AddList.jsx";
import MyOrder from "./pages/MyOrder/MyOrder.jsx";
import MyList from "./pages/MyList/MyList.jsx";
import { AuthProvider } from "./providers/AuthProvider.jsx";
import PrivateRoute from "./privateRoute/PrivateRoute.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import UpdateProfile from "./pages/UpdateProfile.jsx";
import Details from "./pages/Home/Details.jsx";

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
        path: "/details",
        element: <Details></Details>,
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
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      // {
      //   path: "/forgetPass",
      //   element: <ForgetPass></ForgetPass>,
      // },
      {
        path: "/update",
        element: <UpdateProfile></UpdateProfile>,
      },
      {
        path: "*",
        element: <Error></Error>,
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
