const Imitation = require('..');

test('it should mock and unmock `require`', () => {
  let image = null;

  try {
    image = require('./image.png');
  } catch (e) {}
  expect(image).toBeNull();

  Imitation.mockAssets();
  image = null;
  try {
    image = require('./image.png');
  } catch (e) {}
  expect(image).not.toBeNull();

  Imitation.unmockAssets();
  image = null;
  try {
    image = require('./image.png');
  } catch (e) {}
  expect(image).not.toBeNull();
});

test('it should mock and unmock the dom', () => {
  expect(typeof global.document).toBe('undefined');

  Imitation.mockDOM();
  expect(typeof global.document).not.toBe('undefined');

  Imitation.unmockDOM();
  expect(typeof global.document).toBe('undefined');
});

test('it should mock document.location', () => {
  Imitation.mockDOM('http://localhost:5000');

  expect(typeof global.document).not.toBe('undefined');
  expect(typeof global.document.location).not.toBe('undefined');
  expect(global.document.location.scheme).toBe('http:');
  expect(global.document.location.hostname).toBe('localhost');
  expect(global.document.location.port).toBe('5000');
});
