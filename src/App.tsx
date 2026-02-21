
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import AuthLayout from "./layouts/AuthLayout";
import NotFound from "./shared/pages/NotFound";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import ForgetPassword from "./features/auth/pages/ForgetPassword";
import ResetPassword from "./features/auth/pages/ResetPassword";
import AdminLayout from "./layouts/AdminLayout";
import MainLayout from "./layouts/MainLayout";
import AdminDashBoard from "./features/admin/pages/AdminDashBoard";
import UserDashBoard from "./features/user/pages/UserDashBoard";
import AuthContextProvider from "./features/auth/context/AuthContext";
import { ToastContainer} from 'react-toastify';
// import RoomFacilities from "./features/admin/pages/RoomFacilities";
import Ads from "./features/admin/pages/Ads";
import Facilities from "./features/admin/pages/Facilities";
import Users from "./features/admin/pages/Users";
import Booking from "./features/admin/pages/Booking";
import Rooms from "./features/admin/pages/Rooms";
import ChangePassword from "./features/auth/pages/ChangePassword";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import Unauthorized from "./shared/pages/Unauthorized";
import RoomData from "./features/admin/pages/RoomData";
import Explore from "./features/user/pages/Explore";
import Reviews from "./features/user/pages/Reviews";

import Favourites from "./features/user/pages/Favourites";
import RoomDetails from "./features/user/components/RoomDetails/RoomDetails/RoomDetails";
import CheckOutForm from "./features/user/components/CheckoutForm/CheckOutForm";


function App() {
const routes = createBrowserRouter(
    [
      {
        path:"auth",
        element:<AuthLayout/>,
        errorElement:<NotFound/>,
        children:[
          {index:true,element:<Login/>},
          {path:"login",element:<Login/>},
          {path:"register",element:<Register/>},
          {path:"forget-pass",element:<ForgetPassword/>},
          {path:"reset-pass",element:<ResetPassword/>},
          {path:"change-pass",element:<ChangePassword/>},
          {path:"unAuthorized",element:<Unauthorized/>},
        ]
      },
      {
        path:"admin-dashboard",
        element:<AdminProtectedRoute><AdminLayout/></AdminProtectedRoute>,
        errorElement:<NotFound/>,
        children:[
          {index:true, element:<AdminDashBoard/>},
          {path:"home", element:<AdminDashBoard/>},
          {path:"ads", element:<Ads/>},
          {path:"facilites", element:<Facilities/>},
          {path:"rooms", element:<Rooms/>},
          {path:"addRoom", element:<RoomData/>},
          {path:"addRoom/:id" ,element:<RoomData /> },
          {path:"users", element:<Users/>},
          {path:"booking", element:<Booking/>}

        ]
      },
    {
  path: "",
  element: <MainLayout />,
  errorElement: <NotFound />,
  children: [
    { index: true, element: <UserDashBoard /> },
     { path: "home", element: <UserDashBoard /> },
    { path: "explore", element: <Explore /> },
    { path: "reviews", element: <Reviews /> },
    { path: "favourites", element: <Favourites /> },
        { path: "room_details/:id", element: <RoomDetails/>},
          { path: "payment", element: <CheckOutForm/>},
  ]
}

    ]
  )
  return (
    <>
      <AuthContextProvider>

      <RouterProvider router={routes}></RouterProvider>
      </AuthContextProvider>
      <ToastContainer />

    </>
  )
}

export default App
