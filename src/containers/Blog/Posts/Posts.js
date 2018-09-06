import React, { Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount () {
        axios.get( '/posts' )
            .then( response => {
                const posts = response.data;
                this.setState( { posts: posts } );
            } )
            .catch( error => {
                this.setState({error: true});
            } );
    }

    getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

    render () {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        if ( !this.state.error ) {
            posts = this.state.posts.map( post => {
                return (
                    <Post
                        key={post.id}
                        title={post.title}
                        body={post.body}
                        color={this.getRandomColor()} />
                );
            } );
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>/>
            </div>
        );
    }
}

export default Posts;