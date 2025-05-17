import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "vue3-toastify";
import { auth } from "../../services/firebase";

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
    {
      path: "/register",
      component: () => import("@/views/RegistrationView.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("@/views/DashboardView.vue"),
      children: [
        {
          path: "commands",
          component: () => import("@/views/DashboardView.vue")
        },
        {
          path: "settings",
          component: () => import("@/views/DashboardSettingsView.vue")
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
