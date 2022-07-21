import { useState, useEffect } from 'react'
import Search from './appComponents/Search'
import Display from './appComponents/Display'
import MakeNew from './appComponents/MakeNew'
import NavBar from './appComponents/NavBar'
import axios from 'axios'
import './appComponents/styles/App.css'

const url = 'http://localhost:3001'


function App() {
  const [classes, setClasses] = useState([]); 
  const [exchanges, setExchanges] = useState([])

  useEffect( () => {
    axios
      .get(url + '/api/exchanges')
      .then(response => setExchanges(response.data)); 
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
      <NavBar />
      <br /> <br /> <br />
      <h1>CLASS EXCHANGE FINDER</h1>
      <MakeNew classes={classes}/> <br/>
      <Search classes={classes} setFind={setFind} setExchange={setExchange}/>
      <Display exchanges={exchanges} newFind={newFind} newExchange={newExchange} />
    </div>
  );
}

export default App;
