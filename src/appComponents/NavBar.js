import './styles/navbar.css'
import SignIn from './SignIn'
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { setNotice, clearNotice } from '../reducers/noticeReducer';

const NavBar = ({setUser, user, setError}) => {
    const dispatch = useDispatch()
    const logout = () => {
        window.localStorage.clear()
        setUser(null)
        dispatch(setNotice(["Successfully logged out", "success"]))
        setTimeout(() => {
            dispatch(clearNotice())
        }, 5000)
    }

    if (user == null) {
        return (
            <div class="navbar">
                <SignIn setUser={setUser} />
                <button>Sign Up</button>
            </div>
        )
    } else {
        return (
            <div class="navbar">
                <button onClick={logout}>Logout</button>
                <button>My posts</button>
            </div>
        )
    }
    
}

export default NavBar