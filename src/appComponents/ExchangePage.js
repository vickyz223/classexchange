import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './styles/exchange.css'

const ExchangePage = () => {
    const [post,setPost] = useState(null)
    const postId = useParams().postId;
    useEffect( () => {
         axios
           .get("http://localhost:3001/api/exchanges/" + postId)
           .then((post) => setPost(post.data));
    }, []) 
    
    if (post !== null) {
        return (
          <div className="exchangeHolder">
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
