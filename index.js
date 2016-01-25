function matcher(obj) { "use strict";
   let props = Object.getOwnPropertyNames(obj);
   const re = new RegExp(props.reduce((p, c) => p + (c.startsWith("_") ? obj[c] : `(${obj[c]})`), ""));
   props = props.filter(x => !x.startsWith("_"));
   return function(pattern) { 
      let o = {};
      const res = re.exec(pattern);
      for(let i = 0; i < res.length; i++) o[props[i]] = res[i+1];
      return o;
   };
}
