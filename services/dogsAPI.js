import { db } from "./firebase";
import { doc, setDoc, getDoc, collection } from "firebase/firestore";

//Create document in dogs collection. Document will have data from the registration form. Document will hold same uid which user get in authentication
export const createDogDocumentOnRegistration = async (dog, uid) => {
  try {
    await setDoc(doc(db, "dogs", uid), {
      ...dog,
      level: "Početnik",
      commandsFinished: 0,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};


export const getDogDocumentData = async(uid) => {
 
  const docRef = doc(db, "dogs", uid)
  const docSnep = await getDoc(docRef)

  if(docSnep.exists()) {
    return docSnep.data()
  }
  else {
    null
  }


}
