import axios from 'axios'

let token = null

const login = async credentials => {
    const response = await axios.post("http://localhost:3001/api/login", credentials)
    return response.data
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


export default { login, setToken, create }