<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";

import type { LinkProps } from "@/types/props";

const props = withDefaults(defineProps<LinkProps>(), {
  target: "_self",
});

const isExternal = computed<boolean>(() => /^https?:\/\//.test(props.href));
</script>

<template>
  <a
    v-if="isExternal"
    :id="id"
    :href="href"
    :target="target"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    class="app-link"
    :aria-label="ariaLabel"
  >
    <slot />
  </a>
  <RouterLink v-else :id="id" :to="href" class="app-link" :aria-label="ariaLabel">
    <slot />
  </RouterLink>
</template>

<style scoped>
.app-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--color-accent);
  font-weight: 600;
  text-decoration: none;
  transition:
    color 0.2s ease,
    opacity 0.2s ease;
}

.app-link:hover {
  opacity: 0.8;
}

.app-link:focus-visible {
  outline: 0.125rem solid var(--color-accent);
  outline-offset: 0.125rem;
  border-radius: 0.125rem;
}

.app-link.router-link-active {
  color: var(--color-white);
  text-decoration: underline;
}
</style>
