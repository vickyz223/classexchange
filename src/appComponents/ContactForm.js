import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import { useDispatch } from "react-redux";
import { setNotice, clearNotice } from "../reducers/noticeReducer";

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
    <div>
      <p>Contact information</p>
      <form onSubmit={addContact}>
        <label for="contact-method">
          Method of Contact (email, instagram, discord, etc.):{" "}
        </label>
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

export default ContactForm 