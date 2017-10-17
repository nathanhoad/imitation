const BabelJest = require('babel-jest');
const Path = require('path');

module.exports = {
  process(src, filename, config, options) {
    if (filename.match(/\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$/)) {
      return 'module.exports = ' + JSON.stringify(Path.basename(filename)) + ';';
    } else if (filename.match(/\.s?css$/)) {
      return `module.exports = new Proxy({}, { get: (styles, method) => method });`;
    }

    return BabelJest.process(src, filename, config, { sourceMaps: false });
  }
};
