import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import React from "react";
import { useState } from "react";
import loginService from "../services/login";
import { useDispatch } from "react-redux";
import { setNotice, clearNotice } from "../reducers/noticeReducer";
import "./styles/form.css";

// mui imports
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const Popup = ({ classes, user }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <div class="allF">
      <button variant="outlined" color="primary" onClick={handleClickOpen}>
        Make a new post!
      </button>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogContent>
          <DialogContentText>
            <Form classes={classes} handleClickClose={handleClickClose} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Form = ({ classes, handleClickClose, user }) => {
  const [newFind, setNewFind] = useState("");
  const [newExchange, setNewExchange] = useState("");
  const [newDesc, setDesc] = useState("");
  const [misc, setMisc] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleDesc = (event) => {
    setDesc(event.target.value);
  };
  const handleMisc = (event) => {
    setMisc(event.target.value);
  };

  return (
    <div className="form2">
      <Autocomplete
        freeSolo
        disablePortal
        id="combo-box-demo"
        options={classes}
        onChange={(event, value) => setNewFind(value)}
        renderInput={(params) => (
          <TextField {...params} label="Class you're looking for: " />
        )}
      />
      <Autocomplete
        freeSolo
        multiple
        id="tags-outlined"
        options={classes}
        onChange={(event, value) => {
          setNewExchange(value);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Classes you're exchanging"
          />
        )}
      />
      <p id="minitext">Type and press 'Enter/Return' to add a class not on the list. </p>
      <TextField
        id="standard-basic"
        label="Other (10 swipes, $10, etc.)"
        variant="standard"
        inputProps={{ maxLength: 15 }}
        onChange={handleMisc}
      />
      <br />
      <TextField
        id="outlined-textarea"
        label="Additional Info"
        rows={4}
        multiline
        value={newDesc}
        onChange={handleDesc}
      />
      <Submit
        newFind={newFind}
        newDesc={newDesc}
        newExchange={newExchange}
        handleClickClose={handleClickClose}
        misc={misc}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

const Submit = ({
  newFind,
  newDesc,
  newExchange,
  handleClickClose,
  misc,
  open,
  setOpen,
  user,
}) => {
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    if (handleError() !== 1) {
      handleSubmit();
    }
  };

  const handleError = () => {
    if (newFind === "" || newFind === null) {
      dispatch(
        setNotice(["You must add a class you're looking for.", "error"])
      );
      setTimeout(() => dispatch(clearNotice()), 5000);
      return 1;
    } else if (newExchange.length === 0 && misc === "") {
      dispatch(setNotice(["You must add a class you're exchanging.", "error"]));
      setTimeout(() => dispatch(clearNotice()), 5000);
      return 1;
    } else if (newExchange.length > 4) {
      dispatch(
        setNotice([
          "The number of items you're exchanging can't be more than four.",
          "error",
        ])
      );
      setTimeout(() => dispatch(clearNotice()), 5000);
      return 1;
    }
  };

  const handleSubmit = async () => {
    let ex = newExchange;
    if (misc !== "") {
      ex.push(misc);
    }
    const newPost = {
      user: user,
      finding: newFind,
      exchanging: newExchange,
      description: newDesc,
    };
    loginService.create(newPost);

    dispatch(setNotice(["Successfully posted", "success"]));
    setTimeout(() => clearNotice(), 5000);

    setOpen(false);
    window.location.reload(false);
    handleClickClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="form2">
      <button className="loginbutton" onClick={handleClickOpen}>
        Submit
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      ></Dialog>
    </div>
  );
};

export default Popup;
