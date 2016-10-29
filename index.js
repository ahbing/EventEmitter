;(function(name, context, factory) {
  /* istanbul ignore if */
  if (typeof defined == 'function') defined(factory)
  else if (typeof module != 'undefined') module.exports = factory()
  /* istanbul ignore next */
  else context[name] = factory() 
})('EventMitter', this, function() {
  var proto = EventEmitter.prototype;
  function EventEmitter() {
    this._events = {};
  }
  proto.on = function(event, listeners) {
    if (typeof listeners === 'function') {
      listeners = [listeners];
    }
    if (!Array.isArray(listeners)) {
      throw new Error(listeners + 'is not a function or function[]');
    }
    var events = this._events[event] || (this._events[event] = []);
    for (var i = 0, n = listeners.length; i < n; i++) {
      listeners[i].listener = listeners[i];
      events.push(listeners[i]);
    }
    return this;
  }
  function _oncewrap(target, event, listensers) {
    var fired = false;
    function g() {
      target.removeListener(event, g);
      if (!fired) {
        fired = true;
        if (typeof listensers === 'function') {
          listensers = [listensers];
        }
        if (Array.isArray(listensers)) {
          for (var i = 0, l = listensers.length; i < l; i++) {
            listensers[i].apply(target, arguments);
          }
        }
      }
    }
    return g;
  }
  proto.once = function(event, listeners) {    
    this.on(event, _oncewrap(this, event, listeners));
    return this;
  }
  proto.emit = function(event) {
    var events = this._events[event];
    if (!events) return;
    var i = events.length;
    while (i--) {
      (events[i].listener || events[i])();
    }
    return this;
  }
  proto.removeListener = function(event, listners) {
    var events = this._events[event];
    if (!events) return;
    var i = events.length;
    if (typeof listners === 'function') {
      while(i--) {
        if ((events[i].listener || events[i]) === listners) {
          events.splice(i, 1);
        }
      }
    } else if(Array.isArray(listners)) {
      for (var j = 0, l = listners.length; j < l; j++) {
        this.removeListener(event, listners[j]);
      }
    }
    return this;
  }

  proto.off = function(event) {
    delete this._events[event];
    return this;
  }
  return EventEmitter;
});


/**
 * this._events = {
 *  event1: [{ lis1: function(){} }, { lis2: function(){} }],
 *  event2: [{ lis1: function(){} }, { lis2: function(){} }],
 * }
 * var ee = new EventEmitter()
 * ee.on('event', handle)
 * ee.emit('event', handle)
 */