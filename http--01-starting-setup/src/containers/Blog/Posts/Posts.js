import React, {Component} from "react";
import Post from "../../../components/Post/Post";
import axios from "../../../axios";
import './Posts.css';
import FullPost from "../FullPost/FullPost";
import { Link, Route } from "react-router-dom";
class Posts extends Component {
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
    //    this.setState({selectedpostId: id});
    this.props.history.push("/posts/" + id);
    }
    render() {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!!!</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                // <Link to={"/posts/" + post.id} key={post.id}>
                    <Post  key={post.id} title={post.title} author={post.author} clicked={() => this.selectpostHandler(post.id)}></Post>
                // </Link>
                )
            });
        }
        return (
            <div>
            <section className="Posts">
            {posts}
            </section>
        <Route path={this.props.match.url +"/:id"} exact component={FullPost}/>
        </div>
        )
         
    }

}

export default Posts;