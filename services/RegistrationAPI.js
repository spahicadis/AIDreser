import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.js";

export const handleUserRegistration = async (user) => {

  try {
    const createUser = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
   
    return {
      status: 200,
      message: "Korisnik uspješno registriran",
      user: createUser.user
    }

  } catch (error) {
    let errMessage = "Pogreška prilikom registracije";
    switch(error.code) {
      case 'auth/email-already-in-use':
        errMessage = "Email je već registriran";
        break;
      case 'auth/invalid-email':
        errMessage = "Neispravan format maila";
        break;
      case 'auth/weak-password':
        errMessage = "Lozinka je preslaba";
        break;
      case 'auth/operation-not-allowed':
        errMessage = "Registracija trenutno nije moguća";
        break;
      default:
        errMessage = error.message;
    }
    return {
      status: 500,
      message: errMessage,
    }
  }
};
