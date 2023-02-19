
export enum AttributeEnum { Secretary, Medic, PowerUser }

export const AccountType = new Map([
    [0, "Admin"],
    [1, "Medic"],
    [2, "Utilizator"]
])
export const Specialities = new Map([
    [1, "Alergologie si Imunologie clinica"],
    // [2, "Anesthesiology"],
    [3, "Dermatologie"],
    [4, "Radiologie"],
    // [5, "Emergency medicine"],
    [6, "Medicina de familie"],
    [7, "Medicina interna"],
    [8, "Genetica"],
    [9, "Neurologie"],
    // [10, "Nuclear medicine"],
    [11, "Obstetrica si ginecologie"],
    [12, "Oftalmologie"],
    [13, "Patologie"],
    [14, "Pediatrie"],
    [15, "Physical medicine and rehabilitation"],
    [16, "Medicina preventiva"],
    [17, "Psihiatrie"],
    [18, "Oncologie"],
    // [19, "Surgery"],
    [20, "Urologie"],
]);

export interface UserProfile {
    UID: string,
    Email: string,
    PhoneNumber: string,
    Attribute: AttributeEnum
    Firstname: string,
    Surname: string
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
