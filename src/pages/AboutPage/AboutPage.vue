<script setup lang="ts">
import AppLink from "@/components/AppLink/AppLink.vue";
</script>

<template>
  <section class="about-page">
    <h1 class="about-page__title">About</h1>
    <p class="about-page__text">
      This boilerplate provides a clean starting point for Vue 3 applications. It includes
      TypeScript with strict settings, Vite for fast builds, Pinia for state management, Vue Router
      for navigation, Vitest for testing and ESLint + Prettier for code quality.
    </p>

    <AppLink id="link-home" href="/" ariaLabel="Back to Home">← Back to Home</AppLink>
  </section>
</template>

<style scoped>
.about-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  max-width: 43.75rem;
  margin: 0 auto;
  padding: var(--spacing-xl);
}

.about-page__title {
  color: var(--color-white);
  font-size: 2rem;
}

.about-page__text {
  color: var(--color-gray-light);
  font-size: var(--font-size-lg);
  line-height: 1.7;
}
</style>
