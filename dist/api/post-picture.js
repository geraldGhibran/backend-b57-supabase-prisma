"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/pictureByProfileId/:profileId', async (req, res) => {
    const { profileId } = req.params;
    try {
        const post = await prisma_1.default.postPicture.findFirst({
            where: { profileId: Number(profileId) },
        });
        res.json(post);
    }
    catch (error) {
        res.json({ error: `Picture with profileId ${profileId} does not exist in the database` });
    }
});
router.post('/create', auth_1.auth, async (req, res) => {
    const { profileId, url, postId } = req.body;
    try {
        const result = await prisma_1.default.postPicture.create({
            data: {
                postId: postId,
                url: url,
                profileId: profileId,
            },
        });
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ error: 'Unauthorized' });
    }
});
exports.default = router;
//# sourceMappingURL=post-picture.js.map