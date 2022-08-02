import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import "./styles/contactform.css";

import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import loginService from "../services/login"

import axios from "axios";
import { setUser } from "../reducers/userReducer";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearNotice, setNotice } from "../reducers/noticeReducer";

const ContactDialogue = ({ contacts, setContacts }) => {
  const [open, setOpen] = React.useState(false);
  const [localUser, setLocalUser] = React.useState(
    useSelector((state) => state.user)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      //get user
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      loginService.setToken(user.token);
      setLocalUser(user);
      setContacts(user.contacts);
    }
  }, [setLocalUser]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  console.log("user", localUser)

  const handleClose = async () => {
    if (localUser) {
      const updated = {
        contacts: contacts,
      };
      await axios
        .put("http://localhost:3001/api/users/" + localUser.id, updated)
        .then((newuser) => {
          dispatch(setUser(newuser.data));
          setLocalUser(newuser.data); 
          console.log("newuser",newuser.data)
        });
    }
    setOpen(false);
  };

  return (
    <div className="contactform">
      <button className="round" variant="outlined" onClick={handleClickOpen}>
        Edit Contact Info
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <div id="dialogContact">
            <ContactForm contacts={contacts} setContacts={setContacts} />
            <button autoFocus onClick={handleClose}>
              Submit
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const ContactForm = ({ contacts, setContacts }) => {
  const dispatch = useDispatch();
  const addContact = (event) => {
    event.preventDefault();
    const contactMethod = event.target.contactMethod.value;
    const contactInfo = event.target.contactInfo.value;

    if (contactMethod === "" || contactInfo === "") {
      dispatch(setNotice(["Both contact fields are required", "error"]));
      setTimeout(() => dispatch(clearNotice()), 5000);
      return;
    } else {
      let string = contactMethod + ": " + contactInfo;
      setContacts([...contacts, string]);
      event.target.contactMethod.value = "";
      event.target.contactInfo.value = "";
    }
  };

  const handleDelete = (h) => () => {
    setContacts((contacts) => contacts.filter((curr) => curr !== h));
  };

  return (
    <div id="contactForm">
      <form id="formc" onSubmit={addContact}>
        <h1 className="h1">Contact information</h1>
        <div id="contactformcontents">
          <div className="input-name">
            <label for="contact-method">
              Method of Contact (Email, Instagram, etc.):{" "}
            </label>
            <br />
            <input type="text" name="contactMethod"></input>
            <span class="underline-animation"></span>
          </div>

          <div className="input-name">
            <label for="contact-info">
              Contact details (Username/Tag/etc.):{" "}
            </label>
            <br />
            <input type="text" name="contactInfo"></input>
            <span class="underline-animation"></span>
          </div>
          <button className="round" id="contactbutton" type="submit">
            Add contact
          </button>
        </div>
      </form>

      <Stack direction="column" spacing={1}>
        {contacts.map((contact) => (
          <Chip
            key={contact}
            label={contact}
            onDelete={handleDelete(contact)}
          />
        ))}
      </Stack>
    </div>
  );
};

export default ContactDialogue;
