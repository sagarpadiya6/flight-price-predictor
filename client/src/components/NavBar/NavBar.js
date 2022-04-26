import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
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
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { logOutUser } from "../../api/user";

const settings = ["Account", "Logout"];

const ResponsiveAppBar = () => {
  const axios = useAxiosPrivate();
  const [pages, setPages] = useState([
    {
      name: "Pricing",
      link: "/pricing",
    },
    { name: "Reviews", link: "/reviews" },
  ]);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
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

  const handleCloseUserMenu = (event) => {
    const { menu } = event.currentTarget.dataset;
    switch (menu) {
      case "Logout":
        logOutUser(axios)();
        setAuth(null);
        navigate("/login", { replace: true });
        break;
      default:
        break;
    }
    setAnchorElUser(null);
  };

  useEffect(() => {
    if (
      auth?.role === "admin" &&
      !pages.find((page) => page.name === "Admin")
    ) {
      setPages([
        ...pages,
        {
          name: "Admin",
          link: "/admin",
        },
      ]);
    } else {
      setPages(pages.filter((page) => page.name !== "Admin"));
    }
  }, [auth]);

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
          {auth?.id ? (
            <Box sx={{ flexGrow: 0 }}>
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
                  <MenuItem
                    key={setting}
                    data-menu={setting}
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <>
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
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
