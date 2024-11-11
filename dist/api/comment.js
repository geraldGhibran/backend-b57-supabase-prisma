"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/:postId', async (req, res) => {
    const { postId } = req.params;
    try {
        const comments = await prisma_1.default.comment.findMany({
            where: { postId: Number(postId) },
        });
        res.json(comments);
    }
    catch (error) {
        res.json({ error: `Comment with postId ${postId} does not exist in the database` });
    }
});
router.post('/create', auth_1.auth, async (req, res) => {
    const { content, postId, profileId } = req.body;
    try {
        const result = await prisma_1.default.comment.create({
            data: {
                postId: postId,
                content: content,
                profileId: profileId,
            },
        });
        res.status(200).json(result);
    }
    catch (error) {
        return res.status(400).json({ error: 'Unauthorized' });
    }
});
exports.default = router;
//# sourceMappingURL=comment.js.map