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
router.get('/pictureByProfileId/:profileId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { profileId } = req.params;
    try {
        const post = yield prisma_1.default.postPicture.findFirst({
            where: { profileId: Number(profileId) },
        });
        res.json(post);
    }
    catch (error) {
        res.json({ error: `Picture with profileId ${profileId} does not exist in the database` });
    }
}));
router.post('/create', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { profileId, url, postId } = req.body;
    try {
        const result = yield prisma_1.default.postPicture.create({
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
}));
exports.default = router;
//# sourceMappingURL=post-picture.js.map