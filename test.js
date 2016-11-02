var EventEmitter = require('./index');
var mocha = require('mocha');
var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;

describe('add event', function() {
  let ee;
  beforeEach(function() {
    ee = new EventEmitter();
  });
  afterEach(function() {
    ee = null;
  });
  it('add listener as a function', function() {
    let callCount = 0;
    let listener = function() { callCount++ };
    ee.on('add', listener);
    ee.emit('add');
    expect(callCount).to.equal(1);
    ee.emit('add');
    expect(callCount).to.equal(2);
    ee.removeListener('add', listener);
    ee.emit('add');
    expect(callCount).to.equal(2);
    ee.off('add');
    expect(ee.emit('add')).to.be.undefined;
  });
  it('add listener as a function[]', function() {
    let callCount = 0;
    let listener1 = function() { callCount++ };
    let listener2 = function() { callCount++ };
    let listener3 = function() { callCount++ };
    let listener4 = function() { callCount++ };
    ee.on('add', [listener1, listener2, listener3, listener4]);
    ee.emit('add');
    expect(callCount).to.equal(4);
    ee.emit('add');
    expect(callCount).to.equal(8);
    ee.removeListener('add', [listener1, listener2]);
    ee.emit('add');
    expect(callCount).to.equal(10);
    ee.off('add');
    expect(ee.emit('add')).to.be.undefined;
  });
  it('add listener as an invalid value', function() {
    expect(ee.on('add', 'add')).to.be.an('error');
    expect(ee.on('add', null)).to.be.an('error');
  })
});


describe('add once event', function() {
  let ee;
  beforeEach(function() {
    ee = new EventEmitter();
  });
  afterEach(function() {
    ee = null;
  });
  it('add once event listener should call only once', function() {
    let callCount = 0;
    let listener = function() { callCount++ };
    ee.once('add', listener);
    ee.emit('add');
    expect(callCount).to.equal(1);
    ee.emit('add');
    expect(callCount).to.equal(1);
  });
  it('add once event listeners should call only once', function() {
    let callCount = 0;
    let listener1 = function() { callCount++ };
    let listener2 = function() { callCount++ };
    ee.once('add', [listener1, listener2]);
    ee.emit('add');
    expect(callCount).to.equal(2);
    ee.emit('add');
    expect(callCount).to.equal(2);
  });
});
