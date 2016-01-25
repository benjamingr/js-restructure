var matcher = require("./index.js");
var assert = require("assert");
describe("Matching", function() {
  it("matches a string", function(){
    var m = matcher({x:"[A-Z]"})("A");
    assert.equal(m.x, "A");
  });
});