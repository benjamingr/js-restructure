# js-restructure

Based on https://github.com/alexflint/go-restructure

This package allows you to express regular expressions by defining an object, and then capture matched sub-expressions into object's fields.

 - [Motivation](https://github.com/benjamingr/js-restructure#motivation)
 - [API Docs](https://github.com/benjamingr/js-restructure/blob/master/API.md)
 - [Installation](https://github.com/benjamingr/js-restructure#installation)
 - [Contribution](https://github.com/benjamingr/js-restructure#contribution)

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


## Motivation

Matching nested RegExps is hard to read. The goal of this package is to allow users to match common patterns without having to parse the capturing groups of complex regular expressions and put those in object fields. This "shims" the lack of lack of named capturing groups in JavaScript. 

## Installation

    npm install js-restructure

Or in the browser:

    <script src='https://wzrd.in/standalone/js-restructure@latest'></script>

Usage in script tag:
    
    var matcher = window.jsRestructure(...);

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