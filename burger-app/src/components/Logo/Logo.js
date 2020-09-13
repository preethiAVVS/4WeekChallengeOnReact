import React from "react";
import burgerLogo from "../../assests/img/burger-logo.png";
import classes from "./Logo.module.css";
const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="burger logo"/>
    </div>

)
export default logo;