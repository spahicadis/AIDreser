import { db } from "./firebase";
import { doc, setDoc, collection } from "firebase/firestore";

//Create user document in collection whit others data from form after registration. Document will hold same uid whic user get in authentication
export const createUserDocumentOnRegister = async (user, uid) => {
  try {
    console.log(user);
    await setDoc(doc(db, "users", uid), {
      name: user.name,
      surname: user.surname,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
