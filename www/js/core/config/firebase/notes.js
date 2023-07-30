import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { AppState } from "../../state";

export async function addNote(note) {
  try {
    const { firestore: db, authUser } = AppState.getState();
    const userNoteRef = collection(db, 'users', authUser.uid, 'notes');
    await addDoc(userNoteRef, note);
  } catch (error) {
    throw error;
  }
}

export async function updateNote(id, note) {
  try {
    const { firestore: db, authUser } = AppState.getState();
    const userNoteRef = doc(db, 'users', authUser.uid, 'notes', id);
    await updateDoc(userNoteRef, note);
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

export async function getNote(id) {
  try {
    const { firestore: db, authUser } = AppState.getState();
    const userNoteRef = doc(db, 'users', authUser.uid, 'notes', id);
    return await getDoc(userNoteRef);
  } catch (error) {
    throw error;
  }
}

export async function deleteNote(id) {
  try {
    const { firestore: db, authUser } = AppState.getState();
    const userNoteRef = doc(db, 'users', authUser.uid, 'notes', id);
    return await deleteDoc(userNoteRef);
  } catch (error) {
    throw error;
  }
}
