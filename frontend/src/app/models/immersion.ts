export class Immersion {
    _id!: number;
    startHour!: number;
    startMinut!: number;
    endHour!: number;
    endMinut!: number;
    visibility!: string;
    comments!: string;
    entry!: string;
    seaConditions!: string;
    waterType!: string;
    place!: {
      name: string;
      latitude: number;
      longitude: number;
    };
    date!: Date;
    inicialBar!: number;
    finalBar!: number;
    weight!: number;
    neopreneThickness!: number;
    air!: Boolean;
    nitroxPercentage!: number;
    tankAirLiters!: number;
    waterTemperature!: number;
    airTemperature!: number;
    immersionStages!: [any]
    // {
    //     deep: number,,
    //     bottomMinuts: number,
    // }
    buddies!: [any]
    // {
    //     buddie: number;
    //     supervisor: Boolean; 
    // }
    pictures!: [any];
    // { url: string }]
}