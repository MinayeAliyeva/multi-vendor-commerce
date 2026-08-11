// import io from 'socket.io-client'
// const socketUrl = process.env.REACT_APP_SOCKET_URL || 'http://localhost:8080'

const disabledSocket = {
    emit: () => {},
    on: () => disabledSocket,
    off: () => disabledSocket
}

export const overrideStyle = {
    display : 'flex',
    margin : '0 auto',
    height: '24px',
    justifyContent : 'center',
    alignItems : 'center'
}

// Socket is disabled for now. Restore io(socketUrl) when realtime chat/status is needed.
export const socket = disabledSocket
