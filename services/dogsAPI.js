import { db } from "./firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { image_visualizer } from "./geminiAPI";

//Create document in dogs collection. Document will have data from the registration form. Document will hold same uid which user get in authentication
export const createDogDocumentOnRegistration = async (dog, uid) => {
  try {
    await setDoc(doc(db, "dogs", uid), {
      ...dog,
      level: "Početnik",
      commandsFinished: 0,
      levelNumber: 1,
      wonTreats: 0,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

//Fetch data about user dog
export const getDogDocumentData = async (uid) => {
  try {
    const docRef = doc(db, "dogs", uid);
    const docSnep = await getDoc(docRef);

    if (docSnep.exists()) {
      return docSnep.data();
    } else {
      null;
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

//Update dog data
export const updateDogDocumentData = async (uid, data, newData) => {
  try {
    const docRef = doc(db, "dogs", uid);

    await updateDoc(docRef, {
      [data]: newData,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

//Delete document

export const deleteDogDocument = async (uid) => {
  try {
    await deleteDoc(doc(db, "dogs", uid));
  } catch (error) {
    throw new Error(error.message);
  }
};

//One of the most important functions in the application, upon completion of the command, the user sends images to the trainer, the AI ​​processes them based on the response, the rest of the application's logic goes
export const reviewCompletedCommand = async (
  uid,
  commandData,
  currentLevel,
  currentCommandsFinished
) => {
  try {
    let signalForToast = false;

    const response = await image_visualizer(
      commandData.img,
      commandData.question
    );

    const normalizedResponse = response.status.toLowerCase();

    //Includes nije mozda najbolja opcija za provjeru, ali je fleksibilnija naspram drugih provjera jer mozda ce nekad model otic izvan opseg prompta pa response nece biti formatiran kako ocekujem
    if (normalizedResponse.includes("da")) {
      await updateDogDocumentData(uid, "levelNumber", currentLevel + 1);
      await updateDogDocumentData(
        uid,
        "commandsFinished",
        currentCommandsFinished + 1
      );

      const checkNewData = await getDogDocumentData(uid);

      //Ovdje sam zelio koristiti triggere/firestore functions, ali nemamo tu mogucnost jedino sa backenda.
      //Prilikom update documenta provjerimo nove vrijednost tj. novi level nakon polozene naredbe i na temelju vrijednosti novog level azuriramo drugi atribut tj razinu na srednja ili napredni. Ovo je alternativa. Dodana provjera ako nema vec tu vrijednost tako da ne lupa po bazi bezveze
      if (
        checkNewData.levelNumber >= 5 &&
        checkNewData.levelNumber < 8 &&
        checkNewData.level !== "Srednja"
      ) {
        await updateDogDocumentData(uid, "level", "Srednja");
      }

      if (checkNewData.levelNumber >= 8 && checkNewData.level !== "Napredni") {
        await updateDogDocumentData(uid, "level", "Napredni");
      }

      if (response.rating === 5) {
        await updateDogDocumentData(
          uid,
          "wonTreats",
          checkNewData.wonTreats + 1
        );
      }

      signalForToast = true;
    }

    return { signal: signalForToast, text: response.message };
  } catch (error) {
    throw new Error(error.message);
  }
};

//Get realtime updates
export const getRealtimeDogDocumentData = (uid, callback) => {
  const unsubscribe = onSnapshot(doc(db, "dogs", uid), (doc) => {
    callback(doc.data()); //Callback koji saljem iz Vue komponente
  });
  return unsubscribe;
};
