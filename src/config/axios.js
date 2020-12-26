import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://jarooda-db-ecommerce.herokuapp.com/'
  // baseURL: 'http://localhost:3000'
})

export default instance
