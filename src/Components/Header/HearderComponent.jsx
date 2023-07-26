import React, { Fragment } from "react";
import { Box } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import { useStyles } from "./HeaderStyle";
import NavbarComponent from "./NavbarComponent";
import Sidenav from "./Sidenav";
import Notification from "./ActionTab/Notification";
import BlogPost from "../BodyComponent/BlogPost";
import Dashboard from "../BodyComponent/Dashboard/Dashboard";
import Link1 from "../BodyComponent/Link1";
import CommentCard from "../BodyComponent/Dashboard/CommentCard";
import NewsAdminManager from "../BodyComponent/Dashboard/NewsAdminManager";
import { SignUp } from "../BodyComponent/Dashboard/Register";
import { SignIn } from "../BodyComponent/Dashboard/SignIn";
export default function HearderComponent() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleDrawerClose = () => {
    setMobileOpen(false);
  };
  return (
    <Fragment>
      <NavbarComponent handleDrawerToggle={handleDrawerToggle} />
      <Sidenav
        mobileOpen={mobileOpen}
        handleDrawerClose={handleDrawerClose}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box className={classes.wrapper}>
        <Switch>
          <Route exact path="/" render={() => <Dashboard />} />
          <Route exact path="/blog" render={() => <BlogPost />} />
          <Route exact path="/link1" render={() => <Link1 />} />
          <Route exact path="/notification" render={() => <Notification />} />
          <Route exact path="/comments" render={() => <CommentCard />} />
          <Route exact path="/news" render={() => <NewsAdminManager />} />
          <Route exact path="/register" render={() => <SignUp />} />
          <Route exact path="/login" render={() => <SignIn />} />
        </Switch>
      </Box>
    </Fragment>
  );
}
