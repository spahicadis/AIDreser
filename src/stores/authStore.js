import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { auth } from "../../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const useAuthStore = defineStore("authStore", () => {
  const currentUser = ref(null);

  const init = () => {
    onAuthStateChanged(auth, (loggedUser) => {
      if (loggedUser) {
        currentUser.value = {
          uid: loggedUser.uid,
          displayName: loggedUser.displayName,
          email: loggedUser.email,
        };
      } else {
        currentUser.value = null;
      }
    });
  };

  const userSignOut = async () => {
    try {
      const signOut = await auth.signOut();
      console.log(signOut);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {
    init,
    currentUser,
    userSignOut,
  };
});
