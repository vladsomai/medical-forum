
export enum AttributeEnum { Admin, Medic, PowerUser }

export const Specialities = new Map([
    [1, "Dermatologie"],
    [2, "Medicina interna"],
    [3, "Neurologie"],
    [4, "Pediatrie"],
    [5, "Psihiatrie"],
    [6, "Cardiologie"],
    [7, "Medicina interna"],
    [8, "Nefrologie"],
    [9, "Pneumologie"],
    [10, "Medicina muncii"],
    [11, "Recuperare medicala"],
    // [1, "Alergologie si Imunologie clinica"],
]);

export interface UserProfile {
    UID: string,
    Email: string,
    PhoneNumber: string,
    Attribute: AttributeEnum
    FirstName: string,
    LastName: string,

    //Only medics will have the following attributes
    Speciality?: string,
    Title?: string,
    ProfilePic?: string,
}

export interface Medic extends UserProfile {
    ProfilePicture: string,
    Title: string,
    Specialities: string[],
    Availability: Date[][]
}

export interface Appointment {
    UID: string,
    Date: Date,
    Speciality: string,
    Medic: Medic,
}

export const firebaseConfig = {
    apiKey: "AIzaSyAlGV7zo72S08XJv15-TRe_L-cf0_Z8sbI",
    authDomain: "medicalforum-19fb2.firebaseapp.com",
    projectId: "medicalforum-19fb2",
    storageBucket: "medicalforum-19fb2.appspot.com",
    messagingSenderId: "101056477350",
    appId: "1:101056477350:web:df621f81e384297ac15c67",
    measurementId: "G-38V27RJVD6"
};