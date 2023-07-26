import React from "react";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { useStyles } from "./HeaderStyle";

import DashboardIcon from "@material-ui/icons/Dashboard";
// import BookIcon from "@material-ui/icons/Book";
// import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { FeedbackOutlined } from "@material-ui/icons";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { logout } from "../../store/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function SidenavData({ handleDrawerClose }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const userState = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/login");
  };

  const listItemData = [
    { label: "Dashboard", link: "/", icon: <DashboardIcon /> },
    // { label: "Blog Post", link: "/blog", icon: <BookIcon /> },
    { label: "Get Feedbacks", link: "/comments", icon: <FeedbackOutlined /> },
    { label: "News", link: "/news", icon: <NewspaperIcon /> },
    // {
    //   label: "Notification",
    //   link: "/notification",
    //   icon: <NotificationsActiveIcon />,
    // },
    {
      label: "Register User",
      link: "/register",
      icon: <AppRegistrationIcon />,
    },
    {
      label: "Logout",
      id: "logout",
      link: "/login",
      icon: <ExitToAppIcon />,
    },
  ];

  if (userState.userInfo) {
    return (
      <List>
        {listItemData.map((item, i) => (
          <Button
            key={i}
            size="small"
            onClick={() => {
              if (item.id === "logout") {
                logoutHandler();
              } else {
                handleDrawerClose();
              }
            }}
            className={classes.navButton}
          >
            <ListItem
              exact
              key={i}
              component={NavLink}
              to={item.link}
              className={classes.navlink}
              activeClassName={classes.selectedNav}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.label}</ListItemText>
            </ListItem>
          </Button>
        ))}
      </List>
    );
  } else {
    history.push("/login");
    return null;
  }
}
