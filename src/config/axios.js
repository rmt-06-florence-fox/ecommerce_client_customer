import axios from "axios";

const instance = axios.create({
  baseURL: "https://muchsin-store.herokuapp.com"
});

export default instance;
