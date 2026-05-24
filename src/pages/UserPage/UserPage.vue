<script setup lang="ts">
import { onMounted, ref } from "vue";

import type { Ref } from "vue";
import type { User } from "@/types/app";
import type { UserPageProps } from "@/types/props";

import AppLink from "@/components/AppLink/AppLink.vue";
import UserCard from "@/components/UserCard/UserCard.vue";

import userService from "@/services/userService";

const props = defineProps<UserPageProps>();

const user: Ref<User | null> = ref(null);
const isLoading: Ref<boolean> = ref(true);
const error: Ref<string | null> = ref(null);

onMounted(async (): Promise<void> => {
  const parsedId = Number.parseInt(props.id, 10);

  if (Number.isNaN(parsedId)) {
    error.value = "Invalid user id";
    isLoading.value = false;
    return;
  }

  try {
    user.value = await userService.getById(parsedId);
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Unknown error";
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <section class="user-page">
    <header class="user-page__header">
      <h1 class="user-page__title">User Detail</h1>
      <AppLink id="link-users" href="/users" ariaLabel="Back to Users list">
        ← Back to Users
      </AppLink>
    </header>

    <p v-if="isLoading" role="status" class="user-page__status">Loading user…</p>
    <p v-else-if="error" role="alert" class="user-page__status user-page__status--error">
      {{ error }}
    </p>

    <div v-else-if="user" class="user-page__content">
      <UserCard
        :name="user.name"
        :username="user.username"
        :email="user.email"
        :phone="user.phone"
        :website="user.website"
        :company="user.company"
      />
    </div>
  </section>
</template>

<style scoped>
.user-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  max-width: 43.75rem;
  margin: 0 auto;
  padding: var(--spacing-xl);
}

.user-page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.user-page__title {
  color: var(--color-white);
  font-size: 2rem;
}

.user-page__status {
  color: var(--color-gray-light);
  font-size: var(--font-size-lg);
  text-align: center;
  padding: var(--spacing-xl);
}

.user-page__status--error {
  color: var(--color-accent);
}

.user-page__content {
  display: flex;
  justify-content: center;
}
</style>
