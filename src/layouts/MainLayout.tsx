import { Outlet } from "react-router-dom";
import Hotels from "../features/user/components/Hotels";
import Houses from "../features/user/components/Houses";
import Footer from "../features/user/components/Footer";
import NavbarUser from "../features/user/components/NavBarUser";
import { Container } from "@mui/material";

export default function MainLayout() {
  return (
    <>
      
      <NavbarUser/>
     <Container maxWidth="lg">
          <Outlet/>

      </Container>
      <Footer/>
    </>
  )
}
