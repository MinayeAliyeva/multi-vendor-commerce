import io from 'socket.io-client'
import { apiBaseUrl } from '../api/api'

export const overrideStyle = {
    display : 'flex', 
    margin : '0 auto',
    height: '24px',
    justifyContent : 'center',
    alignItems : 'center'
}

export const socket = io(process.env.REACT_APP_SOCKET_URL || apiBaseUrl, {
    transports: ['websocket'],
    withCredentials: true,
    autoConnect: false
})
