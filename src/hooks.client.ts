import { onAuthStateChanged, type User } from 'firebase/auth';
import { user } from '$lib/stores/globalStore';
import { medicalForumFirebaseAuth } from "$lib/firebase/firebase";

onAuthStateChanged(medicalForumFirebaseAuth, (_user) => {
    if (_user) {
        user.set(_user as User);
    } else {
        user.set(null);
    }
});

