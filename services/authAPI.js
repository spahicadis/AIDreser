import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserDocumentOnRegister } from "./usersAPI.js";
import { createDogDocumentOnRegistration } from "./dogsAPI.js";
import { auth } from "./firebase.js";
import { deleteDogDocument } from "./../services/dogsAPI";
import { deleteUserDocument } from "./../services/usersAPI";

export const handleUserRegistration = async (user, dog) => {
  /*if (!user || !dog) {
    return {
      status: 400,
      message: "Obavezni su podaci vlasnika i psa za registraciju",
    };
  }*/

  try {
    const createUserAuthorization = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    //Nekakav mali failsafe ali uvijek bi trebalo prolaziti dobro
    if (!createUserAuthorization.user || !createUserAuthorization.user.uid) {
      return;
    }

    const createUserDocument = await createUserDocumentOnRegister(
      user,
      createUserAuthorization.user.uid
    );

    const crateDogDocument = await createDogDocumentOnRegistration(
      dog,
      createUserAuthorization.user.uid
    );

    return {
      status: 200,
      message: "Korisnik i pas uspješno registrirani",
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

export const handleUserSignIn = async (user) => {
  try {
    const userSignIn = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    return {
      status: 200,
      message: "Dobrodošli u AIDreser",
    };
  } catch (error) {
    let errMessage = "Pogreška prilikom prijave";
    switch (error.code) {
      case "auth/invalid-credential":
        errMessage = "Neispravni podaci za prijavu.";
        break;
      case "auth/invalid-email":
        errMessage = "Neispravan format maila";
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

export const handleUserSignOut = async () => {
  try {
    const signOut = await auth.signOut();
    if (auth.currentUser === null) {
      return 200;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const handleDeleteAccount = async (id) => {
  try {
    await Promise.all([deleteUserDocument(id), deleteDogDocument(id)]);

    let user = auth.currentUser;
    user?.delete();

    return 200;
  } catch (error) {
    return 500;
  }
};
