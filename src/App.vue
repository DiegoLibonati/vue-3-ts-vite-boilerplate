<script setup lang="ts">
import { provide, ref } from "vue";
import { RouterView } from "vue-router";

import type { Ref } from "vue";

const theme: Ref<"light" | "dark"> = ref("dark");

const toggleTheme = (): void => {
  theme.value = theme.value === "dark" ? "light" : "dark";
};

provide("theme", theme);
provide("toggleTheme", toggleTheme);
</script>

<template>
  <main class="app">
    <RouterView />
  </main>
</template>

<style>
.app {
  width: 100%;
  min-height: 100vh;
  padding: var(--spacing-xl);
}
</style>
