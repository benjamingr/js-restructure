var matcher = require("./index.js");
var assert = require("assert");
describe("Matching", function() {
  it("matches a string", function(){
    var m = matcher({x:"[A-Z]"})("A");
    assert.equal(m.x, "A");
  });
  it("matches two string", function() {
    var m = matcher({x:"[A-Z]", y:"[A-Z]"})("AB");
    assert.equal(m.x, "A");
    assert.equal(m.y, "B");
  });
  it("matches multi character strings", function() {
    var m = matcher({x:"[A-Z]+"})("AB");
    assert.equal(m.x, "AB");
  });
  it("matches lazily when it has to", function() {
    var m = matcher({x:"[A-Z]+?", _:"C"})("ABCD");
    assert.equal(m.x, "AB");
  });
  it("matches numbers", function() {
    var m = matcher({x:"\\d+"})("123123");
    assert.equal(m.x, "123123");
  });
  it("matches emails", function() {
    var m = matcher({
       _    : "^",
       user : "\\w+",
       _2   : "@",
       host : "[^@]+",
       _3    : "$"
    })("benji@nono.com")
    assert.equal(m.user, "benji");
    assert.equal(m.host, "nono.com");
  });
  it("matches primitive http/s urls", function() {
    var m = matcher({
       protocol    : "http|https",
       _1 : "://",
       host : "[^/]+",
       _2   : "/",
       path : ".+",
       _3    : "$"
    })("http://www.google.com/search?foo=bar")
    assert.equal(m.protocol, "http");
    assert.equal(m.host, "www.google.com");

    assert.equal(m.path, "search?foo=bar");
  });
  it("parses 'primitive' CSV", function() {
    var p = matcher({
       first   : "\\w+?",
       _1      : ",",
       last    : "\\w+?",
       _2      : ",",
       age     : "\\d+?",
       _3      : "$"
    });
    var m = p("Benjamin,Gruenbaum,27")
    assert.equal(m.first, "Benjamin");
    assert.equal(m.last, "Gruenbaum");
    assert.equal(m.age, "27");
  });
  it("works with dynamic objects", function() { 
    var o = {};
    o["A"] = "A";
    var p = matcher(o)("A").A;
    assert.equal(p, "A");
  });
  it("parses HTML", function(){
    var he = matcher({
        _1  : "<a href='",
        url : ".+?",
        _2  : "'.*",
    });
    var comes = he("<a href='http://www.google.com'>Google!</a>");
    assert.equal(comes.url, "http://www.google.com");
  });
  it("accepts REs ", function(){
    var m = matcher({ x: /a/});
    var p = m("a");
    assert.equal(p.x, "a");
  });
  it("accepts multiple REs ", function(){
    var m = matcher({
     x: /a/,
     y: /A+/
    })("aAAAAA");
    assert.equal(m.x, "a");
    assert.equal(m.y, "AAAAA");
  });
  it("matches emails with RE syntax", function() {
    var m = matcher({
       _    : /^/,
       user : /\w+/,
       _2   : /@/,
       host : /[^@]+/,
       _3    : /$/
    })("benji@nono.com")
    assert.equal(m.user, "benji");
    assert.equal(m.host, "nono.com");
  });
  it("accepts flags as a second parameter", function() {
    var m = matcher({
     x: "a+",
    }, "i")("aAAAAA");
    assert.equal(m.x, "aAAAAA");
  });
  it("behaves like native RE on invalid flags", function() {
    assert.throws(function() { 
      var m = matcher({
        x: "a+",
      }, "13qwshfd")("aAAAAA");
    });
  });
  it("throws on objects with numeric keys (inconsistent iteration order)",
    function(){
      assert.throws(function() {
        var m = matcher([1,2,3]);
      });
  });
  it("works with a large number of properties", function() {
    var o = {};
    var str = "";
    for(var i = 0; i < 100; i++) {
        o["x_" + i] = "A";
        str += "A"
    }
    var parser = matcher(o);
    var o2 = parser(str);
    assert.equal(o2.x_50, "A");
    assert.equal(o2.x_99, "A");
    assert.equal(o2.x_0, "A");
  });

});

describe("the parser", function() {
  it("should accept nested objects", function() {
    var p = matcher({x: {x:"A"}})("A");
    assert.equal(p.x.x, "A");
  });
  it("should accept multiple nested objects", function() {
    var p = matcher({x: {x:"A"}, y: {y: "B"}})("AB");
    assert.equal(p.x.x, "A");
    assert.equal(p.y.y, "B");
  });
  it("should accept deep nested objects", function() {
    var p = matcher({x: {x:"A", y: "B"}})("AB");
    assert.equal(p.x.x, "A");
    assert.equal(p.x.y, "B");
  });
  it("should accept nested matchers", function() {
    var m1 = matcher({x: "A"});
    var m2 = matcher({x: m1 });
    var p = m2("A");
    assert.equal(p.x.x, "A");
  });
  it("should accept the same matcher twice", function() {
    var m1 = matcher({x: "A"});
    var m2 = matcher({x: m1, y:m1 });
    var p = m2("AA");
    assert.equal(p.x.x, "A");
    assert.equal(p.y.x, "A");
  });
  it("should accept the same matcher twice", function() {
    var m1 = matcher({x: "A"});
    var m2 = matcher({x: m1, y:m1 });
    var p = m2("AA");
    assert.equal(p.x.x, "A");
    assert.equal(p.y.x, "A");
  });
});