import './styles/navbar.css'
import SignIn from './SignIn'
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../reducers/userReducer';

import home from './styles/home.svg'

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
        navigate("/")
    }

    if (user == null || user === "") {
        return (
          <div class={scrollState}>
            <img className="image" src={home} alt="home page button" onClick={() => navigate("/")} />
            <div>
              <SignIn />
              <button onClick={() => navigate("/signup")}>SIGN UP</button>
            </div>
          </div>
        );
    } else {
        return (
          <div class={scrollState}>
            <img className="image" src={home} alt="home page button" onClick={() => navigate("/")}/>
            <div>
              <button onClick={signout}>LOGOUT</button>
              <button onClick={() => navigate("/myposts")}>MY POSTS</button>
            </div>
          </div>
        );
    }
    
}

export default NavBar