const ejs = require('ejs');
const utils = require('loader-utils');

module.exports = function ejsLoader(source) {
  this.cacheable && this.cacheable();
  const opts = Object.assign(utils.getOptions(this) || {}, { client : true });
	const exports = this.exec(source, this.resource);

	if (typeof exports.__content != 'string') {
		throw new Error('ejsloader expects __content property of type string; got '
			+ typeof exports.__content);
	}

  const template = ejs.compile(exports.__content.replace(/{%/g, '<%').replace(/%}/g, '%>'), opts);

	return 'module.exports = ' + JSON.stringify(exports).replace(/}$/, ',"template":'+ template +'};');
}

