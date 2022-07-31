import * as React from 'react';
import { useDispatch } from 'react-redux';
import { setNotice, clearNotice } from '../reducers/noticeReducer';
import { login } from '../reducers/userReducer';

// mui imports
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useNavigate } from 'react-router-dom';
import './styles/signin.css'

const SignIn = () => {
    const [sOpen, setSOpen] = React.useState(false); 
    const [username, setUsername] = React.useState(''); 
    const [password, setPass] = React.useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setSOpen(true);
    };

    const handleClose = () => {
        setSOpen(false);
    };

    const handleSubmit = (event) => {
      event.preventDefault()
      console.log("here")
        try {
            dispatch(login("user", "pass"));
            setUsername('')
            setPass('')
            dispatch(login(username, password));
            navigate('/')
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
        <button onClick={handleClickOpen}>LOGIN</button>
        <Dialog open={sOpen} onClose={handleClose}>
          <DialogContent>
            <form className="form">
              <h2 id="banner">
                Welcome to the <b class="bold">UCLA Class Exchange</b>.
              </h2>
              <div className="input-name">
                <label for="username">Username:</label> <br />
                <input
                  type="text"
                  onChange={({ target }) => setUsername(target.value)}
                />
                <span class="underline-animation"></span>
              </div>
              <br />
              <div className="input-name">
                <label for="password">Password:</label> <br />
                <input
                  type="text"
                  onChange={({ target }) => setPass(target.value)}
                />
                <span class="underline-animation"></span>
              </div>
              <br />
              <button onClick={handleSubmit} id="loginbutton">
                LOGIN
              </button>
              <br /> 
              <p>Don't have an account?</p>
              <button id="loginbutton" onClick={() => navigate("/signup")}>SIGN UP</button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
}

export default SignIn