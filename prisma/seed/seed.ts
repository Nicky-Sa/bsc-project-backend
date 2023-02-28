import { PrismaClient } from "@prisma/client";
import { packagesData, tagzBatteries } from "./mockData";

const prisma = new PrismaClient();

async function main() {
  // Clean db
  await prisma.user.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.package.deleteMany({});
  await prisma.packageFeature.deleteMany({});
  await prisma.tagBatteryLevel.deleteMany({});

  await prisma.user.create({
    data: {
      username: 'testUser@gmail.com',
      password: 'XhjSpBS6zsKgPZ$',
    },
  });

  for (let i = 0; i < 4; i++) {
    await prisma.tag.create({
      data: {
        username: 'fateme@gmail.com',
      },
    });
  }

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

  for (const tagzBattery of tagzBatteries) {
    await prisma.tagBatteryLevel.create({
      data: {
        tagId: tagzBattery.tagNumber,
        level: tagzBattery.value,
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
