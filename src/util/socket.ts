import socketIo from 'socket.io'


let io: socketIo.Socket;

export const init = httpServer => {
    io = require('socket.io')(httpServer);
    return io;
}

export const getIo = () => {
    if (!io) {
        throw new Error('Socket.io not initializaed')
    }

    return io
}