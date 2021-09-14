export class Equipment {
    purchaseDate!: Date;
    maintenanceCheckDate!: Date;
    numberOfImmersions!: number;
    item!: {
        name: string;
        brand: string;
        brandModel: string;
        picture: string;
    }
}