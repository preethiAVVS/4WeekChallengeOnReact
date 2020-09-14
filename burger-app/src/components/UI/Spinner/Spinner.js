import React from "react";
import classes from "./Spinner.module.css";

const spinner = (props) => {
    console.log("loading");
    return <div className={classes.loader}>Loading...</div>
}

export default spinner;