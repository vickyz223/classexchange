import * as React from 'react';
import axios from 'axios'

// mui imports
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

const SignIn = ({setUser}) => {
    const [sOpen, setSOpen] = React.useState(false); 
    const [username, setUsername] = React.useState(''); 
    const [password, setPass] = React.useState('')
    const handleClickOpen = () => {
        setSOpen(true);
    };

    const handleClose = () => {
        setSOpen(false);
    };

    const login = async credentials => {
        const response = await axios.post("http://localhost:3001/api/login", credentials)
        console.log(response.data)
        return response.data
    }

    const handleSubmit = async () => {
        try {
            const user = await login({username, password,})
            console.log("user", user)
            setUser(user)
            setUsername('')
            setPass('')
        } catch (exception) {
            console.log(exception.message)
        }
        setSOpen(false)
    }

    return (
        <div>
        <Button variant="outlined" onClick={handleClickOpen}>
            Open form dialog
        </Button>
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