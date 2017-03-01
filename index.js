var _unescape = require('lodash.unescape');

var ue = module.exports = function (input) {
	// Null or undefined, just return input
	if (typeof input === 'undefined' || input === null) {
		return input;
	}

	var output;
	var i;
	var type = typeof input;

	if (input instanceof Array) {
		output = [];
		for (i = 0; i < input.length; i++) {
			output[i] = ue(input[i]);
		}
	} else if (type === 'object') {
		output = {};
		for (i in input) {
			output[i] = ue(input[i]);
		}
	} else if (type === 'string') {
		output = _unescape(input);
	} else {
		output = input;
	}

	return output;
};
