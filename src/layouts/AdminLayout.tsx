import { Box } from "@mui/material";

import { Outlet } from "react-router-dom";
import { useState } from "react";
import SideBar from "../shared/pages/SideBar";
import NavBar from "../shared/pages/NavBar";


export default function AdminLayout() {
   const [isCollapsed,setIsCollapsed]=useState <boolean>(false);
  return (
    <>
    <Box sx={{display:"flex"}}>
      <Box sx={{xs:"none"}} className={`sidebar_container ${isCollapsed ? 'collapsed' : 'expanded'}`} >
       
        <SideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>
      </Box>
      <Box sx={{ width:"100%",paddingLeft:"10px"}} className={`main-content ${isCollapsed ? "collapsed":""}`}>
        <NavBar/>
        <Outlet/>
      </Box>
    </Box>

    </>
  )
}