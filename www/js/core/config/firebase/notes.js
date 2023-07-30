import { collection, addDoc } from "firebase/firestore";
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
