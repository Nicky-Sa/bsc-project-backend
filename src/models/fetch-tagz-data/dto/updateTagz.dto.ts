import { TagBatteryLevel as prismaTagBatteryLevel, TagMessage as prismaTagMessage } from '@prisma/client';

export class TagBatteryLevel implements Omit<prismaTagBatteryLevel, 'id'> {
  tagId: number;
  value: number;
  date: string;
}

export class TagMessage implements Omit<prismaTagMessage, 'id'> {
  tagId: number;
  type: string;
  text: string;
  dateTime: string;
}
