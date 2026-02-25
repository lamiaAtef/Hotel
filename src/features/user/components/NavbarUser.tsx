import { Container } from "@mui/material";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';

import MenuItem from '@mui/material/MenuItem';
import {  Link, NavLink } from "react-router-dom";

import profile from "../../../assets/images/profile.jpeg"
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';




const settings = ['Profile',  'Logout'];


export default function NavbarUser() {
const token = localStorage.getItem("userToken");
const isLoggedIn = token !== null && token !== ""; // true لو فيه توكن حقيقي

const pages = isLoggedIn
  ? [
      { label: 'Home', path: '/' },
      { label: 'Explore', path: '/explore-room' },
      { label: 'Reviews', path: '/reviews' },
      { label: 'Favourites', path: '/favorites' },
    ]
  : [
      { label: 'Home', path: '/' },
      { label: 'Explore', path: '/explore' },
      // {label:"login" ,path:"/auth/login"},
      // {label:"register",path:"/auth/register"}
    ];

console.log("isLoggedIn", isLoggedIn);
console.log("pages", pages);
// for mobile menu
// const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
//  const handleCloseNavMenu = () => {
//     setAnchorElNav(null);

//   };
//    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElNav(event.currentTarget);
//   };
  // end mobile menue
  // draweeeeeeeeeeeer
  const [openDrawer, setOpenDrawer] = React.useState(false);
  // end draweeeeeeeer
const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (

    <>


         <AppBar position="static" sx={{backgroundColor:"rgba(255, 255, 255, 1)",color:'rgba(50, 82, 223, 1)'}}
         elevation={0}
         >
      <Container maxWidth="lg">
        <Toolbar disableGutters>

          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              // letterSpacing: '.3rem',
              fontSize:"20px",
              color: 'rgba(50, 82, 223, 1)',
              textDecoration: 'none',
            }}
          >
      Stay<span style={{color:"black"}}>Cation</span>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              // onClick={handleOpenNavMenu}
                onClick={() => setOpenDrawer(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {/* <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none'} }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label}
                onClick={handleCloseNavMenu}
                    component={NavLink}
                      to={page.path}
                  >
                  <Typography sx={{ textAlign: 'center'}}>{page.label}</Typography>
                </MenuItem>
              ))}
                {!isLoggedIn && (
    <>
      <MenuItem component={Link} to="/auth/login" onClick={handleCloseNavMenu}>
        <Typography sx={{ textAlign: 'center', color: '#3252DF', fontWeight: 'bold' }}>
          Login
        </Typography>
      </MenuItem>
      <MenuItem component={Link} to="/auth/register" onClick={handleCloseNavMenu}>
        <Typography sx={{ textAlign: 'center', color: '#3252DF', fontWeight: 'bold' }}>
          Register
        </Typography>
      </MenuItem>
    </>
  )}

            </Menu> */}
            {/* draweeeeeeeeeeeeeeeeeer */}
            <Drawer
  anchor="left"
  open={openDrawer}
  onClose={() => setOpenDrawer(false)}
  sx={{ display: { xs: 'block', md: 'none' } }}
>
  <Box sx={{ width: 250 }} onClick={() => setOpenDrawer(false)}>
    <List>

      {pages.map((page) => (
        <ListItem key={page.label} disablePadding>
          <ListItemButton component={NavLink} to={page.path}>
            <ListItemText primary={page.label} />
          </ListItemButton>
        </ListItem>
      ))}

      {!isLoggedIn && (
        <>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/auth/login" sx={{ color:"rgba(50, 82, 223, 1)",padding:"5px 10px",mb:"10px" }}>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/auth/register" sx={{ color:"rgba(50, 82, 223, 1)",padding:"5px 10px" }}>
              <ListItemText primary="Register" />
            </ListItemButton>
          </ListItem>
        </>
      )}

    </List>
  </Box>
</Drawer>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',

              fontWeight: 700,
              // letterSpacing: '.3rem',
              fontSize:"20px",
              color: 'rgba(50, 82, 223, 1)',
              textDecoration: 'none',
            }}
          >
 Stay<span style={{color:"black"}}>Cation</span>
          </Typography>
{/* boxx contain pages */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } ,
            justifyContent: 'flex-end',
              mr: 5,

}}>
            {pages.map((page) => (
              <Button
                  key={page.path}
    component={NavLink}
    to={page.path}

                // onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "rgba(21, 44, 91, 1)", display: 'block',
                    fontSize: '13px',
                     textTransform: 'none',
                     "&.active":{
                      color:"rgba(50, 82, 223, 1)"
                     }
                }}
              >
                {page.label}

              </Button>
            ))}
              {!isLoggedIn && (
    <>
      <MenuItem component={Link} to="/auth/login" >
        <Typography sx={{ textAlign: 'center', backgroundColor: 'rgba(50, 82, 223, 1)',color:"white",padding:"5px 10px"  }}>
          Login Now
        </Typography>
      </MenuItem>
      <MenuItem component={Link} to="/auth/register" >
        <Typography sx={{ textAlign: 'center', backgroundColor: 'rgba(50, 82, 223, 1)',color:"white",padding:"5px 10px"  }}>
          Register
        </Typography>
      </MenuItem>
    </>
  )}
          </Box>
        {/* end boxxxx contain pages */}
        {/* profile  dropmenue*/}
        {isLoggedIn?
          <Box sx={{ flexGrow: 0 ,display:"flex",alignItems:"center",justifyContent: "space-between" }}>
             <img src={profile} alt ="profile" style={{width:"50px",height:"50px",marginRight:"5px"}}/>
             <Typography sx={{marginRight:"5px"}}>eqbal</Typography>

              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
<KeyboardArrowDownIcon/>
              </IconButton>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>:""}
           {/* eeeeeeeeeeeeeeeeeeeeend profile  dropmenue*/}

{/* <Button  variant="contained"  sx={{color:"white"}}>Login</Button>
          <Button  variant="contained"  sx={{color:"white"}}>Register</Button> */}


        </Toolbar>
      </Container>
    </AppBar>

    </>
  )
}