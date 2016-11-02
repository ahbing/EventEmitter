;(function(name, context, factory) {
  /* istanbul ignore next */
  if (typeof defined == 'function') defined(factory)
  else if (typeof module != 'undefined') module.exports = factory()
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
      return new Error(listeners + 'is not a function or function[]');
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
    var listeners = this._events[event];
    var args;
    if (arguments.length > 1) {
      args = Array.prototype.slice.call(arguments, 1);
    }
    if (!listeners) return;
    var i = listeners.length;
    while (i--) {
      var listener = listeners[i].listener || listeners[i];
      if (args && args.length) {
        listener.apply(null, args);
      } else {
        listener();
      }
    }
    return this;
  }
  proto.removeListener = function(event, listner) {
    var listeners = this._events[event];
    /* istanbul ignore if */
    if (!listeners) return;
    var i = listeners.length;
    if (typeof listner === 'function') {
      while(i--) {
        if ((listeners[i].listener || listeners[i]) === listner) {
          listeners.splice(i, 1);
        }
      }
    } else if(Array.isArray(listner)) {
      for (var j = 0, l = listner.length; j < l; j++) {
        this.removeListener(event, listner[j]);
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
