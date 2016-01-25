var matcher = require("./index.js");
var assert = require("assert");
describe("Matching", function() {
  it("matches a string", function(){
    var m = matcher({x:"[A-Z]"})("A");
    assert.equal(m.x, "A");
  });
  it("matches two string", function(){
    var m = matcher({x:"[A-Z]", y:"[A-Z]"})("AB");
    assert.equal(m.x, "A");
    assert.equal(m.y, "B");
  });
  it("matches multi character strings", function(){
    var m = matcher({x:"[A-Z]+"})("AB");
    assert.equal(m.x, "AB");
  });
  it("matches lazily when it has to", function(){
    var m = matcher({x:"[A-Z]+?", _:"C"})("ABCD");
    assert.equal(m.x, "AB");
  });
  it("matches numbers", function(){
    var m = matcher({x:"\\d+"})("123123");
    assert.equal(m.x, "123123");
  });
  it("matches emails", function(){
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
  it("matches primitive http/s urls", function(){
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
  it("parses 'primitive' CSV", function(){
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
    var m = matcher({ x: /a/})("a");
    assert.equal(m.x, "a");
  });
  it("accepts multiple REs ", function(){
    var m = matcher({
     x: /a/,
     y: /A+/
    })("aAAAAA");
    assert.equal(m.x, "a");
    assert.equal(m.y, "AAAAA");
  });
  it("matches emails with RE syntax", function(){
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
  it("accepts flags as a second parameter", function(){
    var m = matcher({
     x: "a+",
    }, "i")("aAAAAA");
    assert.equal(m.x, "aAAAAA");
  });
  it("behaves like native RE on invalid flags", function(){
    assert.throws(function() { 
      var m = matcher({
        x: "a+",
      }, "13qwshfd")("aAAAAA");
    );
  });
});