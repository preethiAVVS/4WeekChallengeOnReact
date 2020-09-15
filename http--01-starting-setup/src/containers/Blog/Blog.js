import React, { Component } from 'react';

//import FullPost from './FullPost/FullPost';
//import NewPost from './NewPost/NewPost';
import './Blog.css';
import {Route, NavLink, Switch, Redirect} from "react-router-dom";
import Posts from "./Posts/Posts";
import asyncComponent from "../../hoc/asyncComponent";
//import Axios from 'axios';
const asyncompont = asyncComponent(() => {
    return import("./NewPost/NewPost");
})


class Blog extends Component {


    render() {

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                            to="/posts"
                            exact
                            activeClassName="my-active"
                            activeStyle={{
                                color: '#fa923f',
                                textDecoration: 'underline'
                            }}>
                                HOME</NavLink></li>
                            <li><NavLink to={{
                                pathname: "/new-post",
                                hash: '#submit',
                                search: '?quick-submit=true'}}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <h1>HOME</h1>}/> */}
                {/* <Route path="/" exact component={Posts}/>
                <Route path="/new-post" exact component={NewPost}/>
                <Route path="/:id" exact component={FullPost}/> */}

                <Switch>
                
                <Route path="/new-post" exact component={asyncompont}/>
                <Route path="/posts" component={Posts}/>
                <Route render={() => <h1>NOT FOUND</h1>}></Route>
                {/* <Redirect from="/" to="/posts"></Redirect> */}

                </Switch>
                {/* <section>
                    <FullPost id={this.state.selectedpostId} />
                </section>
                <section>
                    <NewPost />
                </section> */}
            </div>
        );
    }
}

export default Blog;