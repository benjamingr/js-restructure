module.exports = function matcher(obj, flags) {
  "use strict";
  var props = Object.getOwnPropertyNames(obj);
  var re = new RegExp(props.reduce(function(p, c) {
    if(!isNaN(c)) {
      throw new TypeError("Object with numeric keys are not supported");
    } 
    var val = obj[c];
    if(val.source) val = val.source; // accept RE arguments
    if(c[0] === "_") return p + val;
    else return p + "(" + val + ")";
  }, ""), flags || "");
  props = props.filter(function(x) { return x[0] !== "_"; });
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
