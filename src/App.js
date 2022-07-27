import { useState, useEffect } from 'react'

import Search from './appComponents/Search'
import Display from './appComponents/Display'
import MakeNew from './appComponents/MakeNew'
import NavBar from './appComponents/NavBar'
import Error from './appComponents/Error'

import loginService from './services/login'
import axios from 'axios'
import './appComponents/styles/App.css'

const url = 'http://localhost:3001'


function App() {
  const [classes, setClasses] = useState([]); 
  const [exchanges, setExchanges] = useState([])
  const [user, setUser] = useState(null)
  const [error, setError] = useState(["", "warning"])

  useEffect( () => {
    axios
      .get(url + '/api/exchanges')
      .then(response => setExchanges(response.data)); 
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        loginService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
  axios
    .get(url + '/api/classes')
    .then(response => response.data)
    .then(classes => classes.map(curr => curr.name))
    .then(bruh => setClasses(bruh)); 
  }, [])

  const [newFind, setFind] = useState(''); 
  const [newExchange, setExchange] = useState(''); 

  return (
    <div id="all">
      <Error message={error[0]} type={error[1]} />
      <NavBar setUser={setUser} user={user} setError={setError} />
      <br /> <br /> <br />
      <h1>CLASS EXCHANGE FINDER</h1>
      <MakeNew classes={classes} user={user} setUser={setUser} /> <br/>
      <Search classes={classes} setFind={setFind} setExchange={setExchange}/>
      <Display exchanges={exchanges} newFind={newFind} newExchange={newExchange} />
    </div>
  );
}

export default App;
