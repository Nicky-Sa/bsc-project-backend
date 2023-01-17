import moment from 'jalali-moment';

export const gregorianToPersian = (date, includeTime = false) => {
  if (!date) {
    return null;
  }
  // input: "2022-11-12T17:55:10.000Z" from db
  const utcDate = new Date(new Date(date).toLocaleString());
  let m = moment(utcDate, 'YYYY/MM/DD, HH:mm:ss');
  m.locale('fa'); // change locale for this moment instance
  m.format('YYYY/M/D'); // 1367/11/4
  if (includeTime) {
    return m.format('YYYY/MM/DD - HH:mm');
  }
  return m.format('YYYY/MM/DD');
};
