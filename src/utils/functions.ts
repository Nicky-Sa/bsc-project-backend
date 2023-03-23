import { PersianErrors, PersianTexts } from '@/utils/persianTexts.enum';

export const translate = (english: string) => {
  switch (english.toLowerCase()) {
    case 'unauthorized':
      return PersianErrors.unauthorized;
    case 'forbidden resource':
      return PersianErrors.forbiddenResource;
    case 'gold':
      return PersianTexts.gold;
    case 'silver':
      return PersianTexts.silver;
    case 'bronze':
      return PersianTexts.bronze;
    default:
      return english;
  }
};
