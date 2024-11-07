import express from 'express';
import prisma from '../lib/prisma';

const router = express.Router();

router.get('/', async (req, res) => {
  const profiles = await prisma.profile.findMany({
    include: {
      backgroundPicture: { select: { url: true } },
      followers: { include: { follower: true, } },
      picture: { select: { avatarUrl: true } },
    },
  });
  res.status(200).json(profiles);
});

router.post('/create', async (req, res) => {
  const { username, website, authorEmail, bio, name } = req.body;

  const result = await prisma.profile.create({
    data: {
      username,
      website,
      name,
      authorEmail,
      bio,
    },
  });
  res.json(result);
});

router.put('/updateById/:profileId', async (req, res) => {
  const { profileId } = req.params;
  const { username, website, bio, isPublic, name } = req.body;

  const profileUpdated = await prisma.profile.update({
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
});

router.get('/searchProfile/:text', async (req, res) => {
  const { text } = req.params;

  try {
    const profile = await prisma.profile.findMany({
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
  } catch (error) {
    res.json({ error: `Profile with authorEmail ${text} does not exist in the database` });
  }
});

router.get('/searchProfile/', async (req, res) => {
  try {
    const profile = await prisma.profile.findMany({
      include: {
        picture: { select: { avatarUrl: true } },
        followers: { include: { follower: true } },
        backgroundPicture: { select: { url: true } },
      },
    });
    res.json(profile);
  } catch (error) {
    res.json({ error: `Profile with authorEmail does not exist in the database` });
  }
});

router.get('/findProfileByEmail/:authorEmail', async (req, res) => {
  const { authorEmail } = req.params;

  try {
    const profile = await prisma.profile.findFirst({
      where: { authorEmail },
      include: {
        picture: { select: { avatarUrl: true } },
        backgroundPicture: { select: { url: true } },
        followers: { include: { follower: true } },
      },
    });
    res.json(profile);
  } catch (error) {
    res.json({ error: `Profile with authorEmail ${authorEmail} does not exist in the database` });
  }
});

router.put('/publishProfile/:profileId', async (req, res) => {
  const { profileId } = req.params;
  const profileUpdated = await prisma.profile.update({
    where: { id: Number(profileId) },
    data: { isPublic: true },
  });
  res.json(profileUpdated);
});

router.get('/:profileId', async (req, res) => {
  const { profileId } = req.params;

  const profile = await prisma.profile.findFirst({
    where: { id: Number(profileId) },
  });
  res.json(profile);
});

export default router;
