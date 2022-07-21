import './styles/navbar.css'
import SignIn from './SignIn'
import * as React from 'react';

const NavBar = () => {
    

    return (
        <div class="navbar">
            <SignIn  />
            <button>Sign Up</button>
        </div>
    )
}

export default NavBar