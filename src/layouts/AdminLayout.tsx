import { Box, Drawer, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import SideBar from "../shared/pages/SideBar";
import NavBar from "../shared/pages/NavBar";

const SIDEBAR_WIDTH = 250;
const SIDEBAR_COLLAPSED_WIDTH = 80;

export default function AdminLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarWidth = collapsed
    ? SIDEBAR_COLLAPSED_WIDTH
    : SIDEBAR_WIDTH;

  return (
    <Box sx={{ display: "flex" }}>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Box
          sx={{
            width: sidebarWidth,
            position: "fixed",
            height: "100vh",
            transition: "width .3s",
          }}
        >
          <SideBar
            isCollapsed={collapsed}
            setIsCollapsed={setCollapsed}
          />
        </Box>
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <Drawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
        >
          <SideBar
           isCollapsed={collapsed}
           setIsCollapsed={setCollapsed} 
            onCloseDrawer={() => setMobileOpen(false)}/>
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: !isMobile ? `calc(${sidebarWidth}px + 10px)` : "10px",
          transition: "margin .3s",
          width: "100%",
        }}
      >
        <NavBar onMenuClick={() => setMobileOpen(true)} />
        <Outlet />
      </Box>
    </Box>
  );
}
