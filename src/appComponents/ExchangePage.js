import { useEffect, useState } from "react";
import { Route, Link, Routes, useParams } from "react-router-dom";
import axios from "axios";

const ExchangePage = () => {
    const [post,setPost] = useState(null)
    const postId = useParams().postId;
    useEffect( () => {
         axios
           .get("http://localhost:3001/api/exchanges/" + postId)
           .then((post) => setPost(post.data));
    }, []) 
    console.log("post", post)
    
    if (post !== null) {
        return (
          <div>
            <h1>{post.user.username}</h1>
            <p>is looking for</p>
            <h2>{post.finding}</h2>
            <p>in exchange for</p>
            {post.exchanging.map(exchange => <h2>{exchange}</h2>)}
            <p>{post.description}</p>
            <h3>You can contact them at</h3>
            {post.user.contacts.map(contact => <p>{contact}</p>)}
          </div>
        );
    } else {
        return (
            <div>
                This post doesn't exist. 
            </div>
        )
    }
};

export default ExchangePage;
