import { getFirestore, collection, getDocs } from 'firebase/firestore'
import app from './firebaseConfig'

const db = getFirestore(app)

export async function getProjects() {
  const snapshot = await getDocs(collection(db, 'projects'))
  return snapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}
