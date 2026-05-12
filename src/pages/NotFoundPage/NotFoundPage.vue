<script setup lang="ts">
import AppLink from "@/components/AppLink/AppLink.vue";

import "@/pages/NotFoundPage/NotFoundPage.css";
</script>

<template>
  <section class="not-found-page">
    <h1 class="not-found-page__code">404</h1>
    <p class="not-found-page__message">The page you are looking for does not exist.</p>
    <AppLink id="link-home" href="/" ariaLabel="Back to Home">← Back to Home</AppLink>
  </section>
</template>
