import dayjs from 'dayjs';

const DATETIME_FORMAT_SECOND = 'YYYY年M月D日H点m分s秒';
const DATETIME_FORMAT_MINUTE = 'YYYY年M月D日H点m分';
const DATETIME_FORMAT_HOUR = 'YYYY年M月D日H点';

export default function dateFormatChinese(dateTime) {
  if (!dateTime) {
    return '';
  }
  const time = dayjs(dateTime);
  let farmatType = DATETIME_FORMAT_HOUR;
  if (time.second() !== 0) {
    farmatType = DATETIME_FORMAT_SECOND;
  } else if (time.minute() !== 0) {
    farmatType = DATETIME_FORMAT_MINUTE;
  }
  return time.format(farmatType);
}
