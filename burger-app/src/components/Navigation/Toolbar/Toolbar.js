import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToogle from "../SideDrawer/DrawerToggle/DrawerToggle";
const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToogle clicked={props.drawerClicked}></DrawerToogle>
        <div className={classes.Logo}><Logo/></div>
        <div className={classes.DesktopOnly}><NavigationItems isAuth={props.isAuth}></NavigationItems></div>
        
    </header>
)
export default Toolbar;