import { process } from '.';

test('It transforms images', () => {
  expect(process('IMG SRC', 'image.png')).toContain('image.png');
});

test('It transforms CSS', () => {
  const code = process('.thing { color: blue; } .other { color: red; }', 'styles.scss');
  expect(code).toContain('new Proxy');

  const proxy = eval(code);
  expect(proxy.thing).toBe('thing');
  expect(proxy.other).toBe('other');

  // Event works for things that aren't in the CSS file
  expect(proxy.blah).toBe('blah');
});
