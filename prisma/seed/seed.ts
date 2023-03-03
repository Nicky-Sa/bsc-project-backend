import { PrismaClient } from '@prisma/client';
import { packagesData, tagzBatteries, tagzLocations, tagzMessages } from './mockData';

const prisma = new PrismaClient();

async function main() {
  // Clean db
  await prisma.user.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.package.deleteMany({});
  await prisma.packageFeature.deleteMany({});
  await prisma.tagBatteryLevel.deleteMany({});

  for (const _package of packagesData) {
    await prisma.package.upsert({
      where: { level: _package.level },
      update: {},
      create: {
        level: _package.level,
      },
    });
    for (const item of _package.items) {
      await prisma.packageFeature.upsert({
        where: { id: item.id },
        update: {},
        create: {
          id: item.id,
          packageLevel: _package.level,
          key: item.key,
          value: item.value,
          unit: item?.unit,
        },
      });
    }
  }

  await prisma.user.create({
    data: {
      username: 'testUser@gmail.com',
      password: '$2b$10$doAZYcY3eGswCsrMp.Nq5OBesh1oawQAciCqCU1KtnfjmaPM3GdSS',
      currentPackageLevel: 'gold',
      currentBalance: 120_000,
    },
  });

  for (let i = 0; i < 4; i++) {
    await prisma.tag.create({
      data: {
        username: 'testUser@gmail.com',
      },
    });
  }

  for (const tagzBattery of tagzBatteries) {
    await prisma.tagBatteryLevel.create({
      data: {
        tagId: tagzBattery.tagId,
        value: tagzBattery.value,
        dateTime: new Date(tagzBattery.dateTime),
      },
    });
  }

  for (const tagzMessage of tagzMessages) {
    await prisma.tagMessage.create({
      data: {
        tagId: tagzMessage.tagId,
        type: tagzMessage.type,
        text: tagzMessage.text,
        dateTime: new Date(tagzMessage.dateTime),
      },
    });
  }

  for (const tagzLocationsHistory of tagzLocations) {
    await prisma.tagLocation.create({
      data: {
        tagId: tagzLocationsHistory.tagId,
        lat: tagzLocationsHistory.lat,
        lon: tagzLocationsHistory.lon,
        dateTime: new Date(tagzLocationsHistory.dateTime),
      },
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
