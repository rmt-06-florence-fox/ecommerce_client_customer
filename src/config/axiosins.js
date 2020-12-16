import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://cms-server-tio.herokuapp.com'
})
// https://cms-server-tio.herokuapp.com
// http://localhost:3000
export default instance
