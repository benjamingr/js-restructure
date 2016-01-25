# js-restructure
JavaScript clone of https://github.com/alexflint/go-restructure

This package allows you to express regular expressions by defining an object, and then capture matched sub-expressions into object's fields.

Here is a very simple email address parser:

```js
var parser = matcher({
   _    : "^",
   user : "\\w+",
   _2   : "@",
   host : "[^@]+",
   _3    : "$"
});
var parts = parser("benji@somewhere.com");
console.log(parts.user); // benji
console.log(host); // somewhere.com
```

Example primitive URL parser:

```js
var m = matcher({
   protocol    : "http|https",
   _1 : "://",
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

A parser is itself a function that can be passed a string, it returns an object of the type passed when creating the parser or null if the parsing failed:

    Parser:: (string) => T?

For example:

    var parser = matcher({x : A });
    parser("A").x; // A
    parser("B"); // null, no match
    
## Todo

 - <s>put in module</s>
 - <s>npm package</s>
 - <s>cdn etc.</s>
 - <s>tests</s>
 - demos
 - nested match
 - measure performance
 - sugar

