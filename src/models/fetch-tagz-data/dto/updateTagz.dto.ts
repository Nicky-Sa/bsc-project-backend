import {
  TagBatteryLevel as prismaTagBatteryLevel,
  TagLocation as prismaTagLocation,
  TagMessage as prismaTagMessage,
} from '@prisma/client';

export class TagBatteryLevel implements Omit<prismaTagBatteryLevel, 'id'> {
  tagId: number;
  value: number;
  dateTime: string;
}

export class TagMessage implements Omit<prismaTagMessage, 'id'> {
  tagId: number;
  type: string;
  text: string;
  dateTime: string;
}

export class TagLocation implements Omit<prismaTagLocation, 'id'> {
  tagId: number;
  lat: number;
  lon: number;
  dateTime: string;
}
