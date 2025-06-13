import { db } from "./firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { auth } from "./firebase";
import { updatePassword } from "firebase/auth";

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

//Fetch data about logged user
export const getUserDocumentData = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

//Update data
export const updateUserDocumentData = async (uid, data, newData) => {
  try {
    if (data === "password") {
      await updatePassword(auth.currentUser, newData);
    } else {
      const docRef = doc(db, "users", uid);

      await updateDoc(docRef, {
        [data]: newData,
      });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

//Delete document
export const deleteUserDocument = async (uid) => {
  try {
    await deleteDoc(doc(db, "users", uid));
  } catch (error) {
    throw new Error(error.message);
  }
};

//Get realtime updates
export const getRealtimeUserDocumentData = (uid, callback) => {
  const unsubscribe = onSnapshot(doc(db, "users", uid), (doc) => {
    callback(doc.data());
  });
  return unsubscribe;
};
