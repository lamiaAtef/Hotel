import { Outlet } from "react-router-dom";
import Hotels from "../features/user/components/Hotels";
import Houses from "../features/user/components/Houses";
import Footer from "../features/user/components/Footer";
import NavbarUser from "../features/user/components/NavBarUser";

export default function MainLayout() {
  return (
    <>
      
      <NavbarUser/>
      <Outlet/>
      <Footer/>
    </>
  )
}
