module.exports = function matcher(obj, flags) {
  "use strict";
  var props = Object.getOwnPropertyNames(obj);
  var parserArgs = [];
  var re = new RegExp(props.reduce(function(p, c) {
    if(!isNaN(c)) {
      throw new TypeError("Objects with numeric keys are not supported."+
                          "Got object with key: "+c);
    } 
    var val = obj[c];

    // convert objects that are not matchers or REs to nested parsers
    if (Object(val) === val && !val.re && !val.source) { 
      val = matcher(val);
    }
    if(val.re) {
      // accept parser arguments,
      parserArgs.push(val); // add the parser
      val = val._nonCapturingRe; //  don't capture for re arguments. 
    } else if (val.source) {

      val = val.source; // accept RE arguments
    } else {
      parserArgs.push(null);
    }
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
