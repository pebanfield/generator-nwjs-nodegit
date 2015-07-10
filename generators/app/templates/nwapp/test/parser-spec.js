/**
 * parser-spec
 */
var assert = require("assert");
var parser = require("../parser");

describe('node-git parser', function(){

  describe('getHistory', function(done){

    it('should return a git log history', function(done){

      parser.getHistory().then(function(commits){
        assert.ok(commits);
        done();
      });
    });

  })
});
