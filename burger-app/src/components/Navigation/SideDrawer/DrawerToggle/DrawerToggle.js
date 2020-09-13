import React from "react";
import classes from "./DrawerToggle.module.css";
const DrawerToogle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)
export default DrawerToogle;