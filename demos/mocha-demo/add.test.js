var add = require('./add.js')
var expect = require('chai').expect

describe('test add function', function() {
	it('1 add 1 expects to be 2', function() {
		expect(add(1, 1)).to.be.equal(2)
	})
})