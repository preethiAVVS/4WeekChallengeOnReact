import React, { Component } from 'react';
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import Logout from './containers/Auth/Logout/Logout';
import {connect} from "react-redux";
import  * as actions from "./store/actions/index"; 
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const ayncCheckOut = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
})
const ayncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
})
const ayncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
})

class App extends Component {
  componentDidMount() {
    this.props.oncheckAuthState();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={ayncAuth}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/"></Redirect>
      </Switch>
    )
    if (this.props.onAuth) {
      routes = (<Switch>
      <Route path="/checkout" component={ayncCheckOut}/>
      <Route path="/orders" component={ayncOrders}/>
      <Route path="/logout" component={Logout}/>
      <Route path="/auth" component={ayncAuth}/>
      <Route path="/" exact component={BurgerBuilder}/>
      <Redirect to="/"></Redirect>
      </Switch>);
    }
    return (
      <div>
        <Layout>
          {routes}
          {/* <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/auth" component={Auth}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/" exact component={BurgerBuilder}/>
          </Switch> */}

        {/* <BurgerBuilder></BurgerBuilder>
        <Checkout></Checkout> */}
        </Layout>
        

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      onAuth: state.auth.token !== null
  }
}


const mapDispatchToProps = dispatch => {
  return {
      oncheckAuthState: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
