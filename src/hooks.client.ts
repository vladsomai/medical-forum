import { onAuthStateChanged, type User } from 'firebase/auth';
import { user } from '$lib/stores/globalStore';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from '$lib/types';

export const medicalForumFirebaseApp = initializeApp(firebaseConfig);
export const medicalForumFirebaseAuth = getAuth(medicalForumFirebaseApp);
export const medicalForumFirebaseFirestore = getFirestore(medicalForumFirebaseApp);

onAuthStateChanged(medicalForumFirebaseAuth, (_user) => {
    if (_user) {
        user.set(_user as User);
    } else {
        user.set(null);
    }
});
