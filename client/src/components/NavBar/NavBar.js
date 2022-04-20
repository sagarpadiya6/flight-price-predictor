import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../../ToggleColorMode";
import { NavLink as Link } from "react-router-dom";

const pages = [
  {
    name: "Pricing",
    link: "/pricing",
  },
  { name: "Reviews", link: "/reviews" },
];
const settings = ["Account", "Logout"];

const ResponsiveAppBar = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            <Button
              sx={{ color: "white", display: { xs: "none", md: "flex" } }}
            >
              <AirplaneTicketIcon sx={{ marginRight: 1 }} fontSize="large" />
              <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
                FLIGHT PRICE
              </Typography>
            </Button>
          </Link>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link
                      to={page.link}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      {page.name}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              margin: "auto",
              display: { xs: "flex", md: "none" },
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "white",
                display: "flex",
              }}
            >
              <Button
                sx={{
                  color: "white",
                }}
              >
                <AirplaneTicketIcon sx={{ marginRight: 1 }} fontSize="large" />
                <Typography variant="h6" noWrap component="div" sx={{}}>
                  FLIGHT PRICE
                </Typography>
              </Button>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                component={Link}
                to={page.link}
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <IconButton
            sx={{ mr: 2 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
            size="large"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
          <Button
            component={Link}
            to="/login"
            sx={{ mr: 2 }}
            variant="contained"
            color="secondary"
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            color="secondary"
          >
            Sign Up
          </Button>
          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;

// import React from "react";
// import {
//   Nav,
//   NavLink,
//   Bars,
//   NavMenu,
//   NavBtn,
//   NavBtnLink,
// } from "./NavBar.style";

// function NavBar() {
//   return (
//     <Nav>
//       <Bars />

//       <NavMenu>
//         <NavLink to="/" activeStyle>
//           Home
//         </NavLink>
//         <NavLink to="/reviews" activeStyle>
//           Reviews
//         </NavLink>
//       </NavMenu>
//       <NavBtn>
//         <NavBtnLink to="/signin">Sign In</NavBtnLink>
//       </NavBtn>
//     </Nav>
//   );
// }

// export default NavBar;
