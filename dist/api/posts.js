"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    const posts = await prisma_1.default.post.findMany({
        include: {
            profile: {
                select: {
                    authorEmail: true,
                    picture: { select: { avatarUrl: true } },
                },
            },
            postPicture: {
                select: {
                    url: true,
                },
            },
            likes: { select: { id: true } },
            comments: { select: { id: true } },
        },
    });
    res.status(200).json(posts);
});
router.post('/create', auth_1.auth, async (req, res) => {
    const { title, content, profileId } = req.body;
    try {
        const result = await prisma_1.default.post.create({
            data: {
                title,
                content,
                profileId: profileId,
            },
        });
        res.status(200).json(result);
    }
    catch (error) {
        return res.status(400).json({ error: 'Unauthorized' });
    }
});
router.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await prisma_1.default.post.findFirst({
            where: {
                id: Number(id),
            },
            include: {
                profile: {
                    select: {
                        authorEmail: true,
                        picture: { select: { avatarUrl: true } },
                    },
                },
                likes: { select: { id: true } },
            },
        });
        res.json(post);
    }
    catch (error) {
        res.json({ error: `Post with ID ${id} does not exist in the database` });
    }
});
exports.default = router;
//# sourceMappingURL=posts.js.map