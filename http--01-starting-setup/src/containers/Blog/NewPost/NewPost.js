import Axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router';

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted: false
    }

    addPostHandler = () => {
        const data = {
            title: this.state.title,
            author: this.state.author,
            content: this.state.content
        }
        Axios.post("/posts", data).then(response => {
            console.log(response);
        //    this.props.history.push("/posts");
        this.props.history.replace("/posts");
        //    this.setState({submitted: true});
        })
    }

    render () {
        let render = null;
        if(this.state.submitted) {
             render = <Redirect to="/posts"/>
        }
        return (
            <div className="NewPost">
                {render}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.addPostHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;