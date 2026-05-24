import { createRouter, createWebHistory } from "vue-router";

import type { RouteRecordRaw } from "vue-router";

import envs from "@/constants/envs";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: async () => import("@/pages/HomePage/HomePage.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: async () => import("@/pages/AboutPage/AboutPage.vue"),
  },
  {
    path: "/pinia",
    name: "pinia",
    component: async () => import("@/pages/PiniaPage/PiniaPage.vue"),
  },
  {
    path: "/context",
    name: "context",
    component: async () => import("@/pages/ContextPage/ContextPage.vue"),
  },
  {
    path: "/users",
    name: "users",
    component: async () => import("@/pages/UsersPage/UsersPage.vue"),
  },
  {
    path: "/users/:id",
    name: "user",
    component: async () => import("@/pages/UserPage/UserPage.vue"),
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: async () => import("@/pages/NotFoundPage/NotFoundPage.vue"),
    beforeEnter: (): { name: string } | undefined => {
      if (envs.REDIRECT_IF_ROUTE_NOT_EXISTS) {
        return { name: "home" };
      }
      return undefined;
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
