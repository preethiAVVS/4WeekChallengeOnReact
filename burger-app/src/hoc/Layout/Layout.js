import React, { Component } from 'react';
import Auxiliary from "../Auxiliary/Auxiliary";
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from "./Layout.module.css";

class Layout extends Component{
    state = {
        showSideDrawer: true
    }

    sideDrawerClosehandler = () => {
        this.setState({showSideDrawer: false})
    }
    drawerHandler = () => {
        this.setState((prevState) => {
            return  {
                showSideDrawer : !prevState.showSideDrawer
            }
        });
    }
    render() {
        return (
            <Auxiliary>
            <Toolbar drawerClicked={this.drawerHandler}></Toolbar>
            <SideDrawer open={this.state.showSideDrawer} click={this.sideDrawerClosehandler}></SideDrawer>
            <main className={classes.Context}>
                {this.props.children}
            </main>
            </Auxiliary>
        );

    }

}

export default Layout;