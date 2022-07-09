const Display = ({exchanges, newFind, newExchange}) => {
  const contains = (current, find, exchange) => {
    if (find === null) {
      find = ''; 
    }
    if (exchange === null) {
      exchange = '';
    }
    if (current.finding === null) {
      current.finding = '';
    }
    if (current.exchanging === null) {
      current.exchanging = ''; 
    }
    let currFind = current.finding.toUpperCase().trim(); 
    let currExchange = current.exchanging.toUpperCase().trim(); 
    find = find.toUpperCase().trim(); 
    exchange = exchange.toUpperCase().trim(); 
    return currFind.includes(find) && currExchange.includes(exchange)
  }

  //TODO: FIND NEW KEY 
  return (
    <div>
      {exchanges.map(exchange => contains(exchange, newFind, newExchange) && <Exchange key={Math.random()*100} exchange={exchange} />)}
    </div>
  )
}

const Exchange = ({exchange}) => {
  return (
    <div>
      <p>{exchange.user}</p>
      <h3>{exchange.finding}  |   {exchange.exchanging}</h3>
      <p>{exchange.description}</p>
    </div>
  )
}

export default Display; 