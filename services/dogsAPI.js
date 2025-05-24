import { db } from "./firebase";
import { doc, setDoc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { image_visualizer } from "./geminiAPI";

//Create document in dogs collection. Document will have data from the registration form. Document will hold same uid which user get in authentication
export const createDogDocumentOnRegistration = async (dog, uid) => {
  try {
    await setDoc(doc(db, "dogs", uid), {
      ...dog,
      level: "Početnik",
      commandsFinished: 0,
      levelNumber: 1,
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

//One of the most important functions in the application, upon completion of the command, the user sends images to the trainer, the AI ​​processes them based on the response, the rest of the application's logic goes
export const reviewCompletedCommand = async(uid, commandData, currentLevel, currentCommandsFinished) => {

  try {
    let signalForToast = false;    
    const trainerResponse = await image_visualizer(commandData.img, commandData.question)

    const checkResponse = trainerResponse.match(/\S+/)[0]
    const normalizedResponse = checkResponse.toLowerCase()
    
    console.log(normalizedResponse)
    
    if(normalizedResponse.includes("da")) {
      await updateDogDocumentData(uid, "levelNumber", currentLevel + 1)
      await updateDogDocumentData(uid, "commandsFinished", currentCommandsFinished + 1)

      const checkNewLevel = await getDogDocumentData(uid);

      if(checkNewLevel.levelNumber >= 5) {
        await updateDogDocumentData(uid, "level", "Srednja")
      }
      
      if(checkNewLevel.levelNumber >=8 ) {
        await updateDogDocumentData(uid, "level", "Napredni")
      }

      signalForToast = true
      //TO DO: Mijenjanje razina psa na temelju levela i vidjeti za osovjene poslastice
    }

    return {signal: signalForToast, text: trainerResponse}

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