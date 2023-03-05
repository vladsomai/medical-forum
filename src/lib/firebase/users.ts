import type { AttributeEnum, UserProfile } from "$lib/types";
import { collection, getDocs } from "firebase/firestore";
import { medicalForumFirebaseFirestore } from "./firebase";

export async function getAllUsers(): Promise<UserProfile[]> {
    const querySnapshot = await getDocs(collection(medicalForumFirebaseFirestore, 'UserProfile'));
    let count = 0;
    let users: UserProfile[] = [];
    return new Promise<UserProfile[]>((resolve: Function) => {
        if (querySnapshot.size == 0) resolve([]);

        querySnapshot.forEach(async (doc) => {
            const documentData = doc.data();

            users.push({
                UID: documentData.UID as string,
                LastName: documentData.LastName as string,
                FirstName: documentData.FirstName as string,
                Email: documentData.Email,
                PhoneNumber: documentData.PhoneNumber as string,
                Attribute: documentData.Attribute as AttributeEnum,
                Speciality: documentData.Speciality as string,
                Title: documentData.Title as string
            } as UserProfile);

            count += 1;

            if (count == querySnapshot.size) {
                resolve(users);
            }
        });
    });
}