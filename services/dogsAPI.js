import { db } from "./firebase";
import { doc, setDoc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";

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

//Fetch data about user dog
export const getDogDocumentData = async(uid) => {

  try {
    const docRef = doc(db, "dogs", uid)
    const docSnep = await getDoc(docRef)

    if(docSnep.exists()) {
      return docSnep.data()
    }
    else {
      null
    }
  } catch(err) {
    throw new Error(err.message)
  }
}

//Update dog data
export const updateDogDocumentData = async(uid, data, newData) => {
  try {
    const docRef = doc(db, "dogs", uid)
    
    await updateDoc(docRef, {
      [data]: newData
    })

  } catch (error) {
    throw new Error(error.message)    
  }  
}


//Get realtime updates 
export const getRealtimeDogDocumentData = (uid, callback) => {
  const unsubscribe = onSnapshot(doc(db, "dogs", uid), (doc) => {
    callback(doc.data())//Callback koji saljem iz Vue komponente
  })
  return unsubscribe;
}