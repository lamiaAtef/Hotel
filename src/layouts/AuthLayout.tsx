import loginImg from "../assets/images/Auth_Img/login.png";
import registerImg from "../assets/images/Auth_Img/register.png";
import forgetImg from "../assets/images/Auth_Img/forget.png";
import resetImg from "../assets/images/Auth_Img/reset.png";

import { Outlet, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Logo from "../shared/components/Logo/Logo";



export default function AuthLayout() {
  const { pathname } = useLocation();

  const authImages: Record<string, string> = {
    login: loginImg,
    register: registerImg,
    forget: forgetImg,
    reset: resetImg,
  };

  const key =
    Object.keys(authImages).find((k) => pathname.includes(k)) || "login";

  return (
    <Grid container sx={{height:"100vh",paddingTop:"10px"}} >
      <Grid size={{xs:12 , md:6 }}  sx={{paddingLeft:"50px",marginTop:"30px"}}>
        <Logo/> 
         <Outlet />
      </Grid>

      <Grid size={{xs:0 , md:6 }} 
              sx={{
              minHeight:"100%" ,
              backgroundImage:`url(${authImages[key]})`,
              backgroundSize:"cover",
              backgroundPosition:"bottom",
              borderTopLeftRadius:"15px"

              }} 
              >
        
      </Grid>
    </Grid>
  );
}
