export class User {
    _id!: number;
    name!: string;
    surnames!: string;
    email!: string;
    password!: string;
    picture!: string;
    licenseNumber!: string;
    medicalCheckDate!: Date;
    licenseExpeditionDate!: Date;
    certifications!: any;
    center!: {
        name: string;
        latitude: any;
        longitude: any;
    };
    buddies!: any;
    equipment!: any;
    immersions!: any;
    token!: string;
    refreshToken?: string;
}