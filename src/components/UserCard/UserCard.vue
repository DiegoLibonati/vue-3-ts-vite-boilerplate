<script setup lang="ts">
import type { UserCardProps } from "@/types/props";

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

<style scoped>
.user-card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background-color: rgba(var(--color-black-rgb), 0.25);
  border: 0.0625rem solid var(--color-gray-dark);
  border-radius: 0.5rem;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;
}

.user-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-0.125rem);
}

.user-card__header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.user-card__name {
  color: var(--color-white);
  font-size: var(--font-size-xl);
}

.user-card__username {
  color: var(--color-gray-light);
  font-size: var(--font-size-sm);
}

.user-card__contact {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  font-style: normal;
}

.user-card__info {
  color: var(--color-gray-mid);
  font-size: var(--font-size-sm);
}

.user-card__info a {
  color: var(--color-accent);
  transition: opacity 0.2s ease;
}

.user-card__info a:hover {
  opacity: 0.8;
}

.user-card__footer {
  padding-top: var(--spacing-md);
  border-top: 0.0625rem solid var(--color-gray-dark);
}

.user-card__company {
  color: var(--color-white);
  font-weight: 600;
}
</style>
