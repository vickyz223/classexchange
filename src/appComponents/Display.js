import './styles/display.css'
import { useNavigate } from 'react-router-dom';

const Display = ({exchanges, newFind, newExchange}) => {
  const contains = (current, find, exchange) => {
    find = (find === null) ? '' : find.toUpperCase().trim(); 
    exchange = (exchange === null) ? '' : exchange.toUpperCase().trim(); 
    let hasExchange = current.exchanging.filter(curr => curr.includes(exchange));
    return hasExchange.length > 0 && current.finding.includes(find);  
  }

  return (
    <div id="all">
      <div id="display">
        {exchanges.map(exchange => contains(exchange, newFind, newExchange) && <Exchange key={Math.random()*100} exchange={exchange}/>)}
      </div>
    </div>
  )
}

const Exchange = ({exchange}) => {
  const navigate = useNavigate(); 
  return (
    <div className='exchange grow' onClick={() => {navigate("/posts/" + exchange._id);}}>
      <div>
        <p><b className='bold'>{exchange.user.username}</b> is exchanging</p>
          <div className='exchange-middle'>
            <h3 className='for bold'>{exchange.finding}</h3>
            <p className="for">   for   </p>
            <div className="exchange-classes bold">
              {exchange.exchanging.map(exchange => <h4>{exchange}</h4>)}
            </div>
          </div>
      <p className='small'>{exchange.description}</p>
      </div>
    </div>
  )
}

export default Display; 