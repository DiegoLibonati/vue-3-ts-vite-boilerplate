<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCounterStore } from "@/stores/useCounterStore";

import AppAction from "@/components/AppAction/AppAction.vue";
import AppLink from "@/components/AppLink/AppLink.vue";

const counterStore = useCounterStore();
const { count, doubled } = storeToRefs(counterStore);
const { increment, decrement, reset } = counterStore;
</script>

<template>
  <section class="pinia-page">
    <h1 class="pinia-page__title">Pinia Store Example</h1>
    <p class="pinia-page__description">
      Counter state lives in a Pinia store and persists across navigation.
    </p>

    <div class="pinia-page__counter">
      <p class="pinia-page__count">
        Count: <strong>{{ count }}</strong>
      </p>
      <p class="pinia-page__count">
        Doubled: <strong>{{ doubled }}</strong>
      </p>
    </div>

    <div class="pinia-page__actions">
      <AppAction id="action-decrement" ariaLabel="Decrement counter" @click="decrement">
        -
      </AppAction>
      <AppAction id="action-reset" ariaLabel="Reset counter" @click="reset">Reset</AppAction>
      <AppAction id="action-increment" ariaLabel="Increment counter" @click="increment">
        +
      </AppAction>
    </div>

    <AppLink id="link-home" href="/" ariaLabel="Back to Home">← Back to Home</AppLink>
  </section>
</template>

<style scoped>
.pinia-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
  max-width: 37.5rem;
  margin: 0 auto;
  padding: var(--spacing-xl);
  text-align: center;
}

.pinia-page__title {
  color: var(--color-white);
  font-size: 2rem;
}

.pinia-page__description {
  color: var(--color-gray-light);
  font-size: var(--font-size-lg);
}

.pinia-page__counter {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding: var(--spacing-lg);
  background-color: rgba(var(--color-black-rgb), 0.25);
  border-radius: 0.5rem;
  min-width: 15.625rem;
}

.pinia-page__count {
  color: var(--color-white);
  font-size: var(--font-size-xl);
}

.pinia-page__count strong {
  color: var(--color-accent);
}

.pinia-page__actions {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  justify-content: center;
}
</style>
