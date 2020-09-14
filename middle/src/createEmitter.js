// Implement event emitter
const createEmitter = () => {
  // listeners is key-value object, value could be an array of functions
  const listeners = {};

  const addListener = (eventName, listener) => {
    if (!eventName) {
      throw new Error("eventName is required");
    }

    if (typeof eventName !== "string") {
      throw new Error("event name needs to be string");
    }

    if (!listener) {
      throw new Error("listener is required");
    }

    if (typeof listener !== "function") {
      throw new Error("listener needs to be a function");
    }

    listeners[eventName] = listeners[eventName] || [];
    listeners[eventName].push(listener);
  };

  const removeListener = (eventName, listener) => {
    if (!eventName) {
      throw new Error("eventName is required");
    }

    if (typeof eventName !== "string") {
      throw new Error("event name needs to be string");
    }

    // remove all if no specific listener
    if (!listener) {
      delete listeners[eventName];
      return 0;
    }

    listeners[eventName] = listeners[eventName].filter(fn => {
      return !(fn === listener);
    });

    return listeners[eventName] ? listeners[eventName].length : 0;
  };

  const emit = (eventName, ...args) => {
    if (!eventName) {
      throw new Error("eventName is required");
    }

    if (typeof eventName !== "string") {
      throw new Error("event name needs to be string");
    }
    const fns = listeners[eventName];
    if (!fns) return false;
    fns.forEach(f => {
      f(...args);
    });
    return true;
  };

  const on = (eventName, listener) => {
    addListener(eventName, listener);
    return listeners[eventName].length;
  };

  const off = (eventName, listener) => {
    return removeListener(eventName, listener);
  };

  const trigger = (eventName, ...args) => {
    return emit(eventName, ...args);
  };

  return { on, off, trigger };
};

module.exports = createEmitter;
