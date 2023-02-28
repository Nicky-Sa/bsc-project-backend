import { TagBatteryLevel as prismaTagBatteryLevel } from "@prisma/client";

export class TagBatteryLevel implements Omit<prismaTagBatteryLevel, "id"> {
  tagId: number;
  level: number;
  date: string;
}
