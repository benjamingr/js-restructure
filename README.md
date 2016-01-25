# js-restructure
JavaScript clone of https://github.com/alexflint/go-restructure

This package allows you to express regular expressions by defining an object, and then capture matched sub-expressions into object's fields. Here is a very simple email address parser:

Example email matcher
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

## Installation

    npm install js-restructure

Or in the browser

    <script src='https://wzrd.in/standalone/js-restructure@latest'></script>

Usage in script tag:
    
    var matcher = window.jsRestructure(...);


## Todo

 - <s>put in module</s>
 - <s>npm package</s>
 - <s>cdn etc.</s>
 - <s>tests</s>
 - demos
 - nested match
 - measure performance
 - sugar

