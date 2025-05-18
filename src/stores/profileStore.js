import { defineStore } from "pinia";
import { ref } from "vue";
import { getUserDocumentData } from "../../services/usersAPI";
import { getDogDocumentData } from "../../services/dogsAPI";
import { useAuthStore } from "./authStore";


export const useProfileStore = defineStore('profileStore', () => {
  const authStore = useAuthStore()
  const profileData = ref(null)
  const isLoading = ref(true)

  const getProfileData = async() => {

    try {

      const userData = await getUserDocumentData(authStore.currentUser.uid)
      const dogData = await getDogDocumentData(authStore.currentUser.uid)


      profileData.value = {
        uid: authStore.currentUser.uid,
        user: userData,
        dog: dogData,
      }


    } catch (error) {
      throw new Error(error.message)
    } finally {
      isLoading.value = false;
    }

  }

return {
  profileData,
  getProfileData,
  isLoading
}
})