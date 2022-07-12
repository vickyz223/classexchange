import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios'
import React from 'react'
import Temp from './Temp'
import { useState } from 'react';

// mui imports 
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Popup = ({classes}) => {
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Temp />
      <Button variant="outlined" 
              color="primary" onClick={handleClickOpen}>
        Make a new post!
      </Button>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle>
           New exchange request
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Form classes={classes} handleClickClose={handleClickClose}/>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  )
}

const Form = ({classes,handleClickClose}) => {
    const [newFind, setNewFind] = useState(''); 
    const [newExchange, setNewExchange] = useState(''); 
    const [newDesc, setDesc] = useState('')

    const handleDesc = (event) => {
        setDesc(event.target.value)
    }

    return(
        <div>
            <h1>Submit a new request</h1>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={classes}
                onChange={(event, value) => setNewFind(value)}
                renderInput={(params) => <TextField {...params} label="Class you're looking for: " />}
            />
            <br />
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={classes}
                onChange={(event, value) => setNewExchange(value)}
                renderInput={(params) => <TextField {...params} label="Class you're exchanging (Optional): " />}
            />
            < br/>
            <TextField
                id="outlined-textarea"
                label="Description and Additional Info"
                placeholder="Placeholder"
                rows={4}
                multiline
                value={newDesc}
                onChange={handleDesc}
            />
            <br /><br />
            <Submit newFind={newFind} newDesc={newDesc} newExchange={newExchange} handleClickClose={handleClickClose}/>
        </div>
    )
}

const Submit = ({newFind, newDesc, newExchange, handleClickClose}) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSubmit = async () => {
        const newPost = {
            user: "placeholder",
            finding: newFind, 
            exchanging: newExchange, 
            description: newDesc
        }
        await axios.post('http://localhost:3001/api/exchanges', newPost)
        setOpen(false); 
        handleClickClose(); 
    }

    const handleClose = () => {
        setOpen(false); 
    }

    return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Submit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Submit exchange?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once you've submitted, you can edit your request in your profile.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Yes, I'm done</Button>
          <Button onClick={handleClose} autoFocus>
            No, go back to form
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Popup