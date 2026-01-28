import { Box, IconButton, useMediaQuery, useTheme} from "@mui/material";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { Home as HomeIcon, PeopleOutline as PeopleOutlineIcon, LockOutline as LockOutlineIcon, Logout as LogoutIcon, BorderAll as BorderAllIcon, BorderClear as BorderClearIcon, AddCard as AddCardIcon, ArrowBack as ArrowBackIcon, ArrowForward } from "@mui/icons-material";
import useLogout from "../hooks/useLogOut";
import type { SideBarProps } from "../type";


export default function SideBar({ isCollapsed, setIsCollapsed, onCloseDrawer }: SideBarProps) {



  const { pathname } = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));


  const logoutUser = useLogout();
  const handleMenuClose = (isLogout?:Boolean) => {
     if (isMobile && onCloseDrawer) {
              onCloseDrawer();
            }
        if(isLogout){logoutUser();}
  }

  return (
    <Box sx={{ height: "100%" }}>
      <Sidebar collapsed={isCollapsed}>
        <IconButton onClick={() => setIsCollapsed(!isCollapsed)} sx={{ color: "#fff" }}>
          {isCollapsed ? <ArrowForward /> : <ArrowBackIcon />}
        </IconButton>

        <Menu>
          <MenuItem onClick={()=>handleMenuClose(false)} component={<Link to="/admin-dashboard" />} icon={<HomeIcon />} className={pathname === "/admin-dashboard" ? "active" : ""}>
            Home
          </MenuItem>
          <MenuItem onClick={()=>handleMenuClose(false)}  component={<Link to="/admin-dashboard/users" />} icon={<PeopleOutlineIcon />} className={pathname === "/admin-dashboard/users" ? "active" : ""}>
            Users
          </MenuItem>
          <MenuItem onClick={()=>handleMenuClose(false)}  component={<Link to="/admin-dashboard/rooms" />} icon={<BorderAllIcon />} className={pathname === "/admin-dashboard/rooms" ? "active" : ""}>
            Rooms
          </MenuItem>
          <MenuItem onClick={()=>handleMenuClose(false)}  component={<Link to="/admin-dashboard/ads" />} icon={<BorderClearIcon />} className={pathname === "/admin-dashboard/ads" ? "active" : ""}>
            Ads
          </MenuItem>
          <MenuItem onClick={()=>handleMenuClose(false)}  component={<Link to="/admin-dashboard/booking" />} icon={<PeopleOutlineIcon />} className={pathname === "/admin-dashboard/booking" ? "active" : ""}>
            Booking
          </MenuItem>
          <MenuItem onClick={()=>handleMenuClose(false)}  component={<Link to="/admin-dashboard/facilites" />} icon={<AddCardIcon />} className={pathname === "/admin-dashboard/facilites" ? "active" : ""}>
            Facilites
          </MenuItem>
          <MenuItem  component={<Link to="/change-pass" />} icon={<LockOutlineIcon />}>
            Change Password
          </MenuItem>
          <MenuItem icon={<LogoutIcon />} onClick={()=>handleMenuClose(true)}>
            Log Out
          </MenuItem>
        </Menu>
      </Sidebar>
    </Box>
  );
}
