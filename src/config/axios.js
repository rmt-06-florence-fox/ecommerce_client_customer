import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://jejualan.herokuapp.com'
})

export default instance
