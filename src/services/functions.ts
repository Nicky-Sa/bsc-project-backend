import * as moment from "jalali-moment";

export const gregorianToPersian = (date, includeTime = true) => {
  if (!date) {
    return null;
  }
  // input: "2022-11-12T17:55:10.000Z"
  const utcDate = new Date(new Date(date).toLocaleString());
  const m = moment(utcDate, "YYYY/MM/DD, HH:mm:ss");
  m.locale("fa"); // change locale for this moment instance
  m.format("YYYY/M/D"); // 1401/04/12
  if (includeTime) {
    return m.format("YYYY/MM/DD - HH:mm");
  }
  return m.format("YYYY/MM/DD");
};

export const dbItemsTransform = (items: any, toStringKey: string, dateKey: string, includeTime = true) => {
  if (Array.isArray(items)) {
    for (const item of items) {
      if (toStringKey && item[toStringKey]) item[toStringKey] = item[toStringKey].toString();
      if (dateKey && item[dateKey]) item[dateKey] = gregorianToPersian(item[dateKey], includeTime);
    }
    return items;
  }
  return items;
};
