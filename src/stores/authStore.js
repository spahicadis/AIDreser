import { defineStore } from "pinia";
import { ref } from "vue";
import { auth } from "../../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const useAuthStore = defineStore("authStore", () => {
  const currentUser = ref(null);


  const init = () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (loggedUser) => {
      if (loggedUser) {
        currentUser.value = {
          uid: loggedUser.uid,
        };
      } else {
        currentUser.value = null;
      }
      resolve();
    });
  })
  }

  return {
    init,
    currentUser,
  };
});
