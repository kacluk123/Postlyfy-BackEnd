"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller = __importStar(require("../controllers/auth"));
const auth_1 = require("../validation/auth");
const router = express_1.default.Router();
router.post('/signup', auth_1.createUser, controller.signup);
router.post('/login', auth_1.loginUser, controller.login);
router.get('/logout', controller.logout);
exports.default = router;
//# sourceMappingURL=auth.js.map