
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
import ChangePassword from "./features/auth/pages/ChangePassword";
import RoomData from "./features/admin/pages/RoomData";




function App() {
const routes = createBrowserRouter(
    [
      {
        path:"",
        element:<AuthLayout/>,
        errorElement:<NotFound/>,
        children:[
          {index:true,element:<Login/>},
          {path:"login",element:<Login/>},
          {path:"register",element:<Register/>},
          {path:"forget-pass",element:<ForgetPassword/>},
          {path:"reset-pass",element:<ResetPassword/>},
          // {path:"verify-account",element:<Verify/>},
          {path:"change-pass",element:<ChangePassword/>}
        ]
      },
      {
        path:"admin-dashboard",
        element:<AdminLayout/>,
        errorElement:<NotFound/>,
        children:[
          {index:true, element:<AdminDashBoard/>},
          {path:"home", element:<AdminDashBoard/>},
          {path:"addRoom",element:<RoomData></RoomData>}
         
         
        ]
      },
       {
        path:"dashboard",
        element:<MainLayout/>,
        errorElement:<NotFound/>,
        children:[
          {index:true, element:<UserDashBoard/>},
          {path:"home", element:<UserDashBoard/>},
          
         
         
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
