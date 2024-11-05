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
    const follows = await prisma_1.default.follower.findMany({});
    res.status(200).json(follows);
});
router.post('/create', auth_1.auth, async (req, res) => {
    const { followerId, followingId } = req.body;
    try {
        const result = await prisma_1.default.follower.create({
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
});
router.delete('/deleteById', async (req, res) => {
    const { followerId, followingId } = req.body;
    try {
        const follower = await prisma_1.default.follower.delete({
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
});
exports.default = router;
//# sourceMappingURL=follow.js.map