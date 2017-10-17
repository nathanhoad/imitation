const Transform = require('../jest');

test('It transforms images', () => {
  expect(Transform.process('IMG SRC', 'image.png')).toContain('image.png');
});

test('It transforms CSS', () => {
  expect(Transform.process('CSS CONTENT', 'styles.scss')).toContain('new Proxy');
});

test('It passes on JavaScript files', () => {
  const source = `
  module.exports = class {
    thing() {
      return 'thing';
    }
  }`;

  expect(Transform.process(source, 'source.js')).toContain('module.exports = class {');
});
