<script setup lang="ts">
import { onMounted, ref } from "vue";

import type { Ref } from "vue";
import type { User } from "@/types/app";

import UserCard from "@/components/UserCard/UserCard.vue";
import AppLink from "@/components/AppLink/AppLink.vue";

import userService from "@/services/userService";

const users: Ref<User[]> = ref([]);
const isLoading: Ref<boolean> = ref(true);
const error: Ref<string | null> = ref(null);

onMounted(async (): Promise<void> => {
  try {
    users.value = await userService.getAll();
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Unknown error";
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <section class="users-page">
    <header class="users-page__header">
      <h1 class="users-page__title">Users</h1>
      <AppLink id="link-home" href="/" ariaLabel="Back to Home">← Back to Home</AppLink>
    </header>

    <p v-if="isLoading" role="status" class="users-page__status">Loading users…</p>
    <p v-else-if="error" role="alert" class="users-page__status users-page__status--error">
      {{ error }}
    </p>

    <ul v-else class="users-page__list">
      <li v-for="user in users" :key="user.id" class="users-page__item">
        <AppLink
          :id="`link-user-${user.id.toString()}`"
          :href="`/users/${user.id.toString()}`"
          :ariaLabel="`View details for ${user.name}`"
          class="users-page__link"
        >
          <UserCard
            :name="user.name"
            :username="user.username"
            :email="user.email"
            :phone="user.phone"
            :website="user.website"
            :company="user.company"
          />
        </AppLink>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.users-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  max-width: 75rem;
  margin: 0 auto;
  padding: var(--spacing-xl);
}

.users-page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.users-page__title {
  color: var(--color-white);
  font-size: 2rem;
}

.users-page__status {
  color: var(--color-gray-light);
  font-size: var(--font-size-lg);
  text-align: center;
  padding: var(--spacing-xl);
}

.users-page__status--error {
  color: var(--color-accent);
}

.users-page__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(17.5rem, 1fr));
  gap: var(--spacing-lg);
}

.users-page__item {
  display: block;
}

.users-page__link {
  display: block;
  color: inherit;
}

.users-page__link:hover {
  opacity: 1;
}
</style>
