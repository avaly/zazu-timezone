const timezone = require('../src/timezone');

describe('timezone', () => {
  test('returns a result', () => {
    timezone()('CET').then((results) => {
      expect(results).toHaveLength(1);
      expect(results[0].title).toBeDefined();
      expect(results[0].value).toBeDefined();
    });
  });
});
