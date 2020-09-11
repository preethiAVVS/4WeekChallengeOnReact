import React from 'react';
import Auxiliary from "../../hoc/Auxiliary";
import classes from "./Layout.module.css";
const Layout = (props) => {
    return (
        <Auxiliary>
        <div>
            Toolbar
        </div>
        <main className={classes.Context}>
            {props.children}
        </main>
        </Auxiliary>
    );
}

export default Layout;