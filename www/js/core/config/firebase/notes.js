import { collection, addDoc, getDocs } from "firebase/firestore";
import { AppState } from "../../state";

export async function addNote(note) {
  try {
    const { firestore: db, authUser } = AppState.getState();
    const userNoteRef = collection(db, 'users', authUser.uid, 'notes');
    await addDoc(userNoteRef, note);
    console.log('Note added successfully.');
  } catch (error) {
    throw error;
  }
}

export async function getNotes() {
  try {
    const { firestore: db, authUser } = AppState.getState();
    const userNoteRef = collection(db, 'users', authUser.uid, 'notes');
    return await getDocs(userNoteRef);
  } catch (error) {
    throw error;
  }
}
