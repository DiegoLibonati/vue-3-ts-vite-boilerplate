<script setup lang="ts">
import type { UserCardProps } from "@/types/props";

import "@/components/UserCard/UserCard.css";

defineProps<UserCardProps>();
</script>

<template>
  <article class="user-card" :aria-label="`Profile of ${name}`">
    <header class="user-card__header">
      <h3 class="user-card__name">{{ name }}</h3>
      <p class="user-card__username" :aria-label="`Username: ${username}`">@{{ username }}</p>
    </header>

    <address class="user-card__contact">
      <p class="user-card__info">
        <span aria-hidden="true">📧 </span>
        <a :href="`mailto:${email}`">{{ email }}</a>
      </p>
      <p class="user-card__info">
        <span aria-hidden="true">📞 </span>
        <a :href="`tel:${phone}`">{{ phone }}</a>
      </p>
      <p class="user-card__info">
        <span aria-hidden="true">🌐 </span>
        <a :href="`https://${website}`" target="_blank" rel="noopener noreferrer">
          {{ website }}
        </a>
      </p>
    </address>

    <footer class="user-card__footer">
      <p class="user-card__company">
        <span aria-hidden="true">🏢 </span>
        {{ company.name }}
      </p>
    </footer>
  </article>
</template>
