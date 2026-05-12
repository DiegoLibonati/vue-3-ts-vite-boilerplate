<script setup lang="ts">
import type { ActionProps } from "@/types/props";

import "@/components/AppAction/AppAction.css";

defineProps<ActionProps>();
defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <button
    :id="id"
    type="button"
    :aria-label="ariaLabel"
    :class="['app-action', className].filter(Boolean).join(' ')"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>
