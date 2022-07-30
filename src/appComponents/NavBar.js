import './styles/navbar.css'
import SignIn from './SignIn'
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { logout } from '../reducers/userReducer';

const NavBar = () => {
    const dispatch = useDispatch()
    let navigate = useNavigate(); 

    const user = useSelector(state => state.user)
    
    const signout = () => {
        dispatch(logout())
    }

    if (user == null || user == "") {
        return (
            <div class="navbar">
                <SignIn />
                <button onClick={() => navigate("/signup")}>Sign Up</button>
            </div>
        )
    } else {
        return (
          <div class="navbar">
            <button onClick={signout}>Logout</button>
            <button onClick={() => navigate("/posts")}>
              My posts
            </button>
          </div>
        );
    }
    
}

export default NavBar