import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider } from "../firebase/firebase";

// Register with email/password
export const register = async (name, email, password, role) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name,
    email,
    role,
    photoURL: "",
    createdAt: serverTimestamp(),
  });

  return userCredential;
};


 // Login with email/password
export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

//Google Sign-In
export const googleLogin = async () => {
  const userCredential = await signInWithPopup(auth, googleProvider);

  const user = userCredential.user;

  const userRef = doc(db, "users", user.uid);

  const userSnap = await getDoc(userRef);

  // First Google login
  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      role: null,
      createdAt: serverTimestamp(),
    });
  }

  return userCredential;
};

// Logout
export const logout = () => signOut(auth);

// Get Firestore profile
export const getUserProfile = async (uid) => {
  const snapshot = await getDoc(doc(db, "users", uid));

  if (!snapshot.exists()) return null;

  return snapshot.data();
};

/**
Save the role chosen on the CompleteProfile page
(used after a first-time Google sign-in, where role starts as null)
 */
export const updateUserRole = async (uid, role) => {
  await setDoc(doc(db, "users", uid), { role }, { merge: true });
};