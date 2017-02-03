const mockDate = require('mockdate');
const utils = require('../src/utils');

describe('utils', () => {
  describe('findTimeZone', () => {
    const testAll = (cases) => {
      cases.forEach(([query, expected]) => {
        test(query, () => {
          expect(utils.findTimeZone(query)).toEqual(expected);
        });
      });
    };

    testAll([
      ['UTC', '+00:00 GMT'],
      ['CET', '+01:00 CET'],
      ['-7', '-07:00 MST'],
      ['+11:00', '+11:00'],
    ]);
  });

  describe('convertTime', () => {
    const testAll = (cases) => {
      cases.forEach(([query, expected]) => {
        test(query, () => {
          expect(utils.convertTime(query)).toEqual(expected);
        });
      });
    };

    describe('same day', () => {
      beforeEach(() => {
        mockDate.set(1486124505343);
      });

      testAll([
        ['-08:00', '4:21 AM'],
        ['-08', '4:21 AM'],
        ['-8', '4:21 AM'],
        ['America/New_York', '7:21 AM'],
        ['Europe/London', '12:21 PM'],
        ['UTC', '12:21 PM'],
        ['Asia/Singapore', '8:21 PM'],
        ['+05:30', '5:51 PM'],
        ['5:30', '5:51 PM'],
      ]);
    });

    describe('previous day', () => {
      beforeEach(() => {
        mockDate.set(1486115505343);
      });

      testAll([
        ['-11:00', 'Thu, Feb 2, 2017 10:51 PM'],
        ['-10:00', 'Thu, Feb 2, 2017 11:51 PM'],
        ['-1', '8:51 AM'],
      ]);
    });

    describe('next day', () => {
      beforeEach(() => {
        mockDate.set(1486135505343);
      });

      testAll([
        ['+1', '4:25 PM'],
        ['+09:00', 'Sat, Feb 4, 2017 12:25 AM'],
        ['+9', 'Sat, Feb 4, 2017 12:25 AM'],
        ['+11', 'Sat, Feb 4, 2017 2:25 AM'],
      ]);
    });
  });
});
