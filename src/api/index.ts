import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import posts from './posts';
import users from './users';
import profile from './profile';
import picture from './picture';
import postPicture from './post-picture';
import bgPicture from './background-picture';
import like from './like';
import follow from './follow';
import comment from './comment';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - Circle',
  });
});

router.use('/users', users);
router.use('/posts', posts);
router.use('/comment', comment);
router.use('/profile', profile);
router.use('/post-picture', postPicture);
router.use('/bg-picture', bgPicture);
router.use('/picture', picture);
router.use('/like', like);
router.use('/follow', follow);

export default router;
