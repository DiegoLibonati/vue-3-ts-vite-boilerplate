<script setup lang="ts">
import { inject } from "vue";

import AppLink from "@/components/AppLink/AppLink.vue";
import AppAction from "@/components/AppAction/AppAction.vue";

import { ThemeKey, ToggleThemeKey } from "@/constants/injectionKeys";

const theme = inject(ThemeKey);
const toggleTheme = inject(ToggleThemeKey);

if (!theme || !toggleTheme) {
  throw new Error("Theme context not provided");
}

const handleToggle = (): void => {
  toggleTheme();
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

<style scoped>
.context-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
  max-width: 43.75rem;
  margin: 0 auto;
  padding: var(--spacing-xl);
  text-align: center;
}

.context-page__title {
  color: var(--color-white);
  font-size: 2rem;
}

.context-page__description {
  color: var(--color-gray-light);
  font-size: var(--font-size-lg);
  line-height: 1.7;
}

.context-page__description code {
  background-color: rgba(var(--color-black-rgb), 0.4);
  color: var(--color-accent);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-family: monospace;
}

.context-page__theme {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background-color: rgba(var(--color-black-rgb), 0.25);
  border-radius: 0.5rem;
  color: var(--color-white);
  font-size: var(--font-size-lg);
}

.context-page__theme strong {
  color: var(--color-accent);
  text-transform: uppercase;
}
</style>
