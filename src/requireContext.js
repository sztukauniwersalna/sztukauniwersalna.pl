const fs = require('fs')
const path = require('path')

const currentDir = '.';

const specialDirs = fs.readdirSync(currentDir)
  .filter(file => fs.lstatSync(path.join(currentDir, file)).isDirectory())
  .filter(file => file.match(/^_[a-z0-0-_]+$/))
  .filter((key) => key != '_layout')
;

const TSX_REGEX = '/\\.tsx$/';
const MD_REGEX = '/\\.markdown$/';

const code = 'module.exports = {\n' + specialDirs
  .map((key) => {
    return { name: key.substring(1), path: `../${key}`, regex: MD_REGEX, subdirs: true };
  })
  .concat([ { name: 'ROOT', path: '../', regex: MD_REGEX, subdirs: false } ])
  .concat([ { name: 'LAYOUT', path: '../_layouts', regex: TSX_REGEX, subdirs: false } ])
  .map((entry) => {
    return `${entry.name.toUpperCase()}: `
      + `require.context('${entry.path}', ${entry.subdirs}, ${entry.regex})`;
  })
  .join(',\n') + '};\n';

module.exports = function() {
  return { code: code };
};

