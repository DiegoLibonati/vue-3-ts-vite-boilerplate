<script setup lang="ts">
import AppLink from "@/components/AppLink/AppLink.vue";
</script>

<template>
  <section class="not-found-page">
    <h1 class="not-found-page__code">404</h1>
    <p class="not-found-page__message">The page you are looking for does not exist.</p>
    <AppLink id="link-home" href="/" ariaLabel="Back to Home">← Back to Home</AppLink>
  </section>
</template>

<style scoped>
.not-found-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-lg);
  min-height: calc(100vh - var(--spacing-xl) * 2);
  text-align: center;
}

.not-found-page__code {
  font-size: 6rem;
  color: var(--color-accent);
  font-weight: 700;
}

.not-found-page__message {
  color: var(--color-gray-light);
  font-size: var(--font-size-lg);
}
</style>
