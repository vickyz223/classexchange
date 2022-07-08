import { useState } from 'react'
import Search from './appComponents/Search'
import Display from './appComponents/Display'
import MakeNew from './appComponents/MakeNew'


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

export default App;
