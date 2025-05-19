import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

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
    
    console.log(docs)
    
    

    return docs;
  
  } catch (error) {
    throw new Error(error.message)
  }

}