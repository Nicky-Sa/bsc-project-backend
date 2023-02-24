import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const data = [
  {
    name: 'bronze',
    items: [
      {
        id: 'b1',
        key: 'بازه بروزرسانی',
        value: '5',
        unit: 'دقیقه',
      },
      {
        id: 'b2',
        key: 'قیمت هر ساعت',
        value: '1000',
        unit: 'تومان',
      },
      {
        id: 'b3',
        key: 'پشتیبانی',
        value: '16',
        unit: 'ساعته',
      },
      {
        id: 'b4',
        key: 'پیامک اطلاع‌رسانی',
        value: 'دارد',
      },
      {
        id: 'b5',
        key: 'قیمت',
        value: '350000',
        unit: 'تومان',
      },
    ],
  },
  {
    name: 'silver',
    items: [
      {
        id: 's1',
        key: 'بازه بروزرسانی',
        value: '3',
        unit: 'دقیقه',
      },
      {
        id: 's2',
        key: 'قیمت هر ساعت',
        value: '800',
        unit: 'تومان',
      },
      {
        id: 's3',
        key: 'پشتیبانی',
        value: '20',
        unit: 'ساعته',
      },
      {
        id: 's4',
        key: 'پیامک اطلاع‌رسانی',
        value: 'دارد',
      },
      {
        id: 's5',
        key: 'قیمت',
        value: '400000',
        unit: 'تومان',
      },
    ],
  },
  {
    name: 'gold',
    items: [
      {
        id: 'g1',
        key: 'بازه بروزرسانی',
        value: '2',
        unit: 'دقیقه',
      },
      {
        id: 'g2',
        key: 'قیمت هر ساعت',
        value: '600',
        unit: 'تومان',
      },
      {
        id: 'g3',
        key: 'پشتیبانی',
        value: '24',
        unit: 'ساعته',
      },
      {
        id: 'g4',
        key: 'پیامک اطلاع‌رسانی',
        value: 'دارد',
      },
      {
        id: 'g5',
        key: 'قیمت',
        value: '450000',
        unit: 'تومان',
      },
    ],
  },
];

async function main() {
  for (const _package of data) {
    await prisma.package.upsert({
      where: { level: _package.name },
      update: {},
      create: {
        level: _package.name,
      },
    });
    for (const item of _package.items) {
      await prisma.packageFeature.upsert({
        where: { id: item.id },
        update: {},
        create: {
          id: item.id,
          packageLevel: _package.name,
          key: item.key,
          value: item.value,
          unit: item?.unit,
        },
      });
    }
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
