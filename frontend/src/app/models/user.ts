export class User {
    name!: string;
    surnames!: string;
    email!: string;
    password!: string;
    picture!: string;
    licenseNumber!: string;
    medicalCheckDate!: Date;
    licenseExpeditionDate!: Date;
    certifications!: [];
    center!: {
        name: string;
        latitude: number;
        longitude: number;
    };
    buddies!: [];
    equipment!: [];
    immersions!: [];
    token!: string;
    refreshToken?: string;
    // id: number;
    // username: string;
    // firstName: string;
    // lastName: string;
    // token?: string;
}