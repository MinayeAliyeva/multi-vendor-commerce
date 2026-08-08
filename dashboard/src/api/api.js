import axios from "axios";

// Backend-e gedilecek butun requestler bu baseURL uzerinden qurulur.
const api = axios.create({
    baseURL : 'http://localhost:5000/api'
})

export default api
