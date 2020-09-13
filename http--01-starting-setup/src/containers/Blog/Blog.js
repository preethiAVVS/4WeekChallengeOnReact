import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
//import Axios from 'axios';
import axios from "../../axios";

class Blog extends Component {
    state = {
        posts: [],
        selectedpostId: null,
        error: false
    }
    componentDidMount() {
        axios.get("/posts").then(response => {
            console.log(response);
            const posts = response.data.slice(0, 4);
            const updatedposts = posts.map(post => {
                return {
                    ...post,
                    author: "Preethi"
                }
            })
            this.setState({ posts: updatedposts });
        }).catch(error => {
            this.setState({error: true})
        });
    }

    selectpostHandler = (id) => {
        this.setState({selectedpostId: id});
    }
    render() {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!!!</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post key={post.id} title={post.title} author={post.author} clicked={() => this.selectpostHandler(post.id)}></Post>
            });
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedpostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;