import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setNotice, clearNotice } from "../reducers/noticeReducer";
import { useDispatch } from "react-redux";

import axios from "axios";
import Error from "./Error";

import ContactForm from "./ContactForm";
import NavBar from './NavBar'
import SignIn from "./SignIn";
import './styles/signup.css'

const SignUp = () => {
    const [contacts, setContacts] = useState([])
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const checkValidation = () => {
        return true; 
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        if (checkValidation()) {
            const user = {
                username: username,
                password: password,
                contacts: contacts 
            }
            signup(user)
        }
    }

    async function signup(reqBody) {
      try {
        let res = await axios({
          method: "post",
          url: "http://localhost:3001/api/users",
          data: reqBody,
        });
        let data = res.data;
        dispatch(
          setNotice([
            "Account successfully created! Welcome, " + reqBody.username + ".",
            "success"
          ])
        );
        navigate("/")
        setTimeout(() => dispatch(clearNotice()), 5000);
        return data;
      } catch (error) {
        dispatch(setNotice(["Username taken. Please choose another username.", "error"]))
        setTimeout(() => dispatch(clearNotice()), 5000)
      }
    }

    return (
      <div id="signupholder">
        <div id="signupall">
          <NavBar />
          <Error />
          <form id="signupform">
            <h2>
              Welcome to the <b class="bold">UCLA Class Exchange</b>.
            </h2>
            <br/>
            <div className="input-name">
              <label for="username">Username:</label>
              <br/>
              <input
                type="text"
                name="username"
                onChange={({ target }) => setUsername(target.value)}
              />
              <span class="underline-animation"></span>
            </div>
            <br />
            <div className="input-name">
              <label for="password">Password:</label>
              <br/>
              <input
                type="text"
                name="password"
                onChange={({ target }) => setPassword(target.value)}
              ></input>
              <span class="underline-animation"></span>
            </div>
          </form>
          <div className="contacts">
            {contacts.map((contact) => (
              <p>{contact}</p>
            ))}
            <ContactForm contacts={contacts} setContacts={setContacts} />
          </div>
          <button  onClick={handleSubmit}>
            Sign up
          </button>
          <br />
          <p>Already a user?</p>
          <SignIn />
        </div>
      </div>
    );
}

export default SignUp