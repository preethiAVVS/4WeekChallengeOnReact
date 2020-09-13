import Axios from 'axios';
import React, { Component } from 'react';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }
    componentDidUpdate() {
        if (this.props.id) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
                Axios.get("/posts/" + this.props.id).then(response => {
                    console.log(response);
                    this.setState({ loadedPost: response.data });
                })
            }
        }
    }

    deleteHandler = (id) => {
        Axios.delete("/posts/" + id).then(response => {
            console.log(response);
        })
    }
    render() {
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if (this.props.id) {
            post = <p style={{ textAlign: 'center' }}>loading....</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={() => this.deleteHandler(this.state.loadedPost.id)}>Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;