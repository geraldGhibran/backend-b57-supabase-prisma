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
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profiles = yield prisma_1.default.profile.findMany({
        include: {
            backgroundPicture: { select: { url: true } },
            followers: { include: { follower: true, } },
            picture: { select: { avatarUrl: true } },
        },
    });
    res.status(200).json(profiles);
}));
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, website, authorEmail, bio, name } = req.body;
    const result = yield prisma_1.default.profile.create({
        data: {
            username,
            website,
            name,
            authorEmail,
            bio,
        },
    });
    res.json(result);
}));
router.put('/updateById/:profileId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { profileId } = req.params;
    const { username, website, bio, isPublic, name } = req.body;
    const profileUpdated = yield prisma_1.default.profile.update({
        where: { id: Number(profileId) },
        data: {
            username: username,
            website: website,
            bio: bio,
            name: name,
            isPublic: isPublic,
        },
    });
    res.json(profileUpdated);
}));
router.get('/searchProfile/:text', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = req.params;
    try {
        const profile = yield prisma_1.default.profile.findMany({
            where: {
                OR: [
                    { username: { contains: text, mode: 'insensitive' } },
                    { authorEmail: { contains: text, mode: 'insensitive' } },
                ],
            },
            include: {
                picture: { select: { avatarUrl: true } },
                backgroundPicture: { select: { url: true } },
                followers: { include: { follower: true } },
            },
        });
        res.json(profile);
    }
    catch (error) {
        res.json({ error: `Profile with authorEmail ${text} does not exist in the database` });
    }
}));
router.get('/searchProfile/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield prisma_1.default.profile.findMany({
            include: {
                picture: { select: { avatarUrl: true } },
                followers: { include: { follower: true } },
                backgroundPicture: { select: { url: true } },
            },
        });
        res.json(profile);
    }
    catch (error) {
        res.json({ error: `Profile with authorEmail does not exist in the database` });
    }
}));
router.get('/findProfileByEmail/:authorEmail', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorEmail } = req.params;
    try {
        const profile = yield prisma_1.default.profile.findFirst({
            where: { authorEmail },
            include: {
                picture: { select: { avatarUrl: true } },
                backgroundPicture: { select: { url: true } },
                followers: { include: { follower: true } },
            },
        });
        res.json(profile);
    }
    catch (error) {
        res.json({ error: `Profile with authorEmail ${authorEmail} does not exist in the database` });
    }
}));
router.put('/publishProfile/:profileId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { profileId } = req.params;
    const profileUpdated = yield prisma_1.default.profile.update({
        where: { id: Number(profileId) },
        data: { isPublic: true },
    });
    res.json(profileUpdated);
}));
router.get('/:profileId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { profileId } = req.params;
    const profile = yield prisma_1.default.profile.findFirst({
        where: { id: Number(profileId) },
    });
    res.json(profile);
}));
exports.default = router;
//# sourceMappingURL=profile.js.map