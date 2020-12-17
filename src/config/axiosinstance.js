import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://e-commerce-cms-rud.herokuapp.com'
})

export default instance
