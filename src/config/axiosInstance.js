import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://ecommerce-cmsx.herokuapp.com'
})

export default instance
