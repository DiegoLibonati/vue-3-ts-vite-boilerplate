<script setup lang="ts">
import AppLink from "@/components/AppLink/AppLink.vue";

import "@/pages/HomePage/HomePage.css";
</script>

<template>
  <section class="home-page">
    <h1 class="home-page__title">Vue 3 TS Vite Boilerplate</h1>
    <p class="home-page__subtitle">
      Production-ready starting point with Vue 3, TypeScript, Vite, Pinia and Vue Router.
    </p>

    <nav class="home-page__nav" aria-label="Main navigation">
      <AppLink id="link-about" href="/about" ariaLabel="Go to About page">About</AppLink>
      <AppLink id="link-pinia" href="/pinia" ariaLabel="Go to Pinia example">Pinia</AppLink>
      <AppLink id="link-context" href="/context" ariaLabel="Go to Context example">Context</AppLink>
      <AppLink id="link-users" href="/users" ariaLabel="Go to Users page">Users</AppLink>
    </nav>
  </section>
</template>
