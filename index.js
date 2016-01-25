module.exports = function matcher(obj) {
   "use strict";
   var props = Object.getOwnPropertyNames(obj);
   var re = new RegExp(props.reduce(function(p, c) {
      return p + (c.startsWith("_") ? obj[c] : "("+obj[c]}+")";
   }));
   props = props.filter(function(x) { return !x.startsWith("_"); });
   return function(pattern) { 
      var o = {};
      var res = re.exec(pattern);
      for(var i = 0; i < res.length; i++) {
         o[props[i]] = res[i + 1];
      }
      return o;
   };
}
