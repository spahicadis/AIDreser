import { db } from "./firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

//Fetch all commands documents from commands collection
export const getAllCommands = async () => {
  try {
    const collectionRef = collection(db, "commands");
    const q = query(collectionRef, orderBy("commandLevel"));
    const docs = [];
    const documents = await getDocs(q);

    documents.forEach((doc) => {
      docs.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return docs;
  } catch (error) {
    throw new Error(error.message);
  }
};

//Get single command
export const getSingleComand = async (id) => {
  try {
    const docRef = doc(db, "commands", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
