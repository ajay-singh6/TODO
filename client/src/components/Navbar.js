import * as React from "react";
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
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import { removeCookie } from "../Cookies/removeCookie";

const settings = ["Profile", "Logout"];

function Navbar({ user, isAuthenticated, setIsAuthenticated }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (e) => {
    // console.log(e.target.children);
    setAnchorElUser(null);
  };
  const handleMenuItem = (e) => {
    console.log(e.target.innerHTML)
    console.log("User (authtd)" + isAuthenticated)
    switch (e.target.innerHTML) {
      case "Profile":
        navigate("/user");
        break;
      case "Logout":
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        removeCookie('jwt')
        removeCookie('name')
        removeCookie('email')

        setIsAuthenticated(false);
        // setUser({});
        navigate("/signin");
        break;
      default:
        navigate("/signin");
    }
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box
            sx={{
              display: { xs: "none", md: "flex", alignItems: "center" },
              ml: 3,
            }}
          >
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                }}
              >
                TODO
              </Typography>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
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
                  {settings.map((setting, index) => (
                    <MenuItem key={index} onClick={handleMenuItem}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    width: "12vw",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Link to={"/signin"} style={{ textDecoration: "none" }}>
                    <Button
                      variant="outlined"
                      sx={{ bgcolor: "#fff", "&:hover": { bgcolor: "#fff" } }}
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to={"/signup"} style={{ textDecoration: "none" }}>
                    {" "}
                    <Button
                      variant="outlined"
                      sx={{ bgcolor: "#fff", "&:hover": { bgcolor: "#fff" } }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </Box>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
