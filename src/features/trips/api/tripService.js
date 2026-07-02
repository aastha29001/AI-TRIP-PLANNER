import { collection, doc, getDocs, getDoc, query, setDoc, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

const COLLECTION = 'AITrips';

/**
 * Saves a generated AI trip to Firestore.
 */
export async function saveTrip({ formData, tripData, userEmail }) {
  const docId = Date.now().toString();
  await setDoc(doc(db, COLLECTION, docId), {
    userSelection: formData,
    tripData,
    userEmail,
    id: docId,
  });
  return docId;
}

/**
 * Fetches all trips belonging to a user by email.
 */
export async function getTripsByUser(email) {
  const q = query(collection(db, COLLECTION), where('userEmail', '==', email));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => d.data());
}

/**
 * Fetches a single trip by its document ID.
 */
export async function getTripById(tripId) {
  const docSnap = await getDoc(doc(db, COLLECTION, tripId));
  if (!docSnap.exists()) return null;
  return docSnap.data();
}
