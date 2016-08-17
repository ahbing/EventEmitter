# EventEmitter

EventEmitter is a simple package for manage events and listeners.

## API

### on(event, listener/listeners)

- param ( String | RegExp ) evt - Name of the event to attach the listener to.
- param ( Function | Array ) listener - Method to be called when the event is emitted.
- return ( Object ) - Current instance of EventEmitter for chaining.

### once(event, listener/listeners)

- param ( String | RegExp ) evt -  Name of the event to attach the listener to.
- param ( Function | Array ) listener - Method to be called when the event is emitted. If the function returns true then it will be removed after calling
- return ( Object ) - Current instance of EventEmitter for chaining.

### off(event)

- param ( String | RegExp ) evt - Name of event to remove all listeners for.
- return ( Object ) - Current instance of EventMitter for chaining

### emit(event)

- param ( String | RegExp ) evt - Name of the event to emit and execute listeners for.
- param ( …* ) Optional - additional arguments to be passed ti each listener.
- return ( Object ) - Current instance of EventEmitter for chaining

### removeListener(event, listeners)

- param ( String | RegExp ) evt - Name of event to remove some listeners
- param ( Function | Array ) listener - Method to be removed
- return ( Object ) - Current instance of EventEmitter for chianing.









