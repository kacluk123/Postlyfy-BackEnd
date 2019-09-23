"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const posts_1 = __importDefault(require("./routes/posts"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = __importDefault(require("./util/database"));
const socket_1 = require("./util/socket");
const app = express_1.default();
const port = 3000;
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(body_parser_1.default.json());
app.use(auth_1.default);
app.use(posts_1.default);
const dbConnect = (client) => {
    const server = app.listen(port);
    const io = socket_1.init(server);
    io.on('connection', (socket) => {
        console.log('Client connected');
    });
};
database_1.default({
    cb: dbConnect
});
//# sourceMappingURL=app.js.map