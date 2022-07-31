import './styles/navbar.css'
import SignIn from './SignIn'
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { logout } from '../reducers/userReducer';

const NavBar = () => {
    const dispatch = useDispatch()
    let navigate = useNavigate(); 

    const user = useSelector(state => state.user)
    
    let listener = null;
    const [scrollState, setScrollState] = useState("navbar top");


    useEffect(() => {
      listener = document.addEventListener("scroll", (e) => {
        var scrolled = document.scrollingElement.scrollTop;
        if (scrolled >= 120) {
          if (scrollState !== "navbar scrolling") setScrollState("navbar scrolling");
        } else {
          if (scrollState !== "navbar top") setScrollState("navbar top");
        }
      });
      return () => {
        document.removeEventListener("scroll", listener);
      };
    }, [scrollState]);

    const signout = () => {
        dispatch(logout())
    }

    if (user == null || user == "") {
        return (
          <div class={scrollState}>
            <SignIn />
            <button onClick={() => navigate("/signup")}>SIGN UP</button>
          </div>
        );
    } else {
        return (
          <div class={scrollState}>
            <button onClick={signout}>LOGOUT</button>
            <button onClick={() => navigate("/posts")}>
              MY POSTS
            </button>
          </div>
        );
    }
    
}

export default NavBar