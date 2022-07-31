import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setNotice, clearNotice } from "../reducers/noticeReducer";
import { useDispatch } from "react-redux";

import axios from "axios";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Error from "./Error";

import ContactForm from "./ContactForm";

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
      <div>
        <Error />
        <form>
          <label for="username">Username:</label>
          <input
            type="text"
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <br />
          <label for="password">Password:</label>
          <input
            type="text"
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          ></input>
          <br />
        </form>
        <br /> <br />
        <ContactForm contacts={contacts} setContacts={setContacts} />
        <br />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    );
}

export default SignUp