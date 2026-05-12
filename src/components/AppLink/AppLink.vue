<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";

import type { LinkProps } from "@/types/props";

import "@/components/AppLink/AppLink.css";

const props = withDefaults(defineProps<LinkProps>(), {
  target: "_self",
  className: "",
});

const isExternal = computed<boolean>(() => /^https?:\/\//.test(props.href));
const classes = computed<string>(() => ["app-link", props.className].filter(Boolean).join(" "));
</script>

<template>
  <a
    v-if="isExternal"
    :id="id"
    :href="href"
    :target="target"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    :class="classes"
    :aria-label="ariaLabel"
  >
    <slot />
  </a>
  <RouterLink v-else :id="id" :to="href" :class="classes" :aria-label="ariaLabel">
    <slot />
  </RouterLink>
</template>
