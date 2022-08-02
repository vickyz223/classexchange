import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../services/login";

import axios from "axios";

import { setUser } from "../reducers/userReducer";
import { setNotice, clearNotice } from "../reducers/noticeReducer";
import ContactDialogue from "./ContactForm";
import Error from "./Error";
import NavBar from "./NavBar";

import "./styles/myposts.css";
import * as React from "react";

const MyPosts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [myPosts, setPosts] = useState([]);
  const [postUser, setPostUser] = useState(null);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      //get user
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      loginService.setToken(user.token);
      setPostUser(user);
      setContacts(user.contacts);
      //get posts
      axios
        .get("http://localhost:3001/api/users/" + user.id)
        .then((response) => setPosts(response.data.exchanges));
    } else {
      navigate("/");
      dispatch(
        setNotice(["You've been logged out. Please log back in.", "warning"])
      );
      setTimeout(() => dispatch(clearNotice()), 5000);
    }
  }, []);

  return (
    <div>
      <Error />
      <div id="myPostsAll">
        <NavBar />
        <div id="banner2"></div>
        <div id="userinfo">
          <h1 className="bannername">
            {postUser !== null && postUser.username}
          </h1>
          <div id="contactinfo">
            <h2>Contact Information</h2>
            {postUser !== null &&
              postUser.contacts.map((contact) => <p>{contact}</p>)}
            <ContactDialogue
              contacts={contacts}
              setContacts={setContacts}
              setPostUser={setPostUser}
              postUser={postUser}
            />
          </div>
        </div>
        <div>
          <h1>Your posts</h1>
          <div className="myPosts">
            {myPosts.map((post) => (
              <Exchange exchange={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Exchange = ({ exchange }) => {
  const handleDelete = () => {
    loginService.remove(exchange._id);
  };

  return (
    <div id="exchangeHolder">
      <div className="exchange">
        <div>
          <p>You're exchanging</p>
          <div className="exchange-middle">
            <h3 className="for bold">{exchange.finding}</h3>
            <p className="for"> for </p>
            <div className="exchange-classes bold">
              {exchange.exchanging.map((exchange) => (
                <h4>{exchange}</h4>
              ))}
            </div>
          </div>
          <p className="small">{exchange.description}</p>
        </div>
      </div>
      <button className="exchangebutton" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default MyPosts;
