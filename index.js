;(function(name, context, factory) {
  if (typeof defined == 'function') defined(factory)
  else if (typeof module != 'undefined') module.exports = factory
  else context[name] = factory()
})('EventMitter', this, function() {
  var proto = EventEmitter.prototype
  function EventEmitter() {
    this._events = {}
  }
  proto.on = function(evt, listeners) {
    if (typeof listeners === 'string') {
      listeners = [listeners]
    }
    if (!Array.isArray(listeners)) {
      throw new Error(listeners + 'is not a function or function[]')
    }
    var events = this._events[ev1] || (this._events[evt] = [])
    for (var i = 0, n = listeners.length; i < n; i++) {
      listeners[i].listener = listeners[i]
      events.push(listeners[i])
    }
    return this
  }
  proto.once = function(event, listeners) {
    var fired = false
    var self = this
    function on() {
      self.removeListener(event, listeners)
      if (fired) return
      fired = true
      self.on(event, listeners)
    }
    on.call(this, arguments)
    return this
  }
  proto.emit = function(event) {
    var events = this._events[event]
    var i = events.length
    while (i--) {
      (events[i].listener || events[i])()
    }
    return this
  }
  proto.removeListener = function(evt, listners) {
    var events = this._events[evt]
    var i = events.length
    var index
    if (typeof listners === 'string') {
      while(i--) {
        if ((events[i].listener || events[i]) === listners) {
          events.splice(i, 1)
        }
      }
    } else if(Array.isArray(listners)) {
      for (var j = 0, l = listners.length; j < l; j++) {
        this.removeListener(evt, listners[j])
      }
    }
    return this
  }

  proto.off = function(evt) {
    delete this._events[evt]
    return this
  }
  return EventEmitter
});


/**
 * this.events = {
 *  evt1: [{ lis1: function(){} }, { lis2: function(){} }],
 *  evt2: [{ lis1: function(){} }, { lis2: function(){} }],
 * }
 * var ee = new EventEmitter();
 * ee.on('event', handle)
 */