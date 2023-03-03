import {
  TagBatteryLevel as prismaTagBatteryLevel,
  TagLocation as prismaTagLocation,
  TagMessage as prismaTagMessage,
} from '@prisma/client';

export class TagBatteryLevel implements Omit<prismaTagBatteryLevel, 'id'> {
  tagId: number;
  value: number;
  dateTime: Date;
}

export class TagMessage implements Omit<prismaTagMessage, 'id'> {
  tagId: number;
  type: string;
  text: string;
  dateTime: Date;
}

export class TagLocation implements Omit<prismaTagLocation, 'id'> {
  tagId: number;
  lat: number;
  lon: number;
  dateTime: Date;
}
