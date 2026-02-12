
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
import Home from "./features/user/pages/Home";
import ExploreRoom from "./features/user/pages/ExploreRoom";
import PaymentPage from "./features/user/pages/PaymentPage";
import FavoritesPage from "./features/user/components/FavoritesList";
import RoomDetails from "./features/user/components/RoomDetails";


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
        path:"",
        element:<MainLayout/>,
        errorElement:<NotFound/>,
        children:[
          {index:true, element:<Home/>},
          {path:"home", element:<Home/>},
          {path:"favorites", element:<FavoritesPage/>},
          {path:"room-details/:roomId",element:<RoomDetails/>},
           {path:"explore-room",element:<ExploreRoom/>},
          {path:"hotel-payment",element:<PaymentPage/>}

          
         
         
        ]
      },

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
