import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://ecommerce-cms-wypratama.herokuapp.com'
})

export default instance
