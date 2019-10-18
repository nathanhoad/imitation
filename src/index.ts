import * as Path from 'path';

export function process(src: string, filename: string) {
  // Styles return any of their properties as just identity strings
  if (filename.match(/\.(s?css|less)$/)) {
    return `module.exports = new Proxy({}, { get: (styles, method) => method });`;
  }

  // Everything else (images, fonts, etc) returns its own name
  return 'module.exports = ' + JSON.stringify(Path.basename(filename)) + ';';
}
