import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import app from './firebaseConfig'

const db = getFirestore(app)

export async function submitContact({ name, email, message }) {
  return addDoc(collection(db, 'contacts'), {
    name,
    email,
    message,
    createdAt: serverTimestamp(),
  })
}
