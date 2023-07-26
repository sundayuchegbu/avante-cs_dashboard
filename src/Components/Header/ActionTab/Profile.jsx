import React, { Fragment } from "react";
import {
  Badge,
  Button,
  IconButton,
  List,
  ListItem,
  // ListItemAvatar,
  // ListItemText,
  Menu,
} from "@material-ui/core";

import { useStyles } from "../HeaderStyle";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { logout } from "../../../store/actions/user";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";

export default function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userState = useSelector((state) => state.user);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log("handleClicked ", event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/login");
  };

  const dropDownData = [
    { label: "setting", icon: <SettingsIcon /> },
    { label: "logout", icon: <ExitToAppIcon /> },
  ];

  return (
    <Fragment>
      <IconButton
        aria-controls="profile"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <Badge badgeContent={null} color="secondary">
          <PersonIcon />
        </Badge>
      </IconButton>
      <Menu
        id="profile"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        placement="bottom-start"
      >
        <List dense={true} className={classes.dropdownlist}>
          {dropDownData.map((item, i) => (
            <ListItem
              key={i}
              component={Button}
              onClick={handleClose}
              className={classes.listItem}
            >
              {/* <ListItemAvatar>{item.icon}</ListItemAvatar> */}
              {/* <ListItemText primary={item.label}></ListItemText> */}
            </ListItem>
          ))}
        </List>
        {userState.userInfo ? (
          <>
            {" "}
            <ListItem component={Button} onClick={logoutHandler}>
              LogOut
            </ListItem>
          </>
        ) : (
          <ListItem component={Button} onClick={logoutHandler}>
            Sign In
          </ListItem>
        )}
      </Menu>
    </Fragment>
  );
}
