let io;
import socketIo from 'socket.io';

export const init = httpServer => {
    io = socketIo(httpServer);
    return io;
}

export const getIo = () => {
    if (!io) {
        throw new Error('Socket.io not initializaed')
    }

    return io
}