import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

// import Posts from './containers/Posts';
import User from './containers/User';
import Welcome from './containers/Welcome';

const Posts = React.lazy(() => import("./containers/Posts"));
class App extends Component {
  state = {
    show: false
  }
  setStateHandler = () =>{
    this.setState(prevState => {
      return {show: !prevState.show}
    });
  }
  render() {
    return (
      <React.Fragment>
      <button onClick={this.setStateHandler}>Toogle</button>
      {this.state.show ? (<Suspense fallback={<div>Loading...</div>}><Posts/></Suspense>) : <User/>}

      </React.Fragment>
      // <BrowserRouter>
      //   <React.Fragment>
      //     <nav>
      //       <NavLink to="/user">User Page</NavLink> |&nbsp;
      //       <NavLink to="/posts">Posts Page</NavLink>
      //     </nav>
      //     <Route path="/" component={Welcome} exact />
      //     <Route path="/user" component={User} />
      //     {/* <Route path="/posts" component={Posts} /> */}
      //     <Route path="/posts" render={() => (<Suspense fallback={<div>Loading...</div>}><Posts/></Suspense>)} />
      //   </React.Fragment>
      // </BrowserRouter>
    );
  }
}

export default App;
