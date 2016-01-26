# js-restructure

Based on https://github.com/alexflint/go-restructure

This package allows you to express regular expressions by defining an object, and then capture matched sub-expressions into object's fields.

Here is a very simple email address parser:

```js
var parser = matcher({
   _    : "^",
   user : "\\w+", // can also pass a JS RegExp here
   _2   : "@",
   host : "[^@]+",
   _3    : "$"
});
var parts = parser("benji@somewhere.com");
console.log(parts.user); // benji
console.log(parts.host); // somewhere.com
```

Example primitive URL parser:

```js
var m = matcher({
   protocol    : "http|https",
   _1 : "://", // can also pass a RegExp here
   host : "[^/]+",
   _2   : "/",
   path : ".+",
   _3    : "$"
})("http://www.google.com/search?foo=bar");
m.protocol; // http
m.host; // www.google.com
m.path; // search?foo=bar
```

Note: In "real code" use the built in parsing capabilities of browsers/node to parse real URLs. 


## Installation

    npm install js-restructure

Or in the browser

    <script src='https://wzrd.in/standalone/js-restructure@latest'></script>

Usage in script tag:
    
    var matcher = window.jsRestructure(...);

## API

The basic fundamental unit of js-restructure is a parser. A parser is created by passing an object to the matcher function (the one you `require`, in the browser this is `window.jsRestructure`).

Creating a parser:

    matcher(T object) -> Parser

For example:

    var parser = matcher({x : A });

**Note:** The parser ignores properties that start with `_`, if you have properties that you do not want to capture but need to specify parts of the RE, start them with `_`. 

You can nest objects and parsers inside a parser:

    var parser2 = matcher({x : parser}); // can nest parsers to create nested results
    var parser3 = matcher({x : {x: 3}}); // will create a nested object when parsing

A parser is itself a function that can be passed a string, it returns an object of the type passed when creating the parser or null if the parsing failed:

    Parser:: (string[, flags]) => T?

For example:

    var parser = matcher({x : A });
    parser("A").x; // A
    parser("B"); // null, no match

The second flags parameter is optional and allows setting RE flags like "i" for case insensitivity. 
The parser also exposes a `.re` property so the resulting RegExp can be checked and reused.

## Browser Support

Any ES5 capable browser is supported meaning IE9+, Firefox, Chrome, Safari and all modern mobile browsers.

## Contribution

Contribution is very welcome and friendliness is a project goal. Feel free to open issues and feature requests. Pull requests are also very welcome.

We indent with two spaces and the code is ES5.

## Todo

 - <s>put in module</s>
 - <s>npm package</s>
 - <s>cdn etc.</s>
 - <s>tests</s>
 - <s>demos</s>
 - <s>nested match</s>
 - measure performance
 - sugar

