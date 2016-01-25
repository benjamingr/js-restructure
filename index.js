module.exports = function matcher(obj) {
  "use strict";
  var props = Object.getOwnPropertyNames(obj);
  var re = new RegExp(props.reduce(function(p, c) {
    if(c.indexOf("_") === 0) return p + obj[c];
    else return p + "(" + obj[c] + ")";
  }, ""));
  props = props.filter(function(x) { return !x.startsWith("_"); });
  var parser = function(pattern) {
      var o = {};
      var res = re.exec(pattern);
      if(res === null) return null;
      for(var i = 0; i < res.length; i++) {
         o[props[i]] = res[i + 1];
      }
      return o;
  };
  parser.re = re; // expose regexp
  return parser;
};
