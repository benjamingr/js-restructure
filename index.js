module.exports = matcher;

function matcher(obj, flags) {
  "use strict";
  var props = Object.getOwnPropertyNames(obj);
  var parserArgs = [];
  var re = new RegExp(props.reduce(function(p, c) {
    if(!isNaN(c)) {
      throw new TypeError("Objects with numeric keys are not supported." +
                          "Got object with key: " + c + " for object: " + obj);
    }
    var val = getVal(obj, c, parserArgs);
    if(c[0] === "_") return p + val;
    else return p + "(" + val + ")";
  }, ""), flags || "");
  
  var _nonCapturingRe = props.reduce( function(prev, cur) {
    return prev + obj[cur];
  }, "");

  props = props.filter(function(x) { return x[0] !== "_"; });
  var parser = function(pattern) {
      var o = {};
      var res = re.exec(pattern);
      if(res === null) return null;
      for(var i = 0; i < res.length; i++) {
        if(parserArgs[i]) { // got a parser
          o[props[i]] = parserArgs[i](res[i + 1]); // invoke the parser
        } else {
          o[props[i]] = res[i + 1];
        }
      }
      return o;
  };
  parser._nonCapturingRe = _nonCapturingRe; // expose raw RE for nesting
  parser.re = re; // expose regexp
  return parser;
};

function getVal(obj, prop, extraParsers) {
  var val = obj[prop];
  var isParser = Boolean(val.re);
  var isRegExp = Boolean(val.source);
  var isObject = Object(val) === val;
  // convert objects that are not matchers or RegExps to nested parsers
  if (isObject && !isParser && !isRegExp) {
    val = matcher(val);
  }
  isParser = Boolean(val.re); // update in case we now converted it to a parser
  if (isParser) { // accept parsers as arguments
    extraParsers.push(val); // note this is a parser
    val = val._nonCapturingRe; // don't capture for parser arguments
  } else if (isRegExp) {
    extraParsers.push(null); // not a parser
    val = val.source; 
  } else {
    extraParsers.push(null); // not a parser
  }
  return val;
}