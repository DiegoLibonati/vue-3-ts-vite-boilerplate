import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCounterStore = defineStore("counter", () => {
  const count = ref<number>(0);

  const doubled = computed<number>(() => count.value * 2);

  const increment = (): void => {
    count.value += 1;
  };

  const decrement = (): void => {
    count.value -= 1;
  };

  const reset = (): void => {
    count.value = 0;
  };

  return { count, doubled, increment, decrement, reset };
});
