"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield prisma_1.default.post.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            profile: {
                select: {
                    avatarUrl: true,
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
}));
router.post('/create', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, profileId } = req.body;
    try {
        const result = yield prisma_1.default.post.create({
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
}));
router.get('/post/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const post = yield prisma_1.default.post.findFirst({
            where: {
                id: Number(id),
            },
            include: {
                profile: {
                    select: {
                        avatarUrl: true,
                        authorEmail: true,
                        picture: { select: { avatarUrl: true } },
                    },
                },
                likes: { select: { id: true } },
                postPicture: {
                    select: {
                        url: true,
                    },
                },
                comments: { select: { content: true } },
            },
        });
        res.json(post);
    }
    catch (error) {
        res.json({ error: `Post with ID ${id} does not exist in the database` });
    }
}));
router.get('/post/byProfileId/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const post = yield prisma_1.default.post.findMany({
            where: {
                profileId: Number(id),
            },
            include: {
                profile: {
                    select: {
                        avatarUrl: true,
                        authorEmail: true,
                        picture: { select: { avatarUrl: true } },
                    },
                },
                likes: { select: { id: true } },
                postPicture: {
                    select: {
                        url: true,
                    },
                },
                comments: { select: { content: true } },
            },
        });
        res.json(post);
    }
    catch (error) {
        res.json({ error: `Post with ID ${id} does not exist in the database` });
    }
}));
exports.default = router;
//# sourceMappingURL=posts.js.map