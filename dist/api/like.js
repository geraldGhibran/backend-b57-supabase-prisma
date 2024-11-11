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
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { profileId, postId } = req.body;
    let likeProfileIds = [];
    try {
        // find all likes for this post
        const allLikes = yield prisma_1.default.like.findMany({
            where: { postId: postId },
        });
        // we map through it and we assign the like authorId to a variable
        allLikes.forEach(lk => likeProfileIds.push(lk.profileId));
        if (likeProfileIds.includes(profileId)) {
            // we check that the logged user id is the same as the author of this post's like
            // and we avoid he likes the post twice
            return res.status(400).json({ error: 'You cannot like a post twice' });
        }
        else {
            const result = yield prisma_1.default.like.create({
                data: {
                    profileId: profileId,
                    postId: postId,
                },
            });
            return res.status(200).json(result);
        }
    }
    catch (error) {
        return res.status(400).json({ error: 'Unauthorized' });
    }
}));
exports.default = router;
//# sourceMappingURL=like.js.map