import React from 'react';

import './Post.css';

const post = (props) => (
    <div className="Container">
        <article className="Post" style={{backgroundColor: props.color}}>
        </article> 
        <div className="Info">
            <p className="Format"> <strong> {props.body} </strong> </p>
            <p className="Format" style={{color: "#e3e3e3"}}> {props.title} </p>
            <p className="Format" style={{color: "#7c7c7c"}}> <small> {props.body} </small> </p>
        </div>
    </div>    
);

export default post;