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
const controller = __importStar(require("../controllers/posts"));
const posts_1 = require("../validation/posts");
const comment_1 = require("../validation/comment");
const is_auth_1 = __importDefault(require("../middleware/is-auth"));
const router = express_1.default.Router();
router.post("/posts/add-post/:tag", posts_1.createPost, is_auth_1.default, controller.createPost);
router.get("/posts/get-posts/:tag", controller.getPosts);
router.patch("/posts/add-comment/:postId", comment_1.createComment, is_auth_1.default, controller.addComment);
router.get("/posts/comments/:postId", controller.getComments);
router.post("/posts/toggleLike/:postId", is_auth_1.default, controller.togglePostLike);
exports.default = router;
//# sourceMappingURL=posts.js.map