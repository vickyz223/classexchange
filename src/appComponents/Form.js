import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios'
import React from 'react'
import { useState } from 'react';

// mui imports 
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Form = ({classes}) => {
    const [newFind, setNewFind] = useState(''); 
    const [newExchange, setNewExchange] = useState(''); 
    const [newDesc, setDesc] = useState('')

    const handleSubmit = async () => {
         const newPost = {
            user: "placeholder",
            finding: newFind, 
            exchanging: newExchange, 
            description: newDesc
         }
        await axios.post('http://localhost:3001/api/exchanges', newPost)
    }
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
            <button onClick={handleSubmit}>Submit</button>
            <Popup />
        </div>
    )
}

const Popup = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Form