import axios from "axios";

const production = 'https://backend-mern-multi-vendor-ecommerce-v8oq.onrender.com'

const normalizeUrl = (url) => {
    return url.replace(/\/+$/, '')
}

export const apiBaseUrl = normalizeUrl(process.env.REACT_APP_API_URL || production)

const api = axios.create({
    baseURL : `${apiBaseUrl}/api`,
    withCredentials: true
})

 

export default api
