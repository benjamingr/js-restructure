# js-restructure
JavaScript clone of https://github.com/alexflint/go-restructure

## Installation

    npm install js-restructure

Or in the browser

    <script src='https://wzrd.in/standalone/js-restructure@latest'></script>

Usage in script tag:
    
    var matcher = window.jsRestructure(...);

## Match regular expressions into object fields

Example email matcher
```js
matcher({
   _    : "^",
   user : "\\w+",
   _2   : "@",
   host : "[^@]+",
   _3    : "$"
})("benji@tipranks.com")
```

## Todo

 - ---put in module---
 - ---npm package---
 - ---cdn etc.---
 - ---tests---
 - demos
 - nested match
 - measure performance
 - sugar
 
