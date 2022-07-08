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

export default Display; 