import axios from 'axios'

let token = null

const login = async credentials => {
    try {
      let res = await axios.post(
        "/api/login",
        credentials
      );
      return res.data;
    } catch (error) {
      throw error 
    }
}

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post('/api/exchanges', newObject, config)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete('/api/exchanges/' + id, config)
  return response.data
}


export default { login, setToken, create, remove }