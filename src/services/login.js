import axios from 'axios'

let token = null

const login = async credentials => {
    // const response = await axios.post("http://localhost:3001/api/login", credentials)

    try {
      console.log("here1");
      let res = await axios.post(
        "http://localhost:3001/api/login",
        credentials
      );
      return res.data;
    } catch (error) {
      console.log("here")
      throw "Wrong username or password."
    }
    
}

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post('http://localhost:3001/api/exchanges', newObject, config)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete('http://localhost:3001/api/exchanges/' + id, config)
  return response.data
}


export default { login, setToken, create, remove }