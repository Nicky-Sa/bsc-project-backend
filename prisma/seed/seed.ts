import { PrismaClient } from "@prisma/client";
import { packagesData, tagzBalanceUsages, tagzBatteries, tagzLocations, tagzMessages, transactions } from "./mockData";

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
        dateTime: new Date(tagzMessage.dateTime)
      },
    });
  }

  for (const tagzLocation of tagzLocations) {
    await prisma.tagLocation.create({
      data: {
        tagId: tagzLocation.tagId,
        lat: tagzLocation.lat,
        lon: tagzLocation.lon,
        dateTime: new Date(tagzLocation.dateTime)
      }
    });
  }

  for (const tagzBalanceUsage of tagzBalanceUsages) {
    await prisma.tagBalanceUsage.create({
      data: {
        tagId: tagzBalanceUsage.tagId,
        value: tagzBalanceUsage.value,
        month: tagzBalanceUsage.month
      }
    });
  }
  for (const transaction of transactions) {
    await prisma.transaction.create({
      data: {
        username: transaction.username,
        reason: transaction.reason,
        value: transaction.value,
        status: transaction.status,
        dateTime: new Date(transaction.dateTime)
      }
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
