import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../services/login"

import axios from "axios";

import { setUser } from "../reducers/userReducer";
import { setNotice, clearNotice } from "../reducers/noticeReducer";
import ContactForm from "./ContactForm";
import Error from "./Error";

//mui imports 
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

const MyPosts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [myPosts, setPosts] = useState([]);
  const [postUser, setPostUser] = useState(null);
  const [contacts, setContacts] = useState([])

  console.log(postUser)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      //get user
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      loginService.setToken(user.token);
      setPostUser(user);
      setContacts(user.contacts)
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
      <h1>{postUser !== null && postUser.username}</h1>
      <div>
        <h2>Contact Information</h2>
        {postUser !== null &&
          postUser.contacts.map((contact) => <p>{contact}</p>)}
        <Dialogue contacts={contacts} setContacts={setContacts} setPostUser={setPostUser} postUser={postUser} />
      </div>
      <h2>Your posts</h2>
      {myPosts.map((post) => (
        <Exchange exchange={post} />
      ))}
    </div>
  );
};

const Exchange = ({ exchange }) => {
  const handleDelete = () => {
    loginService.remove(exchange._id)
  };

  return (
    <div>
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
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

const Dialogue = ({contacts, setContacts, setPostUser, postUser}) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    console.log(user)
    const updated = {
      username: user.username, 
      contacts: contacts
    }
    console.log(user)
    const newUser = axios.put("http://localhost:3001/api/users/" + user.id, updated).then(user => setPostUser(user.data));
    dispatch(setUser(postUser))
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <ContactForm contacts={contacts} setContacts={setContacts} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Submit
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  }

export default MyPosts
