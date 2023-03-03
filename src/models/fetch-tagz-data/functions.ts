import { gregorianToPersian } from '@/services/functions';

export const dbItemsTransform = (items: any, toStringKey: string, dateKey: string, includeTime = true) => {
  if (Array.isArray(items)) {
    for (const item of items) {
      if (item[toStringKey]) item[toStringKey] = item[toStringKey].toString();
      if (item[dateKey]) item[dateKey] = gregorianToPersian(item[dateKey], includeTime);
    }
    return items;
  }
  return items;
};
