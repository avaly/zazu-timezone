const moment = require('moment-timezone');
const padLeft = require('pad-left');

const TIMEZONES_BY_OFFSET = {};
const TIMEZONE_OFFSET = {};
const TIMEZONE_OFFSETS = [];

const fillTimezonesByOffset = () => {
  moment.tz.names().forEach(timeZone => {
    const offset = moment().tz(timeZone).format('Z');
    if (!TIMEZONES_BY_OFFSET[offset]) {
      TIMEZONES_BY_OFFSET[offset] = [];
      TIMEZONE_OFFSETS.push(offset);
    }
    TIMEZONES_BY_OFFSET[offset].push(timeZone);
    TIMEZONE_OFFSET[timeZone] = offset;
    TIMEZONE_OFFSET[timeZone.toUpperCase()] = offset;
    TIMEZONE_OFFSET[timeZone.toLowerCase()] = offset;
  });
};

fillTimezonesByOffset();

const findTZFromQuery = (query) => {
  if (TIMEZONE_OFFSETS.includes(query)) {
    return TIMEZONES_BY_OFFSET[query][0];
  }
  if (TIMEZONE_OFFSET[query]) {
    return TIMEZONES_BY_OFFSET[TIMEZONE_OFFSET[query]][0];
  }

  let offset;
  const match = query.match(/^([-+])?(\d{1,2})(:\d{2})?$/);
  if (match) {
    offset = (match[1] || '+') +
      padLeft(match[2], 2, '0') +
      (match[3] || ':00');
  }
  if (TIMEZONE_OFFSETS.includes(offset)) {
    return TIMEZONES_BY_OFFSET[offset][0];
  }

  return null;
};

module.exports = {
  findTimeZone(query) {
    const tzQuery = findTZFromQuery(query);
    if (!tzQuery) {
      return null;
    }
    const now = moment().tz(tzQuery);
    const offset = now.format('Z');
    const name = now.format('z');
    return name.match(/^[A-Z]+$/) ? `${offset} ${name}` : offset;
  },

  convertTime(query) {
    const tzQuery = findTZFromQuery(query);
    if (!tzQuery) {
      return null;
    }

    const tzLocal = moment.tz.guess();
    const nowLocal = moment().tz(tzLocal);
    const nowQuery = moment().tz(tzQuery);

    let result = nowQuery.format('LT');
    if (nowLocal.format('DDD') !== nowQuery.format('DDD')) {
      result = nowQuery.format('llll');
    }

    return result;
  },
};
