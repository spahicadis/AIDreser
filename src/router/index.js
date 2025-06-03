import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "vue3-toastify";

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
      name: "Onboarding",
    },
    {
      path: "/register",
      component: () => import("@/views/RegistrationView.vue"),
      name: "Register",
    },
    {
      path: "/login",
      component: () => import("@/views/LoginView.vue"),
      name: "Login",
    },
    {
      path: "/dashboard",
      component: () => import("@/views/DashboardView.vue"),
      name: "Dashboard",
      children: [
        {
          path: "commands",
          component: () => import("@/views/DashboardCommandsView.vue"),
          name: "Commands",
        },
        {
          path: "ask-trainer",
          component: () => import("@/views/DashboardAskTrainerView.vue"),
          name: "Ask trainer",
        },
        {
          path: "settings",
          component: () => import("@/views/DashboardSettingsView.vue"),
          name: "Settings",
        }
      ]
    },
  ],
});

//Basic dashboard protection in the development phase for testing the correctness of registration, login and whether the currentUser state is persistent
//Fix displaying of toast(longer display)
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  await authStore.init() 
  console.log(authStore.currentUser)
  if (authStore.currentUser === null && to.name === "Dashboard") {
    toast.error("Molimo prijavite se kako bi imali pristup", {
      autoClose: false,
      pauseOnHover: true,
      position: "top-right",
    });
    return next({ name: "Login" });
  }
  return next();
});

export default router;
