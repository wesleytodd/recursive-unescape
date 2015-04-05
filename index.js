var _unescape = require('lodash.unescape');

var ue = module.exports = function(data) {
	if (typeof data === 'undefined' || data === null) {
		return null;
	}

	if (data instanceof Array) {
		for (var i = 0; i < data.length; i++) {
			data[i] = ue(data[i]);
		}
	} else if (typeof data === 'object') {
		for (var i in data) {
			data[i] = ue(data[i]);
		}
	} else if (typeof data === 'string') {
		data = _unescape(data);
	}

	return data;
};
