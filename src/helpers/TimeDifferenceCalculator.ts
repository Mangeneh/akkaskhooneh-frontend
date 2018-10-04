import moment from 'moment';
import { Strings } from '../config';
import { strings } from '../i18n';

export const calculateTimeDifference = (then: string) => {
  const now = new Date();
  const ms = moment(now).utc()
    .diff(moment(then).utc());
  const day = moment.duration(ms);
  const dayDiff = Math.floor(day.asDays());
  const weeks = Math.floor(day.asDays() / 7);
  const months = Math.floor(day.asDays() / 30);
  const years = Math.floor(day.asDays() / 365);
  const min = parseInt(moment.utc(ms)
    .format('mm'));
  const hours = parseInt(moment.utc(moment(now)
    .diff(moment(then)))
    .format('HH'));
  if (Math.floor(day.asHours()) < 0) {
    return (strings(Strings.NOW));
  }
  if (Math.floor(day.asHours()) >= 24 * 365) {
    return (strings(Strings.YEAR, { number: years }));
  }
  if (Math.floor(day.asHours()) >= 24 * 30) {
    return (strings(Strings.MONTH, { number: months }));
  }
  if (Math.floor(day.asHours()) >= 24 * 7) {
    return (strings(Strings.WEEK, { number: weeks }));
  }
  if (Math.floor(day.asHours()) >= 24) {
    return (strings(Strings.DAY, { number: dayDiff }));
  }
  if ((Math.floor(day.asHours()) < 24) && Math.floor(day.asHours()) !== 0) {
    return (strings(Strings.HOUR, { number: hours }));
  }
  if (Math.floor(day.asHours()) < 1 && min !== 0) {
    return (strings(Strings.MINUTE, { number: min }));
  }
  return (strings(Strings.NOW));
};
