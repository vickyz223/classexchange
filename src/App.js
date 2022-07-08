import { useState } from 'react'
// search imports
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function App() {
  const classes = ['COM SCI 32', 'MATH 1', 'MATH 32B', 'PHYSICS 1A']; 
  const exchanges = [
    {
      user: '1',
      finding: 'COM SCI 32',
      exchanging: 'MATH 1',
      details: 'bruh1'
    },
    {
      user: '2',
      finding: 'MATH 32B',
      exchanging: 'MATH 1',
      details: 'bruh2'
    },
    {
      user: '3',
      finding: 'COM SCI 32',
      exchanging: 'PHYSICS 1A',
      details: 'bruh3'
    }
  ]
  const [newFind, setFind] = useState(''); 
  const [newExchange, setExchange] = useState(''); 

  return (
    <div>
      <h1>Class Exchange Finder</h1>
      <MakeNew /> <br/>
      <Search classes={classes} setFind={setFind} setExchange={setExchange}/>
      <Display exchanges={exchanges} newFind={newFind} newExchange={newExchange} />
    </div>
  );
}

const Search = ({classes, setFind, setExchange}) => {
  return (
      <div>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={classes}
          onChange={(event, value) => setFind(value)}
          renderInput={(params) => <TextField {...params} label="Class you're looking for: " />}
        />
        <br />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={classes}
          onChange={(event, value) => setExchange(value)}
          renderInput={(params) => <TextField {...params} label="Class you're exchanging: (Optional) "/>}
        />
      </div>
  )
}

const MakeNew = () => {
  return (
    <div>
      <h3>Can't find what you're looking for?</h3>
      <button>Make a new offer!</button>
    </div>
  )
}

const Display = ({exchanges, newFind, newExchange}) => {
  const contains = (current, find, exchange) => {
    if (find === null) {
      find = ''; 
    }
    if (exchange === null) {
      exchange = '';
    }
    let currFind = current.finding.toUpperCase().trim(); 
    let currExchange = current.exchanging.toUpperCase().trim(); 
    find = find.toUpperCase().trim(); 
    exchange = exchange.toUpperCase().trim(); 
    console.log("find: ",find, "currFind: ", currFind, "currExchange: ", currExchange, "exchange: ",exchange)
    return currFind.includes(find) && currExchange.includes(exchange)
  }

  return (
    <div>
      {exchanges.map(exchange => contains(exchange, newFind, newExchange) && <Exchange exchange={exchange} />)}
    </div>
  )
}

const Exchange = ({exchange}) => {
  return (
    <div>
      <p>{exchange.user}</p>
      <h3>{exchange.finding}  |   {exchange.exchanging}</h3>
      <p>{exchange.details}</p>
    </div>
  )
}

export default App;
