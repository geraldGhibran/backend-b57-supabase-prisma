import express from 'express';
import prisma from '../lib/prisma';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get('/:postId', async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await prisma.comment.findMany({
      where: { postId: Number(postId) },
    });

    res.json(comments);
  } catch (error) {
    res.json({ error: `Comment with postId ${postId} does not exist in the database` });
  }
});

router.post('/create', auth, async (req, res) => {
  const { content, postId, profileId } = req.body;
  try {
    const result = await prisma.comment.create({
      data: {
        postId: postId,
        content: content,
        profileId: profileId,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: 'Unauthorized' });
  }
});

export default router;
