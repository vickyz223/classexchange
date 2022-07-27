import * as React from 'react';
import loginService from '../services/login'
import { useDispatch } from 'react-redux';
import { setNotice, clearNotice } from '../reducers/noticeReducer';

// mui imports
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

const SignIn = ({setUser}) => {
    const [sOpen, setSOpen] = React.useState(false); 
    const [username, setUsername] = React.useState(''); 
    const [password, setPass] = React.useState('')
    const [error, setError] = React.useState(["", "success"])
    const dispatch = useDispatch()

    const handleClickOpen = () => {
        setSOpen(true);
    };

    const handleClose = () => {
        setSOpen(false);
    };

    const handleSubmit = async () => {
        try {
            const user = await loginService.login({username, password,})
            setUser(user)
            setUsername('')
            setPass('')
            loginService.setToken(user.token)
            window.localStorage.setItem(
                'loggedUser', JSON.stringify(user)
            )
            dispatch(setNotice(["Successfully logged in!", "success"]))
            setTimeout(() => {
                setSOpen(false)
                dispatch(clearNotice())
            }, 5000)
            
        } catch (exception) {
            dispatch(setNotice(["Wrong username or password", "error"]));
            setTimeout(() => {
              setSOpen(false);
              dispatch(clearNotice());
            }, 5000);
        }
        
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