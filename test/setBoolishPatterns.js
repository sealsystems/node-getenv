const assert = require('assert');

const getenv = require('../index');

const tests = {};

tests['getenv.setBoolishPatterns() replaces default patterns'] = function() {
  const data = [
    {
      varName: 'TEST_GETENV_NOT_REALLY_FALSE3',
      expected: false,
    },
    {
      varName: 'TEST_GETENV_NOT_REALLY_TRUE3',
      expected: true,
    },
  ];
  const yesNoPatterns = {
    true: /y(es)?/i,
    false: /n(o)?/i
  };

  const originalPatterns = getenv.setBoolishPatterns(yesNoPatterns);
  assert.deepStrictEqual(originalPatterns, {
    true: /1|true/,
    false: /0|false/
  });

  assert.strictEqual(getenv.boolish('yes', 'Y'), true);
  assert.strictEqual(getenv.boolish('no', 'no'), false);
  assert.strictEqual(getenv.setBoolishPatterns(originalPatterns), yesNoPatterns);
};

Object.keys(tests).forEach(function(key) {
  console.log('Test: %s', key);
  tests[key]();
});
