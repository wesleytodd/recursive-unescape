# Recursively UnEscape Objects/Arrays for HTML

Install:

```
$ npm install --save recursive-unescape
```

Recursivly unescapes strings in objects or arrays which were escaped for output in HTML.  The most common use case for this is to process data that was passed from a server rendered app.  See [recursive-escape](https://github.com/wesleytodd/recursive-escape) for use on the server when escaping the data.

Usage:

```javascript
var unescape = require('recursive-unescape');

var obj = {
	"foo": "My unsafe &lt;script&gt;alert(&quot;You have been hacked!!&quot;);&lt;/script&gt; string.",
	"number": 1,
	"arr": [
		"foo",
		"&lt;h1&gt;Hi!!&lt;/h1&gt;"
	],
	"obj": {
		"nested": {
			"bar": "&lt;"
		}
	}
};

var e = unescape(obj);

console.log(e.toJSON(e, '\t'));
/*
Output:

{
	foo: 'My unsafe <script>alert("You have been hacked!!");</script> string.',
	number: 1,
	arr: ['foo', '<h1>Hi!!</h1>'],
	obj: {
		nested: {
			bar: '<'
		}
	}
}
*/
```
