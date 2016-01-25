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
});