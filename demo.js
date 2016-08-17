var EventEmitter = require('./')

var ee = new EventEmitter()

var sayhello = function() {
  console.log('hello')
}
var sayworld = function() {
  console.log('world')
}

ee.on('hello',  sayhello);
ee.emit('hello');
