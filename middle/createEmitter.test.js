const createEmitter = require("./createEmitter.js");
const Emitter = createEmitter();

describe("emitter", () => {
  // Testing event names
  const ONE = "event_1";
  const TWO = "event_2";
  const THREE = "event_3";

  // Testing event arguments
  const ARGUMENT_ONE = "arg_1";
  const ARGUMENT_TWO = "arg_2";

  // Testing subscription functions
  let subscriberOne;
  let subscriberTwo;
  let subscriberThree;

  beforeEach(() => {
    subscriberOne = jest.fn();
    subscriberTwo = jest.fn();
    subscriberThree = jest.fn();

    Emitter.off(ONE);
    Emitter.off(TWO);
    Emitter.off(THREE);
  });

  describe("Emitter.on", () => {
    // more tests
    it("should throw error when event name is invalid", () => {
      const noEventName = () => {
        return Emitter.on(null, subscriberOne);
      };
      expect(noEventName).toThrow("eventName is required");

      const objectEventName = () => {
        return Emitter.on({}, subscriberOne);
      };
      expect(objectEventName).toThrow("event name needs to be string");
    });

    it("should throw error when listener is invalid", () => {
      const noListener = () => {
        return Emitter.on(ONE, null);
      };
      expect(noListener).toThrow("listener is required");

      const objectListener = () => {
        return Emitter.on(ONE, {});
      };
      expect(objectListener).toThrow("listener needs to be a function");
    });

    it("should subscribe to an event name and be called when triggered", () => {
      Emitter.on(ONE, subscriberOne);
      Emitter.trigger(ONE);

      expect(subscriberOne.mock.calls.length).toBe(1);
    });

    it("should call all subscribed functions for the triggered event name", () => {
      Emitter.on(ONE, subscriberOne);
      Emitter.on(ONE, subscriberTwo);
      Emitter.on(TWO, subscriberThree);

      Emitter.trigger(ONE);

      expect(subscriberOne.mock.calls.length).toBe(1);
      expect(subscriberTwo.mock.calls.length).toBe(1);
      expect(subscriberThree.mock.calls.length).toBe(0);
    });

    it("should subscribe to an event name and be called with the arguments that are triggered with", () => {
      Emitter.on(ONE, subscriberOne);
      Emitter.trigger(ONE, ARGUMENT_ONE, ARGUMENT_TWO);
      expect(subscriberOne).toBeCalledWith(ARGUMENT_ONE, ARGUMENT_TWO);
    });

    it("should return the total number of subscribers for the event name", () => {
      expect(Emitter.on(ONE, subscriberOne)).toBe(1);
      expect(Emitter.on(ONE, subscriberOne)).toBe(2);
      expect(Emitter.on(TWO, subscriberOne)).toBe(1);
      expect(Emitter.on(ONE, subscriberOne)).toBe(3);
    });
  });

  describe("Emitter.off", () => {
    it("should unsubscribe", () => {
      Emitter.on(ONE, subscriberOne);
      Emitter.on(TWO, subscriberOne);
      Emitter.trigger(ONE);
      Emitter.trigger(TWO);
      expect(subscriberOne.mock.calls.length).toBe(2);

      Emitter.off(ONE, subscriberOne);
      Emitter.trigger(ONE);
      Emitter.trigger(TWO);

      expect(subscriberOne.mock.calls.length).toBe(3);
    });

    it("should only unsubscribe an event name and the matching given function", () => {
      Emitter.on(ONE, subscriberOne);
      Emitter.on(ONE, subscriberTwo);
      Emitter.on(TWO, subscriberOne);
      Emitter.trigger(ONE);
      Emitter.trigger(TWO);

      expect(subscriberOne.mock.calls.length).toBe(2);
      expect(subscriberTwo.mock.calls.length).toBe(1);

      Emitter.off(ONE, subscriberOne);
      Emitter.trigger(ONE);
      Emitter.trigger(TWO);

      expect(subscriberOne.mock.calls.length).toBe(3);
      expect(subscriberTwo.mock.calls.length).toBe(2);
    });

    it("should return the total number of subscribers for the event name", () => {
      Emitter.on(ONE, subscriberOne);
      Emitter.on(ONE, subscriberOne);
      Emitter.on(ONE, subscriberTwo);

      expect(Emitter.off(ONE, subscriberOne)).toBe(1);
      expect(Emitter.off(ONE)).toBe(0);
    });
  });
});
