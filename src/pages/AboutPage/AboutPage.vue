<script setup lang="ts">
import AppLink from "@/components/AppLink/AppLink.vue";

import "@/pages/AboutPage/AboutPage.css";
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
