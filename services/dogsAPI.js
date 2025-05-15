import { db } from "./firebase";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";

export const handleCreateUserDog = async (user, dog) => {
  try {
    const createDog = await addDoc(collection(firestore, "dogs"), {
      name: dog.name,
      breed: dog.breed,
      age: dog.age,
      weight: dog.weight,
      treat: dog.treat,
      image: dog.image,
      level: "Početnik",
      numberOfCompletedCommands: 0,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.log(err.message);
  }
};
