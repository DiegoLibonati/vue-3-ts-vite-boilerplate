import { createPinia, setActivePinia } from "pinia";

import { useCounterStore } from "@/stores/useCounterStore";

describe("counter", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("initial state", () => {
    it("should start with count at 0", () => {
      const store = useCounterStore();
      expect(store.count).toBe(0);
    });

    it("should start with doubled at 0", () => {
      const store = useCounterStore();
      expect(store.doubled).toBe(0);
    });
  });

  describe("doubled", () => {
    it("should be twice the count value", () => {
      const store = useCounterStore();
      store.count = 5;
      expect(store.doubled).toBe(10);
    });

    it("should update reactively when count changes", () => {
      const store = useCounterStore();
      store.count = 3;
      expect(store.doubled).toBe(6);
      store.count = 7;
      expect(store.doubled).toBe(14);
    });
  });

  describe("increment", () => {
    it("should increase count by 1", () => {
      const store = useCounterStore();
      store.increment();
      expect(store.count).toBe(1);
    });

    it("should increase count by 1 on each call", () => {
      const store = useCounterStore();
      store.increment();
      store.increment();
      expect(store.count).toBe(2);
    });
  });

  describe("decrement", () => {
    it("should decrease count by 1", () => {
      const store = useCounterStore();
      store.count = 5;
      store.decrement();
      expect(store.count).toBe(4);
    });

    it("should allow count to go below zero", () => {
      const store = useCounterStore();
      store.decrement();
      expect(store.count).toBe(-1);
    });
  });

  describe("reset", () => {
    it("should set count back to 0", () => {
      const store = useCounterStore();
      store.count = 10;
      store.reset();
      expect(store.count).toBe(0);
    });

    it("should set count to 0 from a negative value", () => {
      const store = useCounterStore();
      store.count = -5;
      store.reset();
      expect(store.count).toBe(0);
    });
  });
});
