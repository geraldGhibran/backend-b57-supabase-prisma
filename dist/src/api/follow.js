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
    const follows = yield prisma_1.default.follower.findMany({});
    res.status(200).json(follows);
}));
router.post('/create', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { followerId, followingId } = req.body;
    try {
        const result = yield prisma_1.default.follower.create({
            data: {
                followerId: followerId,
                followingId: followingId,
            },
        });
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ error: error });
    }
}));
router.get('/following-count/:followerId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { followerId } = req.params;
    try {
        const followerCount = yield prisma_1.default.follower.findMany({
            where: { followerId: Number(followerId) },
            include: { following: true, },
        });
        res.json(followerCount);
    }
    catch (error) {
        console.error(' Error fetching follower count', error);
        res.json({ error: `Follower with ID ${followerId} does not exist in the database` });
    }
}));
router.post('/deleteById', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { followerId, followingId } = req.body;
    try {
        const follower = yield prisma_1.default.follower.delete({
            where: {
                followerId_followingId: {
                    followerId: followerId,
                    followingId: followingId,
                },
            },
        });
        res.json(follower);
    }
    catch (error) {
        res.json({ error: `Follower with ID ${followerId} does not exist in the database` });
    }
}));
exports.default = router;
//# sourceMappingURL=follow.js.map