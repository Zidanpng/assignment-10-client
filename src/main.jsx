import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import Roots from "./Layouts/Roots.jsx";
import Home from "./pages/Home/Home.jsx";

import AddList from "./pages/AddList/AddList.jsx";
import MyOrder from "./pages/MyOrder/MyOrder.jsx";
import MyList from "./pages/MyList/MyList.jsx";
import { AuthProvider } from "./providers/AuthProvider.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import UpdateProfile from "./pages/UpdateProfile.jsx";
import Details from "./pages/Home/Details.jsx";
import CategoryProducts from "./pages/CategoryProducts.jsx";
import Error from "./pages/Error.jsx";
import UpdateList from "./pages/MyList/UpdateList.jsx";
import PrivateRoute from "./privateRoute/PrivateRoute.jsx";
import PetSupply from "./pages/PetSupply/PetSupply.jsx";
import Profile from "./pages/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/PetSupply",
        element: (
          <PrivateRoute>
            <PetSupply></PetSupply>
          </PrivateRoute>
        ),
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <Details></Details>
          </PrivateRoute>
        ),
      },
      {
        path: "/category-filtered-product/:category",
        element: (
          <PrivateRoute>
            <CategoryProducts></CategoryProducts>
          </PrivateRoute>
        ),
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
        path: "/updateList/:id",
        element: (
          <PrivateRoute>
            <UpdateList></UpdateList>
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
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/updateProfile",
        element: (
          <PrivateRoute>
            <UpdateProfile></UpdateProfile>
          </PrivateRoute>
        ),
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
