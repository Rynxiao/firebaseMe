const { toNumber } = require('lodash');

const getTimestamps = (time) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _seconds, _nanoseconds } = time;
  return _seconds * 1000 + toNumber(_nanoseconds / 1000);
};

module.exports = {
  getTimestamps,
};
