import axios from "axios";

const local = 'http://localhost:8080'

const normalizeUrl = (url) => {
    return url.replace(/\/+$/, '')
}

export const apiBaseUrl = normalizeUrl(process.env.REACT_APP_API_URL || local)

const api = axios.create({
    baseURL : `${apiBaseUrl}/api`,
    withCredentials: true
})

export default api
