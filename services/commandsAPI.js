import { db } from "./firebase";
import { collection, getDocs, getDoc,doc } from "firebase/firestore";

//Fetch all commands documents from commands collection 
export const getAllCommands = async() => {

  try {
    
    const docs = []
    const documents = await getDocs(collection(db, "commands"));
    
    documents.forEach((doc) => {
      docs.push({
        id: doc.id,
        ...doc.data()
      })
    })
    
  

    return docs;
  
  } catch (error) {
    throw new Error(error.message)
  }

}

//Get single command
export const getSingleComand = async(id) => {

  try {
    
    const docRef = doc(db, 'commands', id);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
      return docSnap.data()
    }
    else {
      return null;
    }

  } catch (error) {
      throw new Error(error.message)
  }

  
} 