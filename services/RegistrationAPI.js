import { createUserWithEmailAndPassword } from "firebase/auth";
import { createUserDocumentOnRegister } from "./usersAPI.js";
import { auth } from "./firebase.js";
import { handleCreateUserDog } from "./dogsAPI.js";

export const handleUserRegistration = async (user, dog) => {
  try {
    const createUserAuthorization = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    if (!createUserAuthorization.user || !createUserAuthorization.user.uid) {
      return;
    }

    const createUserDocument = await createUserDocumentOnRegister(
      user,
      createUserAuthorization.user.uid
    );

    //const createDog = await handleCreateUserDog(user, dog);

    return {
      status: 200,
      message: "Korisnik i pas uspješno registrirani",
      user: auth.currentUser,
    };
  } catch (error) {
    let errMessage = "Pogreška prilikom registracije";
    switch (error.code) {
      case "auth/email-already-in-use":
        errMessage = "Email je već registriran";
        break;
      case "auth/invalid-email":
        errMessage = "Neispravan format maila";
        break;
      case "auth/weak-password":
        errMessage = "Lozinka je preslaba";
        break;
      case "auth/operation-not-allowed":
        errMessage = "Registracija trenutno nije moguća";
        break;
      default:
        errMessage = error.message;
    }
    return {
      status: 500,
      message: errMessage,
    };
  }
};
