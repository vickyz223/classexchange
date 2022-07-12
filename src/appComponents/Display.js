const Display = ({exchanges, newFind, newExchange}) => {
  const contains = (current, find, exchange) => {
    find = (find === null) ? '' : find.toUpperCase().trim(); 
    exchange = (exchange === null) ? '' : exchange.toUpperCase().trim(); 
    let hasExchange = current.exchanging.filter(curr => curr.includes(exchange));
    console.log(exchange, hasExchange); 
    return hasExchange.length > 0 && current.finding.includes(find);  
  }

  return (
    <div>
      {exchanges.map(exchange => contains(exchange, newFind, newExchange) && <Exchange key={Math.random()*100} exchange={exchange}/>)}
    </div>
  )
}

const Exchange = ({exchange}) => {
  return (
    <div>
      <p>{exchange.user}</p>
      <h3>{exchange.finding}  |   {exchange.exchanging.map(exchange => exchange + ", ")}</h3>
      <p>{exchange.description}</p>
    </div>
  )
}

export default Display; 