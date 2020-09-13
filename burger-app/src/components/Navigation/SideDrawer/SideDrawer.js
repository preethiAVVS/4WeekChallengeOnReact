import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../Logo/Logo";
import classes from "./SideDrawer.module.css";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../../UI/Backdrop/Backdrop";
const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return <Auxiliary> <Backdrop show={props.open} clicked={props.click}></Backdrop>
        <div className={attachedClasses.join( " ")}>
        <div className={classes.Logo}> <Logo></Logo></div>
        <nav>
            <NavigationItems></NavigationItems>
        </nav>
    </div>
    </Auxiliary>
}
export default SideDrawer;