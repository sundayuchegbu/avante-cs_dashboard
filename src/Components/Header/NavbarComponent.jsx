import React from "react";
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useStyles } from "./HeaderStyle";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import { useSelector } from "react-redux";
// import Notification from "./ActionTab/Notification";
import Profile from "./ActionTab/Profile";
// import Messages from "./ActionTab/Messages";
import logo from "../Header/ActionTab/logo.png";

export default function NavbarComponent({ handleDrawerToggle }) {
  const classes = useStyles();
  const userState = useSelector((state) => state.user);
  const history = useHistory();

  const handleLogoClick = () => {
    if (userState.userInfo) {
      // Navigate to "/"
      history.push("/");
    } else {
      // Navigate to "login"
      history.push("/login");
    }
  };

  return (
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <Box style={{ display: "flex" }}>
          <Typography variant="h6" className={classes.logo}>
            <img
              src={logo}
              alt="logo"
              onClick={handleLogoClick} // Attach the click event handler here
              style={{ cursor: "pointer" }} // Optional: Change the cursor to a pointer on hover
            />
          </Typography>
        </Box>
        <Hidden smDown>
          <Box>
            {/* <Notification /> */}
            {/* <Messages /> */}
            <Profile />
          </Box>
        </Hidden>
        <Hidden mdUp>
          <IconButton color="inherit" onClick={handleDrawerToggle}>
            <MenuRoundedIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}
