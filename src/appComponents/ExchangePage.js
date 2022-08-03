import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./styles/exchange.css";

import NavBar from './NavBar'

const ExchangePage = () => {
  const [post, setPost] = useState(null);
  const postId = useParams().postId;
  useEffect(() => {
    axios
      .get("/api/exchanges/" + postId)
      .then((post) => setPost(post.data));
  }, []);

  const postDetails = () => {
    if (post.description !== "") {
      return (
        <>
          <h3 className="nomargin">Additional post details: </h3>
          <p className="gray">{post.description}</p>
        </>
      );
    } else {
      return (
        <>
          <h3 className="nomargin">This post has no description.</h3>
        </>
      );
    }
  }

  const contactDetails = () => {
    if (post.user.contacts.length === 0) {
      return (
        <>
          <h3 className="nomargin">This user has no contact details.</h3>
        </>
      );
    } else {
      return (
        <>
          <h3 className="nomargin">You can contact them at</h3>
          {post.user.contacts.map((contact) => (
            <p>{contact}</p>
          ))}
        </>
      );
    }
  }

  if (post !== null) {
    console.log(post);
    return (
      <div className="allexchange">
        <NavBar id="postnav" style={{left: "0px"}}/>
        <div className="exchangeHolder">
          <p className="p2">
            <b id="username">{post.user.username}</b> is looking for
          </p>
          <h3>
            <b id="finding">{post.finding}</b>
          </h3>
          <p className="p2">in exchange for</p>
          <div className="exchanging">
            {post.exchanging.map((exchange) => (
              <h2>{exchange}</h2>
            ))}
          </div>
          {postDetails()}
          {contactDetails()}
        </div>
      </div>
    );
  } else {
    return <div>This post doesn't exist.</div>;
  }
};

export default ExchangePage;
