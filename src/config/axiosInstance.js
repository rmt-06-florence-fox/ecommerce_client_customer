import axios from 'axios'
// https://ecommerce-cms-awesome.herokuapp.com

const instance = axios.create({
  baseURL: 'https://ecommerce-cms-awesome.herokuapp.com'
})

export default instance
