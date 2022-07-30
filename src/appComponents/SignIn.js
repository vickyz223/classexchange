import * as React from 'react';
import { useDispatch } from 'react-redux';
import { setNotice, clearNotice } from '../reducers/noticeReducer';
import { login } from '../reducers/userReducer';

// mui imports
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

const SignIn = () => {
    const [sOpen, setSOpen] = React.useState(false); 
    const [username, setUsername] = React.useState(''); 
    const [password, setPass] = React.useState('')
    const dispatch = useDispatch()

    const handleClickOpen = () => {
        setSOpen(true);
    };

    const handleClose = () => {
        setSOpen(false);
    };

    const handleSubmit =  () => {
        try {
            dispatch(login("user", "pass"));
            setUsername('')
            setPass('')
            dispatch(login(username, password));
        } catch (exception) {
            dispatch(setNotice(["Wrong username or password", "error"]));
            setTimeout(() => {
              dispatch(clearNotice());
            }, 5000);
            return
        }
        dispatch(setNotice(["Successfully logged in!", "success"]));
        setTimeout(() => {
          setSOpen(false);
          dispatch(clearNotice());
        }, 5000); 
    }

    return (
        <div>
        <Button variant="outlined" onClick={handleClickOpen}>Login</Button>
        <Dialog open={sOpen} onClose={handleClose}>
            <DialogContent>
                <form>
                    <label for="username">Username:</label><br />
                    <input type="text" onChange={({ target }) => setUsername(target.value)}/><br /><br />
                    <label for="password">Password:</label><br />
                    <input type="text" onChange={({ target }) => setPass(target.value)} />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit}>Login</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}

export default SignIn