import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Avatar } from '@mui/material';
import useLogout from '../hooks/useLogOut';
import { useAuth } from '../../features/auth/hooks/useAuth';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function NavBar({onMenuClick}:any) {
  const logoutUser = useLogout()
  const {userData} = useAuth();
  console.log(userData,"userData")
  
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
  // React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // const handleMobileMenuClose = () => {
  //   setMobileMoreAnchorEl(null);
  // };

  const handleMenuClose = (userChoose:string):void => {
    userChoose === "logoutUser" ? logoutUser() : ""
    setAnchorEl(null);
    // handleMobileMenuClose();
  };

  // const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={()=>handleMenuClose("")}>Profile</MenuItem>
      <MenuItem onClick={()=>handleMenuClose("logoutUser")}>Log Out</MenuItem>
    </Menu>
  );

 

  return (
    <Box sx={{ flexGrow: 1,paddingBlock:"32px"}}>
      <AppBar
          position="static"
          sx={{
            background: "#F8F9FB",
            borderRadius: "16px",
            color: "#1f384C",
            top: 0,
            
          }}
        >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 ,display: { xs: "flex", md: "none" }}}
            onClick={onMenuClick}>
            <MenuIcon />
          </IconButton>
         
          <Search   sx={{borderRadius:"15px" ,
                    backgroundColor:"#fff",
                    height:"30px",
                    color:"#000",
                    display:"flex",
                    alignItems:"center",
                    flexGrow:1,
                    }}>
            <SearchIconWrapper >
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{display:"flex" , alignItems:"center"}}>
            {/* image , h3 user name */}
           <Avatar alt={userData?.userName} src="/static/images/avatar/3.jpg" />
            <Typography variant='body2' sx={{marginLeft:"10px"}}>{userData?.userName}</Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
           <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
             <KeyboardArrowDownIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={0} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
           
          </Box>
        
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>

  );
}
