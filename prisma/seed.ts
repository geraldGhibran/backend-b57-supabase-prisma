import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.ProfileCreateInput[] = [
  {
    username: 'AbrahamLincoln',
    name: 'Abraham Lincoln',
    authorEmail: 'abrahamLincoln@gmail.com',
    website: 'abrahamLincoln.io',
    bio: 'abraham lincoln 16th president',
    avatarUrl: "abra.jpg",
    posts: {
      create: [
        {
          title: 'Join the Prisma Slack',
          content: 'https://slack.prisma.io',
          published: true,
        },
        {
          title: 'Join the other community',
          content: 'https://slack.prisma.io',
          published: true,
        },
      ],
    },
  },
  {
    username: 'MinoruTanaka',
    name: 'Minoru Tanaka',
    authorEmail: 'MinoruTanaka@gmail.com',
    website: 'MinoruTanaka.io',
    bio: 'Death Note Reseller',
    avatarUrl: "minoru.png",
    posts: {
      create: [
        {
          title: 'Join the Prisma Slack',
          content: 'https://slack.prisma.io',
          published: true,
        },
      ],
    },
  },
  {
    username: 'Penguinz0',
    name: 'Jesus??',
    authorEmail: 'charlie@gmail.com',
    website: 'Penguinz0.io',
    bio: 'Penguinz0 or MoistCritical',
    avatarUrl: "moist.jpg",
    posts: {
      create: [
        {
          title: 'Ask a question about Prisma on GitHub',
          content: 'https://www.github.com/prisma/prisma/discussions',
          published: true,
        },
      ],
    },
  },
  {
    username: 'MadarameBaku',
    name: 'Madarame Baku',
    authorEmail: 'MadarameBaku@gmail.com',
    website: 'MadarameBaku.io',
    bio: 'MadarameBaku or Usogui',
    avatarUrl: "baku.jpg",
    posts: {
      create: [
        {
          title: 'Ask a question about Prisma on GitHub',
          content: 'https://www.github.com/prisma/prisma/discussions',
          published: true,
        },
      ],
    },
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.profile.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })