import React, { Component } from 'react';
import Auxiliary from "../Auxiliary/Auxiliary";
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from "./Layout.module.css";
import {connect} from "react-redux";

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
            <Toolbar drawerClicked={this.drawerHandler} isAuth={this.props.onAuth}></Toolbar>
            <SideDrawer open={this.state.showSideDrawer} click={this.sideDrawerClosehandler} isAuth={this.props.onAuth}></SideDrawer>
            <main className={classes.Context}>
                {this.props.children}
            </main>
            </Auxiliary>
        );

    }

}

const mapStateToProps = (state) => {
    return {
        onAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);