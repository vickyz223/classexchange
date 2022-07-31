import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import './styles/contactform.css'

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import axios from 'axios'


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../services/login";
import { setUser } from "../reducers/userReducer";

import { useDispatch, useSelector } from "react-redux";
import { setNotice, clearNotice } from "../reducers/noticeReducer";

const ContactDialogue = ({ contacts, setContacts, setPostUser, postUser }) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    if (user) {
      const updated = {
        contacts: contacts,
      };
      const newUser = axios
        .put("http://localhost:3001/api/users/" + user.id, updated)
        .then((user) => setPostUser(user.data));
      dispatch(setUser(postUser));
    }
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit Contact Info
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
};

const ContactForm = ({ contacts, setContacts }) => {
  const dispatch = useDispatch();
  const addContact = (event) => {
    event.preventDefault();
    const contactMethod = event.target.contactMethod.value;
    const contactInfo = event.target.contactInfo.value;

    if (contactMethod == "" || contactInfo == "") {
      dispatch(setNotice("Both contact fields are required"));
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
      <form id="form" onSubmit={addContact}>
        <p>Contact information</p>
        <label for="contact-method">
          Method of Contact (email, instagram, discord, etc.):{" "}
        </label>
        <br />
        <input type="text" name="contactMethod"></input>
        <br />

        <label for="contact-info">Contact details (username/tag/etc.): </label>
        <br />

        <input type="text" name="contactInfo"></input>
        <br />
        <button type="submit">Add contact</button>
      </form>

      <Stack direction="row" spacing={1}>
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

export default ContactDialogue 