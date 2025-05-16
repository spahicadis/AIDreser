import { db } from "./firebase";
import { doc, setDoc, getDoc, collection } from "firebase/firestore";

//Create user document in collection whit others data from form after registration. Document will hold same uid which user get in authentication
export const createUserDocumentOnRegister = async (user, uid) => {
  try {
    await setDoc(doc(db, "users", uid), {
      name: user.name,
      surname: user.surname,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};



export const getUserDocumentData = async(uid) => {
  
  const docRef = doc(db, "users", uid)
  const docSnap = await getDoc(docRef)


    if(docSnap.exists()) {
      return docSnap.data();
    }

    else {
      return null
    }

}
