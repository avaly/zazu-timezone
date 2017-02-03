const utils = require('./utils');

module.exports = (pluginContext) => {
  return (query, env = {}) => {
    return new Promise((resolve, reject) => {
      const tz = utils.findTimeZone(query);
      if (!tz) {
        return reject(false);
      }

      const time = utils.convertTime(query);

      resolve([
        {
          icon: 'fa-clock-o',
          title: `What Time is it in Timezone: ${query}?`,
          subtitle: 'Use timezone offsets (+5, -3:30) or identifiers (e.g. CET)',
          value: `Time in ${tz} is ${time}`,
        },
      ]);
    });
  };
};
