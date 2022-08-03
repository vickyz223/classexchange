import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setUser } from './reducers/userReducer';

import Search from './appComponents/Search'
import Display from './appComponents/Display'
import MakeNew from './appComponents/MakeNew'
import NavBar from './appComponents/NavBar'
import Error from './appComponents/Error'

import loginService from './services/login'
import axios from 'axios'
import './appComponents/styles/App.css'


function App() {
  const dispatch = useDispatch();

  const [classes, setClasses] = useState([]); 
  const [exchanges, setExchanges] = useState([])
  const error = useSelector(state => state.notice)

  useEffect( () => {
    axios
      .get('/api/exchanges')
      .then(response => setExchanges(response.data)); 
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        dispatch(setUser(user))
        loginService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
  axios
    .get('/api/classes')
    .then(response => response.data)
    .then(classes => classes.map(curr => curr.name))
    .then(bruh => setClasses(bruh)); 
  }, [])

  const [newFind, setFind] = useState(''); 
  const [newExchange, setExchange] = useState(''); 

  return (
    <div id="all">
      <Error message={error[0]} type={error[1]} />
      <NavBar />
      <div id="search">
        <br /> <br /> <br />
        <h1 className='h1app'>CLASS EXCHANGE FINDER</h1>
        <MakeNew classes={classes} /> <br />
        <Search classes={classes} setFind={setFind} setExchange={setExchange} />
      </div>
      <Display
        exchanges={exchanges}
        newFind={newFind}
        newExchange={newExchange}
      />
    </div>
  );
}

export default App;
