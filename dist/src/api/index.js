"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posts_1 = __importDefault(require("./posts"));
const users_1 = __importDefault(require("./users"));
const profile_1 = __importDefault(require("./profile"));
const picture_1 = __importDefault(require("./picture"));
const post_picture_1 = __importDefault(require("./post-picture"));
const background_picture_1 = __importDefault(require("./background-picture"));
const like_1 = __importDefault(require("./like"));
const follow_1 = __importDefault(require("./follow"));
const comment_1 = __importDefault(require("./comment"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.json({
        message: 'API - Circle',
    });
});
router.use('/users', users_1.default);
router.use('/posts', posts_1.default);
router.use('/comment', comment_1.default);
router.use('/profile', profile_1.default);
router.use('/post-picture', post_picture_1.default);
router.use('/bg-picture', background_picture_1.default);
router.use('/picture', picture_1.default);
router.use('/like', like_1.default);
router.use('/follow', follow_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map