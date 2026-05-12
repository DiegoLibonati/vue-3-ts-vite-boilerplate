<script setup lang="ts">
import { inject } from "vue";

import type { Ref } from "vue";

import AppLink from "@/components/AppLink/AppLink.vue";
import AppAction from "@/components/AppAction/AppAction.vue";

import "@/pages/ContextPage/ContextPage.css";

const theme = inject<Ref<"light" | "dark">>("theme");
const toggleTheme = inject<() => void>("toggleTheme");

const handleToggle = (): void => {
  toggleTheme?.();
};
</script>

<template>
  <section class="context-page">
    <h1 class="context-page__title">Provide / Inject</h1>
    <p class="context-page__description">
      Vue's <code>provide</code> / <code>inject</code> is the equivalent of React's
      <code>useContext</code>. The theme value below is provided at the App level and injected here.
    </p>

    <div class="context-page__theme">
      <p>
        Current theme: <strong>{{ theme }}</strong>
      </p>
      <AppAction id="action-toggle-theme" ariaLabel="Toggle theme" @click="handleToggle">
        Toggle theme
      </AppAction>
    </div>

    <AppLink id="link-home" href="/" ariaLabel="Back to Home">← Back to Home</AppLink>
  </section>
</template>
