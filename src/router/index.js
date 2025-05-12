import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/onboarding",
    },
    {
      path: "/onboarding",
      component: () => import("@/views/OnBoardingView.vue"),
    },
  ],
});

export default router;
