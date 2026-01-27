import { Box, IconButton } from "@mui/material";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { Home as HomeIcon, PeopleOutline as PeopleOutlineIcon, LockOutline as LockOutlineIcon, Logout as LogoutIcon, BorderAll as BorderAllIcon, BorderClear as BorderClearIcon, AddCard as AddCardIcon, ArrowBack as ArrowBackIcon, ArrowForward } from "@mui/icons-material";
import useLogout from "../hooks/useLogOut";
import type { SideBarProps } from "../type";

export default function SideBar({ isCollapsed, setIsCollapsed }: SideBarProps) {
  const { pathname } = useLocation();
  const logoutUser = useLogout();

  return (
    <Box sx={{ height: "100%" }}>
      <Sidebar collapsed={isCollapsed}>
        <IconButton onClick={() => setIsCollapsed(!isCollapsed)} sx={{ color: "#fff" }}>
          {isCollapsed ? <ArrowForward /> : <ArrowBackIcon />}
        </IconButton>

        <Menu>
          <MenuItem component={<Link to="/admin-dashboard" />} icon={<HomeIcon />} className={pathname === "/admin-dashboard" ? "active" : ""}>
            Home
          </MenuItem>
          <MenuItem component={<Link to="/admin-dashboard/users" />} icon={<PeopleOutlineIcon />} className={pathname === "/admin-dashboard/users" ? "active" : ""}>
            Users
          </MenuItem>
          <MenuItem component={<Link to="/admin-dashboard/rooms" />} icon={<BorderAllIcon />} className={pathname === "/admin-dashboard/rooms" ? "active" : ""}>
            Rooms
          </MenuItem>
          <MenuItem component={<Link to="/admin-dashboard/ads" />} icon={<BorderClearIcon />} className={pathname === "/admin-dashboard/ads" ? "active" : ""}>
            Ads
          </MenuItem>
          <MenuItem component={<Link to="/admin-dashboard/booking" />} icon={<PeopleOutlineIcon />} className={pathname === "/admin-dashboard/booking" ? "active" : ""}>
            Booking
          </MenuItem>
          <MenuItem component={<Link to="/admin-dashboard/facilites" />} icon={<AddCardIcon />} className={pathname === "/admin-dashboard/facilites" ? "active" : ""}>
            Facilites
          </MenuItem>
          <MenuItem component={<Link to="/change-pass" />} icon={<LockOutlineIcon />}>
            Change Password
          </MenuItem>
          <MenuItem icon={<LogoutIcon />} onClick={logoutUser}>
            Log Out
          </MenuItem>
        </Menu>
      </Sidebar>
    </Box>
  );
}
