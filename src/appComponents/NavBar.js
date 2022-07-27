import './styles/navbar.css'
import SignIn from './SignIn'
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotice, clearNotice } from '../reducers/noticeReducer';
import { logout } from '../reducers/userReducer';

const NavBar = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    
    const signout = () => {
        console.log("bruh500")
        dispatch(logout())
    }

    if (user == null || user == "") {
        return (
            <div class="navbar">
                <SignIn />
                <button>Sign Up</button>
            </div>
        )
    } else {
        return (
            <div class="navbar">
                <button onClick={signout}>Logout</button>
                <button>My posts</button>
            </div>
        )
    }
    
}

export default NavBar