"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let io;
const socket_io_1 = __importDefault(require("socket.io"));
exports.init = httpServer => {
    io = socket_io_1.default(httpServer);
    return io;
};
exports.getIo = () => {
    if (!io) {
        throw new Error('Socket.io not initializaed');
    }
    return io;
};
//# sourceMappingURL=socket.js.map