import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios'
import React from 'react'
import { useState } from 'react';
import './styles/form.css'

// mui imports 
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';

const Popup = ({classes}) => {
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <div class="allF">
      <Button variant="outlined" 
              color="primary" onClick={handleClickOpen}>
        Make a new post!
      </Button>
      <Dialog open={open} onClose={handleClickClose}>
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
    const [misc, setMisc] = useState('')
    const [open, setOpen] = React.useState(false);

    const handleDesc = (event) => {
      setDesc(event.target.value)
    }
    const handleMisc = (event) => {
      setMisc(event.target.value)
    }

    return(
        <div className='form'>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={classes}
                onChange={(event, value) => setNewFind(value)}
                renderInput={(params) => <TextField {...params} label="Class you're looking for: " />}
            />
              <Autocomplete
                multiple
                id="tags-outlined"
                options={classes}
                onChange={(event, value) => {setNewExchange(value)}}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Classes you're exchanging"
                  />
                )}
              />
            <TextField 
              id="standard-basic" 
              label="Other (10 swipes, $10, etc.)" 
              variant="standard" 
              inputProps={{ maxLength: 15 }}
              onChange={handleMisc}
            />
            <TextField
                id="outlined-textarea"
                label="Additional Info"
                rows={4}
                multiline
                value={newDesc}
                inputProps={{ maxLength: 100 }}
                onChange={handleDesc}
            />
            <Submit newFind={newFind} newDesc={newDesc} newExchange={newExchange} handleClickClose={handleClickClose} misc={misc} open={open} setOpen={setOpen}/>
        </div>
    )
}

const Submit = ({newFind, newDesc, newExchange, handleClickClose, misc, open, setOpen }) => {

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleError = () => {
      if (newFind === '' || newFind === null) {
        return <Alert severity="error">You must add a class you're looking for.</Alert>
      } else if (newExchange.length === 0 && misc === '') {
        return <Alert severity="error">You must add something you're exchanging.</Alert>
      } else if (newExchange.length > 4) {
        return <Alert severity="error">The number of classes you're exchanging can't be more than four.</Alert>
      } else {
          return (
            <div>

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
            </div>
          )
      }
    }

    const handleSubmit = async () => {

      let ex = newExchange; 
      if (misc !== '') {
        ex.push(misc)
      }
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
        
        
        {handleError()}
        
      </Dialog>
    </div>
  );
}

export default Popup