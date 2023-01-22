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
import { Link } from "react-router-dom";

function ResponsiveAppBar() {
  const nameRef = React.useRef<HTMLInputElement>(null);
  const usernameRef = React.useRef<HTMLInputElement>(null);
  const pages = ["Products", "Categories", "Suppliers"];
  const [show, setShow] = React.useState<boolean>(false);
  const settings: string = "LogIn";
  const [isLogged, setIsLogged] = React.useState<boolean>(false);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const loginHandle = () => {
    const userDetail = {
      name: nameRef.current.value,
      username: usernameRef.current.value,
    };
    localStorage.setItem("name", userDetail.name);
    setShow(false);
    setIsLogged(true);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      {show ? (
        <div className="logInContainer">
          <div>
            <input ref={nameRef} type={"text"} />
            <label htmlFor="">Name</label>
          </div>
          <div>
            <input ref={usernameRef} type="text" />
            <label htmlFor="">Username</label>
          </div>
          <button onClick={loginHandle} className="loginBtn">
            Log In
          </button>
        </div>
      ) : (
        <></>
      )}

      <AppBar position="static">
        <Container
          style={{
            backgroundColor: "tomato",
          }}
          maxWidth="xl"
        >
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Tahira
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link
                        style={{
                          color: "black",
                          textDecoration: "none",
                        }}
                        to={`/${page.toLocaleLowerCase()}`}
                      >
                        {" "}
                        {page}
                      </Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Tahira
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link
                    style={{
                      color: "white",
                      textDecoration: "none",
                    }}
                    to={`/${page.toLocaleLowerCase()}`}
                  >
                    {page}
                  </Link>
                </Button>
              ))}
            </Box>
            {isLogged ? (
              <Box>
                <Typography component={"h1"}>
                  Hello, {localStorage.getItem("name")} {"  "}
                </Typography>
              </Box>
            ) : (
              <></>
            )}
            <Box sx={{ flexGrow: 0, margin: "20px" }}>
              <Tooltip title="LogInHere">
                <Typography
                  className={"loginBtn"}
                  onClick={handleOpenUserMenu}
                  component={"button"}
                >
                  Settings
                </Typography>
                {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="" />
                </IconButton> */}
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
                <MenuItem key={settings} onClick={handleCloseUserMenu}>
                  {isLogged ? (
                    <Typography
                      onClick={() => {
                        setShow(false);
                        setIsLogged(false);
                        localStorage.removeItem("name");
                      }}
                      textAlign="center"
                    >
                      LogOut
                    </Typography>
                  ) : (
                    <Typography
                      onClick={() => setShow(true)}
                      textAlign="center"
                    >
                      LogIn
                    </Typography>
                  )}
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default ResponsiveAppBar;
