import './styles/navbar.css'
import SignIn from './SignIn'
import * as React from 'react';

const NavBar = ({setUser, user, setError}) => {
    const logout = () => {
        window.localStorage.clear()
        setUser(null)
        console.log("bruh")
        setError(["Successfully logged out", "success"])
        setTimeout(() => {
            setError(["","success"])
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