import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://bukatoko-server.herokuapp.com'
})

export default instance
