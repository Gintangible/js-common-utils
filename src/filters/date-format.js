import dayjs from 'dayjs';

export default function dateFormat(dateTime, type = 'YYYY-MM-DD HH:mm:ss') {
  if (!dateTime) {
    return '';
  }
  return dayjs(dateTime).format(type);
}
