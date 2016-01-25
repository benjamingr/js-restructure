# js-restructure
JavaScript clone of https://github.com/alexflint/go-restructure

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

 - put in module
 - npm package
 - cdn etc.
 - tests
 - demos
