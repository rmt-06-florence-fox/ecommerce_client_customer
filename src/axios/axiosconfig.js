const axios = require('axios')

const instance = axios.create({
  baseURL: 'https://servercms.herokuapp.com'
})

export default instance