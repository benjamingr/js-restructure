API Documentation
---------------------

### Usage 

This file describes how to use js-restructure

The basic fundamental unit of js-restructure is a parser. A parser is created by passing an object to the matcher function (the one you `require`, in the browser this is `window.jsRestructure`).

Creating a parser:

```js
matcher(T object) -> Parser
```
For example:

```js
var parser = matcher({x : A });
```
**Note:** The parser ignores properties that start with `_`, if you have properties that you do not want to capture but need to specify parts of the RE, start them with `_`. 

**Note:** Creating a parser is slow, using it is fast, so prefer creating parsers once and reusing them.

You can nest objects and parsers inside a parser:

```js
var parser2 = matcher({x : parser}); // can nest parsers to create nested results
var parser3 = matcher({x : {x: 3}}); // will create a nested object when parsing
```

A parser is itself a function that can be passed a string, it returns an object of the type passed when creating the parser or null if the parsing failed:

```hs
Parser:: (string[, flags]) => T?
```

For example:

```js
var parser = matcher({x : A });
parser("A").x; // A
parser("B"); // null, no match
```

The second flags parameter is optional and allows setting RE flags like "i" for case insensitivity. 
The parser also exposes a `.re` property so the resulting RegExp can be checked and reused.

### Usage Examples

See [the tests](https://github.com/benjamingr/js-restructure/blob/master/tests.js) for elaborate usage examples. 
