/* global describe, it */
var _unescape = require('../');
var assert = require('assert');

var htmlString = 'My <span>html</span> string.';
var escapedHtmlString = 'My &lt;span&gt;html&lt;/span&gt; string.';

describe('recursive-unescape', function () {
	it('should unescape strings', function () {
		assert.equal(_unescape(escapedHtmlString), htmlString);
	});

	it('should unescape objects', function () {
		assert.equal(
			_unescape({
				foo: escapedHtmlString
			}).foo,
			htmlString
		);
	});

	it('should unescape arrays', function () {
		assert.equal(_unescape([escapedHtmlString])[0], htmlString);
	});

	it('should unescape nested objects', function () {
		assert.equal(_unescape({
			obj: {
				nested: escapedHtmlString
			}
		}).obj.nested, htmlString);
		assert.equal(_unescape({
			obj: {
				nestedArr: [escapedHtmlString]
			}
		}).obj.nestedArr[0], htmlString);
	});

	it('should unescape nested arrays', function () {
		assert.equal(_unescape([
			[escapedHtmlString]
		])[0][0], htmlString);
		assert.equal(_unescape([
			{foo: [escapedHtmlString]}
		])[0].foo[0], htmlString);
	});

	it('should unescape objects with undefined or null values', function () {
		var e = _unescape({
			myNull: null,
			myUndefined: undefined,
			foo: escapedHtmlString
		});
		assert.equal(e.myNull, null);
		assert.equal(e.myUndefined, undefined);
		assert.equal(e.foo, htmlString);
	});

	it('should unescape complex objects', function () {
		var e = _unescape({
			foo: 'foo',
			bar: {
				baz: 'baz',
				num: 1
			},
			empty: '',
			arr: [1, 2, escapedHtmlString],
			unsafe: escapedHtmlString,
			myNull: null,
			nested: {
				arr: [
					{
						message: escapedHtmlString
					},
					{
						message: escapedHtmlString,
						code: 2
					}
				]
			}
		});
		assert.equal(e.foo, 'foo');
		assert.equal(e.bar.baz, 'baz');
		assert.equal(e.bar.num, 1);
		assert.equal(e.empty, '');
		assert.equal(e.arr[0], 1);
		assert.equal(e.arr[2], htmlString);
		assert.equal(e.unsafe, htmlString);
		assert.equal(e.myNull, null);
		assert.equal(e.nested.arr.length, 2);
		assert.equal(e.nested.arr[0].message, htmlString);
		assert.equal(e.nested.arr[1].code, 2);
	});

	it('should not mutate the input', function () {
		var o = { foo: escapedHtmlString };
		assert(_unescape(o) !== o);
		assert.equal(_unescape(o).foo, htmlString);

		var a = [escapedHtmlString];
		assert(_unescape(a) !== a);
		assert.equal(_unescape(a)[0], htmlString);
	});

	it('should return null or undefined when passed either', function () {
		assert.equal(_unescape(), undefined);
		assert.equal(_unescape(null), null);
	});
});
