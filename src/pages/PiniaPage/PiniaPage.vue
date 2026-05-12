<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCounterStore } from "@/stores/counter";

import AppAction from "@/components/AppAction/AppAction.vue";
import AppLink from "@/components/AppLink/AppLink.vue";

import "@/pages/PiniaPage/PiniaPage.css";

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
