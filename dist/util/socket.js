"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let io;
exports.init = httpServer => {
    io = require('socket.io')(httpServer);
    return io;
};
exports.getIo = () => {
    if (!io) {
        throw new Error('Socket.io not initializaed');
    }
    return io;
};
//# sourceMappingURL=socket.js.map